# History storage comparison, 2026-09-23

This rerun adds the missing 90-day measurement and regenerates all three
synthetic fixtures. It measures Process Stats and Ambient history using the
historical engine experiment, **not the final application's complete database**.
No user history or hardware readings are used.

| History | SQLite | Native DuckDB | Reduction |
| --- | ---: | ---: | ---: |
| 30 days | 72.0MiB | 17.0MiB | 76.38% |
| 90 days | 216.3MiB | 50.8MiB | 76.53% |
| 365 days | 883.3MiB | 202.3MiB | 77.10% |

All three full-row comparisons and all nine engine query phases completed
successfully. Capacity values above are rounded; exact bytes, digests and
environment details are retained in
[`history-storage-2026-09-23.json`](../../public/benchmarks/history-storage-2026-09-23.json).
The 365-day native file differs from the earlier run; the table uses this run's
observed file size throughout, rather than mixing measurements from both runs.

## Reproduction

Use a new working directory and the Python runtime described in the upstream
[engine comparison](https://github.com/shm11C3/HardwareVisualizer/blob/75db64c972b39d94205800cafb6ccb15d6d6029a/docs/development/hardware-archive-g1-engine-comparison.md).
It pins DuckDB 1.5.5 and pysqlite3 0.5.4 linked to SQLite 3.46.0.

1. Extract the product repository at
   `7fae38b38116d82d771d6fc3705f67f618218732` with `git archive` into `source/`.
2. Extract `engine_benchmark.py` and `run_matrix.py` from
   `core/examples/archive_engine_benchmark/` at
   `75db64c972b39d94205800cafb6ccb15d6d6029a` into `engine/`.
3. Build the unmodified fixture generator from `source/`:

   ```sh
   cargo build --locked --offline --release -p hardviz-core \
     --example archive_format_benchmark --target-dir ../target
   ```

4. From `source/`, run the website's
   [`rerun-history-storage.py`](rerun-history-storage.py) with the pinned Python
   runtime (replace the example paths):

   ```sh
   PYTHONDONTWRITEBYTECODE=1 /path/to/venv/bin/python \
     /path/to/hardviz-webpage/docs/benchmarks/rerun-history-storage.py \
     --source "$PWD" \
     --binary ../target/release/examples/archive_format_benchmark \
     --engine ../engine --output ../results
   ```

The output directory must not already exist. The driver generates continuous
30-, 90-, and 365-day stable fixtures with seed 2052, 15 process observations per
minute, and seven query repetitions. It then runs the unchanged engine harness
with only its case list overridden. Engine preparation and queries execute
serially with two DuckDB threads and a 128 MB engine-managed memory limit.
The original harness also prepares and checks its Parquet control; the website
compares only SQLite and native DuckDB.

## Verification and scope

- Each source fixture must pass the generator's persisted-record and query
  correctness checks.
- After preparing and reopening the native database, every row is compared
  against SQLite. Integers, text and nulls must match exactly; real values must
  match bitwise. Each family's digests and row counts are retained.
- The SQLite source hash is checked before and after preparation. Sizes are
  logical file lengths after closing/checkpointing. SQLite includes its indexes;
  native DuckDB includes metadata and WAL, but the experimental fixture has no
  explicit primary-key or secondary-index constraints.
- These are immutable synthetic fixtures. Whole-application storage, production
  migration copies, retention overhead and cross-platform results are outside
  this measurement. Passing this experiment does not qualify a production
  database format or migration.
- The fixture generator retains an older SQLite chunk-summary experiment. Its
  known failed numerical-summary gate does not affect the relational source
  fixtures; no chunk-summary result is presented as a DuckDB result.
- Query caches are primed and uncontrolled; the website publishes capacity,
  not a claim about application query or UI latency.

The source was extracted without `.git`, so embedded generator Git discovery is
unavailable. The driver records the pinned source commits and binary hash
separately. Full generation logs and the engine matrix remain in the local
results directory. The public JSON records measurement times, versions, source
hashes, counts, storage bytes and full-row comparison results without local
machine paths.
