import ShieldPreview from "@/components/shield-preview";
import Link from "next/link";
import "./preview.css";

export const metadata = { title: "Escudo ZURY — estudo isolado", robots: { index: false, follow: false } };

export default function ShieldPage() {
  return <main className="preview-page" data-shield-scroll-root>
    <Link className="preview-back" href="/">Voltar para ZURY</Link>
    <div className="preview-heading"><p>Prévia da imagem original</p><h1>Escudo ZURY</h1><span>Arte preservada · movimento sutil</span></div>
    <ShieldPreview />
    <p className="preview-note">Imagem original animada, sem reconstrução 3D. Prévia isolada aguardando aprovação visual, sem integração à Hero.</p>
  </main>;
}
