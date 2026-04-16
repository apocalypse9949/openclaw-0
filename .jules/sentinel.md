## 2025-02-28 - [CRITICAL] Prevent Command Injection in MSTeams setup
**Vulnerability:** Use of `exec` with string interpolation for URLs in `extensions/msteams/src/setup-surface.ts` (`exec(\`${cmd} ${JSON.stringify(url)}\`)`)
**Learning:** Even if URLs are sanitized and `JSON.stringify` adds double quotes, `exec` uses a shell which evaluates command substitutions inside double quotes (e.g. `http://example.com/$(malicious)`), causing command injection.
**Prevention:** Always use `execFile` or `spawn` without `shell: true` and pass user input as an array of arguments, not as part of a constructed command string.
