## 2024-05-18 - Parameterizing SQLite PRAGMA Statements
**Vulnerability:** SQL Injection in SQLite PRAGMA queries due to string interpolation (`PRAGMA table_info(${table})`). Standard `PRAGMA` statements do not support parameter binding.
**Learning:** SQLite provides table-valued functions for PRAGMAs (e.g., `pragma_table_info(?)`, `pragma_index_list(?)`) which natively support parameterization and return the exact same data structure. Using these eliminates the need for manual, error-prone quoting and string interpolation.
**Prevention:** Always use table-valued PRAGMA functions (`SELECT * FROM pragma_table_info(?)`) instead of string interpolation for schema metadata lookups in SQLite when identifiers come from dynamic sources.
