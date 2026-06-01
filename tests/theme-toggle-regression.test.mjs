import test from "node:test";
import assert from "node:assert/strict";

import {
  THEME_KEY,
  applyTheme,
  getThemeBootstrapScript,
  resolveInitialTheme,
  resolveTheme,
  toggleTheme,
} from "../src/templates/dashboard/components/theme-helpers.ts";
import { readFileSync } from "node:fs";

test("resolveInitialTheme prefers valid stored theme and defaults invalid values to light", () => {
  assert.equal(resolveInitialTheme({ storageTheme: "dark", documentTheme: "light" }), "dark");
  assert.equal(resolveInitialTheme({ storageTheme: "light", documentTheme: "dark" }), "light");
  assert.equal(resolveInitialTheme({ storageTheme: "invalid", documentTheme: "dark" }), "dark");
  assert.equal(resolveInitialTheme({ storageTheme: "invalid", documentTheme: "invalid" }), "light");
});

test("applyTheme writes data-theme and persists normalized theme", () => {
  let appliedTheme = null;
  const storageWrites = [];
  const documentElement = {
    setAttribute(name, value) {
      assert.equal(name, "data-theme");
      appliedTheme = value;
    },
  };
  const storage = {
    setItem(key, value) {
      storageWrites.push([key, value]);
    },
  };

  assert.equal(applyTheme("dark", { documentElement, storage }), "dark");
  assert.equal(appliedTheme, "dark");
  assert.deepEqual(storageWrites[0], [THEME_KEY, "dark"]);

  assert.equal(applyTheme("nope", { documentElement, storage }), "light");
  assert.equal(appliedTheme, "light");
  assert.deepEqual(storageWrites[1], [THEME_KEY, "light"]);
});

test("toggleTheme and resolveTheme enforce valid light/dark behavior", () => {
  assert.equal(toggleTheme("light"), "dark");
  assert.equal(toggleTheme("dark"), "light");
  assert.equal(toggleTheme("invalid"), "dark");

  assert.equal(resolveTheme("light"), "light");
  assert.equal(resolveTheme("dark"), "dark");
  assert.equal(resolveTheme("invalid"), "light");
});

test("bootstrap script applies stored dark theme before hydration and layout uses helper path", () => {
  const script = getThemeBootstrapScript();
  const documentElement = {
    theme: "light",
    setAttribute(name, value) {
      assert.equal(name, "data-theme");
      this.theme = value;
    },
  };
  const context = {
    window: {
      localStorage: {
        getItem(key) {
          assert.equal(key, THEME_KEY);
          return "dark";
        },
      },
    },
    document: {
      documentElement,
    },
  };

  Function("window", "document", script)(context.window, context.document);
  assert.equal(documentElement.theme, "dark");

  const layoutSource = readFileSync(new URL("../src/app/layout.tsx", import.meta.url), "utf8");
  assert.match(layoutSource, /getThemeBootstrapScript/);
  assert.match(layoutSource, /id="theme-bootstrap"/);
  assert.match(layoutSource, /strategy="beforeInteractive"/);
});
