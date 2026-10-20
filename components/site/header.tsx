"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { navigation } from "@/lib/content";
import { headerShouldHide } from "@/lib/header-visibility";

gsap.registerPlugin(ScrollTrigger);

export function SiteHeader() {
  const header = useRef<HTMLElement>(null);
  const [active, setActive] = useState("");
  useEffect(() => {
    const element = header.current;
    if (!element) return;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let hidden = false;
    let focusFrame = 0;
    const sync = () => {
      const current = window.scrollY;
      const interacting = element.contains(document.activeElement) || !!document.querySelector('.channel-panel[data-placement="below"]:popover-open');
      const nextHidden = headerShouldHide(hidden, current, interacting);
      if (nextHidden !== hidden) {
        hidden = nextHidden;
        element.inert = hidden;
        element.dataset.hidden = String(hidden);
        gsap.to(element, { y: hidden && !media.matches ? -24 : 0, opacity: hidden ? 0 : 1, duration: media.matches ? 0 : 0.475, ease: "power2.out", overwrite: true });
      }
      element.dataset.scrolled = String(current > 60);
      const institutional = document.getElementById("institucional");
      const section = institutional && institutional.getBoundingClientRect().top < window.innerHeight * 0.7 ? "#institucional" : ["sobre", "servicos"].find((id) => (document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) < window.innerHeight * 0.45);
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
    return () => { cancelAnimationFrame(focusFrame); context.revert(); gsap.killTweensOf(element); document.removeEventListener("toggle", popover, true); element.removeEventListener("focusin", focus); element.removeEventListener("focusout", focus); };
  }, []);

  return <header ref={header} className="site-header">
    <a href="#inicio" className="brand-link"><Image src="/brand/ZURY_Logo_Otimizada_Branco.svg" alt="ZURY CORRETORA" width={1046} height={324} priority /></a>
    <nav aria-label="Navegação principal" className="nav-glass glass">
      {navigation.map((item) => <a className="flow-glass flow-capsule" key={item.href} href={item.href} aria-current={active === item.href ? "location" : undefined}>{item.label}</a>)}
      <button className="flow-glass flow-capsule" type="button" popoverTarget="nav-contact-channels" aria-haspopup="dialog">CONTATO</button>
      <button className="flow-glass flow-capsule" type="button" popoverTarget="social-channels" aria-haspopup="dialog">REDES SOCIAIS</button>
    </nav>
  </header>;
}
