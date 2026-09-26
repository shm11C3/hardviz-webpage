# History storage comparison, 2026-09-27

This rerun measures synthetic Process Stats and Ambient history using the
historical engine experiment, **not the final application's complete database**.
No user history or hardware readings are used.

| History | SQLite | Native DuckDB median | DuckDB range | Reduction |
| --- | ---: | ---: | ---: | ---: |
| 30 days | 72.0MiB | 16.9MiB | 16.9–17.1MiB | 76.47% |
| 90 days | 216.3MiB | 50.1MiB | 50.1–50.2MiB | 76.82% |
| 365 days | 883.3MiB | 202.7MiB | 202.5–202.8MiB | 77.05% |

The 30-, 90- and 365-day SQLite fixtures were reused from the 2026-09-23 run.
The generator binary, workload parameters, SQLite version and per-file SHA-256
digests were verified against that run. Each native DuckDB fixture was created
again with `default_block_size=65536` (64 KiB), matching the application setting
for new archives introduced in the upstream
[DuckDB tuning change](https://github.com/shm11C3/HardwareVisualizer/commit/69a41e63f4002ce4254bb594d524f7896004e8ca).
This kept the SQLite input constant while measuring the updated DuckDB layout.

Three independent native DuckDB builds were measured for each period. The table
uses the median file size; the range shows all three rounded observations.
SQLite size and source hash were identical in all runs. All nine case-level
round-trip checks and all 36 engine phases passed. Capacity values above are
rounded; exact bytes, digests and environment details are retained in
[`history-storage-2026-09-27.json`](../../public/benchmarks/history-storage-2026-09-27.json).
The new 365-day DuckDB builds measured 0.3–0.5MiB larger than the earlier
202.3MiB single-run result. The page uses the new three-run median and does not
combine old and new measurements.

## Reproduction

Use the pinned Python environment described in the upstream
[engine comparison](https://github.com/shm11C3/HardwareVisualizer/blob/75db64c972b39d94205800cafb6ccb15d6d6029a/docs/development/hardware-archive-g1-engine-comparison.md).
It pins DuckDB 1.5.5 and pysqlite3 0.5.4 linked to SQLite 3.46.0.

The driver accepts the immutable fixture directory with `--fixture-source` to
avoid generating the same SQLite fixtures again. It verifies the generator
binary hash, duration, sampling mode, SQLite version and pinned source hashes
before using them. It then patches only the copied benchmark harness so newly
created `archive.duckdb` files use the 64 KiB setting, and runs the pinned
matrix.

Example using the completed fixture set:

```sh
PYTHONDONTWRITEBYTECODE=1 /path/to/venv/bin/python \
  /path/to/hardviz-webpage/docs/benchmarks/rerun-history-storage.py \
  --source /path/to/product-source \
  --binary /path/to/archive_format_benchmark \
  --engine /path/to/copied-engine \
  --fixture-source /path/to/previous-results/fixtures \
  --output /path/to/new-results
```

Run the measurement command three times with separate `--engine` and `--output`
directories. Each output directory must not already exist. Then aggregate the
three public JSON reports:

```sh
python /path/to/hardviz-webpage/docs/benchmarks/aggregate-history-storage.py \
  --reports /path/to/run-1/history-storage-2026-09-27.json \
            /path/to/run-2/history-storage-2026-09-27.json \
            /path/to/run-3/history-storage-2026-09-27.json \
  --output /path/to/history-storage-2026-09-27.json
```

The aggregator requires matching measurement and fixture-build settings,
engine versions, environment, SQLite sizes, and source hashes. It rejects
failed row comparisons and keeps the median DuckDB size plus all three exact
sizes and file hashes. Each engine matrix uses
two DuckDB threads, a 128 MB engine-managed memory limit, and seven query
repetitions. The harness also prepares and checks its Parquet control; the
website compares only SQLite and native DuckDB.

## Verification and scope

- After preparing and reopening each native database, every row is compared
  against SQLite. Integers, text and nulls must match exactly; real values must
  match bitwise. Each family's digests and row counts are retained.
- The SQLite source hash is checked before and after preparation. Sizes are
  logical file lengths after closing/checkpointing. SQLite includes its
  indexes; native DuckDB includes metadata and WAL, but the experimental fixture
  has no explicit primary-key or secondary-index constraints.
- These are immutable synthetic fixtures. Whole-application storage,
  production migration copies, retention overhead and cross-platform results
  are outside this measurement. Passing this experiment does not qualify a
  production database format or migration.
- Query caches are primed and uncontrolled; the website publishes capacity,
  not a claim about application query or UI latency.

The source was extracted without `.git`, so embedded generator Git discovery is
unavailable. The driver records the pinned source commits and binary hash
separately. The public JSON records measurement times, versions, source hashes,
counts, storage bytes and full-row comparison results without local machine
paths.
