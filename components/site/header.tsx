"use client";

import { OfficialLogo } from "./official-logo";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { navigation, type SiteNavigationItem } from "@/lib/content";
import { headerShouldHide } from "@/lib/header-visibility";
import { Menu, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function SiteHeader({ items = navigation }: { items?: readonly SiteNavigationItem[] }) {
  const header = useRef<HTMLElement>(null);
  const navbar = useRef<HTMLElement>(null);
  const hoverGlass = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState("");
  const [mobile, setMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => { const surface = hoverGlass.current; return () => { if (surface) gsap.killTweensOf(surface); }; }, []);
  useEffect(() => {
    const query = matchMedia("(max-width:767px)");
    const update = () => { if (!query.matches && navbar.current?.matches(":popover-open")) navbar.current.hidePopover(); setMobile(query.matches); };
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    const element = header.current;
    const navigationElement = navbar.current;
    if (!element || !navigationElement) return;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let hidden = false;
    let focusFrame = 0;
    const sync = () => {
      const current = window.scrollY;
      const interacting = element.contains(document.activeElement) || navigationElement.matches(":popover-open") || !!document.querySelector('.channel-panel[data-placement="below"]:popover-open');
      const nextHidden = headerShouldHide(hidden, current, interacting);
      if (nextHidden !== hidden) {
        hidden = nextHidden;
        navigationElement.inert = hidden;
        navigationElement.dataset.hidden = String(hidden);
        gsap.to(navigationElement, { y: hidden && !media.matches ? -24 : 0, opacity: hidden ? 0 : 1, duration: media.matches ? 0 : hidden ? .32 : .24, ease: "power2.out", overwrite: true });
      }
      element.dataset.scrolled = String(current > 60);
      const institutional = document.getElementById("institucional");
      const section = institutional && institutional.getBoundingClientRect().top < window.innerHeight * 0.7 ? "#institucional" : ["beneficios", "indicacoes", "sobre", "servicos"].find((id) => (document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) < window.innerHeight * 0.45);
      setActive(section ? section.startsWith("#") ? section : `#${section}` : "");
    };
    const context = gsap.context(() => {
      ScrollTrigger.create({ start: 0, end: "max", onUpdate: sync });
      sync();
    }, element);
    const focus = () => { cancelAnimationFrame(focusFrame); focusFrame = requestAnimationFrame(sync); };
    const popover = (event: Event) => { if (event.target instanceof HTMLElement && event.target.dataset.placement === "below") focus(); };
    document.addEventListener("toggle", popover, true);
    element.addEventListener("focusin", focus);
    element.addEventListener("focusout", focus);
    return () => { cancelAnimationFrame(focusFrame); context.revert(); gsap.killTweensOf(navigationElement); document.removeEventListener("toggle", popover, true); element.removeEventListener("focusin", focus); element.removeEventListener("focusout", focus); };
  }, []);

  return <header ref={header} className="site-header">
    <div className="header-surface" aria-hidden="true" />
    <a href="#inicio" className="brand-link"><OfficialLogo priority graphite /></a>
    <button type="button" className="mobile-menu-toggle glass" popoverTarget="site-navigation" aria-controls="site-navigation" aria-expanded={menuOpen} aria-label={menuOpen ? "Fechar navegação" : "Abrir navegação"}>{menuOpen ? <X size={23} aria-hidden="true" /> : <Menu size={23} aria-hidden="true" />}</button>
    <div className="nav-entry">
    <nav ref={navbar} id="site-navigation" popover={mobile ? "auto" : undefined} aria-label="Navegação principal" className="nav-glass glass" onPointerOver={event => {
      const item = (event.target as HTMLElement).closest<HTMLElement>("a,button");
      const surface = hoverGlass.current;
      if (!surface || mobile || !item || item.classList.contains("priority-cta")) { if (surface) gsap.to(surface,{opacity:0,duration:.16,overwrite:true}); return; }
      const bounds = item.getBoundingClientRect(); const parent = event.currentTarget.getBoundingClientRect();
      const reduced = matchMedia("(prefers-reduced-motion:reduce)").matches;
      gsap.to(surface,{x:bounds.left-parent.left,y:bounds.top-parent.top,width:bounds.width,height:bounds.height,opacity:1,duration:reduced ? 0 : .18,ease:"power3.out",overwrite:true});
    }} onPointerLeave={() => { if (hoverGlass.current) gsap.to(hoverGlass.current,{opacity:0,duration:.2,overwrite:true}); }} onToggle={event => { const opened = event.newState === "open"; setMenuOpen(opened); if (opened) event.currentTarget.querySelector<HTMLAnchorElement>("a")?.focus({ preventScroll: true }); }}>
      <span ref={hoverGlass} className="nav-hover-glass" aria-hidden="true" />
      {items.map((item) => <a className="flow-glass flow-capsule" key={item.href} href={item.href} aria-current={active === item.href ? "location" : undefined} onClick={() => { if (mobile && navbar.current?.matches(":popover-open")) navbar.current.hidePopover(); }}>{item.label}</a>)}
      <button className="flow-glass flow-capsule" type="button" popoverTarget="social-channels" aria-haspopup="dialog" onClick={() => { if (mobile && navbar.current?.matches(":popover-open")) navbar.current.hidePopover(); }}>REDES SOCIAIS</button>
      <button className="flow-glass flow-capsule priority-cta cta-beam" type="button" popoverTarget="nav-contact-channels" aria-haspopup="dialog" onClick={() => { if (mobile && navbar.current?.matches(":popover-open")) navbar.current.hidePopover(); }}><span className="cta-border-beam" aria-hidden="true" /><span className="cta-breathing-glow" aria-hidden="true" /><span className="cta-label">CONTATO</span></button>
    </nav>
    </div>
  </header>;
}
