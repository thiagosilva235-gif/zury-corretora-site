import assert from "node:assert/strict";
import test from "node:test";
import { anchorScrollPosition, navigationDuration } from "./navigation.ts";

test("anchor destinations use a fixed inset and respect document bounds", () => {
  assert.equal(anchorScrollPosition(0, 3000), 0);
  assert.equal(anchorScrollPosition(1000, 3000), 904);
  assert.equal(anchorScrollPosition(3500, 3000), 3000);
});
test("scroll timing scales with distance but never becomes excessively slow", () => {
  assert.equal(navigationDuration(0), .55);
  assert.equal(navigationDuration(1000), .8);
  assert.equal(navigationDuration(-1000), .8);
  assert.equal(navigationDuration(10000), 1.1);
});
