const fs = require("fs");

let content = fs.readFileSync(".github/workflows/real-behavior-proof.yml", "utf8");
content = content.replace(
  "        continue-on-error: true\n        if: steps.app-token.outcome == 'failure'",
  "        if: steps.app-token.outcome == 'failure'\n        continue-on-error: true",
);
fs.writeFileSync(".github/workflows/real-behavior-proof.yml", content);
