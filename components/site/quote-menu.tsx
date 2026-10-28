"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, Check, Menu, X } from "lucide-react";
import { services } from "@/lib/content";
import "./quote-menu.css";

export function QuoteTrigger({ solution }: { solution: string }) {
  return <button type="button" className="quote-trigger quote-card-trigger" aria-label={`Cotar agora: ${solution}`} aria-haspopup="dialog" aria-controls="quote-dialog" onClick={event => window.dispatchEvent(new CustomEvent("zury:quote", { detail: { solution, trigger: event.currentTarget } }))}>COTAR AGORA<ArrowRight size={17} aria-hidden="true" /></button>;
}

type QuoteMenuProps = {
  className?: string;
  children?: ReactNode;
};

export function QuoteMenu({ className = "quote-trigger quote-hero-trigger cta-beam", children }: QuoteMenuProps = {}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLButtonElement | null>(null);
  const [selected, setSelected] = useState("");
  const [review, setReview] = useState(false);
  useEffect(() => {
    const open = (event: Event) => {
      const { solution, trigger: source } = (event as CustomEvent<{ solution: string; trigger: HTMLButtonElement }>).detail;
      setSelected(solution);
      setReview(false);
      returnFocus.current = source;
      dialog.current?.showModal();
    };
    window.addEventListener("zury:quote", open);
    return () => window.removeEventListener("zury:quote", open);
  }, []);
  useEffect(() => {
    if (!dialog.current?.open) return;
    if (review) dialog.current.querySelector<HTMLButtonElement>(".quote-actions button")?.focus();
    else dialog.current.querySelector<HTMLInputElement>('input:checked')?.focus();
  }, [review]);
  return <>
    <button ref={trigger} type="button" className={className} aria-haspopup="dialog" aria-controls="quote-dialog" onClick={() => { returnFocus.current = trigger.current; setReview(false); dialog.current?.showModal(); }}>{children ?? <><span className="cta-border-beam" aria-hidden="true" /><span className="cta-breathing-glow" aria-hidden="true" /><Menu size={18} aria-hidden="true" /><span className="cta-label">COTAR AGORA</span></>}</button>
    <dialog ref={dialog} id="quote-dialog" className="quote-dialog" aria-labelledby="quote-title" onClose={() => (returnFocus.current ?? trigger.current)?.focus()} onClick={event => { if (event.target === event.currentTarget) { const bounds = event.currentTarget.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) event.currentTarget.close(); } }}>
      <header className="quote-header"><h2 id="quote-title">COTAR AGORA</h2><button type="button" className="quote-close" aria-label="Fechar cotação" onClick={() => dialog.current?.close()}><X size={22} /></button></header>
      <form onSubmit={event => { event.preventDefault(); if (selected) setReview(true); }}>
        <p className="quote-progress">{review ? "SOLUÇÃO SELECIONADA" : "ETAPA 01 · ESCOLHA A SOLUÇÃO"}</p>
        {!review ? <fieldset className="quote-options"><legend>QUAL SOLUÇÃO VOCÊ PROCURA?</legend>{services.map(service => <label className="quote-option" key={service.number}><input type="radio" name="solution" value={service.title} checked={selected === service.title} onChange={() => setSelected(service.title)} required /><span>{service.title}</span><Check size={17} aria-hidden="true" /></label>)}</fieldset> : <div className="quote-summary" role="status"><h3>{selected}</h3><p>AS PRÓXIMAS ETAPAS DESTA COTAÇÃO SERÃO DISPONIBILIZADAS EM BREVE. NENHUMA SOLICITAÇÃO FOI ENVIADA.</p></div>}
        <footer className="quote-actions">{review ? <button key="back" type="button" onClick={event => { event.preventDefault(); setReview(false); }}><ArrowLeft size={17} aria-hidden="true" />ALTERAR SOLUÇÃO</button> : <button key="continue" type="submit" disabled={!selected}>CONTINUAR<ArrowRight size={17} aria-hidden="true" /></button>}</footer>
      </form>
    </dialog>
  </>;
}
