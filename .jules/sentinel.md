## 2025-02-23 - [Fix Command Injection in CLI Credentials]
**Vulnerability:** Command injection in `src/agents/cli-credentials.ts` where `execSync` is used with a shell-interpolated string for the macOS `security` utility command (`execSyncImpl("security find-generic-password -s \"Codex Auth\" -a \"${account}\" -w")`).
**Learning:** Shell strings can be exploited if they contain user input. Although `account` might not be directly controlled by a malicious user in this specific case, defense-in-depth requires avoiding shell expansion for all parameters.
**Prevention:** Always use `execFileSync` (or `execFile`/`spawn`) with an array of arguments, instead of string interpolation with `execSync` (or `exec`), for shell command executions.
