import assert from "node:assert/strict";
import test from "node:test";
import { benefitLoopLayout } from "./benefit-loop.mjs";

test("full-bleed loop covers the viewport throughout a complete cycle", () => {
  for (const width of [768, 1024, 1440, 1920, 2560]) {
    for (const count of [2, 4, 8]) {
      const layout = benefitLoopLayout(width, count);
      assert.ok(layout.cardWidth >= 260 && layout.cardWidth <= 320);
      for (const progress of [0, .25, .5, .75, 1]) {
        const left = -layout.distance * (1 - progress);
        const right = left + layout.distance * (1 + layout.copies);
        assert.ok(left <= 0 && right >= width, `empty edge: ${width}px / ${count} cards / ${progress}`);
      }
      assert.ok(Math.abs(layout.distance / layout.duration * 1000 - 76) < .001);
    }
  }
});

test("logo slots preserve a compact uniform width at the same 76px/s", () => {
  const layout = benefitLoopLayout(1440, 12, 48, 180, 220);
  assert.equal(layout.cardWidth, 220);
  assert.ok(Math.abs(layout.distance / layout.duration * 1000 - 76) < .001);
  assert.ok(layout.distance * layout.copies >= 1440);
});
