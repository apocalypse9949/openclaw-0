## 2026-03-24 - [Command Injection]
**Vulnerability:** The macOS `security` CLI command was executed using `execSync` with template string concatenation to pass `codexHome`. This exposed a command injection vulnerability because `codexHome` could potentially contain shell metacharacters like `$()` which would be evaluated by the shell.
**Learning:** `execSync` executes the command via a shell. Passing user input, even indirectly via variables or template literals, to `execSync` is a high risk.
**Prevention:** Always use `execFileSync` (or `execFile` or `spawn`) with an array of arguments for CLI commands that take user input. `execFileSync` runs the executable directly and passes arguments without shell evaluation.
