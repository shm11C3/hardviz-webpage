#!/usr/bin/env python3
"""Repeat the synthetic 30-, 90-, and 365-day storage comparison.

The runner mirrors the application's 64 KiB DuckDB block size for newly
created databases. This is not the released application's complete database.
"""

import argparse
from datetime import datetime
import hashlib
import importlib.util
import json
from pathlib import Path
import shutil
import sys

NATIVE_DEFAULT_BLOCK_SIZE_BYTES = 65_536
SOURCE_COMMIT = "7fae38b38116d82d771d6fc3705f67f618218732"
ENGINE_COMMIT = "75db64c972b39d94205800cafb6ccb15d6d6029a"
TUNING_COMMIT = "69a41e63f4002ce4254bb594d524f7896004e8ca"
FIXTURE_SHA256 = {
    "30d-stable": "c6e6248329a562e61688a7051380ed1f98de418ec6ac15995325ed96a032c525",
    "90d-stable": "af4506025dd29520647934f31ce7a31b1a75d44e50310c0a8eeaab1063cedcdb",
    "1y-stable": "97803757685d304bb5c6ddae5765d2195f44696004e4558c6992a73067132e2f",
}


def digest(path: Path) -> str:
    with path.open("rb") as stream:
        return hashlib.file_digest(stream, "sha256").hexdigest()


parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("--source", type=Path, required=True)
parser.add_argument("--binary", type=Path, required=True)
parser.add_argument("--engine", type=Path, required=True)
parser.add_argument(
    "--fixture-source",
    type=Path,
    help="Reuse completed immutable synthetic source fixtures instead of regenerating them",
)
parser.add_argument("--output", type=Path, required=True)
args = parser.parse_args()
for name in ("source", "binary", "engine", "output"):
    setattr(args, name, getattr(args, name).resolve())
if args.fixture_source:
    args.fixture_source = args.fixture_source.resolve()
if args.output.exists():
    parser.error("--output must be a new directory")

# The pinned Python engine predates the production block-size tuning. Patch a
# copy so the caller's supplied engine checkout remains unchanged. Validate the
# complete function body to reject a partial or nested prior patch.
args.output.mkdir(parents=True)
engine_workspace = args.output / "patched-engine"
shutil.copytree(args.engine, engine_workspace)
engine_script = engine_workspace / "engine_benchmark.py"
engine_source = engine_script.read_text()
old_open_duckdb = '''def open_duckdb(
    path: Path | None,
    temp_dir: Path,
    threads: int,
    memory_limit: str,
    read_only: bool = False,
) -> duckdb.DuckDBPyConnection:
    temp_dir.mkdir(parents=True, exist_ok=True)
    connection = duckdb.connect(str(path) if path else ":memory:", read_only=read_only)
    connection.execute(f"SET threads = {int(threads)}")
    connection.execute("SET memory_limit = ?", [memory_limit])
    connection.execute("SET temp_directory = ?", [str(temp_dir)])
    return connection
'''
new_open_duckdb = '''def open_duckdb(
    path: Path | None,
    temp_dir: Path,
    threads: int,
    memory_limit: str,
    read_only: bool = False,
) -> duckdb.DuckDBPyConnection:
    temp_dir.mkdir(parents=True, exist_ok=True)
    if path is not None and path.name == "archive.duckdb" and not read_only:
        connection = duckdb.connect(
            str(path), read_only=read_only, config={"default_block_size": "65536"}
        )
    else:
        connection = duckdb.connect(str(path) if path else ":memory:", read_only=read_only)
    connection.execute(f"SET threads = {int(threads)}")
    connection.execute("SET memory_limit = ?", [memory_limit])
    connection.execute("SET temp_directory = ?", [str(temp_dir)])
    return connection
'''
if engine_source.count(old_open_duckdb) == 1 and new_open_duckdb not in engine_source:
    engine_source = engine_source.replace(old_open_duckdb, new_open_duckdb)
elif old_open_duckdb not in engine_source and engine_source.count(new_open_duckdb) == 1:
    pass
else:
    parser.error("pinned engine open_duckdb implementation did not match the expected source")
engine_script.write_text(engine_source)

