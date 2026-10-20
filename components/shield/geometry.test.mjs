import assert from "node:assert/strict";
import test from "node:test";
import * as THREE from "three";
import { createShieldModel } from "./geometry.ts";
import { referencePoint } from "./reference-contours.mjs";
import { shieldMotion } from "./motion-config.mjs";

test("reference-based shield has closed extrusions, finite normals and bounded geometry", () => {
  const model = createShieldModel();
  assert.deepEqual(Object.keys(model), ["back","rim","face","crown"]);
  let triangles = 0;
  for (const geometry of Object.values(model)) {
    for (const key of ["position","normal","uv","tangent"]) assert.ok([...geometry.getAttribute(key).array].every(Number.isFinite), key);
    const n = geometry.getAttribute("normal");
    for(let i=0;i<n.count;i++) assert.ok(Math.abs(Math.hypot(n.getX(i),n.getY(i),n.getZ(i))-1)<1e-5);
    assert.equal(geometry.groups.length, 2);
    assert.ok(geometry.boundingBox.max.z > geometry.boundingBox.min.z + .02);
    triangles += geometry.getAttribute("position").count / 3;
    geometry.dispose();
  }
  assert.ok(triangles < 60000, "triangle budget remains bounded");
});

test("the two Z recesses are actual openings in the metal face, not painted details", () => {
  const model = createShieldModel(), material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide }), mesh = new THREE.Mesh(model.face, material);
  const cast = (x,y) => { const [u,v]=referencePoint(x,y); return new THREE.Raycaster(new THREE.Vector3(u,v,5),new THREE.Vector3(0,0,-1)).intersectObject(mesh); };
  assert.equal(cast(600,380).length, 0, "upper channel is cut through the face");
  assert.equal(cast(650,808).length, 0, "lower channel is cut through the face");
  assert.ok(cast(600,600).length > 0, "the diagonal Z stroke remains physical metal");
  for(const g of Object.values(model)) g.dispose(); material.dispose();
});

test("a front-facing machined chamfer remains visible immediately above the upper Z channel", () => {
  const model = createShieldModel(), material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });
  const mesh = new THREE.Mesh(model.face, [material,material]), [x,y] = referencePoint(600,361);
  const hit = new THREE.Raycaster(new THREE.Vector3(x,y,5),new THREE.Vector3(0,0,-1)).intersectObject(mesh)[0];
  assert.ok(hit, "the metal lip must remain physical");
  assert.equal(hit.face.materialIndex, 1, "the chamfer must be exposed, not hidden below an overhanging cap");
  assert.ok(hit.normal.z > 0 && hit.normal.z < .99, "the chamfer normal must face the camera at an angle");
  Object.values(model).forEach(g=>g.dispose()); material.dispose();
});

test("curving each solid preserves a watertight two-manifold surface without T-junction cracks", () => {
  const model=createShieldModel();
  for(const [name,g] of Object.entries(model)) {
    const p=g.getAttribute("position"), edges=new Map();
    const key=i=>[p.getX(i),p.getY(i),p.getZ(i)].map(v=>Math.round(v*1e5)).join(",");
    for(let i=0;i<p.count;i+=3) for(const [a,b] of [[i,i+1],[i+1,i+2],[i+2,i]]) {
      const edge=[key(a),key(b)].sort().join("|"); edges.set(edge,(edges.get(edge)||0)+1);
    }
    assert.equal([...edges.values()].filter(count=>count!==2).length,0,`${name}: each welded edge must have exactly two adjacent triangles`);
    g.dispose();
  }
});

test("motion configuration keeps entrance cinematic and interaction restrained", () => {
  assert.ok(shieldMotion.entrance.duration >= 2.5 && shieldMotion.entrance.duration <= 4);
  assert.ok(shieldMotion.float.amplitude <= .015);
  assert.ok(shieldMotion.tilt.yaw <= .11 && shieldMotion.tilt.pitch <= .07);
  assert.ok(shieldMotion.tilt.touchFactor < 1);
  assert.ok(shieldMotion.scroll.yaw <= .1);
});
