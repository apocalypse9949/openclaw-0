## 2025-02-12 - Prevent Command Injection in cli-credentials
**Vulnerability:** Command Injection in `src/agents/cli-credentials.ts` where macOS keychain operations used `execSync` with string interpolation.
**Learning:** `execSync` with string interpolation is inherently vulnerable to command injection, especially if dynamic arguments are introduced later on.
**Prevention:** Use `execFileSync` along with passing an array of arguments to directly execute the binary instead of running through a shell.
