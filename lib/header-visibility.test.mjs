import assert from "node:assert/strict";
import test from "node:test";
import { headerShouldHide } from "./header-visibility.ts";

test("header stays hidden during upward scroll and only returns at the top", () => {
  let hidden = false;
  for (const [y, expected] of [[0,false],[20,false],[31,false],[32,true],[500,true],[200,true],[20,true],[10,true],[8,false],[20,false],[31,false],[32,true]]) {
    hidden = headerShouldHide(hidden, y, false);
    assert.equal(hidden, expected, `scrollY=${y}`);
  }
});
test("open navbar interaction or focus is never hidden; closing restores scroll policy", () => {
  assert.equal(headerShouldHide(false, 500, true), false);
  assert.equal(headerShouldHide(true, 500, true), false);
  assert.equal(headerShouldHide(false, 500, false), true);
});
