import * as THREE from "three";

export function createShieldMaterials() {
  const width = 2048, height = 1024, data = new Uint8Array(width * height * 4);
  let seed = 73019;
  const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
  for (let y = 0; y < height; y++) {
    const row = (random() - .5) * 8;
    for (let x = 0; x < width; x++) {
      const value = Math.round(190 + row + (random() - .5) * 6);
      data.set([value, value, value, 255], (y * width + x) * 4);
    }
  }
  const grain = new THREE.DataTexture(data, width, height, THREE.RGBAFormat);
  grain.wrapS = grain.wrapT = THREE.RepeatWrapping;
  grain.repeat.set(3, 3); grain.generateMipmaps = true;
  grain.minFilter = THREE.LinearMipmapLinearFilter; grain.needsUpdate = true;
  const metal = (color: string, roughness: number, rotation: number) => new THREE.MeshPhysicalMaterial({ color, metalness: 1, roughness, roughnessMap: grain, bumpMap: grain, bumpScale: .00015, anisotropy: .35, anisotropyRotation: rotation, clearcoat: 0, envMapIntensity: 1.15 });
  return {
    face: metal("#343638", .32, .72),
    crown: metal("#383a3c", .3, 0),
    rim: metal("#777b7e", .24, 0),
    edge: metal("#838588", .2, .72),
    back: new THREE.MeshStandardMaterial({ color: "#0c0e10", metalness: .85, roughness: .48 }),
    grain,
  };
}
/** Broad HDR strips inspired only by IMG_3367; never a painted backdrop. */
export function createStudioEnvironment() {
  const width = 768, height = 384, data = new Float32Array(width * height * 4);
  const panels = [
    { yaw: .42, elevation: .2, width: .38, height: 1.15, intensity: 6 },
    { yaw: -.85, elevation: .05, width: .2, height: 1.2, intensity: 2.5 },
    { yaw: 1.5, elevation: .1, width: .2, height: 1.3, intensity: 5 },
    { yaw: -1.5, elevation: .1, width: .18, height: 1.3, intensity: 4 },
    { yaw: .05, elevation: .75, width: 1.1, height: .35, intensity: 3 },
    { yaw: 0, elevation: 1.38, width: 2.5, height: .22, intensity: 7 },
    { yaw: 0, elevation: -1.38, width: 2.5, height: .22, intensity: 5 },
    { yaw: 2.65, elevation: .3, width: .6, height: .8, intensity: 2.5 },
  ];
  for (let y = 0; y < height; y++) {
    const elevation = (.5 - y / (height - 1)) * Math.PI;
    for (let x = 0; x < width; x++) {
      const yaw = (x / (width - 1) - .75) * Math.PI * 2;
      let value = .045;
      for (const panel of panels) {
        const delta = Math.atan2(Math.sin(yaw - panel.yaw), Math.cos(yaw - panel.yaw));
        value += panel.intensity * Math.exp(-Math.pow(delta / panel.width, 4)) * Math.exp(-Math.pow((elevation - panel.elevation) / panel.height, 4));
      }
      data.set([value, value, value, 1], (y * width + x) * 4);
    }
  }
  const texture = new THREE.DataTexture(data, width, height, THREE.RGBAFormat, THREE.FloatType);
  texture.mapping = THREE.EquirectangularReflectionMapping;
  texture.colorSpace = THREE.LinearSRGBColorSpace; texture.needsUpdate = true;
  return texture;
}
