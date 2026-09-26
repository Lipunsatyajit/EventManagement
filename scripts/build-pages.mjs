import { spawnSync } from "node:child_process";
import { writeFileSync } from "node:fs";

const result = spawnSync(process.execPath, ["node_modules/next/dist/bin/next", "build"], {
  stdio: "inherit",
  env: { ...process.env, GITHUB_PAGES: "true" },
});
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);
await import("./normalize-static-export.mjs");
writeFileSync("out/.nojekyll", "");
