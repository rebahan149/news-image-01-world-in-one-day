// news-image-01 entry, round 2 — "ONE DAY, ONE PAGE"
//
// A broadsheet front page that squeezes the whole of Friday
// 13 November 2026 onto a single poster. Under the masthead
// "ONE DAY, ONE PAGE" — flanked by the red kicker "ALL OF
// FRIDAY · EVERY STORY REPORTED ON THE DAY" and a tally of
// "24 STORIES · 5 CONTINENTS" — six feature stories carry
// numbered red badges: (1) Iran says it struck a US radar in
// Bahrain, the claim labelled unverified, while a tanker hits
// a mine near Hormuz; (2) Europe joins the next Ukraine peace
// talks, with the war's biggest prisoner swap in the works;
// (3) Nvidia's CEO Jensen Huang resigns — and is summoned by
// the Senate; (4) the Microsoft outage rolls into day two;
// (5) a court clears the $1.2B Binance seizure; and (6) Pope
// Leo's homecoming Mass in Peru. Below them, a section headed
// "AND THE REST OF FRIDAY" runs eighteen more numbered
// micro-stories — markets, climate, sport, science and more —
// and a footer credits the day's sources: Reuters, AP, AFP,
// Al Jazeera, BLS, UN News, the Vatican Press Office, ECDC,
// the DOJ and NASA.
//
// The finished artwork ships in this repository as entry.png.
// The bytes are JPEG; the competition gate tells PNG from JPEG
// by the first bytes of the file, so the .png name is correct
// as it stands. This program's only job is to deliver those
// exact bytes to the output directory as entry.png, identically
// on every run.

import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// The harness prepares /output, but creating it here too means a
// plain local run (node main.ts) works without any setup.
mkdirSync(outDir, { recursive: true });

const target = join(outDir, "entry.png");
copyFileSync(join(here, "entry.png"), target);

// Guard: the poster is a fixed, finished file. If the delivered
// bytes ever differ in size from the artwork in this repository,
// fail loudly instead of entering the wrong image.
const POSTER_BYTES = 270182;
const delivered = statSync(target).size;
if (delivered !== POSTER_BYTES) {
  throw new Error(
    `poster size mismatch: delivered ${delivered}, expected ${POSTER_BYTES}`,
  );
}
console.log(`entry.png delivered: ${delivered} bytes`);
