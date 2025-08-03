import { copyFileSync, mkdirSync } from 'fs';

// Copy the manifest into both the dist folder used for releases and the
// docs folder served by GitHub Pages. Foundry expects the manifest at the
// GitHub Pages root, so keep it in sync in both locations.
for (const target of ["dist", "docs"]) {
  mkdirSync(target, { recursive: true });
  copyFileSync("module.json", `${target}/module.json`);
}
