## 2026-06-05 - Command Injection in Keychain Reading

**Vulnerability:** Command Injection in `execSync` inside macOS keychain fetching.
**Learning:** Hardcoded commands using template literals combined with unsanitized arguments passed to `execSync` expose the system to arbitrary RCE.
**Prevention:** Always use `execFileSync`, `execFile`, or `spawn` combined with arguments specified as an array to correctly sanitize shell inputs and prevent malicious evaluations.
