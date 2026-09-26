import { copyFileSync, existsSync, readdirSync } from "node:fs";
import { join, relative, resolve, sep } from "node:path";

// Next 16.3.6 uses native separators when collecting exported RSC segments, but
// its browser protocol expects flat, dot-separated names. Windows needs aliases.
function normalizeSegments(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const child = join(directory, entry.name);
    if (entry.name.startsWith("__next.")) copyAliases(child, directory);
    else normalizeSegments(child);
  }
}

function copyAliases(directory, pageDirectory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const source = join(directory, entry.name);
    if (entry.isDirectory()) copyAliases(source, pageDirectory);
    else if (entry.name.endsWith(".txt")) {
      const target = join(pageDirectory, relative(pageDirectory, source).split(sep).join("."));
      if (!existsSync(target)) copyFileSync(source, target);
    }
  }
}

if (process.platform === "win32") normalizeSegments(resolve("out"));
