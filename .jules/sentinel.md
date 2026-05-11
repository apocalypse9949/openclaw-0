## 2026-05-10 - [Replaced execSync with execFileSync for security commands]
**Vulnerability:** Shell Command Injection via `execSync`. The previous implementation passed untrusted and potentially malicious strings to `execSync` which uses a shell under the hood to execute a concatenated command.
**Learning:** Shell evaluation, even within double quotes or using JSON strings, can still process variables or subshells (e.g. `$()` or `` ` ` `).
**Prevention:** For calling executables, prefer `execFile` or `execFileSync` which bypass shell execution entirely, preventing unintended evaluation of arguments by treating them strictly as array elements.
