import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
const token = (name) => Number(css.match(new RegExp(`${name}:\\s*([-.\\d]+)em`))?.[1]);
test("semantic tracking preserves the nine explicit stage-six typography roles", () => {
  for (const [name, expected] of [
    ["--tracking-hero", .025], ["--tracking-section", .06],
    ["--tracking-card-title", .055], ["--tracking-copy", .025],
    ["--tracking-control", .065], ["--tracking-nav", .065],
    ["--tracking-popover", .04], ["--tracking-footer", .04],
    ["--tracking-financial", .035],
  ]) assert.equal(token(name), expected, name);
});
