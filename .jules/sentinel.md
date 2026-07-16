## 2025-02-11 - Command Injection in Keychain Access
**Vulnerability:** Found `execSync` used with interpolated string arguments for macOS `security find-generic-password` calls (`src/agents/cli-credentials.ts`), allowing potential command injection if the user-controlled account or service strings contained backticks or other shell expansions.
**Learning:** Shell-evaluated string interpolation in commands like `execSync` is inherently vulnerable to injection risks, even in unexpected places like keychain queries.
**Prevention:** Always use `execFileSync` or `spawn` with an array of arguments, bypassing shell evaluation entirely, to execute subprocesses safely.
