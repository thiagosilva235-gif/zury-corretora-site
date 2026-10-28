import type { Metadata, Viewport } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, FileText, Mail, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { ChannelsPopover } from "@/components/site/channels-popover";
import { OfficialLogo } from "@/components/site/official-logo";
import { QuoteMenu } from "@/components/site/quote-menu";
import { digitalChannels, googleReviewHref } from "@/lib/content";
import "./cartao.css";

export const metadata: Metadata = {
  title: "Cartão digital | ZURY CORRETORA",
  description: "Cotações, contatos e canais oficiais da ZURY CORRETORA.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#090b0d",
};

function ButtonContents({ label, children }: { label: string; children: ReactNode }) {
  return <>
    <span className="zury-card-icon" aria-hidden="true">{children}</span>
    <span className="zury-card-label">{label}</span>
    <ChevronRight className="zury-card-arrow" aria-hidden="true" />
  </>;
}

function BrandIcon({ name }: { name: "whatsapp" | "tiktok" | "facebook" | "google" }) {
  return <Image src={`/card-icons/${name}.svg`} width={64} height={64} alt="" />;
}

export default function DigitalCard() {
  return <div className="zury-card-shell">
    <main className="zury-card-card" aria-label="Cartão de visita digital ZURY CORRETORA">
      <div className="zury-card-background" aria-hidden="true">
        <Image className="zury-card-shield" src="/shield/references/geometry.png" width={1254} height={1254} sizes="(max-width: 864px) 76vw, 660px" alt="" priority />
        <div className="zury-card-lowerCurve" />
      </div>
      <header className="zury-card-brand">
        <h1><OfficialLogo priority /></h1>
      </header>
      <nav className="zury-card-actions" aria-label="Canais da ZURY CORRETORA">
        <QuoteMenu className="zury-card-button zury-card-primary">
          <ButtonContents label="COTAR AGORA"><FileText className="zury-card-document" strokeWidth={1.35} /></ButtonContents>
        </QuoteMenu>
        <Link className="zury-card-button" href="/">
          <ButtonContents label="SITE"><span className="zury-card-monogram" /></ButtonContents>
        </Link>
        <button className="zury-card-button" type="button" popoverTarget="card-whatsapp" aria-haspopup="dialog" aria-controls="card-whatsapp">
          <ButtonContents label="WHATSAPP"><BrandIcon name="whatsapp" /></ButtonContents>
        </button>
        <a className="zury-card-button" href={digitalChannels.instagram.href} target="_blank" rel="noopener noreferrer">
          <ButtonContents label="INSTAGRAM"><span className="zury-card-instagram" /></ButtonContents>
        </a>
        <a className="zury-card-button" href={digitalChannels.tiktok.href} target="_blank" rel="noopener noreferrer">
          <ButtonContents label="TIKTOK"><BrandIcon name="tiktok" /></ButtonContents>
        </a>
        {digitalChannels.facebook.href ? <a className="zury-card-button" href={digitalChannels.facebook.href} target="_blank" rel="noopener noreferrer">
          <ButtonContents label="FACEBOOK"><BrandIcon name="facebook" /></ButtonContents>
        </a> : <button className="zury-card-button" type="button" disabled aria-label="FACEBOOK — endereço ainda não disponível" title="Endereço do Facebook ainda não disponível">
          <ButtonContents label="FACEBOOK"><BrandIcon name="facebook" /></ButtonContents>
        </button>}
        <a className="zury-card-button" href={googleReviewHref} target="_blank" rel="noopener noreferrer">
          <ButtonContents label="NOS AVALIE"><BrandIcon name="google" /></ButtonContents>
        </a>
        <button className="zury-card-button" type="button" popoverTarget="card-phone" aria-haspopup="dialog" aria-controls="card-phone">
          <ButtonContents label="CONTATO"><Phone className="zury-card-phone" strokeWidth={1.5} /></ButtonContents>
        </button>
        <a className="zury-card-button" href={`mailto:${digitalChannels.email}`}>
          <ButtonContents label="E-MAIL"><Mail className="zury-card-mail" strokeWidth={1.5} /></ButtonContents>
        </a>
      </nav>
      <ChannelsPopover id="card-whatsapp" title="WhatsApp" contactMode="whatsapp" />
      <ChannelsPopover id="card-phone" title="Contato" contactMode="phone" placement="above" />
    </main>
  </div>;
}
