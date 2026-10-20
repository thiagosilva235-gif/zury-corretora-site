"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { Shield } from "./shield/shield";
import type { ShieldView } from "./shield/shield-scene";
import { contours, contourPath } from "./shield/reference-contours.mjs";

const views: { id: ShieldView; label: string }[] = [{ id: "motion", label: "Movimento" }, { id: "front", label: "Frente" }, { id: "quarter", label: "Três quartos" }, { id: "profile", label: "Perfil" }];
export default function ShieldPreview() {
  const [view, setView] = useState<ShieldView>("front");
  const [fallback, setFallback] = useState(false);
  const [traced, setTraced] = useState(false);
  const exporterRef = useRef<(() => void) | null>(null);
  return <div className="shield-preview">
    <div className="shield-preview-split">
      <figure><div className="shield-canvas"><Shield view={view} forceFallback={fallback} exporterRef={exporterRef} /></div><figcaption>Modelo 3D · frontal e ângulos</figcaption></figure>
      <figure><div className="shield-reference"><Image src="/shield/references/geometry.png" alt="Referência prioritária da geometria original, imagem 2" width={1254} height={1254} sizes="(max-width: 767px) 90vw, 45vw" priority />{traced && <svg viewBox="0 0 1254 1254" aria-hidden="true">{Object.values(contours).map((c,i)=><path key={i} d={contourPath(c)} />)}</svg>}</div><figcaption>Imagem 2 · geometria original</figcaption></figure>
    </div>
    <div className="shield-view-controls" role="group" aria-label="Ângulo de inspeção do escudo">{views.map(v=><button key={v.id} type="button" aria-pressed={view===v.id} onClick={()=>setView(v.id)}>{v.label}</button>)}<button type="button" aria-pressed={traced} onClick={()=>setTraced(!traced)}>Comparar traçado</button><button type="button" aria-pressed={fallback} onClick={()=>setFallback(!fallback)}>Sem WebGL</button><button type="button" disabled={fallback} onClick={()=>exporterRef.current?.()}>Exportar poster</button></div>
    <details className="shield-light-reference"><summary>Referência de iluminação · imagem 1</summary><Image src="/shield/references/lighting.png" alt="Referência de iluminação cinematográfica da imagem 1, não utilizada como geometria" width={475} height={454} /></details>
  </div>;
}
