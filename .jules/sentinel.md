## 2024-05-20 - [Fix SQL Injection in PRAGMA table_info]
**Vulnerability:** String interpolation used in `PRAGMA table_info(${table})`, which allows SQL injection since `PRAGMA` statements do not support direct parameter binding.
**Learning:** SQLite's `PRAGMA` statements cannot be parameterized directly. However, they are also available as table-valued functions (e.g., `pragma_table_info`), which DO support parameterization.
**Prevention:** Use `SELECT * FROM pragma_table_info(?)` with parameter binding instead of string interpolation for any dynamic `PRAGMA` queries.
