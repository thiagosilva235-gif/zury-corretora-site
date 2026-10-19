import * as THREE from "three";

/** Directional micrograin, not a painted silver color or a clear plastic coating. */
export function createBrushedSilver() {
  const width = 512;
  const height = 512;
  const data = new Uint8Array(width * height * 4);
  let seed = 73019;
  const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
  for (let y = 0; y < height; y++) {
    const grain = (random() - 0.5) * 0.12;
    for (let x = 0; x < width; x++) {
      const offset = (y * width + x) * 4;
      const value = Math.round(255 * (0.87 + grain + (random() - 0.5) * 0.015));
      data.set([value, value, value, 255], offset);
    }
  }
  const grain = new THREE.DataTexture(data, width, height, THREE.RGBAFormat);
  grain.wrapS = grain.wrapT = THREE.RepeatWrapping;
  grain.repeat.set(3, 5);
  grain.generateMipmaps = true;
  grain.minFilter = THREE.LinearMipmapLinearFilter;
  grain.magFilter = THREE.LinearFilter;
  grain.needsUpdate = true;
  const material = new THREE.MeshPhysicalMaterial({
    color: "#d9dbdc",
    metalness: 1,
    roughness: 0.34,
    roughnessMap: grain,
    anisotropy: 0.48,
    anisotropyRotation: Math.PI / 2,
    clearcoat: 0,
    envMapIntensity: 1,
  });
  return { material, grain };
}

/** Local HDR softboxes. No downloaded preset, colored spots, or per-frame cube capture. */
export function createStudioEnvironment() {
  const width = 1024;
  const height = 512;
  const data = new Float32Array(width * height * 4);
  const panels = [
    { yaw: -0.75, elevation: 0.28, width: 0.6, height: 1.05, intensity: 3.6 },
    { yaw: 0.8, elevation: 0.12, width: 0.34, height: 0.95, intensity: 1.8 },
    { yaw: 0, elevation: 1.25, width: 1.5, height: 0.3, intensity: 2.8 },
    { yaw: 2.65, elevation: 0.4, width: 0.7, height: 0.95, intensity: 1.7 },
  ];
  for (let y = 0; y < height; y++) {
    const elevation = (0.5 - y / (height - 1)) * Math.PI;
    for (let x = 0; x < width; x++) {
      // Equirectangular +Z is u=.75 in Three's environment lookup.
      const yaw = (x / (width - 1) - 0.75) * Math.PI * 2;
      let value = 0.1 + 0.08 * Math.max(0, Math.sin(elevation));
      for (const panel of panels) {
        const delta = Math.atan2(Math.sin(yaw - panel.yaw), Math.cos(yaw - panel.yaw));
        const horizontal = Math.exp(-Math.pow(delta / panel.width, 4));
        const vertical = Math.exp(-Math.pow((elevation - panel.elevation) / panel.height, 4));
        value += panel.intensity * horizontal * vertical;
      }
      data.set([value, value, value, 1], (y * width + x) * 4);
    }
  }
  const texture = new THREE.DataTexture(data, width, height, THREE.RGBAFormat, THREE.FloatType);
  texture.mapping = THREE.EquirectangularReflectionMapping;
  texture.colorSpace = THREE.LinearSRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}
