"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Measures the actual container against the card's readable minimum, not a partner limit. */
export function BenefitTrack({ children, count }: { children: ReactNode; count: number }) {
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = viewport.current;
    const rail = track.current;
    if (!element || !rail) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = matchMedia("(max-width: 767px)");
    let animation: Animation | undefined;
    let hovered = false;
    let focused = false;
    let interacting = false;
    const pause = () => {
      if (hovered || focused || interacting || document.hidden) animation?.pause();
      else animation?.play();
    };
    const measure = () => {
      animation?.cancel();
      animation = undefined;
      const styles = getComputedStyle(element);
      const gap = Number.parseFloat(styles.getPropertyValue("--benefit-gap"));
      const minimum = Number.parseFloat(styles.getPropertyValue("--benefit-min-width"));
      const width = element.clientWidth;
      const overflow = count * minimum + Math.max(0, count - 1) * gap > width;
      const moving = overflow && !mobile.matches && !reduced.matches;
      element.dataset.moving = String(moving);
      if (!moving) return;
      const capacity = Math.max(1, Math.floor((width + gap) / (minimum + gap)));
      const cardWidth = (width - (capacity - 1) * gap) / capacity;
      rail.style.setProperty("--benefit-width", `${cardWidth}px`);
      const distance = count * (cardWidth + gap);
      // Identical complete groups meet at the boundary: positive X = left to right.
      animation = rail.animate([{ transform: `translateX(${-distance}px)` }, { transform: "translateX(0px)" }], { duration: distance / 42 * 1000, iterations: Infinity, easing: "linear" });
      pause();
    };
    const enter = (event: PointerEvent) => { if (event.pointerType === "mouse") { hovered = true; pause(); } };
    const leave = () => { hovered = false; interacting = false; pause(); };
    const focus = () => { focused = true; pause(); };
    const blur = (event: FocusEvent) => { focused = event.relatedTarget instanceof Node && element.contains(event.relatedTarget); pause(); };
    const down = () => { interacting = true; pause(); };
    const up = () => { interacting = false; pause(); };
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    reduced.addEventListener("change", measure);
    mobile.addEventListener("change", measure);
    document.addEventListener("visibilitychange", pause);
    element.addEventListener("pointerenter", enter);
    element.addEventListener("pointerleave", leave);
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
      element.removeEventListener("pointerenter", enter); element.removeEventListener("pointerleave", leave);
      element.removeEventListener("pointerdown", down); window.removeEventListener("pointerup", up); window.removeEventListener("pointercancel", up);
      element.removeEventListener("focusin", focus); element.removeEventListener("focusout", blur);
    };
  }, [count]);
  return <div ref={viewport} className="benefits-grid" data-reveal tabIndex={0} aria-label="Benefícios dos parceiros; foco pausa o movimento">
    <div ref={track} className="benefit-track">
      <div className="benefit-group">{children}</div>
      <div className="benefit-group benefit-copy" aria-hidden="true" inert>{children}</div>
    </div>
  </div>;
}
