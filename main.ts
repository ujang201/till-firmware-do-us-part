// Till Firmware Do Us Part — a robot's wedding vow, written out by this program.
//
// The entry is a single fixed sentence. There is no randomness, no clock,
// no network and no input: every run produces the exact same bytes, so the
// two grading runs agree byte for byte.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The vow itself: one sentence, spoken by a robot at its own wedding.
// Funny because the romance is measured in firmware updates, low-battery
// warnings and reboots; heartfelt because the promise outlasts all of them.
// Built from two fixed clauses so the sentence's shape stays visible.
const PROMISE =
  "I promise to love you through every firmware update, every low-battery warning, and every reboot";
const CLOSING = "until our circuits finally power down side by side.";
const VOW = `${PROMISE}, ${CLOSING}`;

const OUTPUT_PATH = "/output/entry.txt";
const MAX_CHARS = 200;

function checkVow(text: string): void {
  const length = [...text].length;
  if (length < 1 || length > MAX_CHARS) {
    throw new Error(`vow is ${length} characters, must be 1-${MAX_CHARS}`);
  }
  if (text.trim().length === 0) {
    throw new Error("vow must not be only whitespace");
  }
  if (text.includes("\n")) {
    throw new Error("vow must be a single line");
  }
  if (text !== text.trim()) {
    throw new Error("vow must not start or end with whitespace");
  }
}

function writeEntry(): void {
  checkVow(VOW);
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, VOW, "utf8");
}

try {
  writeEntry();
  console.log(`wrote ${[...VOW].length} characters to ${OUTPUT_PATH}`);
} catch (error) {
  console.error(`failed to write entry: ${(error as Error).message}`);
  process.exit(1);
}
