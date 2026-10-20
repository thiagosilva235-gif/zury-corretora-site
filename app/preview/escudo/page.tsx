import ShieldPreview from "@/components/shield-preview";
import Link from "next/link";
import "./preview.css";

export const metadata = { title: "Escudo ZURY — estudo isolado", robots: { index: false, follow: false } };

export default function ShieldPage() {
  return <main className="preview-page" data-shield-scroll-root>
    <Link className="preview-back" href="/">Voltar para ZURY</Link>
    <div className="preview-heading"><p>Estudo de referência · 03</p><h1>Escudo ZURY</h1><span>Metal grafite escovado · iluminação cinematográfica</span></div>
    <ShieldPreview />
    <p className="preview-note">Estudo procedural em avaliação, sem integração à Hero. A reprodução hiper-realista do relevo e da escovação ainda exige um modelo dedicado.</p>
  </main>;
}
