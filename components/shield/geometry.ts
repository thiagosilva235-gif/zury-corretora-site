import * as THREE from "three";

const HALF_SEGMENTS = 192;
const FACE_RINGS = 32;
export const SHIELD_BEVEL = 0.026;
export const SHIELD_DEPTH = 0.27;

/** Only the right half is authored. The left half is its exact reflection. */
export function shieldOutline() {
  const right = new THREE.CurvePath<THREE.Vector2>();
  const curve = (...coordinates: number[]) => {
    const points = Array.from({ length: 4 }, (_, i) =>
      new THREE.Vector2(coordinates[i * 2], coordinates[i * 2 + 1]),
    );
    right.add(new THREE.CubicBezierCurve(...(points as [THREE.Vector2, THREE.Vector2, THREE.Vector2, THREE.Vector2])));
  };
  curve(0, 1.62, 0.44, 1.62, 0.88, 1.49, 1.158, 1.354);
  curve(1.158, 1.354, 1.218, 1.325, 1.24, 1.29, 1.239, 1.223);
  curve(1.239, 1.223, 1.233, 0.69, 1.205, 0.05, 1.043, -0.437);
  curve(1.043, -0.437, 0.88, -0.927, 0.416, -1.421, 0.047, -1.66);
  curve(0.047, -1.66, 0.025, -1.674, 0.012, -1.681, 0, -1.681);
  const half = right.getSpacedPoints(HALF_SEGMENTS);
  return [...half, ...half.slice(1, -1).reverse().map((point) => new THREE.Vector2(-point.x, point.y))];
}

function insetOutline(outline: THREE.Vector2[], distance: number) {
  return outline.map((point, i) => {
    const previous = outline[(i + outline.length - 1) % outline.length];
    const next = outline[(i + 1) % outline.length];
    const tangent = next.clone().sub(previous).normalize();
    // Clockwise contour: the right-hand normal points into the face.
    return point.clone().add(new THREE.Vector2(tangent.y, -tangent.x).multiplyScalar(distance));
  });
}

/** A continuous indexed surface: crowned silver face → tiny graphite bevel → body → back. */
export function createShieldGeometry() {
  const outline = shieldOutline();
  const faceOutline = insetOutline(outline, SHIELD_BEVEL);
  const count = outline.length;
  // An analytic crown avoids the star-shaped normals of a radially scaled dome.
  const crown = (point: THREE.Vector2) => 0.225 - 0.032 * point.x ** 2 - 0.025 * point.y ** 2;
  const vertices: number[] = [0, 0, 0.225];
  const uv: number[] = [0.5, 0.5];
  const indices: number[] = [];
  const addRing = (points: THREE.Vector2[], z: number | ((point: THREE.Vector2, index: number) => number)) => {
    const start = vertices.length / 3;
    for (const [i, point] of points.entries()) {
      vertices.push(point.x, point.y, typeof z === "number" ? z : z(point, i));
      uv.push(point.x / 2.5 + 0.5, point.y / 3.4 + 0.5);
    }
    return start;
  };
  const connect = (inner: number, outer: number) => {
    for (let i = 0; i < count; i++) {
      const next = (i + 1) % count;
      indices.push(inner + i, outer + next, outer + i, inner + i, inner + next, outer + next);
    }
  };

  let last = 0;
  for (let ring = 1; ring <= FACE_RINGS; ring++) {
    const radius = ring / FACE_RINGS;
    const start = addRing(faceOutline.map((point) => point.clone().multiplyScalar(radius)), crown);
    if (ring === 1) {
      for (let i = 0; i < count; i++) indices.push(0, start + (i + 1) % count, start + i);
    } else connect(last, start);
    last = start;
  }
  const faceIndexCount = indices.length;

  // Quarter-circle tool radius: 26 thousandths against a 2.48-unit width.
  for (let step = 1; step <= 8; step++) {
    const angle = step / 8 * Math.PI / 2;
    const inset = SHIELD_BEVEL * (1 - Math.sin(angle));
    const next = addRing(insetOutline(outline, inset), (_, i) => crown(faceOutline[i]) - SHIELD_BEVEL * (1 - Math.cos(angle)));
    connect(last, next);
    last = next;
  }
  const side = addRing(outline, 0.15 - SHIELD_DEPTH + SHIELD_BEVEL);
  connect(last, side);
  last = side;
  for (let step = 1; step <= 8; step++) {
    const angle = step / 8 * Math.PI / 2;
    const next = addRing(insetOutline(outline, SHIELD_BEVEL * (1 - Math.cos(angle))), 0.15 - SHIELD_DEPTH + SHIELD_BEVEL * (1 - Math.sin(angle)));
    connect(last, next);
    last = next;
  }
  const backCenter = vertices.length / 3;
  vertices.push(0, 0, 0.15 - SHIELD_DEPTH);
  uv.push(0.5, 0.5);
  for (let i = 0; i < count; i++) indices.push(backCenter, last + i, last + (i + 1) % count);

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  geometry.setIndex(indices);
  geometry.addGroup(0, faceIndexCount, 0);
  geometry.addGroup(faceIndexCount, indices.length - faceIndexCount, 1);
  geometry.computeVertexNormals();
  // Stable horizontal grain direction, including at the radial center vertex.
  const normals = geometry.getAttribute("normal");
  const tangents: number[] = [];
  for (let i = 0; i < normals.count; i++) {
    const normal = new THREE.Vector3().fromBufferAttribute(normals, i);
    const axis = Math.abs(normal.x) < 0.9 ? new THREE.Vector3(1, 0, 0) : new THREE.Vector3(0, 1, 0);
    const tangent = axis.addScaledVector(normal, -axis.dot(normal)).normalize();
    tangents.push(tangent.x, tangent.y, tangent.z, 1);
  }
  geometry.setAttribute("tangent", new THREE.Float32BufferAttribute(tangents, 4));
  geometry.computeBoundingSphere();
  return geometry;
}

export function shieldPose(seconds: number) {
  return {
    yaw: -0.34 + Math.sin(seconds * 2 * Math.PI / 28) * 0.16,
    pitch: 0.055 + Math.sin(seconds * 2 * Math.PI / 34) * 0.018,
    float: Math.sin(seconds * 2 * Math.PI / 10) * 0.018,
  };
}
