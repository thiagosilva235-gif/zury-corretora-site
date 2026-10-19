"use client";

import { Children, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Hand } from "lucide-react";

export function Carousel({ children, className, label }: { children: ReactNode; className: string; label: string }) {
  const track = useRef<HTMLDivElement>(null);
  const count = Children.count(children);
  const [active, setActive] = useState(0);
  const id = useId();
  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const sync = () => {
      const origin = element.getBoundingClientRect().left;
      const positions = [...element.children].map((child) => Math.abs(child.getBoundingClientRect().left - origin));
      setActive(positions.indexOf(Math.min(...positions)));
    };
    const observer = new ResizeObserver(sync);
    observer.observe(element);
    element.addEventListener("scroll", sync, { passive: true });
    return () => { observer.disconnect(); element.removeEventListener("scroll", sync); };
  }, []);
  const move = (direction: number) => {
    const element = track.current;
    const child = element?.children[Math.min(count - 1, Math.max(0, active + direction))] as HTMLElement;
    if (element && child) element.scrollTo({ left: child.offsetLeft - (element.firstElementChild as HTMLElement).offsetLeft, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };
  return <div className="carousel-region" aria-label={label} role="group" aria-roledescription="carrossel">
    <p className="swipe-hint"><Hand size={15} aria-hidden="true" />ARRASTE PARA A ESQUERDA PARA VER MAIS</p>
    <div ref={track} id={id} className={`carousel ${className}`} tabIndex={0} onKeyDown={(event) => { if (event.target !== event.currentTarget) return; if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); } }}>{children}</div>
    <div className="carousel-controls"><span aria-live="polite" aria-atomic="true">{String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}</span><div className="carousel-positions" aria-label={`Escolher cartão: ${label}`}>{Array.from({ length: count }, (_, index) => <button key={index} type="button" aria-label={`${label}: cartão ${index + 1} de ${count}`} aria-current={active === index ? "true" : undefined} aria-controls={id} onClick={() => move(index - active)}><span aria-hidden="true" /></button>)}</div></div>
  </div>;
}
