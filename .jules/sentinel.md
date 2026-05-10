## 2024-05-24 - Command Injection in Keychain Queries via child_process.execSync
**Vulnerability:** Constructing `security find-generic-password` shell commands dynamically using `execSync` with template literals (e.g., ``execSync(`security ... -a "${account}"`)``) exposes the system to command injection. If `account` or similar parameters contain malicious characters like `$()` or backticks, the shell evaluates them.
**Learning:** `execSync` executes the given command within a shell. While it works for hardcoded strings, any user-controlled input can trigger arbitrary command execution.
**Prevention:** Always use `execFileSync` (or `execFile` / `spawn`) and pass parameters as an array rather than interpolating them into a single command string.
