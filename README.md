# ZURY CORRETORA

Landing page Next.js App Router, TypeScript, Tailwind CSS e GSAP. A fonte é Inter Tight, hospedada pela própria aplicação via `next/font`. Requisitos e conteúdo oficiais: `ZURY-SITE-SPEC.md`. Processo: `AGENTS.md`.

## Executar localmente

No ambiente Codex auditado, o PATH é configurado somente para a sessão:

```sh
export PATH="/Users/thiagocareca/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH"
pnpm install --frozen-lockfile
pnpm dev --hostname 127.0.0.1 --port 3001
```

Site: http://127.0.0.1:3001/

Escudo isolado: http://127.0.0.1:3001/preview/escudo

## Verificações

```sh
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

Os testes comparam os conteúdos à especificação e verificam simetria, topologia e limites de movimento do escudo. O Node pode emitir um aviso não bloqueante sobre inferência ESM dos arquivos TypeScript nesses testes.

Se o executor de scripts do ambiente retornar `binding to a port: Operation not permitted` no Turbopack, o build foi validado diretamente com o mesmo Node, sem reinstalações:

```sh
node node_modules/next/dist/bin/next build
node node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port 3001
```

## Estado da entrega

O redesign utiliza gradientes neutros, divisões luminosas sutis e Flow Glass compartilhado sem spotlight. A navbar sai em 950 ms e só reaparece no topo; foco visível e menus abertos são protegidos. CONTATOS é textual à esquerda do rodapé e abre preferencialmente à direita; CONTATO da navbar abre abaixo. Ambos contêm somente WhatsApp/e-mail. REDES SOCIAIS contém somente os dois links fornecidos pelo proprietário, acessíveis na inspeção pública desta revisão. O botão WhatsApp do rodapé foi removido, sem espaço reservado. Serviços no plural e TRANSPORTE atualizado estão centralizados nos dados; apresentação em caixa alta por CSS, sem números no desktop. Diferenciais sem numeração visual: SEGURANÇA → SUPORTE → AGILIDADE. Tracking usa os valores fixos documentados na especificação; navegação vertical usa somente GSAP ScrollToPlugin, cancelável por gesto/teclado. Carrosséis mantêm scroll-snap horizontal e indicadores, sem setas. Os SVGs oficiais permanecem intactos.

O escudo permanece sem aprovação visual e não está integrado ao Hero. O espaço do modelo está reservado; não há poster ou fallback definitivo. Não publicar o site como concluído antes do gate e do checklist da especificação.
