"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { Mail, Music2, Camera, X } from "lucide-react";
import { WhatsAppIcon } from "./whatsapp-icon";
import { contacts, digitalChannels } from "@/lib/content";

function Facebook({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 21v-8h3l.5-4H14V7c0-1 .3-2 2-2h2V1.5C17.5 1.3 16 1 14.5 1 11 1 9 3.1 9 7v2H6v4h3v8z" /></svg>;
}

type ChannelsPopoverProps = {
  id: string;
  title: string;
  kind?: "contact" | "social";
  placement?: "below" | "above" | "right";
  /** A supplied mode shows the attendants directly; omission preserves the channel chooser. */
  contactMode?: "whatsapp" | "phone";
};

export function ChannelsPopover({ id, title, kind = "contact", placement = "below", contactMode }: ChannelsPopoverProps) {
  const panel = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useLayoutEffect(() => {
    const element = panel.current;
    if (!open || !element) return;
    const source = opener.current ?? document.querySelector<HTMLElement>(`[popovertarget="${id}"]`);
    const trigger = source?.closest("#site-navigation") && matchMedia("(max-width:767px)").matches ? document.querySelector<HTMLElement>(".mobile-menu-toggle") : source;
    if (!trigger) return;
    if (contactMode) opener.current = trigger;
    const position = () => {
      const viewport = window.visualViewport;
      const width = viewport?.width ?? window.innerWidth;
      const height = viewport?.height ?? window.innerHeight;
      const offsetY = viewport?.offsetTop ?? 0;
      const offsetX = viewport?.offsetLeft ?? 0;
      const anchor = trigger.getBoundingClientRect();
      element.style.maxWidth = `${Math.max(0, width - 24)}px`;
      element.style.maxHeight = `${Math.max(0, height - 24)}px`;
      // Untransformed dimensions avoid position drift during the entrance animation.
      const panelWidth = element.offsetWidth;
      const panelHeight = element.offsetHeight;
      const rightFits = placement === "right" && anchor.right + 16 + panelWidth <= width - 12;
      const left = rightFits ? anchor.right + 16 : Math.min(Math.max(anchor.left + anchor.width / 2 - panelWidth / 2, 12), width - panelWidth - 12);
      const below = anchor.bottom + 12;
      const above = anchor.top - panelHeight - 12;
      const preferredTop = rightFits ? anchor.top - 20 : placement === "above" && above >= 12 ? above : below + panelHeight <= height - 12 ? below : above;
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
  }, [id, open, placement, contactMode]);

  const people = <div className="whatsapp-people">{contacts.map((person) => <a href={contactMode === "phone" ? `tel:+${new URL(person.href).pathname.replace(/\D/g, "")}` : person.href} target={contactMode === "phone" ? undefined : "_blank"} rel={contactMode === "phone" ? undefined : "noopener noreferrer"} key={person.name} className="person-link flow-glass flow-capsule" aria-label={`${contactMode === "phone" ? "Ligar para" : "WhatsApp de"} ${person.name}${person.role ? `, ${person.role}` : ""}`}><strong>{person.name}{person.role && <> — <span>{person.role}</span></>}</strong></a>)}</div>;
  return <div ref={panel} id={id} popover="auto" role="dialog" aria-labelledby={`${id}-title`} className="channel-panel glass" data-placement={placement} data-open={open || undefined} onToggle={(event) => {
    if (event.newState === "open") {
      const source = (event.nativeEvent as Event & { source?: Element }).source;
      opener.current = source instanceof HTMLElement ? source : document.activeElement instanceof HTMLElement && document.activeElement.getAttribute("popovertarget") === id ? document.activeElement : null;
    } else {
      setExpanded(false);
      if (contactMode) opener.current?.focus({ preventScroll: true });
    }
    setOpen(event.newState === "open");
  }}>
    <div className="channel-heading"><h2 id={`${id}-title`}>{title}</h2><button className="icon-button popover-close" type="button" popoverTarget={id} popoverTargetAction="hide" aria-label={`Fechar ${title.toLowerCase()}`}><X size={18} aria-hidden="true" /></button></div>
    {kind === "contact" ? contactMode ? people : <>
      <button type="button" className="channel-row flow-glass flow-capsule whatsapp-toggle" aria-expanded={expanded} aria-controls={`${id}-people`} onClick={() => setExpanded(!expanded)}><WhatsAppIcon /><span><strong>WhatsApp</strong></span></button>
      <div id={`${id}-people`} className="whatsapp-collapse" data-expanded={expanded} inert={!expanded} aria-hidden={!expanded}><div>{people}</div></div>
      <a className="channel-row flow-glass flow-capsule" href={`mailto:${digitalChannels.email}`}><Mail size={20} aria-hidden="true" /><span><strong>E-mail</strong></span></a>
    </> : <>
      <a className="channel-row flow-glass flow-capsule" href={digitalChannels.instagram.href} target="_blank" rel="noopener noreferrer"><Camera size={20} aria-hidden="true" /><span><strong>Instagram</strong></span></a>
      <a className="channel-row flow-glass flow-capsule" href={digitalChannels.tiktok.href} target="_blank" rel="noopener noreferrer"><Music2 size={20} aria-hidden="true" /><span><strong>TikTok</strong></span></a>
      {digitalChannels.facebook.href ? <a className="channel-row flow-glass flow-capsule" href={digitalChannels.facebook.href} target="_blank" rel="noopener noreferrer"><Facebook size={20} aria-hidden="true" /><span><strong>Facebook</strong></span></a> : <button className="channel-row flow-glass flow-capsule" type="button" disabled><Facebook size={20} aria-hidden="true" /><span><strong>Facebook</strong></span></button>}
    </>}
  </div>;
}
