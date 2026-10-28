# ZURY CORRETORA

Landing page institucional/comercial em Next.js App Router, com identidade grafite/prata/off-white, Inter Tight, superfícies Liquid Glass e animações GSAP, CSS e WAAPI.

> Documentação consolidada em **26/10/2026**, a partir do código do commit `2d93bc6`. Esta atualização documental não implementa as melhorias pendentes da auditoria nem libera publicação comercial.

## Documentos do projeto

| Documento | Função |
| --- | --- |
| [ZURY-SITE-SPEC.md](./ZURY-SITE-SPEC.md) | Conteúdo literal, layout, tipografia, materiais, motion, comportamento, dados, pendências, critérios de aceite e referência integral dos oito CSS da landing |
| [AGENTS.md](./AGENTS.md) | Processo de trabalho, preservação de arquivos, ferramentas, permissões e verificação |
| [README.md](./README.md) | Instalação, comandos, arquitetura resumida e estado verificável |

A especificação foi consolidada para remover contradições históricas: não restaurar versões antigas de Hero, navbar, parceiros ou trilhos. O histórico permanece no Git.

## Executar localmente

Use o gerenciador declarado em `package.json`: **pnpm@11.25.0**. Node observado no ambiente: **v24.22.1**; o projeto não declara uma versão mínima em `engines`.

```sh
pnpm install --frozen-lockfile
pnpm dev --hostname 127.0.0.1 --port 3000
```