spec = importlib.util.spec_from_file_location("engine_matrix", engine_workspace / "run_matrix.py")
engine = importlib.util.module_from_spec(spec)
spec.loader.exec_module(engine)
engine.assert_versions()
cases = (("30d-stable", 30), ("90d-stable", 90), ("1y-stable", 365))
if args.fixture_source:
    fixtures = args.fixture_source
    source_manifest = json.loads((fixtures / "matrix.json").read_text())
    binary_sha256 = hashlib.sha256(args.binary.read_bytes()).hexdigest()
    if source_manifest.get("source_commit") != SOURCE_COMMIT:
        parser.error("fixture source commit does not match the pinned generator")
    if source_manifest.get("binary_sha256") != binary_sha256:
        parser.error("fixture source generator hash does not match --binary")
    prior_cases = {case["name"]: case["generation"] for case in source_manifest["cases"]}
    for name, days in cases:
        generation = prior_cases.get(name)
        if not generation or generation.get("state") != "completed" or generation.get("exit_code") != 0:
            parser.error(f"fixture generation did not pass for {name}")
        report = json.loads((fixtures / name / "report.json").read_text())
        sqlite_path = fixtures / name / "relational.sqlite3"
        if digest(sqlite_path) != FIXTURE_SHA256[name]:
            parser.error(f"fixture source hash does not match the pinned data for {name}")
        if report["workload"]["represented_minutes"] != days * 1440:
            parser.error(f"fixture duration does not match {days} days for {name}")
        if report["workload"]["sampling_mode"] != "continuous":
            parser.error(f"fixture is not continuous for {name}")
        if report["sqlite"]["version"] != "3.46.0":
            parser.error(f"fixture SQLite version does not match for {name}")
    print(f"Reusing verified fixtures from {source_manifest['started_at_utc']}", flush=True)
else:
    fixtures = args.output / "fixtures"
    fixtures.mkdir()
    logs = args.output / "generation-logs"
    logs.mkdir()
    source_manifest = {
        "source_commit": SOURCE_COMMIT,
        "binary_sha256": hashlib.sha256(args.binary.read_bytes()).hexdigest(),
        "started_at_utc": engine.utc_now(),
        "cases": [],
    }
    for name, days in cases:
        print(f"Generating {name}", flush=True)
        command = [
            str(args.binary),
            "--output",
            str(fixtures / name),
            "--days",
            str(days),
            "--query-experiment",
            "--process-workload",
            "stable",
            "--process-lifetime-minutes",
            "30",
            "--repetitions",
            "7",
            "--group-cap",
            "1000000",
        ]
        phase = engine.run_phase(command, logs / f"{name}.stdout", logs / f"{name}.stderr")
        engine.attach_artifact(phase, fixtures / name / "report.json")
        source_manifest["cases"].append({"name": name, "generation": phase})
        (fixtures / "matrix.json").write_text(json.dumps(source_manifest, indent=2) + "\n")
        if not engine.phase_passed(phase):
            raise SystemExit(f"Generation failed for {name}; inspect {logs}")
        report = phase["artifact"]
        assert report["workload"]["represented_minutes"] == days * 1440
        assert report["workload"]["sampling_mode"] == "continuous"
        assert report["sqlite"]["version"] == "3.46.0"
        assert all(value for value in report["correctness"].values() if isinstance(value, bool))
        print(f"Generated {name}; verification passed", flush=True)

manifest = {
    "format": "hardviz-release-storage-rerun-v1",
    "scope": "synthetic Process Stats and Ambient stable fixtures only",
    "source_commit": source_manifest["source_commit"],
    "engine_commit": ENGINE_COMMIT,
    "duckdb_tuning_commit": TUNING_COMMIT,
    "source_checkout": "git archive; embedded git_commit may be unavailable",
    "binary_sha256": source_manifest["binary_sha256"],
    "runner_sha256": hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),
    "started_at_utc": engine.utc_now(),
    "method": "Verified stable fixtures, then serial engine comparison; seven query repetitions; new native fixture uses the production 64 KiB default block size.",
    "source_fixture_started_at_utc": source_manifest["started_at_utc"],
}

# Change only the case list; preparation, full-row validation and measurements
# retain the pinned harness, plus the production block-size config above.
engine.CASES = tuple(name for name, _ in cases)
result = engine.main([
    "--source-root", str(fixtures), "--output", str(args.output / "engines"),
    "--repetitions", "7", "--threads", "2", "--memory-limit", "128MB",
])
if result != 0:
    raise SystemExit(result)

matrix_path = args.output / "engines" / "matrix.json"
matrix = json.loads(matrix_path.read_text())
assert matrix["completed"] and matrix["all_passed"] and matrix["failure_count"] == 0

