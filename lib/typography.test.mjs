import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
const token = (name) => Number(css.match(new RegExp(`${name}:\\s*([-.\\d]+)em`))?.[1]);
test("tracking increases use fixed documented baselines, including negative values", () => {
  for (const [name, baseline] of [["--hero-tracking", -.02125], ["--hero-tracking-mobile", -.017], ["--section-tracking", -.03825]]) {
    assert.equal(token(name), Number((baseline + Math.abs(baseline) * .2).toFixed(8)));
    assert.ok(token(name) > baseline);
  }
  assert.equal(token("--card-copy-tracking"), Number((.01 * 1.3).toFixed(8)));
  assert.equal(token("--service-copy-tracking"), Number((.013 * 1.15).toFixed(8)));
  assert.equal(token("--legal-tracking"), .012);
});
