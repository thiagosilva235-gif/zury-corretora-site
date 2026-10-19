"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SiteMotion() {
  useEffect(() => {
    const root = document.querySelector(".zury-site");
    if (!root) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.from(".hero h1", { y: 22, opacity: 0, duration: 1.1, ease: "power3.out", delay: 0.15, clearProps: "all" });
        root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((item) => {
          // Outer wrapper owns the reveal; its card child owns CSS hover transforms.
          gsap.fromTo(item, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.85, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 94%", end: "bottom -8%", toggleActions: "play reverse play reverse" } });
        });
        root.querySelectorAll<HTMLElement>(".section-light").forEach((light) => {
          gsap.fromTo(light, { opacity: 0.5 }, { opacity: 1, ease: "none", scrollTrigger: { trigger: light.parentElement, start: "top bottom", end: "center center", scrub: 1 } });
        });
      }, root);
      return () => context.revert();
    });
    let disposed = false;
    document.fonts.ready.then(() => { if (!disposed) ScrollTrigger.refresh(); });
    return () => { disposed = true; media.revert(); };
  }, []);
  return null;
}
