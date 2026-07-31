## 2025-02-14 - Fix command injection vulnerability in macOS security utility invocation

**Vulnerability:** The codebase was using `execSync` with a string interpolated command (`security find-generic-password ...`) to interact with the macOS keychain in `src/agents/cli-credentials.ts`. This poses a command injection risk if the interpolated arguments are attacker-controlled.
**Learning:** Using `execSync` and `exec` with a string command relies on shell parsing, which allows command injection even if arguments are ostensibly simple strings. A safer approach for executing system commands with user-provided arguments is using variants that accept an array of arguments, thereby skipping the shell interpreter.
**Prevention:** Always use `execFileSync`, `execFile`, or `spawn` instead of `execSync` or `exec` when invoking system binaries. Pass arguments as an array instead of a single formatted string, which bypasses shell evaluation entirely and prevents command injection.
