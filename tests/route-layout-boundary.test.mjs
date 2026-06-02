import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const layoutPath = path.resolve("src/app/layout.tsx");
const dockPath = path.resolve("src/features/workspace/components/WorkspaceDock.tsx");
const layoutSource = fs.readFileSync(layoutPath, "utf8");
const dockSource = fs.readFileSync(dockPath, "utf8");

const routePagePaths = [
  "src/app/page.tsx",
  "src/app/generation-workbench/page.tsx",
  "src/app/asset-library/page.tsx",
  "src/app/narrative-library/page.tsx",
  "src/app/review-compare/page.tsx",
  "src/app/version-history/page.tsx",
  "src/app/integrations/supabase-storage/page.tsx",
  "src/app/integrations/godot-export-readiness/page.tsx",
  "src/app/integrations/aseprite-integration/page.tsx",
  "src/app/consistency-controls/page.tsx",
];

test("layout owns persistent workspace shell while preserving theme bootstrap", () => {
  assert.match(layoutSource, /<WorkspaceShell>\{children\}<\/WorkspaceShell>/);
  assert.match(layoutSource, /getThemeBootstrapScript/);
  assert.match(layoutSource, /id="theme-bootstrap"/);
  assert.match(layoutSource, /strategy="beforeInteractive"/);
  assert.match(layoutSource, /\{children\}/);
});

test("dock is a client route-aware navigation component", () => {
  assert.match(dockSource, /^"use client";/);
  assert.match(dockSource, /usePathname/);
  assert.match(dockSource, /next\/link/);
  assert.match(dockSource, /aria-current=\{active \? "page" : undefined\}/);
});

test("all workspace routes exist and own page-specific composition", () => {
  for (const routePagePath of routePagePaths) {
    const source = fs.readFileSync(path.resolve(routePagePath), "utf8");

    assert.match(source, /WorkspacePageFrame/);
    assert.doesNotMatch(source, new RegExp("Workspace" + "Content"));
    assert.doesNotMatch(source, /WorkspaceShell/);
    assert.doesNotMatch(source, /WorkspaceHeader/);
    assert.doesNotMatch(source, /WorkspaceDock/);
    assert.doesNotMatch(source, /\{children\}/);
  }
});
