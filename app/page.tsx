import { OfficialLogo } from "@/components/site/official-logo";
import "@/components/site/service-cards.css";
import "@/components/site/editorial-surfaces.css";
import { CarFront, Headset, HeartPulse, House, Scale, Landmark, Plane, ShieldCheck, Sprout, Truck, Zap } from "lucide-react";
import { Companies } from "@/components/site/companies";
import { differentiatorDetails, differentiators, googleReviewHref, heroLines, heroSubtitle, institutionalLinks, isBenefitsPreviewEnabled, isReferralPreviewEnabled, navigation, navigationForSite, services } from "@/lib/content";
import { ExclusiveBenefits } from "@/components/site/exclusive-benefits";
import { ReferralProgram } from "@/components/site/referral-program";
import { SiteHeader } from "@/components/site/header";
import { ChannelsPopover } from "@/components/site/channels-popover";
import { Carousel } from "@/components/site/carousel";
import { SiteMotion } from "@/components/site/motion";
import { FloatingWhatsApp } from "@/components/site/floating-whatsapp";
import { HeroShield } from "@/components/site/hero-shield";
import { QuoteMenu, QuoteTrigger } from "@/components/site/quote-menu";

const icons = { House, HeartPulse, Sprout, CarFront, Landmark, Plane, Truck, Scale };
const differenceIcons = [ShieldCheck, Headset, Zap];

export default function Home() {
  const showReferrals = isReferralPreviewEnabled(process.env);
  const showBenefits = isBenefitsPreviewEnabled(process.env);
  return <div className="zury-site">
    <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
    <SiteHeader items={navigationForSite(showReferrals, showBenefits)} />
    <main id="conteudo" tabIndex={-1}>
      <section id="inicio" className="hero" tabIndex={-1} aria-labelledby="hero-title">
        <div className="section-light hero-light" aria-hidden="true" />
        <div className="container hero-content">
          <div className="hero-copy-position"><div className="hero-copy"><h1 id="hero-title">{heroLines.map((line, index) => <span className={`hero-line${index === 2 ? " hero-line-accent" : ""}`} key={line}>{index > 0 ? " " : ""}{line}</span>)}</h1><p className="hero-subtitle">{heroSubtitle.split("/").map((word, index) => <span key={word}>{index > 0 ? " " : ""}{word}</span>)}</p><QuoteMenu /></div></div>
          <HeroShield />
        </div>
      </section>
      <section id="servicos" className="content-section solutions section-boundary" tabIndex={-1} aria-labelledby="solutions-title">
        <div className="section-light solutions-light" aria-hidden="true" />
        <div className="container">
          <div className="section-heading" data-reveal><h2 id="solutions-title">NOSSAS SOLUÇÕES</h2></div>
          <Carousel className="service-grid" label="Nossas soluções">
            {services.map((service) => {
              const Icon = icons[service.icon];
              return <div className="card-reveal" data-reveal key={service.number}><article className="glass glass-card flow-glass service-card" data-service={service.number} aria-label={`${service.number} de 08: ${service.title}`}>
                <span className="card-number">{service.number}</span>
                <div className="card-title"><Icon size={24} strokeWidth={1.4} aria-hidden="true" /><h3>{service.title}</h3></div>
                <ul>{service.items.map((item) => <li key={item}>{item}</li>)}</ul>
                <QuoteTrigger solution={service.title} />
              </article></div>;
            })}
          </Carousel>
        </div>
      </section>
      <section id="sobre" className="content-section about section-boundary" tabIndex={-1} aria-labelledby="differences-title">
        <div className="section-light about-light" aria-hidden="true" />
        <div className="container">
          <div className="section-heading" data-reveal><h2 id="differences-title">NOSSOS DIFERENCIAIS</h2></div>
          <Carousel className="difference-grid" label="Nossos diferenciais">
            {differentiators.map((item, index) => {
              const Icon = differenceIcons[index];
              return <div className="card-reveal" data-reveal key={item.number}><article className="glass glass-card flow-glass difference-card" aria-label={`${item.number} de 03: ${item.title}`}>
                <div className="card-title"><Icon size={24} strokeWidth={1.4} aria-hidden="true" /><h3>{item.title}</h3></div>
                <ul>{differentiatorDetails(item.description).map((detail) => <li key={detail}>{detail}</li>)}</ul>
              </article></div>;
            })}
          </Carousel>
        </div>
      </section>
      {showReferrals && <ReferralProgram />}
      <Companies />
      {showBenefits && <ExclusiveBenefits />}
    </main>
    <footer id="contato" className="site-footer section-boundary">
      <div className="container"><div className="card-reveal" data-reveal><div className="footer-panel glass glass-card flow-glass">
        <div data-reveal-part><OfficialLogo className="footer-logo" /></div>
        <div className="footer-columns">
          <nav aria-label="Navegação do rodapé" className="footer-nav" data-reveal-part><h2>Navegação</h2><button className="footer-contact-link footer-link flow-glass flow-capsule" type="button" id="footer-contact-button" popoverTarget="contact-channels" aria-haspopup="dialog">CONTATOS</button>{navigation.map((item) => <a className="footer-link flow-glass flow-capsule" key={item.href} href={item.href}>{item.label}</a>)}</nav>
          <div className="institution" id="institucional" tabIndex={-1} data-reveal-part><h2>Institucional</h2><div className="institution-details"><p>ZURY CORRETORA LTDA</p><a className="footer-link flow-glass flow-capsule" href={institutionalLinks.cnpj} target="_blank" rel="noopener noreferrer">CNPJ: 49.393.734/0001-77</a><a className="footer-link flow-glass flow-capsule" href={institutionalLinks.susep} target="_blank" rel="noopener noreferrer">SUSEP: 262180499</a></div></div>
          <nav aria-label="Feedback" className="footer-nav footer-feedback" data-reveal-part><h2>Feedback</h2><button className="footer-link flow-glass flow-capsule" type="button" popoverTarget="footer-social-channels" aria-haspopup="dialog">REDES SOCIAIS</button><a className="footer-link flow-glass flow-capsule" href={googleReviewHref} target="_blank" rel="noopener noreferrer">NOS AVALIE NO GOOGLE</a></nav>
        </div>
        <p className="copyright" data-reveal-part>© 2026 · Todos os direitos reservados.</p>
      </div></div></div>
    </footer>
    <ChannelsPopover id="contact-channels" title="Contatos" placement="above" />
    <ChannelsPopover id="nav-contact-channels" title="Contato" placement="below" />
    <ChannelsPopover id="social-channels" title="Redes sociais" kind="social" placement="below" />
    <ChannelsPopover id="footer-social-channels" title="Redes sociais" kind="social" placement="above" />
    <FloatingWhatsApp />
    <SiteMotion />
  </div>;
}
