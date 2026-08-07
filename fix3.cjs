const fs = require("fs");

let content = fs.readFileSync(".github/workflows/real-behavior-proof.yml", "utf8");
content = content.replace(
  "        continue-on-error: true\n        if: steps.app-token.outcome == 'failure'\n        continue-on-error: true",
  "        continue-on-error: true\n        if: steps.app-token.outcome == 'failure'",
);
content = content.replace(
  "GH_APP_TOKEN: ${{ steps.app-token.outputs.token || steps.app-token-fallback.outputs.token }}",
  "GH_APP_TOKEN: ${{ steps.app-token.outputs.token || steps.app-token-fallback.outputs.token || secrets.GITHUB_TOKEN }}",
);
fs.writeFileSync(".github/workflows/real-behavior-proof.yml", content);
