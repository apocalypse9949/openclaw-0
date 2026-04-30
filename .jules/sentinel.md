## 2024-04-30 - Prevent Command Injection with macOS 'security' utility
**Vulnerability:** Operations involving the macOS 'security' utility for credential management in 'src/agents/cli-credentials.ts' used `execSync` with a string parameter, creating a potential command injection vulnerability if user-controlled tokens or arguments were interpreted by the shell.
**Learning:** Shell evaluation (e.g., `$()`) can still occur within double quotes or backticks when using `execSync` or `exec` with string commands, even if variables are sanitized or appear safe (like hashes).
**Prevention:** Always use `execFileSync` (or `execFile`/`spawn`) with an array of arguments for system commands, especially sensitive ones like `security`.
