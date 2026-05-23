## 2025-02-21 - [Fix command injection vulnerability in cli-credentials]

**Vulnerability:** Usage of `execSync` allowing command injection during keychain interaction because shell metacharacters in input were evaluated instead of being passed as simple strings.
**Learning:** Shell evaluation inside `execSync` is inherently dangerous, even if input looks innocuous. Using `execFileSync` to skip the shell and directly execute with an array of arguments completely eliminates this risk without breaking required OS utility behavior.
**Prevention:** Avoid `execSync` and `exec` when taking dynamic inputs or untrusted inputs; always default to `execFileSync` or `spawnSync` providing arguments as an array instead of string.
