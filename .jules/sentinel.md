## 2025-03-09 - Prevent Shell Injection in Keychain Lookups
**Vulnerability:** `execSync` was used with string interpolation for `security find-generic-password` commands, making it susceptible to shell command injection if the input contained shell metacharacters (e.g., $() or backticks).
**Learning:** Shell evaluation occurs when using `execSync` with strings.
**Prevention:** Always use `execFileSync` (or `spawn`/`execFile`) with a proper arguments array instead of interpolating untrusted variables into string-based shell commands.