measured_at = datetime.now().astimezone().date().isoformat()
report = {
    "format": "hardviz-public-history-storage-v1",
    "scope": "Historical engine experiment; synthetic Process Stats and Ambient stable fixtures. Not the final application's complete database.",
    "measured_at": measured_at,
    "started_at_utc": manifest["started_at_utc"],
    "completed_at_utc": matrix["completed_at_utc"],
    "provenance": {
        "generator_commit": SOURCE_COMMIT,
        "engine_commit": ENGINE_COMMIT,
        "duckdb_tuning_commit": TUNING_COMMIT,
        "binary_sha256": manifest["binary_sha256"],
        "runner_sha256": hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),
        "engine_script_sha256": digest(engine_script),
        "engine_matrix_script_sha256": digest(engine_workspace / "run_matrix.py"),
        "source_fixture_generated_at_utc": source_manifest["started_at_utc"],
        "source_fixtures_reused": bool(args.fixture_source),
        "engine_method_url": f"https://github.com/shm11C3/HardwareVisualizer/blob/{ENGINE_COMMIT}/docs/development/hardware-archive-g1-engine-comparison.md",
        "duckdb_tuning_url": f"https://github.com/shm11C3/HardwareVisualizer/blob/{TUNING_COMMIT}/core/src/infrastructure/database/mod.rs",
    },
    "environment": {
        "cpu": matrix["environment"]["cpu"],
        "physical_memory_bytes": matrix["environment"]["physical_memory_bytes"],
        "macos": matrix["environment"]["os"]["mac_ver"][0],
        "python": matrix["environment"]["python"],
        "sqlite": matrix["environment"]["pysqlite3_sqlite_version"],
        "duckdb": matrix["environment"]["duckdb_version"],
    },
    "method": {
        "fixture_build": {
            "sampling_mode": "continuous",
            "process_workload": "stable",
            "process_lifetime_minutes": 30,
            "generator_repetitions": 7,
            "group_cap": 1000000,
            "query_experiment": True,
        },
        "continuous_history": True,
        "process_observations_per_minute": 15,
        "seed": 2052,
        "workload": "stable",
        "duckdb_threads": matrix["config"]["threads"],
        "duckdb_memory_limit": f"{matrix['config']['memory_limit']}; engine-managed limit, not process RSS cap",
        "duckdb_default_block_size_bytes": NATIVE_DEFAULT_BLOCK_SIZE_BYTES,
        "query_repetitions": matrix["config"]["repetitions"],
        "size_measurement": "Logical file lengths after close/checkpoint, SQLite including indexes; DuckDB including metadata and WAL.",
        "duckdb_fixture_indexes": "No explicit secondary indexes or primary-key constraints.",
        "round_trip": "Every row after reopen; integer/text/null exact, real bitwise.",
        "matrix_all_passed": matrix["all_passed"],
        "query_caches": "Primed and uncontrolled; query times are not used as a product performance claim.",
    },
    "cases": {},
}
for name, days in cases:
    period = {30: "30d", 90: "90d", 365: "1y"}[days]
    case = matrix["cases"][name]
    prepared = case["prepare"]["artifact"]
    assert case["all_passed"] and prepared["round_trip"]["all_passed"]
    sqlite_bytes = prepared["source"]["size_bytes"]
    duckdb_bytes = prepared["storage"]["duckdb"]["total_bytes"]
    sqlite_path = fixtures / name / "relational.sqlite3"
    assert digest(sqlite_path) == prepared["source"]["sha256"] == FIXTURE_SHA256[name]
    report["cases"][period] = {
        "days": days,
        "sqlite_bytes": sqlite_bytes,
        "duckdb_bytes": duckdb_bytes,
        "sqlite_mib": sqlite_bytes / 1048576,
        "duckdb_mib": duckdb_bytes / 1048576,
        "reduction_percent": (1 - duckdb_bytes / sqlite_bytes) * 100,
        "process_rows": prepared["source"]["process_rows"],
        "ambient_rows": prepared["source"]["ambient_rows"],
        "source_sha256": prepared["source"]["sha256"],
        "source_unchanged_after_all_queries": True,
        "native_sha256": digest(args.output / "engines" / "cases" / name / "archive.duckdb"),
        "round_trip": prepared["round_trip"],
        "started_at_utc": case["prepare"]["started_at_utc"],
        "completed_at_utc": case["prepare"]["completed_at_utc"],
    }

artifact = args.output / f"history-storage-{measured_at}.json"
artifact.write_text(json.dumps(report, indent=2) + "\n")
for period, case in report["cases"].items():
    print(f"{period}: {case['sqlite_mib']:.1f}MiB -> {case['duckdb_mib']:.1f}MiB ({case['reduction_percent']:.2f}%)")
print(f"Public result: {artifact}")
