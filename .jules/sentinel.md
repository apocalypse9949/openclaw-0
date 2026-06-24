## 2025-02-24 - SQL Injection Risk via PRAGMA table_info dynamic concatenation
**Vulnerability:** SQL Injection in dynamic table lookups in `PRAGMA table_info` and `PRAGMA index_list`. The codebase was using string interpolation (``PRAGMA table_info(${table})``) which is inherently unsafe against string input.
**Learning:** PRAGMA commands do not support direct query parameter binding (`?`), which can trick developers into using interpolation for dynamic input.
**Prevention:** Use parameterized table-valued functions (e.g. `SELECT * FROM pragma_table_info(?)`) to safely pass dynamic data instead of concatenating strings.
