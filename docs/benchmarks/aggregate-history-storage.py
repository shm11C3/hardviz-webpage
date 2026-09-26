#!/usr/bin/env python3
"""Aggregate three successful history-storage measurements by DuckDB-size median."""

import argparse
import json
from pathlib import Path


parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("--reports", type=Path, nargs=3, required=True)
parser.add_argument("--output", type=Path, required=True)
args = parser.parse_args()
reports = [json.loads(path.read_text()) for path in args.reports]
expected_sources = {
    "30d": "c6e6248329a562e61688a7051380ed1f98de418ec6ac15995325ed96a032c525",
    "90d": "af4506025dd29520647934f31ce7a31b1a75d44e50310c0a8eeaab1063cedcdb",
    "1y": "97803757685d304bb5c6ddae5765d2195f44696004e4558c6992a73067132e2f",
}
if args.output.exists():
    parser.error("--output must be a new file")

for report in reports:
    if report.get("format") != "hardviz-public-history-storage-v1":
        parser.error("all input reports must be public history-storage measurements")
    if not report["method"].get("matrix_all_passed"):
        parser.error("all engine matrices must pass")
if len({report["measured_at"] for report in reports}) != 1:
    parser.error("all measurements must have the same local measurement date")

compatibility_keys = (
    "generator_commit",
    "engine_commit",
    "duckdb_tuning_commit",
    "binary_sha256",
    "engine_script_sha256",
    "engine_matrix_script_sha256",
)
for key in compatibility_keys:
    if len({report["provenance"].get(key) for report in reports}) != 1:
        parser.error(f"measurements differ in {key}")
if len({json.dumps(report["environment"], sort_keys=True) for report in reports}) != 1:
    parser.error("measurements must use the same environment")

output = json.loads(json.dumps(reports[-1]))
output["started_at_utc"] = min(report["started_at_utc"] for report in reports)
output["completed_at_utc"] = max(report["completed_at_utc"] for report in reports)
output["provenance"]["measurement_replicates"] = len(reports)
output["provenance"]["runner_sha256_by_replicate"] = [
    report["provenance"]["runner_sha256"] for report in reports
]
output["method"]["duckdb_size_repetitions"] = len(reports)
output["method"]["duckdb_size_aggregation"] = (
    "Median across independent native DuckDB fixture builds; observed byte values are retained per case."
)
output["method"]["all_replication_matrices_passed"] = True

for period in ("30d", "90d", "1y"):
    samples = [report["cases"][period] for report in reports]
    if len({sample["source_sha256"] for sample in samples}) != 1:
        parser.error(f"{period} measurements use different SQLite sources")
    if samples[0]["source_sha256"] != expected_sources[period]:
        parser.error(f"{period} SQLite source hash does not match the pinned fixture")
    for key in ("sqlite_bytes", "source_sha256", "process_rows", "ambient_rows"):
        if len({sample[key] for sample in samples}) != 1:
            parser.error(f"{period} measurements differ in {key}")
    if not all(
        sample["round_trip"]["all_passed"]
        and sample["source_unchanged_after_all_queries"]
        for sample in samples
    ):
        parser.error(f"{period} has an incomplete round-trip or changed source")

    ordered = sorted(samples, key=lambda sample: sample["duckdb_bytes"])
    representative = ordered[len(ordered) // 2]
    case = output["cases"][period]
    case["duckdb_bytes"] = representative["duckdb_bytes"]
    case["duckdb_mib"] = representative["duckdb_mib"]
    case["reduction_percent"] = representative["reduction_percent"]
    case["native_sha256"] = representative["native_sha256"]
    case["round_trip"] = representative["round_trip"]
    case["started_at_utc"] = min(sample["started_at_utc"] for sample in samples)
    case["completed_at_utc"] = max(sample["completed_at_utc"] for sample in samples)

    sizes = [sample["duckdb_bytes"] for sample in samples]
    case["duckdb_size_range_bytes"] = [min(sizes), max(sizes)]
    case["duckdb_mib_range"] = [min(sizes) / 1048576, max(sizes) / 1048576]
    case["duckdb_replicates"] = [
        {
            "duckdb_bytes": sample["duckdb_bytes"],
            "native_sha256": sample["native_sha256"],
            "runner_sha256": report["provenance"]["runner_sha256"],
            "started_at_utc": sample["started_at_utc"],
            "completed_at_utc": sample["completed_at_utc"],
        }
        for report, sample in zip(reports, samples)
    ]

args.output.write_text(json.dumps(output, indent=2) + "\n")
for period, case in output["cases"].items():
    low, high = case["duckdb_mib_range"]
    print(
        f"{period}: median={case['duckdb_mib']:.1f}MiB "
        f"range={low:.1f}–{high:.1f}MiB"
    )
print(f"Aggregated result: {args.output}")
