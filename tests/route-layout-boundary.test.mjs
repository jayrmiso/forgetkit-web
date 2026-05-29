import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const layoutPath = path.resolve("src/app/layout.tsx");
const pagePath = path.resolve("src/app/page.tsx");

const layoutSource = fs.readFileSync(layoutPath, "utf8");
const pageSource = fs.readFileSync(pagePath, "utf8");

test("layout owns workspace shell primitives and renders children slot", () => {
  assert.match(layoutSource, /<WorkspaceSidebar\s*\/?\s*>|<WorkspaceSidebar\s*\/>/);
  assert.match(layoutSource, /<WorkspaceHeader\s*\/?\s*>|<WorkspaceHeader\s*\/>/);
  assert.match(layoutSource, /<SidebarProvider\b/);
  assert.match(layoutSource, /<SidebarInset\b/);
  assert.match(layoutSource, /\{children\}/);
});

test("page renders WorkspaceContent and does not own shell primitives", () => {
  assert.match(pageSource, /<WorkspaceContent\s*\/?\s*>|<WorkspaceContent\s*\/>/);
  assert.doesNotMatch(pageSource, /WorkspaceSidebar/);
  assert.doesNotMatch(pageSource, /WorkspaceHeader/);
  assert.doesNotMatch(pageSource, /SidebarProvider/);
  assert.doesNotMatch(pageSource, /SidebarInset/);
  assert.doesNotMatch(pageSource, /\{children\}/);
});
