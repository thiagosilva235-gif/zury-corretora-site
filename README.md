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

### Revisão visual e comercial — etapa 5

Os nomes de apresentação são FARMELHOR UNAÍ, ZAPP e GRUPO MV. Benefícios contém somente três cards estáticos, sem legendas ou avisos; o carrossel de logos foi cancelado e removido. As logos originais estão em `public/partners/`, sem alterações. Até receber a versão oficial sem FOR MEN, ZAPP aparece apenas como nome textual. A UI mantém caixa alta por CSS, e-mails, URLs e mensagens originais; Hero em três linhas e listas de serviços/diferenciais sem divisórias internas.

Benefícios aparece em desenvolvimento ou com `ZURY_BENEFITS_PREVIEW=true` durante o build local. Para a prévia completa: `ZURY_REFERRAL_PREVIEW=true ZURY_BENEFITS_PREVIEW=true pnpm build`, seguido do start local. Sem as variáveis, o build público padrão omite as duas ofertas e seus links. Não publicar o artefato de prévia: parcerias, marcas e condições ainda exigem validação. Remover avisos da interface não constitui aprovação comercial. Não há backend, pagamentos ou códigos implementados.

### Prévia do Programa de Indicações

Em `pnpm dev`, a seção e o link REDE DE PARCEIROS ficam visíveis. Para avaliar um build local de produção, use `ZURY_REFERRAL_PREVIEW=true pnpm build` (ou o mesmo prefixo no comando direto de Node acima) e depois inicie o servidor. A opção é resolvida no build: reiniciar o servidor não altera um artefato já gerado.

**Não publicar o artefato de prévia.** Sem essa variável, o build de produção omite seção e link; isso ainda não libera o restante do site, cujo escudo segue pendente. Regras comerciais, regulamento, pagamentos/estornos, atribuição, comissões, privacidade e exigências regulatórias precisam de validação expressa. A headline mensal proposta está documentada como pendente na especificação; a interface usa alternativa sem valor de rendimento. Confirmar emissão real dos códigos e política de redução/repasse de comissão por produto. CTAs somente abrem uma conversa preparada com o WhatsApp oficial do Thiago, sem enviar mensagens automaticamente.

O redesign utiliza gradientes neutros, divisões luminosas sutis e Flow Glass compartilhado sem spotlight. A navbar sai em 475 ms e só reaparece no topo; foco visível e menus abertos são protegidos. CONTATOS é textual à esquerda do rodapé e abre preferencialmente à direita; CONTATO da navbar abre abaixo. Ambos contêm somente WhatsApp/e-mail. REDES SOCIAIS contém somente os dois links fornecidos pelo proprietário. O botão WhatsApp do rodapé foi removido, sem espaço reservado. NOS AVALIE NO GOOGLE utiliza o endereço oficial fornecido, que abre o perfil da empresa com acesso à avaliação. Serviços e diferenciais permanecem intactos, com seus carrosséis manuais mobile. Os SVGs oficiais permanecem intactos.

O escudo permanece sem aprovação visual e não está integrado ao Hero. O espaço do modelo está reservado; não há poster ou fallback definitivo. Não publicar o site como concluído antes do gate e do checklist da especificação.
