"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { anchorScrollPosition, navigationDuration } from "@/lib/navigation";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export function SiteMotion() {
  useEffect(() => {
    const root = document.querySelector(".zury-site");
    if (!root) return;
    const media = gsap.matchMedia();
    let scrollTween: gsap.core.Tween | undefined;
    const stopScroll = () => { scrollTween?.kill(); scrollTween = undefined; };
    const keyboardScroll = (event: KeyboardEvent) => { if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(event.key)) stopScroll(); };
    const navigate = (event: Event) => {
      if (!(event instanceof MouseEvent) || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href^="#"]') : null;
      if (!link || link.target || link.hasAttribute("download")) return;
      const hash = link.getAttribute("href");
      const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
      if (!hash || !target) return;
      event.preventDefault();
      stopScroll();
      // Layout offsets exclude reveal transforms, unlike getBoundingClientRect().
      let layoutTop = 0;
      let node: HTMLElement | null = target;
      while (node) { layoutTop += node.offsetTop; node = node.offsetParent as HTMLElement | null; }
      const y = anchorScrollPosition(layoutTop, ScrollToPlugin.max(window));
      if (location.hash !== hash) history.pushState(null, "", hash);
      // Move focus away from the disappearing header without inducing a second scroll.
      target.focus({ preventScroll: true });
      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
      scrollTween = gsap.to(window, { scrollTo: { y, autoKill: true }, duration: reduce ? 0 : navigationDuration(y - window.scrollY), ease: "power2.inOut", overwrite: "auto", onComplete: () => { scrollTween = undefined; } });
    };
    root.addEventListener("click", navigate);
    window.addEventListener("wheel", stopScroll, { passive: true });
    window.addEventListener("touchstart", stopScroll, { passive: true });
    window.addEventListener("keydown", keyboardScroll);
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.from(".hero h1", { y: 22, opacity: 0, duration: 1.1, ease: "power3.out", delay: 0.15, clearProps: "all" });
        root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((item) => {
          // Outer wrapper owns the reveal; its card child owns CSS hover transforms.
          const scrollTrigger = { trigger: item, start: "top 94%", end: "bottom -8%", toggleActions: "play reverse play reverse" };
          const entrance = { opacity: 1, y: 0, duration: 0.85, ease: "power3.out" };
          const parts = item.querySelectorAll<HTMLElement>("[data-reveal-part]");
          if (parts.length) {
            // One trigger/timeline: shared panel displacement, coordinated child fades.
            gsap.timeline({ scrollTrigger })
              .fromTo(item, { opacity: 0, y: 24 }, entrance)
              .fromTo(parts, { opacity: 0 }, { opacity: 1, duration: entrance.duration, ease: entrance.ease, stagger: 0.06 }, 0);
          } else {
            gsap.fromTo(item, { opacity: 0, y: 24 }, { ...entrance, scrollTrigger });
          }
        });
        root.querySelectorAll<HTMLElement>(".section-light").forEach((light) => {
          gsap.fromTo(light, { opacity: 0.5 }, { opacity: 1, ease: "none", scrollTrigger: { trigger: light.parentElement, start: "top bottom", end: "center center", scrub: 1 } });
        });
      }, root);
      return () => context.revert();
    });
    let disposed = false;
    document.fonts.ready.then(() => { if (!disposed) ScrollTrigger.refresh(); });
    return () => { disposed = true; stopScroll(); media.revert(); root.removeEventListener("click", navigate); window.removeEventListener("wheel", stopScroll); window.removeEventListener("touchstart", stopScroll); window.removeEventListener("keydown", keyboardScroll); };
  }, []);
  return null;
}
