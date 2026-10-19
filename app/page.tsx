import Image from "next/image";
import { CarFront, HeartPulse, House, Hourglass, Landmark, Plane, Sprout, Truck } from "lucide-react";
import { WhatsAppIcon } from "@/components/site/whatsapp-icon";
import { differentiators, navigation, services } from "@/lib/content";
import { SiteHeader } from "@/components/site/header";
import { ChannelsPopover } from "@/components/site/channels-popover";
import { Carousel } from "@/components/site/carousel";
import { SiteMotion } from "@/components/site/motion";

const icons = { House, HeartPulse, Sprout, CarFront, Landmark, Plane, Truck, Hourglass };

export default function Home() {
  return <div className="zury-site">
    <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
    <SiteHeader />
    <main id="conteudo">
      <section id="inicio" className="hero" aria-labelledby="hero-title">
        <div className="section-light hero-light" aria-hidden="true" />
        <div className="container hero-content">
          <h1 id="hero-title"><span>ENTREGAMOS</span><span>VALOR ALÉM</span><span>DE PREÇO</span></h1>
          <div className="hero-reserve" aria-hidden="true" />
        </div>
      </section>
      <section id="servicos" className="content-section solutions section-boundary" aria-labelledby="solutions-title">
        <div className="section-light solutions-light" aria-hidden="true" />
        <div className="container">
          <div className="section-heading" data-reveal><h2 id="solutions-title">NOSSAS SOLUÇÕES</h2></div>
          <Carousel className="service-grid" label="Nossas soluções">
            {services.map((service) => {
              const Icon = icons[service.icon];
              return <div className="card-reveal" data-reveal key={service.number}><article className="glass glass-card flow-glass service-card" aria-label={`${service.number} de 08: ${service.title}`}>
                <span className="card-number">{service.number}</span>
                <div className="card-title"><Icon size={24} strokeWidth={1.4} aria-hidden="true" /><h3>{service.title}</h3></div>
                <ul>{service.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </article></div>;
            })}
          </Carousel>
        </div>
      </section>
      <section id="sobre" className="content-section about section-boundary" aria-labelledby="differences-title">
        <div className="section-light about-light" aria-hidden="true" />
        <div className="container">
          <div className="section-heading" data-reveal><h2 id="differences-title">NOSSOS DIFERENCIAIS</h2></div>
          <Carousel className="difference-grid" label="Nossos diferenciais">
            {differentiators.map((item) => <div className="card-reveal" data-reveal key={item.number}><article className="glass glass-card flow-glass difference-card" aria-label={`${item.number} de 03: ${item.title}`}>
              <span className="card-number">{item.number}</span><h3>{item.title}</h3><p>{item.description}</p>
            </article></div>)}
          </Carousel>
        </div>
      </section>
    </main>
    <footer id="contato" className="site-footer section-boundary">
      <div className="container"><div className="footer-panel glass" data-reveal>
        <Image className="footer-logo" src="/brand/ZURY_Logo_Otimizada_Branco.svg" alt="ZURY CORRETORA" width={1046} height={324} />
        <div className="footer-columns">
          <nav aria-label="Navegação do rodapé" className="footer-nav"><h2>Navegação</h2><button className="footer-contact-link" type="button" id="footer-contact-button" popoverTarget="contact-channels" aria-haspopup="dialog">CONTATOS</button>{navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>
          <div className="footer-contact"><button className="glass glass-button whatsapp-button flow-glass" type="button" popoverTarget="whatsapp-channels" aria-haspopup="dialog"><WhatsAppIcon size={22} />WHATSAPP</button></div>
          <div className="institution" id="institucional" tabIndex={-1}><h2>Institucional</h2><p>ZURY CORRETORA LTDA<br />CNPJ: 49.393.734/0001-77<br />SUSEP: 262180499</p></div>
        </div>
        <p className="copyright">© 2026 · Todos os direitos reservados.</p>
      </div></div>
    </footer>
    <ChannelsPopover id="contact-channels" title="Contatos" placement="right" />
    <ChannelsPopover id="nav-contact-channels" title="Contato" placement="below" />
    <ChannelsPopover id="social-channels" title="Redes sociais" placement="below" />
    <ChannelsPopover id="whatsapp-channels" title="WhatsApp" whatsappOnly />
    <SiteMotion />
  </div>;
}
