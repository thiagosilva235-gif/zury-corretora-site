"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { benefitLoopLayout } from "@/lib/benefit-loop.mjs";

/** Measures the actual container against the card's readable minimum, not a partner limit. */
export function BenefitTrack({ children, count, logos = false }: { children: ReactNode; count: number; logos?: boolean }) {
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [copies, setCopies] = useState(1);
  useEffect(() => {
    const element = viewport.current;
    const rail = track.current;
    if (!element || !rail) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = matchMedia("(max-width: 767px)");
    let animation: Animation | undefined;
    let focused = false;
    let interacting = false;
    const pause = () => {
      if (focused || interacting || document.hidden) animation?.pause();
      else animation?.play();
    };
    const measure = () => {
      const previousDuration = Number(animation?.effect?.getTiming().duration) || 1;
      const phase = (Number(animation?.currentTime ?? 0) % previousDuration) / previousDuration;
      animation?.cancel();
      animation = undefined;
      const styles = getComputedStyle(element);
      const gap = Number.parseFloat(styles.getPropertyValue("--benefit-gap"));
      const minimum = Number.parseFloat(styles.getPropertyValue("--benefit-min-width"));
      const width = element.clientWidth;
      const moving = count > 1 && !mobile.matches && !reduced.matches;
      element.dataset.moving = String(moving);
      if (!moving) return;
      const layout = benefitLoopLayout(width, count, gap, minimum, logos ? 220 : 320);
      const cardWidth = layout.cardWidth;
      rail.style.setProperty("--benefit-width", `${cardWidth}px`);
      const distance = layout.distance;
      setCopies(layout.copies);
      // Identical complete groups meet at the boundary: positive X = left to right.
      const duration = layout.duration;
      animation = rail.animate([{ transform: `translateX(${-distance}px)` }, { transform: "translateX(0px)" }], { duration, iterations: Infinity, easing: "linear" });
      animation.currentTime = phase * duration;
      pause();
    };
    const focus = () => { focused = true; pause(); };
    const blur = (event: FocusEvent) => { focused = event.relatedTarget instanceof Node && element.contains(event.relatedTarget); pause(); };
    const down = () => { interacting = true; pause(); };
    const up = () => { interacting = false; pause(); };
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    reduced.addEventListener("change", measure);
    mobile.addEventListener("change", measure);
    document.addEventListener("visibilitychange", pause);
    element.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    element.addEventListener("focusin", focus);
    element.addEventListener("focusout", blur);
    measure();
    return () => {
      animation?.cancel(); observer.disconnect();
      reduced.removeEventListener("change", measure); mobile.removeEventListener("change", measure);
      document.removeEventListener("visibilitychange", pause);
      element.removeEventListener("pointerdown", down); window.removeEventListener("pointerup", up); window.removeEventListener("pointercancel", up);
      element.removeEventListener("focusin", focus); element.removeEventListener("focusout", blur);
    };
  }, [count, logos]);
  return <div ref={viewport} className={`benefits-grid${logos ? " company-logos" : ""}`} data-reveal tabIndex={0} aria-label={logos ? "Logos das companhias; foco pausa o movimento" : "Benefícios dos parceiros; foco pausa o movimento"}>
    <div ref={track} className="benefit-track">
      <div className="benefit-group">{children}</div>
      {Array.from({ length: copies }, (_, index) => <div key={index} className="benefit-group benefit-copy" aria-hidden="true" inert>{children}</div>)}
    </div>
  </div>;
}
