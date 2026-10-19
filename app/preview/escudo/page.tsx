import ShieldPreview from "@/components/shield-preview";
import Link from "next/link";
import "./preview.css";

export default function ShieldPage() {
  return <main className="preview-page">
    <Link className="preview-back" href="/">← Voltar para ZURY</Link>
    <div className="preview-heading"><p>Estudo de material · 02</p><h1>Escudo ZURY</h1><span>Prata acetinada. Grafite profundo.</span></div>
    <ShieldPreview />
    <p className="preview-note">Modelo em avaliação visual. Integração ao Hero pendente de aprovação.</p>
  </main>;
}
