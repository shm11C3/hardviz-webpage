#!/usr/bin/env python3
"""Repeat the historical storage experiment with 30-, 90-, and 365-day fixtures.

This measures synthetic engine fixtures, not the released application's DB.
The generator and engine scripts are unmodified pinned upstream sources.
"""

import argparse
import hashlib
import importlib.util
import json
from pathlib import Path
import sys


parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("--source", type=Path, required=True)
parser.add_argument("--binary", type=Path, required=True)
parser.add_argument("--engine", type=Path, required=True)
parser.add_argument("--output", type=Path, required=True)
args = parser.parse_args()
for name in ("source", "binary", "engine", "output"):
    setattr(args, name, getattr(args, name).resolve())
if args.output.exists():
    parser.error("--output must be a new directory")

spec = importlib.util.spec_from_file_location("engine_matrix", args.engine / "run_matrix.py")
engine = importlib.util.module_from_spec(spec)
spec.loader.exec_module(engine)
engine.assert_versions()
cases = (("30d-stable", 30), ("90d-stable", 90), ("1y-stable", 365))
args.output.mkdir(parents=True)
fixtures = args.output / "fixtures"
fixtures.mkdir()
logs = args.output / "generation-logs"
logs.mkdir()
manifest = {
    "format": "hardviz-release-storage-rerun-v1",
    "scope": "synthetic Process Stats and Ambient stable fixtures only",
    "source_commit": "7fae38b38116d82d771d6fc3705f67f618218732",
    "engine_commit": "75db64c972b39d94205800cafb6ccb15d6d6029a",
    "source_checkout": "git archive; embedded git_commit may be unavailable",
    "binary_sha256": hashlib.sha256(args.binary.read_bytes()).hexdigest(),
    "runner_sha256": hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),
    "started_at_utc": engine.utc_now(),
    "method": "Fresh fixtures, serial generation, then serial engine comparison; seven query repetitions.",
    "cases": [],
}
for name, days in cases:
    print(f"Generating {name}", flush=True)
    command = [str(args.binary), "--output", str(fixtures / name), "--days", str(days),
               "--query-experiment", "--process-workload", "stable",
               "--process-lifetime-minutes", "30", "--repetitions", "7",
               "--group-cap", "1000000"]
    phase = engine.run_phase(command, logs / f"{name}.stdout", logs / f"{name}.stderr")
    engine.attach_artifact(phase, fixtures / name / "report.json")
    manifest["cases"].append({"name": name, "generation": phase})
    (fixtures / "matrix.json").write_text(json.dumps(manifest, indent=2) + "\n")
    if not engine.phase_passed(phase):
        raise SystemExit(f"Generation failed for {name}; inspect {logs}")
    report = phase["artifact"]
    assert report["workload"]["represented_minutes"] == days * 1440
    assert report["workload"]["sampling_mode"] == "continuous"
    assert report["sqlite"]["version"] == "3.46.0"
    assert all(value for value in report["correctness"].values() if isinstance(value, bool))
    print(f"Generated {name}; verification passed", flush=True)

# Change only the case list; preparation, full-row validation and measurements
# remain the original engine harness. Keep its additional Parquet control.
engine.CASES = tuple(name for name, _ in cases)
sys.exit(engine.main([
    "--source-root", str(fixtures), "--output", str(args.output / "engines"),
    "--repetitions", "7", "--threads", "2", "--memory-limit", "128MB",
]))