Landing page: [http://127.0.0.1:3000/](http://127.0.0.1:3000/). Prévia do escudo: [http://127.0.0.1:3000/preview/escudo](http://127.0.0.1:3000/preview/escudo).

Cartão digital independente: [http://localhost:3000/cartao](http://localhost:3000/cartao). A rota não é incluída na navegação da landing. Reutiliza a marca, o escudo, o modal de cotação e os dados oficiais. WhatsApp e Contato abrem os três atendentes com seus cargos; Contato usa `tel:`. Facebook permanece desabilitado até receber endereço oficial. Cotação mantém o resumo provisório, sem envio.

O cartão usa `app/cartao/page.tsx`, estilos exclusivos em `app/cartao/cartao.css` e vetores locais em `public/card-icons/` (origens/licença na mesma pasta). No servidor de desenvolvimento desta sessão, usar `localhost`: o acesso por `127.0.0.1` apresentou falha de WebSocket e impediu a hidratação. O build de produção foi validado separadamente.

Refinamento do cartão: logo ligeiramente elevada, glow prateado no hover/foco e fade de entrada em sequência; movimento reduzido mantém tudo visível sem animação.

Se a porta estiver ocupada, use `--port 3001` e ajuste a URL. No host Codex desta sessão, se Node/pnpm não estiverem no PATH:

```sh
export PATH="/Users/thiagocareca/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/Users/thiagocareca/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback:$PATH"
```

Esse caminho é específico do computador da sessão; não é requisito para outros desenvolvedores.

## Produção e prévias

```sh
pnpm build
pnpm start --hostname 127.0.0.1 --port 3000
```

Produção padrão: **Hero → Soluções → Diferenciais → Companhias → Footer**. Indicações e Benefícios ficam omitidos, com links da navbar omitidos independentemente.

Desenvolvimento exibe ambas as ofertas. Para avaliar uma prévia completa em build local:

```sh
ZURY_REFERRAL_PREVIEW=true ZURY_BENEFITS_PREVIEW=true pnpm build
pnpm start --hostname 127.0.0.1 --port 3000
```

As flags são resolvidas na geração; somente reiniciar o start não muda a página construída. Não são autenticação nem autorização comercial. Não publicar a prévia sem validar parcerias, condições, regras de indicação, comissões, códigos e claims com o responsável.

## Stack resolvida

Next 16.4.2; React/React DOM 19.3.0; GSAP 3.15.0; Lucide React 1.59.0; Tailwind/@tailwindcss/turbopack 4.3.3; TypeScript 5.9.3; ESLint 9.39.5. Three 0.186.1, R3F 9.8.2 e Drei 10.7.9 estão preservados para o estudo de escudo; a Hero atual usa a imagem original animada, sem Canvas.

`pnpm-lock.yaml` registra versões resolvidas; `package.json` registra faixas/dependências. Não instalar Motion/shadcn só por constarem em instruções de ferramentas.

## Estado funcional atual

- Hero com headline em três linhas: SEU PATRIMÔNIO MERECE / A MELHOR ESCOLHA: / ZURY.
- Subtítulo EXPERIENCIA/AGILIDADE/SOLIDEZ, visualmente separado por losangos.
- CTA COTAR AGORA, 335 px/21 px no desktop, painel modal compartilhado com os oito cards.
- Soluções: oito categorias e 44 itens; Diferenciais: três cards. Desktop em grids e mobile em carrosséis manuais, sem autoplay.
- Não há faixa de botões de categorias sob o título NOSSAS SOLUÇÕES.
- COMPANHIAS: 37 PNGs cadastrados com dimensões e larguras ópticas, em cards claros de vidro; chamada de comparação.
- Benefícios: ZAPP, GRUPO MV, ÓTICA VEMOS e LABORATÓRIO CENTROLAB. FarMelhor não é renderizada.
- Companhias/Benefícios: loop para a direita a 76 px/s quando há mais de um item em desktop e sem reduced motion; grid estático mobile/reduced motion. Pausa por foco/interação/aba oculta, não por hover.
- CONTATO e CTA da Hero têm beam de 4.6 s e glow de 3.2 s; detalhes e limitações no §6 da especificação.
- Botões habilitados têm hover lift global de 2 px; há pendência de reduced motion e soma do lift no WhatsApp.
- Header claro, navbar com hover móvel de 180 ms; fade-out 320 ms/retorno240 ms. Hamburger autorizado no mobile.
- Rodapé em Navegação/Institucional/Feedback; menus compartilhados de contato e redes, Facebook desabilitado.
- WhatsApp flutuante abre três contatos oficiais; nenhuma mensagem é enviada automaticamente.

### Cotação ainda provisória

A seleção avança para resumo com aviso de que nenhuma solicitação foi enviada. Não há campos pessoais, backend, envio, CRM ou roteamento por produto. Os dois CTAs de Indicações são diferentes: abrem WhatsApp do Thiago com mensagens aprovadas pré-preenchidas, que o visitante decide enviar.

### Escudo

Hero usa `public/shield/references/geometry.png`, 1254 × 1254, com Next Image e dimensões reservadas. Entrada/órbita/scroll/tilt/reflexo ficam em camadas separadas; reduced motion usa a mesma imagem estática; loops pausam conforme visibilidade.

A integração dessa imagem foi autorizada. Isso não aprova o estudo procedural nem libera ofertas comerciais. A nota na interface de `/preview/escudo` que diz “sem integração à Hero” está desatualizada; documentar essa divergência não a corrige automaticamente.

## Mapa das fontes

- `app/page.tsx`: estrutura e gates; `app/layout.tsx`: fonte, idioma, metadata.
- `lib/content.ts`: serviços, diferenças, contatos, ofertas, mensagens, navegação, companhias.
- `components/site/`: header, cotação, carrosséis, canais, motion, logos, seções.
- `components/shield/image-*`: escudo da Hero; demais arquivos de shield preservam o estudo.
- `lib/site-motion.mjs`, `navigation.ts`, `header-visibility.ts`, `benefit-loop.mjs`: regras compartilhadas.
- `public/brand/`: quatro SVGs oficiais; `public/companies/`: 37 logos; `public/partners/`: parceiros; `public/shield/`: arte/referências.
- Estilos têm regras concorrentes entre globals e CSS de componentes; conferir cascata computada antes de relatar medidas universais.

## Verificação e limitações

```sh
pnpm typecheck
pnpm lint
pnpm test
pnpm build
git diff --check
```

Antes da atualização documental, em 26/10/2026: typecheck, lint e 44 testes passaram. Há warning não bloqueante do Node sobre inferência ESM em arquivos TypeScript.

**Build não confirmado:** primeira tentativa sem acesso à fonte falhou em Google Fonts; tentativa seguinte terminou em erro Turbopack ao criar processo/bind de porta (`Operation not permitted`). Executar novamente em ambiente com permissões/rede adequadas; não tratar esse registro como build aprovado.

**Atualização de 27/10/2026 — cartão digital:** typecheck, lint, 44 testes e build de produção passaram. O erro de bind acima reapareceu e foi resolvido preservando/removendo o cache antigo do Turbopack antes de repetir o build com permissões adequadas. `/cartao` foi gerada como rota estática. Playwright validou oito resoluções em Chrome e WebKit, menus, cotação, links configurados, teclado, reduced motion e falha do escudo. Evidências e limites: [design-qa.md](./design-qa.md), [captura principal](./artifacts/cartao/cartao-864x1536.png) e [comparação](./artifacts/cartao/comparacao.png). Esses testes não homologam a publicação comercial da landing.

Inspeção visual anterior cobriu Hero desktop1440/mobile375, dialog, menu mobile, Diferenciais, rodapé e contato. Companhias em captura específica, hover/foco completos, Safari, toque físico, matriz inteira e Core Web Vitals ainda não foram homologados. Capturas full-page com reveals ainda ocultos não comprovam seções vazias.

## Melhorias sob autorização individual

O checklist completo e o status estão **somente no §16.2 da especificação**. Item01 de inspeção visual autorizado e ainda em andamento; itens02–15 aguardam permissão, um por vez. Este pedido de documentação não autoriza implementá-los.

As sugestões incluem tipografia, proporção real de ZURY, composição responsiva, legibilidade, beam de perímetro, pulsação, hover/reduced motion, navbar, cards, companhias e fluxo final de cotação. Não assumir a antiga nota14/20 como avaliação válida; foi retirada.

## Colaboração e Git

Repositório público: [thiagosilva235-gif/zury-corretora-site](https://github.com/thiagosilva235-gif/zury-corretora-site), branch principal `main`. A entrega de 28/10/2026 inclui a landing existente, o cartão `/cartao`, os refinamentos de logo/glow/fade e a documentação consolidada. Publicação do código no GitHub não significa deploy do site.

### Continuar a partir do ZIP

Extraia o ZIP e abra a pasta `zury-corretora-site`. Use Node.js 24 e pnpm 11.25.0. No terminal dessa pasta:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Acesse `http://localhost:3000/` para a landing e `http://localhost:3000/cartao` para o cartão. O código atual não exige arquivo `.env` para desenvolvimento. O ZIP contém fontes, ativos, lockfile, testes, evidências e instruções; dependências, caches e histórico `.git` ficam fora. Para trabalhar com o histórico e enviar mudanças, prefira clonar o repositório acima.

Leia `AGENTS.md` e o resumo de `ZURY-SITE-SPEC.md` antes de alterar o projeto. Cotação continua provisória; Facebook está sem endereço; os gates comerciais de Indicações/Benefícios permanecem vigentes. Verificação: `pnpm typecheck`, `pnpm lint`, `pnpm test` e `pnpm build`.

Fluxo recomendado de colaboração:

```sh
git switch main
git pull --ff-only origin main
git switch -c codex/nome-da-tarefa
```

Depois, commits pequenos na branch e Pull Request para main. Não fazer force push, descartar alterações ou commitar segredos. Cada colaborador autentica sua conta; GitHub Desktop é alternativa quando o terminal não tem credenciais.

Checkpoints e envios para `main` dependem de pedido expresso. A entrega pública e o ZIP de 28/10/2026 foram solicitados pelo usuário; isso não constitui autorização permanente para novos envios.
