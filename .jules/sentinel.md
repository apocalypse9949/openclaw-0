## 2024-05-24 - [CRITICAL] Fix command injection in security utility
**Vulnerability:** Shell command injection via `execSync` execution in macOS `security` tool invocation within `src/agents/cli-credentials.ts` via string templates. If external factors or configuration files (`codexHome`, etc.) contained shell metacharacters, it could lead to arbitrary shell command execution.
**Learning:** Avoid using `exec` or `execSync` combined with user-provided/dynamic input.
**Prevention:** Use `execFile` or `execFileSync` to pass arguments as an array instead of a single string shell command, which prevents the shell from interpreting parameters.
