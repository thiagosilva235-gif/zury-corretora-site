import * as THREE from "three";
import { contours, referencePoint } from "./reference-contours.mjs";

function path(commands: (string | number)[][]) {
  const shape = new THREE.Shape();
  for (const [op, ...values] of commands) {
    const p = values as number[];
    const point = (i: number) => referencePoint(p[i], p[i + 1]) as [number, number];
    if (op === "M") shape.moveTo(...point(0));
    if (op === "L") shape.lineTo(...point(0));
    if (op === "C") shape.bezierCurveTo(...point(0), ...point(2), ...point(4));
    if (op === "Z") shape.closePath();
  }
  return shape;
}

/** A small physical crown with analytic normals, without visible radial facets. */
function finish(geometry: THREE.BufferGeometry) {
  const p = geometry.getAttribute("position"), n = geometry.getAttribute("normal"), uv = geometry.getAttribute("uv");
  const tangents: number[] = [];
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i);
    p.setZ(i, p.getZ(i) + .06 - .05 * x * x - .013 * y * y);
    const normal = new THREE.Vector3(n.getX(i) + n.getZ(i) * .10 * x, n.getY(i) + n.getZ(i) * .026 * y, n.getZ(i)).normalize();
    n.setXYZ(i, normal.x, normal.y, normal.z);
    const tangent = new THREE.Vector3(1, 0, 0).addScaledVector(normal, -normal.x).normalize();
    tangents.push(tangent.x, tangent.y, tangent.z, 1);
    uv.setXY(i, (x + 1.4) / 2.8, (y + 1.85) / 3.7);
  }
  geometry.setAttribute("tangent", new THREE.Float32BufferAttribute(tangents, 4));
  geometry.computeBoundingBox(); geometry.computeBoundingSphere();
  return geometry;
}
function solid(shape: THREE.Shape, z: number, depth: number, bevel: number) {
  const source = new THREE.ExtrudeGeometry(shape, { depth, steps: 1, curveSegments: 48, bevelEnabled: true, bevelThickness: bevel, bevelSize: bevel, bevelOffset: -bevel, bevelSegments: 5 }).translate(0, 0, z);
  const geometry = subdivide(source);
  source.dispose();
  return finish(geometry);
}

/** Split every long edge on BOTH adjoining triangles, including across material groups.
 * Longest-edge-only/cap-only tessellation leaves T-junctions that open when curved. */
function subdivide(source: THREE.BufferGeometry) {
  type Vertex = { p: THREE.Vector3; n: THREE.Vector3 };
  type Triangle = [Vertex,Vertex,Vertex];
  const position = source.getAttribute("position"), normal = source.getAttribute("normal");
  const vertex = (i:number): Vertex => ({ p:new THREE.Vector3().fromBufferAttribute(position,i), n:new THREE.Vector3().fromBufferAttribute(normal,i) });
  const midpoint = (a:Vertex,b:Vertex): Vertex => ({ p:a.p.clone().add(b.p).multiplyScalar(.5), n:a.n.clone().add(b.n).normalize() });
  const positions:number[]=[], normals:number[]=[], geometry=new THREE.BufferGeometry();
  for(const group of source.groups) {
    let triangles:Triangle[]=[];
    for(let i=group.start;i<group.start+group.count;i+=3) triangles.push([vertex(i),vertex(i+1),vertex(i+2)]);
    for(let pass=0;pass<7;pass++) {
      const next:Triangle[]=[]; let changed=false;
      for(const [a,b,c] of triangles) {
        const mask=(a.p.distanceToSquared(b.p)>.18**2?1:0)|(b.p.distanceToSquared(c.p)>.18**2?2:0)|(c.p.distanceToSquared(a.p)>.18**2?4:0);
        if(!mask) { next.push([a,b,c]); continue; }
        changed=true;
        const ab=midpoint(a,b), bc=midpoint(b,c), ca=midpoint(c,a);
        if(mask===1) next.push([a,ab,c],[ab,b,c]);
        if(mask===2) next.push([a,b,bc],[a,bc,c]);
        if(mask===4) next.push([a,b,ca],[ca,b,c]);
        if(mask===3) next.push([ab,b,bc],[a,ab,c],[ab,bc,c]);
        if(mask===5) next.push([a,ab,ca],[ab,b,c],[ca,ab,c]);
        if(mask===6) next.push([bc,c,ca],[a,b,ca],[b,bc,ca]);
        if(mask===7) next.push([a,ab,ca],[ab,b,bc],[ca,bc,c],[ab,bc,ca]);
      }
      triangles=next; if(!changed) break;
    }
    const start=positions.length/3;
    for(const triangle of triangles) for(const v of triangle) { positions.push(v.p.x,v.p.y,v.p.z); normals.push(v.n.x,v.n.y,v.n.z); }
    geometry.addGroup(start,positions.length/3-start,group.materialIndex);
  }
  geometry.setAttribute("position",new THREE.Float32BufferAttribute(positions,3));
  geometry.setAttribute("normal",new THREE.Float32BufferAttribute(normals,3));
  geometry.setAttribute("uv",new THREE.Float32BufferAttribute(new Float32Array(positions.length/3*2),2));
  return geometry;
}

/** Closed, rolled rim. The visible band slopes inward instead of being a flat silver extrusion cap. */
function rolledRim() {
  const outer = path(contours.outline).getPoints(48), inner = path(contours.inner).getPoints(48);
  const profile = [[0,-.21],[0,.07],[.08,.108],[.16,.12],[.87,.09],[1,.07],[1,-.21]];
  const positions: number[] = [], indices: number[] = [], uvs: number[] = [];
  for (const [blend,z] of profile) for(let i=0;i<outer.length;i++) {
    const point = outer[i].clone().lerp(inner[i], blend);
    positions.push(point.x, point.y, z); uvs.push(0,0);
  }
  for(let j=0;j<profile.length;j++) for(let i=0;i<outer.length-1;i++) {
    const a=j*outer.length+i, b=a+1, c=((j+1)%profile.length)*outer.length+i, d=c+1;
    indices.push(a,c,b,b,c,d);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position",new THREE.Float32BufferAttribute(positions,3));
  geometry.setAttribute("uv",new THREE.Float32BufferAttribute(uvs,2));
  geometry.setIndex(indices); geometry.computeVertexNormals();
  geometry.addGroup(0, (profile.length-1)*(outer.length-1)*6, 0);
  geometry.addGroup((profile.length-1)*(outer.length-1)*6, (outer.length-1)*6, 1);
  const result=geometry.toNonIndexed(); geometry.dispose(); return finish(result);
}
export function createShieldModel() {
  const face = path(contours.inner);
  // ExtrudeGeometry expects holes opposite to the clockwise outer contour.
  face.holes.push(...[contours.upperCut, contours.lowerCut].map(commands => new THREE.Path(path(commands).getPoints(48).reverse())));
  return {
    back: solid(path(contours.outline), -.23, .13, .006),
    rim: rolledRim(),
    face: solid(face, -.07, .14, .014),
    crown: solid(path(contours.crown), .074, .045, .009),
  };
}
