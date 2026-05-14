## 2024-05-24 - Command Injection in setup via exec
**Vulnerability:** Use of `exec` with string interpolation for opening URLs (`exec(\`${cmd} ${JSON.stringify(url)}\`)`). While `JSON.stringify` provides some escaping, `exec` spawns a shell which may still evaluate certain patterns (like command substitution) within quotes depending on the environment or URL content.
**Learning:** Even when input seems sanitized or quoted, `exec` should be avoided for variable inputs because shell syntax can still interpret parts of strings. `node:child_process` execution rules dictate `execFile` should be favored.
**Prevention:** Always use `execFile` or `spawn` from `node:child_process` which passes arguments directly to the executable without invoking a shell.
