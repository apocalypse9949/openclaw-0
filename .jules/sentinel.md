## 2025-02-23 - [Prevent Command Injection in CLI Credentials]
**Vulnerability:** Command injection risk via unsanitized strings passed to `execSync` for the macOS `security` utility in `cli-credentials.ts`.
**Learning:** Even when inputs are hashed or seemingly safe (like `codexHome`), using `execSync` with interpolated strings is a poor practice when array-based `execFileSync` is available and prevents shell evaluation of inputs.
**Prevention:** Always use `execFileSync`, `execFile`, or `spawn` with an array of arguments rather than shell string interpolation for any `child_process` execution involving user inputs or environment variables.
