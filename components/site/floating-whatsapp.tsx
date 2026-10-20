"use client";

import { useEffect, useRef, useState } from "react";
import { contacts } from "@/lib/content";
import { WhatsAppIcon } from "./whatsapp-icon";

/** Shares the same official destinations as navbar and footer. Native popover owns dismissal. */
export function FloatingWhatsApp() {
  const trigger = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (open) menu.current?.querySelector<HTMLAnchorElement>("a")?.focus({ preventScroll: true });
  }, [open]);
  useEffect(() => {
    const panel = menu.current;
    if (!panel) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        panel.hidePopover();
        trigger.current?.focus({ preventScroll: true });
      }
    };
    panel.addEventListener("keydown", escape);
    return () => panel.removeEventListener("keydown", escape);
  }, []);
  return <div className="floating-whatsapp">
    <div ref={menu} id="floating-whatsapp-contacts" popover="auto" className="floating-whatsapp-menu glass" aria-label="Contatos WhatsApp" onToggle={event => setOpen(event.newState === "open")}>
      {contacts.map(person => <a className="floating-person flow-glass flow-capsule" key={person.name} href={person.href} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp de ${person.name}${person.role ? `, ${person.role}` : ""}`} onClick={() => menu.current?.hidePopover()}><strong>{person.name}</strong>{person.role && <span>{person.role}</span>}</a>)}
    </div>
    <button ref={trigger} className="floating-whatsapp-button glass flow-glass flow-capsule" type="button" popoverTarget="floating-whatsapp-contacts" aria-label="Conversar pelo WhatsApp" aria-expanded={open} aria-controls="floating-whatsapp-contacts"><WhatsAppIcon size={25} /></button>
  </div>;
}
