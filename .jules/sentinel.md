## 2026-06-01 - Prevent Command Injection in CLI Credentials Mac Security Helper

**Vulnerability:** The code in `src/agents/cli-credentials.ts` used `execSync` with a raw interpolated command string to read the `security` keychain (e.g. ``execSyncImpl(`security find-generic-password ... -a "${account}" -w`)``).

**Learning:** This repo contains credential parsers that touch local state. When wrapping shell commands (like macOS `security`), relying on `execSync` with string interpolation can be vulnerable to command injection if elements like the account name or service label become untrusted inputs (for instance via maliciously crafted cached identities or inputs).

**Prevention:** Always use `execFileSync` (or `execFile`/`spawn`) with an explicit argument array, which passes arguments directly to the executable without invoking a subshell.
