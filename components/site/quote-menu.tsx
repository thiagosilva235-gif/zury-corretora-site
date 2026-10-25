"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Menu, X } from "lucide-react";
import { services } from "@/lib/content";
import "./quote-menu.css";

export function QuoteMenu() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [selected, setSelected] = useState("");
  const [review, setReview] = useState(false);
  useEffect(() => {
    if (!dialog.current?.open) return;
    if (review) dialog.current.querySelector<HTMLButtonElement>(".quote-actions button")?.focus();
    else dialog.current.querySelector<HTMLInputElement>('input:checked')?.focus();
  }, [review]);
  return <>
    <button ref={trigger} type="button" className="quote-trigger glass flow-glass flow-capsule" aria-haspopup="dialog" aria-controls="quote-dialog" onClick={() => { setReview(false); dialog.current?.showModal(); }}><Menu size={18} aria-hidden="true" />SOLICITAR COTAÇÃO</button>
    <dialog ref={dialog} id="quote-dialog" className="quote-dialog" aria-labelledby="quote-title" onClose={() => trigger.current?.focus()} onClick={event => { if (event.target === event.currentTarget) { const bounds = event.currentTarget.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) event.currentTarget.close(); } }}>
      <header className="quote-header"><h2 id="quote-title">SOLICITAR COTAÇÃO</h2><button type="button" className="quote-close" aria-label="Fechar cotação" onClick={() => dialog.current?.close()}><X size={22} /></button></header>
      <form onSubmit={event => { event.preventDefault(); if (selected) setReview(true); }}>
        <p className="quote-progress">{review ? "SOLUÇÃO SELECIONADA" : "ETAPA 01 · ESCOLHA A SOLUÇÃO"}</p>
        {!review ? <fieldset className="quote-options"><legend>QUAL SOLUÇÃO VOCÊ PROCURA?</legend>{services.map(service => <label className="quote-option" key={service.number}><input type="radio" name="solution" value={service.title} checked={selected === service.title} onChange={() => setSelected(service.title)} required /><span>{service.title}</span><Check size={17} aria-hidden="true" /></label>)}</fieldset> : <div className="quote-summary" role="status"><h3>{selected}</h3><p>AS PRÓXIMAS ETAPAS DESTA COTAÇÃO SERÃO DISPONIBILIZADAS EM BREVE. NENHUMA SOLICITAÇÃO FOI ENVIADA.</p></div>}
        <footer className="quote-actions">{review ? <button key="back" type="button" onClick={event => { event.preventDefault(); setReview(false); }}><ArrowLeft size={17} aria-hidden="true" />ALTERAR SOLUÇÃO</button> : <button key="continue" type="submit" disabled={!selected}>CONTINUAR<ArrowRight size={17} aria-hidden="true" /></button>}</footer>
      </form>
    </dialog>
  </>;
}
