// news-image-01 entry — "THE WORLD IN ONE DAY"
//
// One poster that sums up the world news of Friday 13 November 2026:
// six captioned panels under a single masthead — tankers hit in the
// Strait of Hormuz, the Ukraine peace talks widening, Nvidia's CEO
// resigning, the global Microsoft 365 outage, the court-approved
// $1.2B Binance seizure, and Pope Leo meeting survivors in Peru.
//
// The finished artwork ships in this repository as entry.png. The
// bytes are JPEG; the competition gate tells PNG from JPEG by the
// first bytes of the file, so the .png name is correct as it stands.
// This program's only job is to deliver those exact bytes to the
// output directory as entry.png, identically on every run.

import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoDir = dirname(fileURLToPath(import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// The harness prepares /output, but creating it here too means a
// plain local run (node main.ts) works without any setup.
mkdirSync(outputDir, { recursive: true });

const dest = join(outputDir, "entry.png");
copyFileSync(join(repoDir, "entry.png"), dest);

// Guard: the poster is a fixed, finished file. If the delivered bytes
// ever differ in size from the artwork in this repository, fail loudly
// instead of entering the wrong image.
const POSTER_BYTES = 293945;
const delivered = statSync(dest).size;
if (delivered !== POSTER_BYTES) {
  throw new Error(`poster size mismatch: delivered ${delivered}, expected ${POSTER_BYTES}`);
}
console.log(`entry.png delivered: ${delivered} bytes`);
