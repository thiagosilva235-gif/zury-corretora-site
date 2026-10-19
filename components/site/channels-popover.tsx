"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { Mail, Music2, Camera, X } from "lucide-react";
import { WhatsAppIcon } from "./whatsapp-icon";
import { contacts, digitalChannels } from "@/lib/content";

export function ChannelsPopover({ id, title, whatsappOnly = false, placement = "auto" }: { id: string; title: string; whatsappOnly?: boolean; placement?: "auto" | "below" | "right" }) {
  const panel = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);

  useLayoutEffect(() => {
    const element = panel.current;
    if (!open || !element) return;
    const trigger = opener.current ?? document.querySelector<HTMLElement>(`[popovertarget="${id}"]`);
    if (!trigger) return;
    const position = () => {
      const viewport = window.visualViewport;
      const width = viewport?.width ?? window.innerWidth;
      const height = viewport?.height ?? window.innerHeight;
      const offsetY = viewport?.offsetTop ?? 0;
      const offsetX = viewport?.offsetLeft ?? 0;
      const anchor = trigger.getBoundingClientRect();
      // Untransformed dimensions avoid position drift during the entrance animation.
      const panelWidth = element.offsetWidth;
      const panelHeight = element.offsetHeight;
      const rightFits = placement === "right" && anchor.right + 16 + panelWidth <= width - 12;
      const left = rightFits ? anchor.right + 16 : width < 600 ? 12 : Math.min(Math.max(anchor.right - panelWidth, 16), width - panelWidth - 16);
      const below = anchor.bottom + 12;
      const above = anchor.top - panelHeight - 12;
      const preferredTop = rightFits ? anchor.top - 20 : width < 600 && placement !== "below" ? height - panelHeight - 12 : below + panelHeight <= height - 12 ? below : above;
      const top = Math.max(12, Math.min(preferredTop, height - panelHeight - 12));
      element.dataset.side = rightFits ? "right" : "vertical";
      element.style.left = `${left + offsetX}px`;
      element.style.top = `${top + offsetY}px`;
    };
    position();
    const observer = new ResizeObserver(position);
    observer.observe(element);
    window.addEventListener("resize", position);
    window.addEventListener("scroll", position, { passive: true });
    window.visualViewport?.addEventListener("resize", position);
    const close = element.querySelector<HTMLButtonElement>(".popover-close");
    close?.focus({ preventScroll: true });
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); element.hidePopover(); trigger.focus({ preventScroll: true }); }
    };
    element.addEventListener("keydown", escape);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", position);
      window.removeEventListener("scroll", position);
      window.visualViewport?.removeEventListener("resize", position);
      element.removeEventListener("keydown", escape);
    };
  }, [id, open, placement]);

  const people = <div className="whatsapp-people">{contacts.map((person) => <a href={person.href} target="_blank" rel="noopener noreferrer" key={person.name} className="person-link flow-glass" aria-label={`WhatsApp de ${person.name}, ${person.role}, ${person.phone}`}><span><strong>{person.name.toLocaleUpperCase("pt-BR")} — <small>{person.role.toLocaleUpperCase("pt-BR")}</small></strong><span>{person.phone}</span></span></a>)}</div>;
  return <div ref={panel} id={id} popover="auto" role="dialog" aria-labelledby={`${id}-title`} className="channel-panel glass" data-placement={placement} data-open={open || undefined} onToggle={(event) => { if (event.newState === "open") { const source = (event.nativeEvent as Event & { source?: Element }).source; opener.current = source instanceof HTMLElement ? source : document.activeElement instanceof HTMLElement && document.activeElement.getAttribute("popovertarget") === id ? document.activeElement : null; } setOpen(event.newState === "open"); }}>
    <div className="channel-heading"><h2 id={`${id}-title`}>{title}</h2><button className="icon-button popover-close" type="button" popoverTarget={id} popoverTargetAction="hide" aria-label={`Fechar ${title.toLowerCase()}`}><X size={18} aria-hidden="true" /></button></div>
    {whatsappOnly ? people : <><details className="whatsapp-options">
      <summary className="channel-row flow-glass"><WhatsAppIcon /><span><strong>WhatsApp</strong><small>Escolha com quem conversar</small></span><span className="details-toggle" aria-hidden="true" /></summary>
      {people}
    </details>
    <div className="channel-row channel-pending"><Camera size={20} aria-hidden="true" /><span><strong>Instagram</strong><small>{digitalChannels.instagram.handle}</small></span><span className="verification-note">Em verificação</span></div>
    <div className="channel-row channel-pending"><Music2 size={20} aria-hidden="true" /><span><strong>TikTok</strong><small>{digitalChannels.tiktok.handle}</small></span><span className="verification-note">Em verificação</span></div>
    <a className="channel-row flow-glass" href={`mailto:${digitalChannels.email}`}><Mail size={20} aria-hidden="true" /><span><strong>E-mail</strong><small>{digitalChannels.email}</small></span></a></>}
  </div>;
}
