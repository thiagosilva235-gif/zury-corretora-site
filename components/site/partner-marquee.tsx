"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { BenefitPartner } from "@/lib/content";

export function PartnerMarquee({ partners }: { partners: readonly BenefitPartner[] }) {
  const root = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(true);
  const [touching, setTouching] = useState(false);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(element);
    const visibility = () => setDocumentVisible(!document.hidden);
    visibility();
    document.addEventListener("visibilitychange", visibility);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", visibility); };
  }, []);

  // Both halves have identical geometry, including the final gap. Six slots per
  // half cover the contained desktop width; only three logos enter the AX tree.
  const sequence = [...partners, ...partners];
  return <div ref={root} className="partner-marquee" tabIndex={0} role="region" aria-label="Marcas parceiras" aria-describedby="partner-motion-help" data-running={visible && documentVisible && !touching}
    onPointerDown={(event) => { if (event.pointerType !== "mouse") setTouching(true); }}
    onPointerUp={() => setTouching(false)} onPointerCancel={() => setTouching(false)}>
    <p id="partner-motion-help" className="sr-only">FAIXA DE MARCAS PARCEIRAS. MANTENHA O FOCO OU O PONTEIRO NA FAIXA PARA PAUSAR O MOVIMENTO.</p>
    <div className="partner-track">
      {[0, 1].map((group) => <div className="partner-group" key={group} aria-hidden={group === 1 ? true : undefined}>
        {sequence.map((partner, index) => <div className="partner-logo-slot" data-copy={index >= partners.length ? "true" : undefined} aria-hidden={index >= partners.length ? true : undefined} key={`${partner.id}-${index}`}>
          <Image src={partner.logo} alt={group === 0 && index < partners.length ? partner.name : ""} width={partner.width} height={partner.height} sizes="180px" className={`partner-logo partner-logo-${partner.id}`} />
        </div>)}
      </div>)}
    </div>
  </div>;
}
