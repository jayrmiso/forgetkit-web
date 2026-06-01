import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const themeTogglePath = path.resolve("src/templates/dashboard/components/ThemeToggle.tsx");

function readThemeToggleSource() {
  return fs.readFileSync(themeTogglePath, "utf8");
}

test("ThemeToggle persists theme and writes data-theme on documentElement", () => {
  const source = readThemeToggleSource();
  assert.match(source, /localStorage\.setItem\(/);
  assert.match(source, /document\.documentElement\.setAttribute\(\s*["']data-theme["']/);
});

test("ThemeToggle initializes from localStorage with a light default", () => {
  const source = readThemeToggleSource();
  assert.match(source, /localStorage\.getItem\(/);
  assert.match(source, /"light"/);
});
