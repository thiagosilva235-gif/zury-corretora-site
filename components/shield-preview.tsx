"use client";

import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { createShieldGeometry, shieldPose } from "./shield/geometry";
import { createBrushedSilver, createStudioEnvironment } from "./shield/materials";

type View = "motion" | "front" | "quarter" | "profile";
const views: { id: View; label: string }[] = [
  { id: "motion", label: "Movimento" },
  { id: "front", label: "Frente" },
  { id: "quarter", label: "Três quartos" },
  { id: "profile", label: "Perfil" },
];
const angles = { front: 0, quarter: -0.53, profile: -1.12 };

function ShieldScene({ view, animate }: { view: View; animate: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);
  const elapsed = useRef(0);
  const get = useThree((state) => state.get);
  const size = useThree((state) => state.size);
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    const { scene, gl } = get();
    const geometry = createShieldGeometry();
    const silver = createBrushedSilver();
    const graphite = new THREE.MeshStandardMaterial({ color: "#1c1c1c", metalness: 0.92, roughness: 0.29 });
    const source = createStudioEnvironment();
    const generator = new THREE.PMREMGenerator(gl);
    const environment = generator.fromEquirectangular(source);
    const previous = scene.environment;
    scene.environment = environment.texture;
    const object = mesh.current;
    if (object) { object.geometry = geometry; object.material = [silver.material, graphite]; }
    invalidate();
    return () => {
      scene.environment = previous;
      geometry.dispose(); silver.material.dispose(); silver.grain.dispose(); graphite.dispose();
      source.dispose(); environment.dispose(); generator.dispose();
    };
  }, [get, invalidate]);

  useEffect(() => {
    const { camera } = get();
    // Fit portrait and landscape canvases without cropping the crown or tip.
    if (camera instanceof THREE.PerspectiveCamera) {
      const aspect = size.width / size.height;
      camera.position.z = Math.max(7.65, 2.95 / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * aspect));
      camera.updateProjectionMatrix();
      invalidate();
    }
  }, [get, size, invalidate]);

  useEffect(() => { invalidate(); }, [view, animate, invalidate]);
  useFrame((_, delta) => {
    if (!mesh.current) return;
    if (view === "motion" && animate) elapsed.current += Math.min(delta, 0.05);
    const pose = shieldPose(elapsed.current);
    mesh.current.rotation.set(view === "front" ? 0 : pose.pitch, view === "motion" ? pose.yaw : angles[view], 0);
    mesh.current.position.y = view === "motion" && animate ? pose.float : 0;
    if (view === "motion" && animate) invalidate();
  });
  return <mesh ref={mesh} dispose={null} />;
}

class PreviewBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <p className="shield-error" role="alert">Não foi possível iniciar a prévia WebGL. Recarregue em um navegador com aceleração gráfica habilitada.</p> : this.props.children; }
}

export default function ShieldPreview() {
  const [view, setView] = useState<View>("motion");
  const [animate, setAnimate] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;
    const update = () => setAnimate(!preference.matches && !document.hidden && visible);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    if (stage.current) observer.observe(stage.current);
    preference.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    update();
    return () => { observer.disconnect(); preference.removeEventListener("change", update); document.removeEventListener("visibilitychange", update); };
  }, []);

  return <div className="shield-preview">
    <div ref={stage} className="shield-canvas" role="img" aria-label="Escudo simétrico com frente em prata escovada, chanfro fino e corpo grafite. Prévia tridimensional em avaliação.">
      <PreviewBoundary><Canvas frameloop="demand" dpr={[1, 1.75]} camera={{ position: [0, 0, 7.65], fov: 32, near: 0.1, far: 30 }} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }} onCreated={({ gl }) => { gl.toneMapping = THREE.ACESFilmicToneMapping; gl.toneMappingExposure = 0.88; }} fallback={<p className="shield-error">WebGL indisponível neste navegador.</p>}>
        <ShieldScene view={view} animate={animate} />
      </Canvas></PreviewBoundary>
    </div>
    <div className="shield-view-controls" role="group" aria-label="Ângulo de inspeção do escudo">
      {views.map((option) => <button key={option.id} type="button" aria-pressed={view === option.id} onClick={() => setView(option.id)}>{option.label}</button>)}
    </div>
  </div>;
}
