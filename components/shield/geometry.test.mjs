import assert from "node:assert/strict";
import test from "node:test";
import { createShieldGeometry, shieldOutline, shieldPose, SHIELD_BEVEL } from "./geometry.ts";

test("silhouette has exact reflected pairs and a precise narrow bevel", () => {
  const outline = shieldOutline();
  for (let i = 1; i < outline.length / 2; i++) {
    assert.equal(outline[i].x, -outline[outline.length - i].x);
    assert.equal(outline[i].y, outline[outline.length - i].y);
  }
  assert.ok(SHIELD_BEVEL / 2.48 < 0.012);
});

test("surface is closed, non-degenerate, and separated into silver / graphite groups", () => {
  const geometry = createShieldGeometry();
  const positions = geometry.getAttribute("position");
  const normals = geometry.getAttribute("normal");
  const indices = geometry.index.array;
  for (const attribute of [positions, normals, geometry.getAttribute("tangent")]) {
    assert.ok([...attribute.array].every(Number.isFinite));
  }
  for (let i = 0; i < normals.count; i++) {
    assert.ok(Math.abs(Math.hypot(normals.getX(i), normals.getY(i), normals.getZ(i)) - 1) < 0.00001);
  }
  const edges = new Map();
  const orientations = new Map();
  for (let i = 0; i < indices.length; i += 3) {
    const triangle = [...indices.slice(i, i + 3)];
    assert.equal(new Set(triangle).size, 3);
    for (let edge = 0; edge < 3; edge++) {
      const a = triangle[edge]; const b = triangle[(edge + 1) % 3];
      const key = `${Math.min(a, b)}:${Math.max(a, b)}`;
      edges.set(key, (edges.get(key) ?? 0) + 1);
      orientations.set(key, (orientations.get(key) ?? 0) + (a < b ? 1 : -1));
    }
    const [a, b, c] = triangle;
    const ab = [positions.getX(b) - positions.getX(a), positions.getY(b) - positions.getY(a), positions.getZ(b) - positions.getZ(a)];
    const ac = [positions.getX(c) - positions.getX(a), positions.getY(c) - positions.getY(a), positions.getZ(c) - positions.getZ(a)];
    assert.ok(Math.hypot(ab[1] * ac[2] - ab[2] * ac[1], ab[2] * ac[0] - ab[0] * ac[2], ab[0] * ac[1] - ab[1] * ac[0]) > 1e-12, "triangles have non-zero area");
    if (i < geometry.groups[0].count) {
      const [a, b, c] = triangle;
      const crossZ = (positions.getX(b) - positions.getX(a)) * (positions.getY(c) - positions.getY(a)) - (positions.getY(b) - positions.getY(a)) * (positions.getX(c) - positions.getX(a));
      assert.ok(crossZ > 0, "front triangles face the camera");
    }
  }
  assert.ok([...edges.values()].every((count) => count === 2), "each edge belongs to exactly two triangles");
  assert.ok([...orientations.values()].every((sum) => sum === 0), "neighboring triangle winding is consistent");
  assert.equal(geometry.groups.length, 2);
  assert.equal(geometry.groups[0].materialIndex, 0);
  assert.equal(geometry.groups[1].materialIndex, 1);
  assert.equal(geometry.groups.reduce((sum, group) => sum + group.count, 0), indices.length);
  geometry.dispose();
});

test("motion stays within a partial slow arc and 0.018 units of float", () => {
  for (let time = 0; time < 120; time += 0.1) {
    const pose = shieldPose(time);
    assert.ok(pose.yaw >= -0.5 && pose.yaw <= -0.18);
    assert.ok(Math.abs(pose.float) <= 0.018);
    assert.ok(Math.abs(shieldPose(time + 1 / 60).yaw - pose.yaw) < 0.001);
  }
});
