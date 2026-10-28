# ZURY CORRETORA — Especificação consolidada do site

> **Atualização:** 26/10/2026, fuso America/Sao_Paulo.
> **Base de implementação:** commit `2d93bc6c35e8138c0815455e85980dfe3b6b1f29`, branch `main`.
> **Natureza:** contrato de produto e inventário técnico do estado atual. Este documento substitui as revisões contraditórias antes acumuladas; o histórico permanece no Git.
> **Processo de execução:** [AGENTS.md](./AGENTS.md). Instalação e comandos: [README.md](./README.md).
> **Precisão:** medidas abaixo são declarações do código, com exceções explicitadas. Valores finais dependem de viewport, cascata CSS, preferências do navegador e conteúdo. A seção 19 reproduz literalmente todos os estilos próprios da landing page, para preservar cores, gradientes, sombras, seletores e breakpoints sem arredondamentos.
> **Estado:** implementado não significa aprovado para publicação, auditado em todos os navegadores ou medido em produção. As melhorias da auditoria permanecem pendentes e exigem autorização individual.

## Resumo executivo e mudanças vigentes

A aplicação existente é uma landing page de corretagem com identidade grafite, prata e off-white, fonte Inter Tight, caixa alta na interface, superfícies Liquid Glass, reflexos Flow Glass e animações GSAP/CSS/WAAPI.

Estado atual:

- Hero com três linhas literais: `SEU PATRIMÔNIO MERECE` / `A MELHOR ESCOLHA:` / `ZURY`.
- Subtítulo literal nos dados: `EXPERIENCIA/AGILIDADE/SOLIDEZ`; apresentação em três palavras separadas por losangos.
- CTA da Hero: `COTAR AGORA`, prateado, desktop com largura/mínimo de 335 px e fonte 21 px.
- Bloco de texto/CTA da Hero em `translate(4%,-5%)`. Isso é 4% à direita e 5% acima da posição natural; representa deslocamento à esquerda/baixo em relação ao antigo `translate(10%,-10%)`.
- Palavra ZURY com acabamento metálico CSS e `line-height: .9`; a alteração de entrelinha não diminui a altura dos glifos.
- CONTATO da navbar e COTAR AGORA da Hero têm camadas dedicadas de feixe de borda e glow pulsante.
- Hover global de botões habilitados: elevação de 2 px, somente mouse com hover/ponteiro preciso.
- Navbar: ocultação em 320 ms e retorno em 240 ms; cápsula móvel de hover em 180 ms.
- Oito cards de Soluções, 44 itens, cada um com CTA que abre o mesmo painel e pré-seleciona sua categoria.
- Não há botões de categorias entre NOSSAS SOLUÇÕES e os cards. Existem estilos residuais `.solution-highlights`, sem elementos correspondentes renderizados.
- COMPANHIAS: 37 logos integradas, fundo claro, cards de vidro e chamada para comparar seguradoras.
- Benefícios: quatro parceiros atuais, sem FarMelhor na lista renderizável.
- Escudo da Hero é PNG original animado, não Canvas/WebGL; o estudo procedural permanece preservado.
- Cotação continua provisória: escolhe categoria, avança para resumo e informa que nada foi enviado. Sem coleta pessoal ou WhatsApp por produto implementados.
- As ofertas de Indicações e Benefícios têm gates independentes de prévia; nenhuma auditoria ou atualização documental libera publicação.

## 1. Objetivo, escopo e precedência

Transmitir confiança, solidez, sofisticação e precisão, com luxo discreto, estrutura geométrica e efeitos neutros. A logo oficial não pode ser redesenhada, deformada nem substituída por texto digitado.

Prioridade: verdade do conteúdo/marca → legibilidade e funcionamento → fidelidade estética → desempenho medido → sofisticação técnica útil.

O documento distingue:

| Tipo | Significado |
| --- | --- |
| Implementado | Encontrado no código da base acima; não certifica renderização em toda viewport |
| Diretriz | Resultado exigido na manutenção, dependente de validação |
| Pendente | Ainda não implementado, testado ou aprovado |
| Histórico | Disponível no Git; não deve restaurar regras antigas sobre as atuais |

A autorização para atualizar documentação não autoriza executar as melhorias visuais listadas no §16.2. Não acrescentar seções, claims, dados de parceiros, depoimentos, FAQ, backend ou integrações sem solicitação.

## 2. Arquitetura de informação e ambientes

### 2.1. Estrutura renderizada

| Ordem | Seção | ID | Exibição |
| --- | --- | --- | --- |
| — | Header/marca/navegação | `site-navigation` para nav | Sempre |
| 1 | Hero | `inicio` | Sempre |
| 2 | NOSSAS SOLUÇÕES | `servicos` | Sempre |
| 3 | NOSSOS DIFERENCIAIS | `sobre` | Sempre |
| 4 | PROGRAMA DE INDICAÇÕES | `indicacoes` | Gate de Indicações |
| 5 | COMPANHIAS | `companhias` | Sempre; trilho quando houver logos |
| 6 | BENEFÍCIOS EXCLUSIVOS | `beneficios` | Gate de Benefícios |
| 7 | Rodapé | `contato` | Sempre |

`main#conteudo` é o destino do skip link. `#institucional` é a coluna legal do rodapé, não outra seção. A Hero tem `h1`; títulos de seção são `h2`; títulos de cards são `h3`.

### 2.2. Gates de prévia

| Ambiente/condição | Indicações | Benefícios |
| --- | --- | --- |
| `NODE_ENV=development` | Visível | Visível |
| Produção sem flags | Omitido | Omitido |
| `ZURY_REFERRAL_PREVIEW=true` | Visível | Só com seu próprio gate |
| `ZURY_BENEFITS_PREVIEW=true` | Só com seu próprio gate | Visível |

Comparação literal com `"true"`. Em build de produção, a seleção é feita durante a geração; alterar ambiente apenas no start não regenera a página. Gates não são autenticação nem autorização comercial.

### 2.3. Rotas

- `/`: landing page.
- `/cartao`: cartão digital independente, solicitado em 27/10/2026 a partir da referência fornecida. Composição vertical 9:16, nove controles HTML na ordem COTAR AGORA, SITE, WHATSAPP, INSTAGRAM, TIKTOK, FACEBOOK, NOS AVALIE, CONTATO e E-MAIL. Não recebe links na landing. Reutiliza os SVGs/PNG originais e os destinos de `lib/content.ts`; WhatsApp e Contato mostram os três atendentes/cargos, com conversa ou `tel:` respectivamente. Facebook permanece sem endereço e desabilitado, conforme instrução expressa. Cotação usa o mesmo modal provisório do §6.3. Estilos próprios isolados em `app/cartao/cartao.css`; não integram a transcrição dos estilos da landing do §19.
- Refinamento autorizado do cartão: logo deslocada visualmente `−2.4cqw` no eixo Y, glow prateado de hover/foco com transição de 240 ms e entrada por opacidade de fundo, logo e nove botões (600 ms por elemento, atrasos de 0–520 ms). A preferência de movimento reduzido elimina a entrada e as transições; foco revela o botão imediatamente.
- `/preview/escudo`: prévia da mesma imagem original, com controles Movimento e Imagem estática, link de retorno e metadados `robots: { index: false, follow: false }`.
- A prévia não entra na navegação pública e não é protegida por autenticação no código.
- **Texto desatualizado detectado:** a nota da prévia ainda diz “sem integração à Hero”, embora a integração da imagem esteja autorizada e implementada. Sua correção de interface não faz parte desta atualização documental.

## 3. Marca oficial e ativos

### 3.1. Quatro SVGs presentes e imutáveis

| Arquivo em `public/brand/` | Uso/medidas |
| --- | --- |
| `04_ZURY_Preto_Transparente.svg` | Original; viewBox `0 0 1600 535` |
| `ZURY_Logo_Otimizada_Preto.svg` | Preto `#090909` |
| `ZURY_Logo_Otimizada_Grafite.svg` | Grafite `#1C1C1C` |
| `ZURY_Logo_Otimizada_Branco.svg` | Branco `#FFFFFF` |

Variantes otimizadas com viewBox `280 96 1046 324` e dimensões nominais 1046 × 324. Preservar curvas, monograma, lettering e proporções. Máscara CSS usa a silhueta do SVG branco; isso não edita os arquivos. `OfficialLogo` fornece imagem acessível com alt `ZURY CORRETORA`, origem grafite no header e branca no rodapé.

Header: máscara com gradiente `linear-gradient(115deg,#181c1f,#4f4d4b 55%,#1c1c1c)`. Logo padrão: `--logo-silver` do §19. Não recolorir logos de parceiros.

### 3.2. Escudo e acervo

- Fonte da Hero: `public/shield/references/geometry.png`, 1254 × 1254, transparência original.
- Referências e estudo procedural preservados em `public/shield/` e `components/shield/`.
- Logos de companhias em `public/companies/`; parceiros em `public/partners/`.
- FarMelhor permanece como ativo histórico, sem card atual.
- Não há GLB oficial aprovado sendo carregado na Hero. A presença de Three/R3F nas dependências não torna a Hero um modelo 3D.

## 4. Design system

### 4.1. Paleta e superfícies

| Papel/token | Valor |
| --- | --- |
| `--zury-offwhite` | `#eaeae5` |
| `--zury-stone` / `--light-satin` | `#d6d3d1` |
| `--zury-midgray` | `#78716c` |
| `--zury-graphite` | `#1c1c1c` |
| Texto base `--text` | `#d7dce0` |
| Hero base `--hero-copy` | `#adb4bb`; preenchimentos podem ser sobrescritos por gradiente |
| `--muted` | `#c2c3c0` |
| `--surface-mineral` | `#0a0c0e` |
| `--surface-graphite` | `#1e2022` |
| `--surface-metal` | `#2d2e2e` |
| `--surface-steel` | `#4f4d4b` |
| `--light-silver` | `#989491` |
| Texto em Hero/Diferenciais/Footer | `#eeede5` |
| Texto em Soluções/Indicações/Companhias/Benefícios | `#25292c` |
| Texto secundário nas seções claras | `#535754` |
| Verde exclusivo de borda/glow hover/foco WhatsApp | `#25d366` |

Hero/Diferenciais/Footer escuros. Soluções/Indicações claros com iluminação mineral; Companhias/Benefícios off-white. Pontilhado mineral decorativo nas camadas claras, com dois gradientes radiais, fundos de 11 × 13 e 17 × 19 px. Gradientes exatos, todas as opacidades e regras de override estão no §19.

Sem dourado/champagne/neon adicional. Cores próprias das marcas recebidas são preservadas.

### 4.2. Tipografia e capitalização

Inter Tight via `next/font/google`, subconjunto `latin`, variável `--font-inter-tight`, `display: swap`. Fallback geral Arial/sans-serif. O build pode precisar buscar a fonte; os arquivos gerados são servidos pela própria aplicação.

**Caixa alta global permanente:** `body { text-transform: uppercase }`, herdada por controles. Dados, URLs, mensagens do WhatsApp e lettering incorporado às imagens não devem ser convertidos destrutivamente.

| Papel | Token de tracking | Valor |
| --- | --- | --- |
| Hero | `--tracking-hero` | `.025em` |
| Título de seção | `--tracking-section` | `.06em` |
| Título de card | `--tracking-card-title` | `.055em` |
| Conteúdo | `--tracking-copy` | `.025em` |
| Controle | `--tracking-control` | `.065em` |
| Navbar | `--tracking-nav` | `.065em` |
| Popover | `--tracking-popover` | `.04em` |
| Rodapé | `--tracking-footer` | `.04em` |
| Valor/oferta | `--tracking-financial` | `.035em` |

Exceções implementadas: quote trigger `.04em`; subtítulo Hero `.1em` desktop/`.055em` mobile; ZURY `.035em`; título RC `.025em`. Fontes/tamanhos das demais funções estão nos §§5–10 e no CSS integral.

Títulos de seção padrão: `clamp(29px, calc(3.4vw + 2px), 51px)`, peso 600, entrelinha 1.16, `text-wrap: balance`. Indicações usa título 22 px/1.4.

### 4.3. Espaçamento e grid

- Gutter: `clamp(20px,5vw,80px)`.
- Container geral: `min(calc(100% - var(--gutter) * 2),1320px)`, centralizado.
- Seções: padding vertical 115/140 px; mobile 85/105 px, salvo regras específicas de Companhias.
- Títulos: margem inferior 56 px; mobile 34 px.
- Raio externo das seções/rodapé: 24 px; mobile 18 px.
- Separação vertical entre seções sucessivas e antes do rodapé: 8 px.
- Filetes/halos antigos em `.section-boundary::before/::after` e `.hero::before/::after` são desativados com `content:none`. A curva atrás do escudo é outro elemento e permanece.

### 4.4. Materiais e feedback

Blur compartilhado 16 px; navbar 14 px com saturação 1.08; CTA Hero 12 px e sem backdrop-filter no mobile. Bordas, brilhos internos e fundos variam por superfície, conforme §19.

Flow Glass: reflexo diagonal limitado por overflow, fundo estável, transição de transform 600 ms e opacity 160 ms, easing `cubic-bezier(.23,1,.32,1)`. Hover com opacity .85; foco .65; pressão .6. Sem spotlight circular nos cards.

Cards: hover eleva 4 px; ícones sobem 3 px em 220 ms quando mouse preciso e movimento permitido. Rodapé tem override para permanecer sem elevação.

Botões habilitados: hover `translateY(-2px)`, active `translateY(0) scale(.985)`, transição 180 ms. A regra global alcança botões nativos dentro de `.zury-site`; não garante o mesmo lift para links estilizados como botões. Há conflitos conhecidos de reduced motion e soma de movimentos no WhatsApp (§16.2).

## 5. Header e navegação

### 5.1. Desktop

- Header é `position:absolute` pela regra editorial vigente, z-index 20; não permanece fixo durante toda a rolagem.
- Marca centralizada de 236 px, padding 20 px no topo/12 px na base, gap 14 px.
- Superfície superior clara com cantos inferiores de 22 px.
- Navbar em cápsula clara de vidro, padding 4 px, gap 3 px.
- Itens: 12 px, peso 600, min-height 44 px, padding 10 × 20 px; 768–1000 px: padding horizontal 10 px.
- Links comuns somente textuais em repouso; CONTATO tem cápsula grafite permanente e texto off-white.
- Hover móvel GSAP: geometria do item, duração 180 ms, `power3.out`, `overwrite:true`; saída 200 ms. Não é aplicado à cápsula CONTATO.
- O tween anima x/y/width/height/opacity; width/height exigem avaliação de custo, sem afirmar que é exclusivamente composite.

### 5.2. Ordem e destinos

| Item | Destino |
| --- | --- |
| SOLUÇÕES | `#servicos` |
| DIFERENCIAIS | `#sobre` |
| INDICAÇÕES | `#indicacoes`, se habilitado |
| BENEFÍCIOS | `#beneficios`, se habilitado |
| SOBRE | `#institucional` |
| REDES SOCIAIS | Popover `social-channels` |
| CONTATO | Popover `nav-contact-channels` |

A marca é link para `#inicio`. Sem sublinhado como indicador ativo; `aria-current="location"` na âncora reconhecida.

### 5.3. Ocultação e scroll

Ocultar navbar a partir de scrollY 32; reaparecer somente até 8 px do topo ou durante interação protegida. Subir parcialmente a página não revela sozinho. Logo e superfície superior não recebem esse tween.

Tween da nav: y −24 e opacity 0 em 320 ms; retorno y 0/opacity 1 em 240 ms, `power2.out`. Reduced motion: duração zero e sem y. Navegação oculta fica `inert`. Proteção por foco no header, menu mobile aberto ou popover inferior aberto. Estado `data-scrolled` muda acima de 60 px.

Âncoras usam GSAP ScrollToPlugin, offset de 96 px, `power2.inOut`, duração `min(1.1,.55+abs(distância)/4000)` segundos, limitada ao documento. Atualiza hash e foca o destino sem segundo scroll. Novo clique substitui tween; wheel, touchstart e teclas de rolagem cancelam. Movimento reduzido navega imediatamente.

### 5.4. Mobile até 767 px

Hamburger **autorizado e implementado**, substituindo a antiga proibição:

- Logo 164 px à esquerda; toggle 48 × 48 px, raio 14 px, à direita.
- Header com padding `calc(16px + env(safe-area-inset-top)) 20px 16px`.
- Menu nativo `popover="auto"`, fechado por padrão.
- Painel fixo: top `calc(88px + env(safe-area-inset-top))`, laterais 12 px, largura `calc(100% - 24px)`, padding 10 px, raio 20 px.
- Altura máxima `calc(100dvh - 108px - env(safe-area-inset-top))`, rolagem vertical quando necessário.
- Itens coluna única, alinhados à esquerda, min-height 46 px, fonte 13 px, padding 12 × 16 px.
- Entrada 180 ms com fade/translate individual de −8 px; reduzida/retirada em reduced motion.
- Toggle expõe `aria-expanded`, `aria-controls` e rótulo Abrir/Fechar navegação. Abertura foca o primeiro link. Seleção fecha menu; popovers de contato/social se ancoram ao hamburger.

## 6. Hero

### 6.1. Conteúdo exato

```text
SEU PATRIMÔNIO MERECE
A MELHOR ESCOLHA:
ZURY
```

Headline completa: `SEU PATRIMÔNIO MERECE A MELHOR ESCOLHA: ZURY`.

Subtítulo nos dados: `EXPERIENCIA/AGILIDADE/SOLIDEZ`. Os separadores “/” tornam-se losangos CSS de 4 × 4 px, 3 × 3 px mobile, rotacionados 45°. Não corrigir acentuação da cópia sem autorização.

CTA: `COTAR AGORA`, ícone Menu de 18 px, abre `dialog#quote-dialog`.

### 6.2. Layout e tipografia exatos

| Faixa | Container/colunas | Tipografia e particularidades |
| --- | --- | --- |
| ≥1200 px | largura `min(calc(100% - var(--gutter)),1560px)`; 55%/45%; mínimo 800 px; padding 200/105 px | h1 `clamp(31px,calc(3vw + 10px),58px)`, peso 600, entrelinha 1.08 |
| 903–1199 px | máximo 930 px, limitado à largura; 57%/43% | h1 limitado a 42 px; anotações locais abaixo |
| 768–902 px | mesmo limite; 60%/40% | mesmas anotações locais |
| ≤767 px | coluna única; min-height 740 px; row-gap 16 px; padding-bottom 80 px | h1 `clamp(22px,6.6vw,44px)`, entrelinha 1.22 |

Entre 768–1199 px: primeira linha 40.89 px, peso 700, padding-top 6 px/right 51 px, margin-top 120 px, height 48.08 px, opacity .91; segunda opacity .54; ZURY 50 px; subtítulo declara 19.88 px/peso 500, sujeito à cascata editorial.

Nas demais faixas, as duas primeiras linhas declaram `calc(1em - 2px)`, a última `calc(1em + 6px)`. Família editorial Inter Tight sobrescreve as famílias Arial/system-ui ainda existentes nas regras-base.

ZURY: inline-block, entrelinha .9, tracking .035em, sombra `0 0 22px rgba(223,229,228,.22)`. Gradiente específico de 105° declarado; uma regra posterior `.zury-site :is(h1 .hero-line,...)` também define background-image e pode substituir esse gradiente. É necessário validar o preenchimento computado; não afirmar que todo acabamento declarado vence a cascata.

Subtítulo editorial: `clamp(14px,1.4vw,19px)`, peso 400, line-height 1.5, tracking .1em, margin-top 12 px; mobile `clamp(12px,3.5vw,15px)`, tracking .055em, margin-top 10 px. Há declarações concorrentes em globals; fontes calculadas precisam ser conferidas na viewport alvo.

Padding-top mobile editorial 144 px; globals conserva exceção ≤393 px de 279 px. As declarações integrais são mantidas no §19: não extrapolar um valor universal nem corrigir automaticamente a cascata nesta tarefa.

`.hero-copy-position` organiza o grupo em `translate(4%,-5%)`; `.hero-copy` tem parallax separado até −18 px desktop/−8 px mobile.

### 6.3. CTA e cotação provisória

| Propriedade | Implementação |
| --- | --- |
| Base | min-width 260 px, min-height 64 px, padding 18 × 34 px, raio 999 px |
| Desktop ≥768 px | width/min-width 335 px; fonte 21 px |
| Mobile ≤767 px | width `min(100%,290px)`; min-height 54 px; min-width base 260 px permanece; fonte base 14 px |
| Fonte | peso 600, tracking .04em |
| Texto | `#1c2429` |
| Fundo | `linear-gradient(135deg,#f4f6f5eb,#bac6cedb)` |
| Borda | `#ffffffa6` |
| Sombra | `inset 0 1px 0 #fff,0 8px 28px #b7c9d333` |
| Blur | 12 px, desativado mobile |
| Entrada | 1.2 s ease-out, opacity 0→1/y 12→0 |
| Hover | shimmer diagonal, transform da camada 600 ms, opacity 180 ms; lift 2 px |

Dialog: largura `min(620px,calc(100% - 32px))`, max-height `calc(100dvh - 40px)`, padding 28 px (20 até 480 px), raio 24 px, texto `#222b29`, fundo perolado e backdrop escuro com blur 8 px.

Passos literais:
1. `ETAPA 01 · ESCOLHA A SOLUÇÃO`.
2. Legenda: `QUAL SOLUÇÃO VOCÊ PROCURA?`.
3. Oito radios com os títulos oficiais; grid de duas colunas, uma até 480 px.
4. `CONTINUAR` desabilitado sem seleção.
5. Resumo: `SOLUÇÃO SELECIONADA`, categoria escolhida e `AS PRÓXIMAS ETAPAS DESTA COTAÇÃO SERÃO DISPONIBILIZADAS EM BREVE. NENHUMA SOLICITAÇÃO FOI ENVIADA.`.
6. `ALTERAR SOLUÇÃO` retorna à seleção; fechar restaura foco ao gatilho original.

Hero e cards compartilham o dialog. Cards disparam evento `zury:quote` com categoria e botão de origem. A escolha anterior pode persistir ao reabrir pela Hero. Fechamento por botão, Escape nativo ou clique nas coordenadas externas do dialog.

**Não implementado:** nome, telefone, e-mail, campos por produto, submissão, armazenamento, validação de dados pessoais, envio de cotação, roteamento para atendentes ou mensagens WhatsApp por solução.

### 6.4. Beam e glow dos dois CTAs principais

Aplica somente ao CONTATO da navbar e COTAR AGORA da Hero:

| Efeito | Parâmetros atuais |
| --- | --- |
| Beam | span absoluto inset 0; raio herdado; padding 1 px; máscara XOR/exclude para contorno |
| Traço de luz | conic-gradient: transparente 0–72%, cor 18% em 77%, cor plena 82%, cor 18% em 87%, transparente 92% |
| Movimento | rotação da camada 360° em 4.6 s linear infinito |
| Cor na Hero escura | `#f4f6f4` |
| Cor em CONTATO/contexto claro | `#4a514e` |
| Halo do beam | drop-shadow 4 px com 42% da cor |
| Glow dedicado | inset 1 px, sombra interna 18 px/40% da cor e externa 18 px/20% |
| Respiração | opacity .16→.72→.16, ciclo 3.2 s ease-in-out infinito |
| Texto/ícone | z-index 1; decoração z-index 0 e pointer-events none |
| Reduced motion | animações das camadas dedicadas desativadas |

Hero ainda tem `::after` com pulso de 3.6 s (.12→.8), além do glow dedicado. CONTATO herda glint de 5.5 s, três repetições, e Flow Glass. A pulsação atual anima luz/opacidade, **não escala continuamente o botão inteiro**.

A rotação de uma máscara retangular não comprova acompanhamento perfeito do perímetro da cápsula; item de auditoria pendente. As cores são atribuídas às classes dos dois botões, não por detecção automática da luminância de qualquer seção.

## 7. Escudo original animado

Integração do PNG autorizada; estudo procedural não aprovado nem usado na Hero. Preservar a distinção ao relatar estado.

- `HeroShield → ImageShield`; dimensões reservadas, aspect-ratio 1.
- Desktop: largura `min(100%,620px,44vw)`, perspectiva 1400 px; pose rotateY −16°/rotateZ 5°.
- Mobile: largura 110%, max-width 460 px; pose −9°/3°.
- Área da arte: 88.75838% da caixa. A imagem mantém proporção, `object-fit:contain`, sem arrastar.
- Next Image com `priority`, dimensões 1254 × 1254 e sizes `(max-width:767px) 90vw,620px`; otimização padrão habilitada.
- Alt: `Escudo original da ZURY, monograma Z em metal grafite escovado com bordas prateadas`.
- Reflexo é SVG plano sobreposto, recortado por máscara alpha do PNG, não iluminação física de modelo 3D.
- Camadas independentes para scroll, entrada, órbita, tilt, luz e reflexo; detalhes CSS no §19.

| Movimento | Desktop | Mobile compacto |
| --- | --- | --- |
| Órbita | x ±16 px; y ±28 px | 40% |
| Pitch/yaw/roll orbital | ±1.1° / ±4° / ±1.3° | 40% |
| Ciclo | 10 s | 10 s |
| Luz orbital | x ±18 px, y ±10 px, roll ±3°, opacity .55→1 | 40% dos eixos |
| Parallax escudo | y até −42 px; yaw até 3°; scrub .8 | 40% |
| Mouse | posição até 8 × 6 px; yaw até 3°/pitch até 2° | Sem gesto manual de toque |
| Suavização do mouse | .7 s, power3.out | Não aplicável ao toque |
| Reflexo | x até 100 px/y 45 px, opacity até .28, fade .18 s | Oculto em toque/ponteiro grosso |
| Luz por mouse | até 12 × 8 px | Sem toque |
| Entrada efetiva | função compartilhada: 1.2 s, delay .08, x28/y38, scale .94 | mesma função, se movimento permitido |

Os eixos orbitais têm fases distintas para continuidade; reflexo diminui suavemente nos 15% de borda. Fora da caixa retorna a neutro. IntersectionObserver ativa acima de 4% visíveis; animações pausam fora da tela e com aba oculta. Scroll, pointerleave e blur limpam resposta do cursor. Observers, listeners e matchMedia têm cleanup.

Reduced motion conserva PNG estático e remove reflexo. Valores históricos 3.2 s de `motion-config.mjs` ainda existem para o estudo, mas a entrada da imagem vigente é controlada por `createSiteEntrance`.

## 8. NOSSAS SOLUÇÕES

### 8.1. Estrutura e apresentação

Oito cards informativos; apenas CTAs são botões. Numeração 01–08 oculta no grid e visível mobile. Ícones Lucide 24 px, strokeWidth 1.4, decorativos, sem fundo.

Desktop: quatro colunas/duas linhas; até 1199 px duas colunas; até 767 px carrossel nativo. Gap grid 18 px; mobile 16 px. Grid com `grid-auto-rows:1fr`; uniformidade pode gerar vazio nos cards curtos.

Cards: raio 18 px, mínimo 405 px desktop/410 mobile, padding 32 × 25 px desktop/28 px mobile; podem crescer. Título vertical com ícone acima, gap 12 px, faixa mínima 96 px; fonte 20 px/600, RC 18 px/tracking .025em. Lista semântica com marcadores, gap 12 px, recuo 14 px, texto 16 px/peso 500/entrelinha 1.7. Regras mobile de 15 px coexistem com seletor mais específico de 16 px: não certificar 15 px como resultado universal.

`QuoteTrigger`: largura 100%, margin-top auto, min-height 50 px, fundo `#263139`, texto `#f4f5f1`, borda `#647078`, texto COTAR AGORA e ArrowRight 17 px. Categoria pré-selecionada no mesmo dialog da Hero. Gap vertical do card 24 px. Nenhuma faixa de botões de categorias abaixo do título.

### 8.2. Conteúdo oficial literal

#### 01 — BENS

- Ícone: `house`
- Residenciais
- Condomínios
- Imóveis
- Empresariais
- Equipamentos agrícolas
- Industriais
- Armazéns
- Seguros de engenharia
- Usinas

#### 02 — VIDA E SAÚDE

- Ícone: `heart-pulse`
- Seguros de vida
- Planos de saúde
- Odontológicos
- Plano de previdência
- Seguro prestamista

#### 03 — RURAL

- Ícone: `sprout`
- Seguros agrícolas
- Transportes
- Soluções de logística
- Safras
- Pecuários
- Responsabilidade civil rural e agropecuário

#### 04 — AUTOMOTIVO

- Ícone: `car-front`
- Automóveis
- Frotas
- Motos
- Caminhões

#### 05 — CRÉDITO

- Ícone: `landmark`
- Consórcios
- Financiamentos
- Empréstimos

#### 06 — AÉREO E MARÍTIMO

- Ícone: `plane`
- Marítimos
- Aeronáuticos
- Hangares

#### 07 — TRANSPORTE

- Ícone: `truck`
- TRANSPORTE NACIONAL E INTERNACIONAL DE CARGAS
- RESPONSABILIDADE CIVIL DE CARGAS
- TRANSPORTADOR DE CARGAS
- OPERADOR DE CARGAS

#### 08 — RESPONSABILIDADE CIVIL

- Ícone: `scale`
- RC Geral
- RC Profissional
- RC Médicos
- RC Dentistas
- RC Advogados
- RC Engenheiros e Arquitetos
- RC Obras e Engenharia
- RC Condomínios
- RC Rural / Agropecuário
- RC Hospitalar e Clínicas

**Contagem de integridade:** 8 cartões e **44 linhas de produtos/serviços**, na ordem acima. Grafias são as dos dados atuais; renderização em caixa alta por CSS não altera os arrays.

### 8.3. Carrosséis manuais de Soluções e Diferenciais

Mobile: viewport horizontal com cards de 86% e peek, scroll-snap x mandatory, barra oculta, scroll restrito ao trilho. Último card tem margin-right 14%.

Instrução `ARRASTE PARA A ESQUERDA PARA VER MAIS`, ícone Hand 15 px, texto 9 px/peso 500. Contador com fonte 11 px, tabular-nums, aria-live polite/atomic. Indicadores selecionáveis de 44 px de altura, largura `min(44px,12.5%)`, pontos 5 px e ativo scale 1.4. Soluções: ponto #777b78/ativo #25292c.

Trilho focável; setas esquerda/direita funcionam somente quando o próprio trilho tem foco. Indicadores usam botões com nomes acessíveis e aria-controls. Contador é atualizado pela posição real dos filhos em scroll/resize, não só pelo clique. Sem autoplay. Movimento horizontal programático smooth; instant com reduced motion.

## 9. Diferenciais, Indicações, Companhias e Benefícios

### 9.1. NOSSOS DIFERENCIAIS

Três cards lado a lado no desktop; carrossel manual no mobile. Sem numeração visual. Mínimo 280 px, padding 32 px desktop/28 px mobile; ícone à esquerda, 24 px/1.4, gap 12 px, fonte 18 px/600.

| Nº | Título | Descrição |
| --- | --- | --- |
| 01 | **SEGURANÇA** | `Equipe qualificada, atuação autorizada pela SUSEP.` |
| 02 | **SUPORTE** | `Atendimento humanizado e especializado, disponível 24 horas por dia.` |
| 03 | **AGILIDADE** | `Agilidade nas cotações e no acompanhamento e resolução de sinistros.` |

Ícones ShieldCheck, Headset e Zap. A apresentação divide as descrições em itens sem os conectivos de união, mantendo a fonte literal acima. Removido o tópico de parceria com seguradoras de SEGURANÇA.

Listas 16 px/1.65, max-width 34ch, marcadores discretos, sem divisórias internas; espaçamento em padding 14/15 px. Declarações fornecidas pelo responsável; não equivalem a verificação independente de SUSEP ou disponibilidade 24h.

### 9.2. PROGRAMA DE INDICAÇÕES

Somente com gate. Grid até 1000 px, duas colunas, gap 16 px; mobile uma coluna/gap 20 px. Cards mínimos de 430 px, padding 44 × 32 px; mobile 38 × 24 px. Ícones UserRoundPlus/Handshake 18 px/1.4; títulos 18 px. Tópicos em lista, gap 18 px, margin 24 px 0 20 px; último em strong. Corpo 14 px/1.75, mobile 15 px.

**SEJA UM AFILIADO**:
1. `INDICAÇÕES SIMPLES`
2. `CÓDIGO INDIVIDUAL DE INDICAÇÃO PODENDO GERAR UMA EXCELENTE RENDA EXTRA`
3. `REMUNERAÇÃO DE R$100 ENVIADO VIA PIX PELA CONTRATACÃO DO INDICADO.`

**SEJA UM PARCEIRO COMERCIAL**:
1. `INDICAÇÕES RECORRENTES.`
2. `CÓDIGO INDIVIDUAL DE INDICAÇÃO PODENDO GERAR UMA EXCELENTE RENDA EXTRA`
3. `REMUNERAÇÃO DE 10% DA COMISSÃO RECEBIDA PELA CONTRATACÃO DO INDICADO`

CTAs QUERO SER AFILIADO / QUERO SER PARCEIRO COMERCIAL: 260 × 56 px quando houver espaço, centralizados, fonte editorial 13 px, peso 600, raio cápsula, grafite/off-white; regras específicas de modo podem concorrer e devem ser conferidas na cascata.

Parágrafo comercial literal:
```text
A ZURY OFERECE O MELHOR PREÇO DO MERCADO PARA AFILIADOS E PARCEIROS NAS CONTRATAÇÕES, RENUNCIANDO Á NOSSA COMISSÃO.
```

Largura até 1320 px, margin-top 48 px, texto `clamp(15px,2.05vw,22px)`, peso 700, entrelinha 1.6, tinta grafite em fundo claro. Duas spans, com quebra antes de NAS CONTRATAÇÕES quando houver espaço. Não há título comercial separado.

Mensagens exatas nos links do Thiago:
- Afiliado: `Olá! Tenho interesse em participar do programa de afiliados da ZURY CORRETORA. Gostaria de saber como funciona.`
- Comercial: `Olá! Tenho interesse em me tornar parceiro comercial da ZURY CORRETORA. Gostaria de conhecer as condições da parceria.`

URLs usam `URLSearchParams({text: mensagem})` após `https://wa.me/5538998645200`. Apenas preenchem a conversa; não enviam automaticamente.

**Pendências:** validação das ofertas/claims, regulamento, comissões, estornos, prazos, dados pessoais e operação de códigos. Não há backend, cadastro, atribuição, geração real de códigos, pagamentos ou comprovação de melhor preço. A proposta de renda mensal não é renderizada.

### 9.3. COMPANHIAS

Sempre renderizada. Título COMPANHIAS e chamada literal:
```text
COMPARE DIFERENTES SEGURADORAS E ENCONTRE A PROTEÇÃO PARA VOCÊ.
```

Chamada até 780 px, margin `-24px auto 40px`, fonte `clamp(20px,2.4vw,26px)`, peso 700, entrelinha 1.55, cor #343d40, centralizada/balanceada. Seção padding 72 px; título com margin-bottom 48 px quando houver logos.

37 PNGs, originais e larguras ópticas cadastrados abaixo. Next Image, sizes 200px, alt com nome da companhia. Cards 144 px de altura/min-height, padding 20 px, raio 20 px; imagens com altura 72 px e object-fit contain. Mobile: duas colunas, gap 24 px, cards 112 px/padding 14 px, imagens 64 px.

| Nome | Caminho público | Dimensões originais | Largura óptica cadastrada |
| --- | --- | --- | --- |
| Ademicon | `/companies/ademicon.png` | 2172 × 724 | 180 px |
| Akad | `/companies/akad.png` | 1918 × 563 | 180 px |
| Allianz | `/companies/allianz.png` | 1913 × 516 | 180 px |
| Amil | `/companies/amil.png` | 2032 × 744 | 180 px |
| AXA | `/companies/axa.png` | 1254 × 1254 | 100 px |
| Azos | `/companies/azos.png` | 2032 × 432 | 200 px |
| Azul Seguros | `/companies/azul-seguros.png` | 2032 × 904 | 180 px |
| Berkley | `/companies/berkley.png` | 889 × 281 | 180 px |
| Bradesco | `/companies/bradesco.png` | 2032 × 478 | 200 px |
| Brasilseg | `/companies/brasilseg.png` | 2172 × 724 | 180 px |
| BV | `/companies/bv.png` | 2032 × 1508 | 100 px |
| Capemisa | `/companies/capemisa.png` | 2172 × 724 | 180 px |
| Chubb | `/companies/chubb.png` | 1946 × 244 | 200 px |
| Essor | `/companies/essor.png` | 2032 × 664 | 180 px |
| HDI Seguros | `/companies/hdi-seguros.png` | 1863 × 792 | 180 px |
| Honda | `/companies/honda.png` | 829 × 135 | 200 px |
| Icatu | `/companies/icatu.png` | 962 × 376 | 180 px |
| Itaú | `/companies/itau.png` | 1254 × 1254 | 100 px |
| Justos | `/companies/justos.png` | 2032 × 629 | 180 px |
| MAG | `/companies/mag.png` | 1927 × 741 | 180 px |
| Magalu | `/companies/magalu.png` | 2032 × 479 | 200 px |
| Mapfre | `/companies/mapfre.png` | 2032 × 335 | 200 px |
| MetLife | `/companies/metlife.png` | 2032 × 462 | 200 px |
| Omint | `/companies/omint.png` | 2031 × 597 | 180 px |
| Pier | `/companies/pier.png` | 1830 × 554 | 180 px |
| Porto Seguro | `/companies/porto-seguro.png` | 2032 × 489 | 200 px |
| Rodobens | `/companies/rodobens.png` | 2172 × 724 | 180 px |
| Safra | `/companies/safra.png` | 2032 × 768 | 180 px |
| Sancor | `/companies/sancor.png` | 1902 × 487 | 180 px |
| Santander | `/companies/santander.png` | 2032 × 382 | 200 px |
| Suhai | `/companies/suhai.png` | 2032 × 609 | 180 px |
| SulAmérica | `/companies/sulamerica.png` | 1772 × 472 | 180 px |
| Tokio Marine | `/companies/tokio-marine.png` | 1915 × 476 | 200 px |
| Unimed | `/companies/unimed.png` | 2003 × 359 | 200 px |
| Yamaha | `/companies/yamaha.png` | 2032 × 468 | 200 px |
| Yelum | `/companies/yelum.png` | 1876 × 508 | 180 px |
| Zurich | `/companies/zurich.png` | 1947 × 494 | 180 px |

O cadastro registra os ativos recebidos; não comprova relações comerciais independentemente. Não substituir logos por texto, filtros ou desenhos.

### 9.4. BENEFÍCIOS EXCLUSIVOS

Somente com seu gate, após Companhias. Sem texto auxiliar, CTAs ou instruções de resgate.

| Nome | Oferta literal | Ativo / dimensões originais |
| --- | --- | --- |
| ZAPP | 5% DE DESCONTO EM ATÉ 3X | `/partners/grupo-zapp-metalico.png`, 2172 × 724 |
| GRUPO MV | 5% DE DESCONTO EM SERVIÇOS | `/partners/grupo-mv.png`, 1057 × 1057 |
| ÓTICA VEMOS | 15% DE DESCONTO A VISTA E 10% Á PRAZO | `/partners/otica-vemos.png`, 1254 × 1254 |
| LABORATÓRIO CENTROLAB | 10% DE DESCONTO | `/partners/centrolab.png`, 1254 × 1254 |

Cards min-height 240 px, padding editorial 20 px; títulos 18 px/600, line-height 1.3, margin-bottom 8 px; oferta `clamp(18px,1.5vw,20px)`/600/1.25, mobile 20 px.

Área de logo 88 px, margin-bottom 12 px; logos até 180 × 72 px; MV até 64 × 64 px. Ótica Vemos tem ajuste CSS específico 180 × 104 px, object-fit cover/object-position 50% 60%, recortado na área de logo; Centrolab largura 112 px/max-height 104 px. Arquivos não editados, mas apresentação com cover não equivale a “nenhum recorte visual”.

Condições, parcerias e autorização de publicação continuam dependentes de validação; não presumir validade, cumulatividade ou regras de resgate.

### 9.5. Movimento de Companhias e Benefícios

Componente comum `BenefitTrack`, WAAPI. **Condição efetiva atual:** count > 1, largura acima de 767 px e sem reduced motion; não testa se todos os itens cabem antes de ativar o loop.

- Movimento linear contínuo para a direita a 76 px/s.
- Benefícios: mínimo 260 px/máximo 320 px; gap 14 px; viewport desktop de largura total.
- Companhias: mínimo/máximo de 220 px; gap 24 px; viewport de largura total com padding vertical 24 px.
- Largura do card: `min(maximum,max(minimum,(width - 3*gap)/4))`.
- Distância do ciclo: `count*(cardWidth+gap)`; duração: `distance/76*1000` ms.
- Cópias extras: `max(1,ceil(width/distance))`, além do grupo principal.
- Duplicatas visuais aria-hidden/inert; fase preservada no resize.
- Pausa por foco, pointerdown/interação e documento oculto; retoma em pointerup/pointercancel. **Não pausa apenas por hover.**
- ResizeObserver e listeners com cleanup; mobile/reduced motion exibem grid estático com todos os itens, sem loop.

## 10. Footer, contatos e canais

### 10.1. Rodapé

Largura externa integral, sem padding externo; painel interno com padding desktop `50px clamp(28px,4.8vw,70px) 25px`, mobile 35 × 26 × 25 px. Logo 224 px/margem inferior 50 px; mobile 190 px/margem 35 px. Raio 24/18 px.

Três grupos no desktop: Navegação → Institucional → Feedback; gap `clamp(24px,4vw,64px)`. Mobile empilhado, gap editorial 32 px; alguns valores base coexistem no CSS.

| Grupo | Conteúdo |
| --- | --- |
| Navegação | CONTATOS, SOLUÇÕES→#servicos, DIFERENCIAIS→#sobre, SOBRE→#institucional |
| Institucional | ZURY CORRETORA LTDA; CNPJ: 49.393.734/0001-77; SUSEP: 262180499 |
| Feedback | REDES SOCIAIS; NOS AVALIE NO GOOGLE |

Títulos 18 px/600; links 16 px/500, min-height 44 px, padding 9 × 14 px; dados legais 16 px/500/entrelinha 2. Copyright 14 px, borda superior fina, padding-top 22 px, margin-top 45 px (30 mobile):
`© 2026 · Todos os direitos reservados.`

Sem duplicar razão social/CNPJ/SUSEP na faixa final. Painel não é botão nem recebe elevação de hover.

Links exatos:
- CNPJ: `https://solucoes.receita.fazenda.gov.br/Servicos/cnpjreva/`
- SUSEP: `https://www2.susep.gov.br/safe/Corretores/pesquisa`
- Avaliação: `https://share.google/AnNgzLmPy4lMNqHO9`

Consultas não preenchem dados automaticamente nem comprovam registro. Link de avaliação aponta ao perfil fornecido; não há envio de avaliação pelo site.

### 10.2. Contatos oficiais

Telefones estão nos dados e na documentação; os menus exibem somente nome/cargo.

| Nome | Cargo confirmado | Telefone oficial | Link exato |
| --- | --- | --- | --- |
| Thiago | Corretor | `(38) 99864-5200` | `https://wa.me/5538998645200` |
| Valdir | Consultor | `(38) 99961-5862` | `https://wa.me/5538999615862` |
| Joana | Saúde | `(61) 98563-8090` | `https://wa.me/5561985638090` |

Uma única fonte em `lib/content.ts`. Menus gerais sem mensagem pré-preenchida; exceção atual são os dois CTAs de Indicações.

### 10.3. Popovers compartilhados

`ChannelsPopover` com popover auto, role dialog e aria-labelledby. Instâncias:
- `nav-contact-channels`: CONTATO, preferência abaixo.
- `contact-channels`: CONTATOS do rodapé, preferência acima.
- `social-channels`: navbar, abaixo.
- `footer-social-channels`: rodapé, acima.

Largura `min(382px,calc(100vw - 24px))`, padding 23 px/20 mobile, raio 23/21 px; limites recalculados pelo visualViewport com 12 px de margem e 12 px de distância do gatilho. ResizeObserver, resize e scroll reposicionam. Abertura foca fechar; Escape fecha/restaura foco; clique fora e repetição do gatilho usam comportamento nativo.

Contato: WHATSAPP e E-MAIL. WhatsApp expande lista dos três contatos, animação de grid rows/opacidade 140 ms; conteúdo recolhido aria-hidden/inert. Fechar recolhe novamente. E-mail: `mailto:contato@zurycorretora.com`; endereço não é texto visível.

Social: INSTAGRAM → `https://www.instagram.com/zury_corretora/`; TIKTOK → `https://www.tiktok.com/@zury_corretora`; FACEBOOK botão disabled, href nulo. Sem handles/telefones/endereço expostos nos rótulos.

Título 22 px/600; linhas min-height 52 px, padding 14 × 18 px, margin-block 8 px, nomes de canais 14 px/600. Contatos 13 px/600, cargos 11 px/500. Botão fechar 44 × 44 px. Entrada do painel 180 ms, power via token CSS; origem/posição e estados exatos no §19.

### 10.4. WhatsApp flutuante

Botão fixo no canto inferior direito, z-index 25, 56 × 56 px; até 420 px 52 × 52 px. Ícone 25 px. Margens padrão `max(24px,env(safe-area-inset-right/bottom))`; estreito: 12 px direita/18 px base, respeitando safe area.

Entrada 220 ms com fade/y8; halo de hover/foco `#25d366`, borda 1 px e glow 15 px/.25, fade 160 ms. Contêiner sobe 4 px em 220 ms com mouse e sem reduced motion; botão ainda recebe lift global de 2 px, podendo somar 6 px.

Menu horizontal à esquerda até 424 px, padding 8 px/gap 6 px, cápsula. Offset direito 68 px + margem; estreito 64 px + margem/padding 6 px. Mesmo trio de contatos, sem e-mail ou telefones. Nome 12 px/cargo 10 px; até 420 px 11/9 px. Itens min-height 44 px. Transição declarada 240 ms, com override editorial de 180 ms.

Ao abrir foca o contêiner, não prioriza Thiago; Tab percorre links. Escape restaura foco; seleção fecha; popover auto permite clique fora e exclusividade. aria-expanded/controls/rótulo implementados.

## 11. Motion e ciclo de vida

| Elemento | Mecanismo/parâmetros |
| --- | --- |
| Entrada compartilhada | GSAP fromTo, 1.2 s, delay .08, power3.out, opacity0/x28/y38/scale.94 → estado final |
| Alvos iniciais | header-surface, brand-link, nav-entry, hero-line, hero-subtitle |
| Reveals | cada data-reveal; start top 94%, end bottom −8%, toggleActions play reverse play reverse |
| Parallax texto Hero | y −18 desktop/−8 compacto, scrub .9 |
| Luz de seção | opacity .6→1, y ±14 desktop/±5 compacto, scrub .9 |
| Ícones hover | y −3 px, 220 ms, flow-ease |
| Navbar e CTAs | parâmetros dos §§5–6 |
| Trilhos | WAAPI, 76 px/s, §§9.5 |
| Escudo | GSAP, §7 |

Não há Motion/Framer Motion ou shadcn em uso no projeto atual. Não instalar bibliotecas para documentar o que CSS/GSAP já resolvem.

`SiteMotion` usa matchMedia; reverte efeitos/listeners/tweens ao desmontar. Refresh de ScrollTrigger após document.fonts.ready. Não há stagger explícito na chamada compartilhada de entrada atual, nem timeline específica que sincronize todos os filhos internos do rodapé; não descrever o histórico como implementação presente.

## 12. Responsividade e acessibilidade

### 12.1. Breakpoints encontrados

| Regra | Uso |
| --- | --- |
| ≤1199 px | Soluções em duas colunas |
| 768–1199 px | Hero máximo 930 px e anotações locais |
| 768–1000 px | Navbar compacta em linha |
| 768–902 px | Hero 60%/40% |
| ≤767 px | Hamburger, Hero empilhada, carrosséis manuais, trilhos automáticos estáticos, footer empilhado |
| ≤480 px | Cotação com uma coluna/padding20 |
| ≤420 px | WhatsApp/CTAs estreitos |
| ≤393 px | Regra residual de padding-top279/boundary-top249 na Hero |

Matriz requerida para homologação: 320/360/375/390/414/430; 768/820/1024; 1280/1440/1920 e ultrawide. Uma captura em 375/1440 não comprova a matriz inteira. Testar também zoom, orientação e WebKit/Safari.

### 12.2. Recursos implementados e limites

Idioma pt-BR, skip link, headings semânticos, labels de controles, foco visível 2 px/offset5, aria-current, carrossel com teclado e aria-live, popovers nativos, dialog modal e retorno de foco. Decoração de ícones oculta; logos têm texto alternativo; imagens de parceiro usam alt vazio com nome textual adjacente.

Reduced motion:
- SiteMotion/escudo não iniciam seus movimentos decorativos.
- Trilhos de logos/benefícios estáticos.
- Glow/beam dedicados sem animação.
- Regra CSS global reduz duração de animações/transições para .01 ms.
- **Limitação:** hover global de botões ainda muda transform; duração quase zero não remove o deslocamento. Está na fila de correção.

Mais contraste/menos transparência tem superfícies quase sólidas; forced-colors remove preenchimentos de texto em gradiente. Fallback sem backdrop-filter existe, mas a cascata editorial pode disputar fundos: validar o resultado real.

Contraste desejado: 4.5:1 texto comum, 3:1 texto grande. **Não medido como certificação nesta documentação.** Não alegar WCAG AA completa por presença de ARIA. Relações acessíveis implícitas dos popovers nativos devem ser inspecionadas antes de adicionar ARIA redundante.

## 13. Arquitetura técnica e versões

### 13.1. Stack resolvida

| Pacote | Versão no lockfile |
| --- | --- |
| Next.js | 16.4.2 |
| React / React DOM | 19.3.0 |
| GSAP | 3.15.0 |
| Lucide React | 1.59.0 |
| Three.js | 0.186.1 |
| React Three Fiber | 9.8.2 |
| Drei | 10.7.9 |
| Tailwind CSS / @tailwindcss/turbopack | 4.3.3 |
| TypeScript | 5.9.3 |
| ESLint | 9.39.5 |
| eslint-config-next | 16.4.2 |

Gerenciador declarado: pnpm@11.25.0. Node observado no ambiente da revisão: v24.22.1, não uma restrição engines declarada no package.json.

Next config: agentRules false, cacheComponents true, partialPrefetching true, regra Turbopack *.css com loader @tailwindcss/turbopack e as *.css. Não há PostCSS config avulso encontrado.

### 13.2. Responsabilidades dos arquivos

| Fonte | Responsabilidade |
| --- | --- |
| app/layout.tsx | idioma, fonte, metadata, CSS global |
| app/page.tsx | composição Server Component, gates, textos institucionais |
| lib/content.ts | serviços, diferenças, contatos, parceiros, logos, mensagens, gates |
| components/site/header.tsx | navegação, popover mobile, ocultação, cápsula móvel |
| components/site/quote-menu.tsx | trigger Hero/cards, seleção e resumo provisório |
| components/site/carousel.tsx | scroll-snap, contador, indicadores/teclado |
| components/site/benefit-track.tsx | loop WAAPI e modo estático |
| components/site/channels-popover.tsx | contatos/redes e posicionamento |
| components/site/floating-whatsapp.tsx | menu horizontal fixo |
| components/site/motion.tsx | entrada, reveals, luz e âncoras |
| components/site/hero-shield.tsx | composição/pose da imagem |
| components/shield/image-shield.tsx | imagem, mouse, reflexo, lifecycle |
| components/shield/image-motion.mjs | órbita, perfis, cálculos de tilt/reflexo |
| lib/site-motion.mjs | entrada compartilhada e parallax |
| lib/navigation.ts | offset e duração por distância |
| lib/header-visibility.ts | histerese do header |
| lib/benefit-loop.mjs | largura, distância, cópias e duração do trilho |
| app/preview/escudo | rota auxiliar de inspeção |
| components/shield/geometry/materials/shield-scene | estudo procedural preservado, não importado pela Hero |
| §19 | inventário literal dos oito arquivos de estilo da landing |

### 13.3. SEO e limites funcionais

Title atual: `ZURY CORRETORA`; description: headline completa; lang pt-BR; favicon em app/favicon.ico. Não há metadata Open Graph/Twitter específica nem sitemap/robots de aplicação nos arquivos de app inspecionados; preview tem noindex/nofollow próprio.

Não há analytics solicitado, formulário pessoal funcional, CRM, pagamentos ou serviço de cotação. Links externos implementados com target blank/rel noopener noreferrer quando apropriado. Não versionar credenciais, .env, node_modules ou .next.

## 14. Performance e evidências

Imagem principal tem dimensões reservadas/priority; fonte via next/font; conteúdo de estrutura servido por Server Component; motores de UI isolados em Client Components. Hero não depende de WebGL. Não afirmar tree shaking ou tamanho de bundle medido sem análise.

Loops usam GSAP/WAAPI; custos a medir: múltiplos backdrops, sombras/filtros de beam, máscara SVG que referencia PNG e tween de width/height do hover da navbar. A máscara SVG usa a origem PNG pública enquanto a imagem Next pode ser otimizada; não presumir uma única transferência.

Metas de campo, ainda sem medição certificada: LCP ≤2.5 s, INP ≤200 ms, CLS ≤.1 no p75. Lighthouse não foi executado nesta revisão documental.

Evidência disponível da sessão:
- TypeScript, ESLint e 44 testes passaram em 26/10/2026 antes do commit do site.
- Build sem rede falhou ao buscar Inter Tight no Google Fonts.
- Nova tentativa com rede terminou em erro Turbopack por criação de processo/bind de porta não permitido. **Build de produção não confirmado.**
- Inspeção anterior real no navegador interno: Hero em 1440 × 900 e 375 × 812, dialog de cotação, menu mobile, Diferenciais, rodapé e contato.
- Captura full-page feita sem revelar todas as seções por scroll continha áreas ocultas pelas entradas: **não serve como prova de seções vazias nem inspeção visual integral**.
- Companhias em captura específica, hover/foco completos, Safari e toque físico continuam pendentes.
- Evidências temporárias da sessão em /private/tmp não integram o repositório nem têm permanência garantida.

## 15. Processo de manutenção

O projeto existe e deve ser continuado. Preservar alterações e ativos; nunca reinicializar a base para ajustar documentação ou design.

Integração do PNG foi autorizada e não deve ser bloqueada por regras antigas do estudo 3D. Novo modelo 3D final exige prévia isolada e aprovação específica antes de substituir a imagem. Gates comerciais permanecem independentes.

Plano de execução curto: verificar fonte responsável, fazer mudança autorizada, testar proporcionalmente, inspecionar resultado quando visual, relatar provas e pendências. Mudanças da auditoria seguem §16.2, uma por autorização. Pedido de commit não autoriza corrigir pendências visuais por conta própria.

## 16. Critérios de aceite e fila autorizável

### 16.1. Definition of Done para publicação

Caixas abertas são critérios a homologar, não afirmação de que a funcionalidade inexiste.

- [ ] Conteúdo literal validado: Hero/subtítulo/pontuação, 8 grupos/44 itens, 3 diferenciais, 37 companhias, 4 parceiros da prévia, dados legais/contatos.
- [ ] Produção padrão mantém Hero → Soluções → Diferenciais → Companhias → Footer; prévias somente com seus gates.
- [ ] Marca e PNG original preservados; alternativa procedural não apresentada como aprovada.
- [ ] Hero responsiva sem clipping/colisão nas faixas e com CTA acessível; tamanhos e posição aprovados visualmente.
- [ ] Tipografia computada, gradientes e reduced motion conferidos em viewport alvo.
- [ ] Cards completos, alturas coerentes e carrosséis manuais com swipe, indicadores, contador e teclado corretos.
- [ ] Companhias/Benefícios: loop 76 px/s desktop, pausa/foco/visibilidade/cópias e grids estáticos verificados.
- [ ] Navbar/menus/dialog: abertura/fechamento, âncoras, focus return, estados nativos e toque validados.
- [ ] Beam/glow/lift dos botões confirmados visualmente e compatíveis com preferências de movimento.
- [ ] Cotação provisória reconhecida como tal; fluxo final definido e aprovado antes de prometer envio.
- [ ] Gates comerciais e condições de ofertas mantidos até validação expressa.
- [ ] Rodapé sem dados duplicados; destinos exatos e Facebook disabled.
- [ ] Typecheck, lint, testes e build passam, ou impedimentos explicitamente documentados sem declarar produção pronta.
- [ ] Matriz de viewport, Safari/WebKit, zoom e contraste renderizado testados.
- [ ] Core Web Vitals medidos e condições registradas; sem scores inventados.
- [ ] Publicação/domain/SEO/preview e segredos revisados antes do deploy.

### 16.2. Checklist de melhorias — executar uma de cada vez com permissão

Este checklist deriva da auditoria solicitada e é distinto da homologação de publicação acima. **O “SIM” recebido autorizou o item 01, não a execução automática dos demais.** Atualização documental não altera essa autorização.

| Estado | Item | Escopo e critério |
| --- | --- | --- |
| Em andamento, autorizado | 01 — Inspeção visual | Capturas específicas de Companhias, estados hover/foco e complementação mobile; descartar full-page não revelada |
| Pendente de permissão | 02 — Tipografia da Hero | Consolidar Inter Tight/pesos/entrelinhas e verificar cascata antes de propor outra família |
| Pendente de permissão | 03 — Palavra ZURY | Diminuir glifo por font-size, sem scaleY; resolver gradiente específico sobrescrito; apresentar comparação |
| Pendente de permissão | 04 — Layout da Hero | Rever translate percentual, margem120/altura48.08/padding51 e breakpoints |
| Pendente de permissão | 05 — Escala tipográfica | Alinhar papéis de títulos, listas e botões, preservando caixa alta e logo |
| Pendente de permissão | 06 — Textos pequenos | Melhorar instrução9 e cargos9–10 px sem overflow |
| Pendente de permissão | 07 — Beam no perímetro | Luz realmente percorre borda arredondada, sem girar uma moldura fora do contorno |
| Pendente de permissão | 08 — Pulsação coordenada | Unificar glow/pulso/glint sem remover pedidos aprovados |
| Pendente de permissão | 09 — Hover/lift | Corrigir reduced motion, soma de 4+2 px no WhatsApp e links com aparência de botão |
| Pendente de permissão | 10 — Navbar/fade | Calibrar duração/curva e superfície abrangida pelo efeito |
| Pendente de permissão | 11 — Soluções | Avaliar vazios/alturas e destaque Auto/Saúde/Empresarial/Agro sem restaurar faixa removida; mudanças em cards explicitadas |
| Pendente de permissão | 12 — Companhias | Conferir tamanho óptico, contraste, trilho e chamada |
| Pendente de permissão | 13 — Cotação/WhatsApp | Definir campos, mensagens por produto e roteamento; nenhuma automação inventada |
| Pendente de permissão | 14 — Acessibilidade/mobile | Teclado, ARIA nativo, contraste, zoom, reduced motion, toque e Safari |
| Pendente de permissão | 15 — Tokens/QA | Consolidar estilos repetidos, atualizar referência e fechar build/performance |

A recomendação tipográfica inicial é refinar Inter Tight. Outra família exige proposta comparativa aprovada, preservando SVGs. O relatório anterior de 14/20 foi retirado por falta de evidência; não usar como score atual.

## 17. Restrições e diferenças conhecidas

Não redesenhar marcas; não inventar parceiros, métricas, acessos, contatos ou aprovação. Não adicionar serviço de backend, depoimentos ou coleta pessoal sem escopo. Não publicar prévia comercial por confundir flag técnica com autorização.

Não restaurar regras históricas: Hero sem CTA/subtítulo; proibição de hamburger; três parceiros/FarMelhor; logos não integradas; loop42 px/s; navbar475 ms conjunta; escudo apenas isolado. Essas regras foram superadas.

Diferenças entre intenção e implementação permanecem registradas, sem correção disfarçada:
- “altura menor de ZURY” foi feita só por line-height, não por glifo.
- “flutuar todos os botões” é regra de button, não todos os links-CTA; reduced motion tem falha residual.
- Beam atual rotaciona camada, não prova seguimento geométrico da cápsula.
- Gradiente ZURY/padding Hero/subtítulo/lista mobile têm regras concorrentes.
- Prévia contém nota editorial desatualizada.
- Loop automático depende de count>1, não de overflow real.
- Quote não envia dados nem mensagens.
- Claims/condições comerciais não são validados pela presença da interface.
- Build e auditoria completa continuam pendentes.

## 18. Rastreabilidade e atualização

Dados literais e ativos são propriedade da marca. Manter este documento consistente com as fontes indicadas; quando atualizar CSS, revisar o §19 correspondente. Não editar a transcrição para tentar mudar a interface.

Esta consolidação é documental e usa apenas o repositório e evidências da sessão; não faz novas alegações de APIs, compatibilidade externa, certificação legal ou performance.

Histórico detalhado das decisões anteriores: Git, versão de ZURY-SITE-SPEC.md até commit 2d93bc6. Nunca reaplicar uma regra antiga sem conferir as revisões vigentes.

## 19. Referência literal dos estilos próprios da landing page

As transcrições abaixo registram **todas as declarações** dos oito arquivos CSS próprios carregados pela landing page na base auditada. Incluem regras-base, overrides, fallback e estilos residuais; não são uma lista apenas do CSS efetivamente vencedor.

A cascata depende de especificidade, ordem real de carregamento e preferências de mídia. Valores computados exatos de um dispositivo exigem inspeção do navegador. Tailwind gerado, estilos internos do Next/font e CSS exclusivo da rota de prévia não são estes oito arquivos.


### 19.1. app/globals.css

```css
@import "tailwindcss";

:root {
  --zury-offwhite: #eaeae5;
  --zury-stone: #d6d3d1;
  --zury-midgray: #78716c;
  --zury-graphite: #1c1c1c;
  --text: #d7dce0;
  --hero-copy: #adb4bb;
  --muted: #c2c3c0;
  --gutter: clamp(20px, 5vw, 80px);
  --glass-border: rgba(225,231,235,.13);
  --glass-blur: 16px;
  --glass-tint: rgba(18,22,26,.27);
  --logo-silver: linear-gradient(118deg,#f1f3f4 4%,#c7ced4 38%,#e6ebef 58%,#aeb8c0 100%);
  --list-divider: 1px solid rgba(214,211,209,.14);
  --flow-duration: 600ms;
  --flow-fade: 160ms;
  --flow-ease: cubic-bezier(.23,1,.32,1);
  --flow-reflection: linear-gradient(110deg,transparent 18%,rgba(214,211,209,.025) 32%,rgba(234,234,229,.12) 48%,rgba(214,211,209,.035) 62%,transparent 80%);
  /* Stage 6: semantic roles, not cumulative percentage adjustments. */
  --tracking-hero: .025em;
  --tracking-section: .06em;
  --tracking-card-title: .055em;
  --tracking-copy: .025em;
  --tracking-control: .065em;
  --tracking-nav: .065em;
  --tracking-popover: .04em;
  --tracking-footer: .04em;
  --tracking-financial: .035em;
  /* Image 4: averaged 12 × 12 px samples; brand SVG colors remain untouched. */
  --surface-mineral: #0a0c0e;
  --surface-graphite: #1e2022;
  --surface-metal: #2d2e2e;
  --surface-steel: #4f4d4b;
  --light-silver: #989491;
  --light-satin: var(--zury-stone);
  --hero-surface: linear-gradient(180deg,var(--surface-mineral),var(--surface-graphite) 78%,var(--surface-metal));
  --solutions-surface: linear-gradient(180deg,var(--surface-metal),var(--surface-graphite));
  --about-surface: linear-gradient(180deg,var(--surface-graphite),var(--surface-mineral));
  --footer-surface: radial-gradient(ellipse 60% 80% at 12% 35%,rgba(152,148,145,.11),transparent 78%),linear-gradient(180deg,var(--surface-mineral),#171b1e 55%,var(--surface-mineral));
  --referrals-surface: linear-gradient(180deg,var(--surface-mineral),var(--surface-metal) 48%,var(--surface-mineral));
  --referrals-ambient: radial-gradient(ellipse 34% 70% at 18% 48%,rgba(174,184,192,.15),transparent 80%),radial-gradient(ellipse 34% 60% at 84% 56%,rgba(214,211,209,.1),transparent 80%);
  --benefits-surface: linear-gradient(180deg,var(--surface-mineral),var(--surface-graphite) 48%,var(--surface-mineral));
  --benefits-ambient: radial-gradient(ellipse 86% 24% at 50% 36%,rgba(215,220,224,.14),transparent 82%),linear-gradient(180deg,transparent 32%,rgba(174,184,192,.025) 52%,transparent 74%);
  --hero-ambient: radial-gradient(ellipse 44% 70% at 86% 45%,rgba(174,184,192,.23),transparent 80%),linear-gradient(121deg,transparent 50%,rgba(214,211,209,.045) 76%,transparent 93%);
  --solutions-ambient: radial-gradient(ellipse 70% 45% at 100% 12%,rgba(214,211,209,.2),transparent 80%),linear-gradient(90deg,transparent 6%,rgba(215,220,224,.028) 6.1%,transparent 6.25%,transparent 94%,rgba(215,220,224,.04) 94.1%,transparent 94.3%),radial-gradient(ellipse 80% 65% at 0% 70%,rgba(10,12,14,.7),transparent 85%);
  --about-ambient: linear-gradient(124deg,transparent 12%,rgba(152,148,145,.13) 27%,transparent 42%,rgba(10,12,14,.2) 60%,transparent 83%),radial-gradient(ellipse 75% 60% at 0% 32%,rgba(79,77,75,.4),transparent 82%);
  --boundary-line: linear-gradient(90deg,transparent,color-mix(in srgb,var(--light-silver) 14%,transparent) 18%,color-mix(in srgb,var(--light-satin) 30%,transparent) 50%,color-mix(in srgb,var(--light-silver) 14%,transparent) 82%,transparent);
  --boundary-light: radial-gradient(ellipse at 50% 0%,color-mix(in srgb,var(--light-silver) 7%,transparent),transparent 72%);
}
@theme inline { --font-sans: var(--font-inter-tight); }
* { box-sizing: border-box; }
html { scroll-behavior: auto; scroll-padding-top: 96px; }
body { margin: 0; background: var(--zury-graphite); color: var(--text); font-family: var(--font-inter-tight), Arial, sans-serif; -webkit-font-smoothing: antialiased; text-transform: uppercase; letter-spacing: var(--tracking-copy); }
button, input, textarea, select { text-transform: inherit; }
button, a, summary { -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
button, input { font: inherit; }
button { letter-spacing: var(--tracking-control); }
button { color: inherit; cursor: pointer; }
a { color: inherit; text-decoration: none; }
button, a, summary { outline-offset: 5px; }
:focus-visible { outline: 2px solid #eaeae5; }
/* Anchor regions announce focus but are not controls. Do not draw a page-wide border;
   links, buttons, summaries and carousel controls keep their visible focus ring. */
:is(main,section,.institution)[tabindex="-1"]:focus { outline: none; }
button:disabled { cursor: default; opacity: .35; }
::selection { background: #d6d3d1; color: #1c1c1c; }
.container { width: min(calc(100% - var(--gutter) * 2), 1320px); margin-inline: auto; position: relative; }
.zury-site { overflow: clip; }
.skip-link { position: fixed; z-index: 30; top: 12px; left: 12px; padding: 14px 20px; background: #eaeae5; color: #1c1c1c; transform: translateY(-150%); }
.skip-link:focus { transform: none; }

/* Shared crystalline surface: a thin lit edge, transparent layers, and restrained refraction. */
.glass {
  border: 1px solid var(--glass-border);
  background: linear-gradient(138deg, rgba(225,231,235,.035), rgba(215,220,224,.004) 43%, rgba(215,220,224,.018));
  box-shadow: inset 0 1px 0 rgba(245,249,252,.2), inset 0 -1px 0 rgba(215,220,224,.025), 0 10px 28px rgba(4,8,12,.06);
  -webkit-backdrop-filter: blur(var(--glass-blur));
  backdrop-filter: blur(var(--glass-blur));
}
/* Shared Flow Glass, derived from the footer's diagonal light sweep.
   Only this bounded decorative layer moves; content and blur remain stable. */
.flow-glass { position: relative; isolation: isolate; overflow: hidden; }
.flow-glass::after { content: ""; position: absolute; z-index: -1; pointer-events: none; inset: -35% -70%; background: var(--flow-reflection); opacity: 0; transform: translateX(-38%) skewX(-12deg); transition: transform var(--flow-duration) var(--flow-ease), opacity var(--flow-fade) ease; }
.flow-glass:focus-visible::after, .flow-glass:focus-within::after { opacity: .65; transform: translateX(26%) skewX(-12deg); }
.flow-glass:not(.footer-panel):active::after { opacity: .6; transform: translateX(18%) skewX(-12deg); }
.flow-capsule { border-radius: 9999px; overflow: hidden; box-shadow: inset 0 0 0 1px rgba(234,234,229,.055); }
.flow-capsule::after { border-radius: inherit; }
.flow-capsule:focus-visible { box-shadow: inset 0 0 0 1px rgba(234,234,229,.2); }
.site-header { position: fixed; z-index: 20; top: 0; inset-inline: 0; padding: 20px var(--gutter) 12px; display: flex; align-items: center; flex-direction: column; gap: 14px; pointer-events: none; }
.site-header > * { pointer-events: auto; }
.brand-link { display: block; }
.brand-link .official-logo { width: 236px; }
.official-logo { display: block; color: var(--text); }
.official-logo img { display: block; width: 100%; height: auto; }
@supports (mask-image: url("/brand/ZURY_Logo_Otimizada_Branco.svg")) {
  .official-logo { background: var(--logo-silver); mask: url("/brand/ZURY_Logo_Otimizada_Branco.svg") center / contain no-repeat; }
  .official-logo img { opacity: 0; }
}
.nav-glass { display: flex; align-items: center; justify-content: center; gap: 3px; padding: 4px; border-radius: 999px; background-color: rgba(20,24,28,.065); transition: background-color .3s; }
.site-header[data-scrolled="true"] .nav-glass { background-color: var(--glass-tint); }
.nav-glass a, .nav-glass button { position: relative; padding: 10px 20px; display: flex; align-items: center; justify-content: center; gap: 6px; border: 0; border-radius: 9999px; font-size: 12px; letter-spacing: var(--tracking-nav); font-weight: 600; color: var(--text); background: transparent; transition: background-color .25s, color .25s, transform .2s; white-space: nowrap; min-height: 44px; }
.nav-glass a[aria-current], .nav-glass :is(a, button):focus-visible,
.zury-site:has(#social-channels:popover-open) .nav-glass [popovertarget="social-channels"],
.zury-site:has(#nav-contact-channels:popover-open) .nav-glass [popovertarget="nav-contact-channels"] { color: var(--text); background: linear-gradient(120deg,rgba(234,234,229,.065),rgba(214,211,209,.025)); box-shadow: inset 0 1px 0 rgba(255,255,255,.1),inset 0 0 0 1px rgba(234,234,229,.04); }
/* Rest state only. Approved hover, keyboard focus and open-popover rules stay intact. */
:is(.nav-glass,.site-footer) .flow-capsule:not(:hover):not(:focus-visible):not(:active) { background: transparent; box-shadow: none; }
:is(.nav-glass,.site-footer) .flow-capsule:not(:hover):not(:focus-visible):not(:active)::after { opacity: 0; transform: translateX(-38%) skewX(-12deg); }
.hero { --boundary-top: 205px; position: relative; overflow: hidden; background: var(--hero-surface); }
.container.hero-content { max-width: none; width: min(calc(100% - var(--gutter)), 1560px); min-height: 800px; display: grid; grid-template-columns: 55% 45%; align-items: center; padding-block: 200px 105px; font-size: 20px; }
.hero h1 { margin: 0; position: relative; min-width: 0; align-self: center; text-align: center; font-size: clamp(31px, calc(3vw + 10px), 58px); line-height: 1.08; letter-spacing: var(--tracking-hero); font-weight: 600; z-index: 1; }
.hero-line { display: block; white-space: nowrap; }
.hero-line:first-child { color: var(--hero-copy); font-family: Arial, sans-serif; font-size: calc(1em - 2px); }
.hero-line:nth-child(2) { color: var(--hero-copy); font-family: system-ui, sans-serif; font-size: calc(1em - 2px); }
.hero-line:last-child { font-family: Arial, sans-serif; font-size: calc(1em + 6px); }
.section-light { position: absolute; inset: 0; pointer-events: none; mask-image: linear-gradient(180deg,transparent,black 14%,black 82%,transparent); }
.section-boundary::before, .hero::before { content: ""; position: absolute; pointer-events: none; top: var(--boundary-top,0px); inset-inline: var(--gutter); height: 1px; background: var(--boundary-line); }
.section-boundary::after { content: ""; position: absolute; pointer-events: none; top: 0; inset-inline: 0; height: 52px; background: var(--boundary-light); }
/* Bounded static light edge: no bitmap, animated blur or additional render loop. */
.hero::after { content: ""; position: absolute; pointer-events: none; bottom: 24px; left: -15%; width: 130%; height: clamp(100px,15vw,210px); border-bottom: 1px solid color-mix(in srgb,var(--light-satin) 45%,transparent); border-radius: 0 0 50% 50%; background: radial-gradient(ellipse 48% 65% at 75% 100%,color-mix(in srgb,var(--light-silver) 13%,transparent),transparent 80%); box-shadow: 0 16px 38px -25px color-mix(in srgb,var(--light-satin) 45%,transparent); mask-image: linear-gradient(90deg,transparent,black 18%,black 82%,transparent); }
.hero-light { background: var(--hero-ambient); }
.content-section { position: relative; padding-block: 115px 140px; }
.solutions { background: var(--solutions-surface); }
.solutions::before { display: none; }
.solutions-light { background: var(--solutions-ambient); }
.about { background: var(--about-surface); }
.about-light { background: var(--about-ambient); }
.section-heading { text-align: center; margin-bottom: 56px; }
.section-heading h2 { margin: 0; font-size: clamp(29px, calc(3.4vw + 2px), 51px); line-height: 1.16; letter-spacing: var(--tracking-section); font-weight: 600; text-wrap: balance; }
.carousel { display: grid; gap: 18px; outline-offset: 8px; }
.service-grid { grid-template-columns: repeat(4, minmax(0,1fr)); grid-auto-rows: 1fr; }
.card-reveal { min-width: 0; }
.glass-card { position: relative; height: 100%; border-radius: 18px; overflow: hidden; transition: transform .2s var(--flow-ease), border-color .18s, box-shadow .18s, background-color .18s; }
.glass-card > * { position: relative; }
.service-card { min-height: 405px; padding: 32px 25px; text-transform: uppercase; }
.service-card .card-number { display: none; }
.card-number { display: block; color: #d6d7d3; font-size: 11px; letter-spacing: var(--tracking-copy); font-variant-numeric: tabular-nums; }
.card-title { display: flex; align-items: center; gap: 12px; margin: 0 0 26px; min-height: 39px; }
.card-title svg { flex-shrink: 0; color: var(--text); }
.card-title h3 { margin: 0; font-size: 18px; font-weight: 600; letter-spacing: var(--tracking-card-title); line-height: 1.5; }
.service-card ul { display: grid; row-gap: 12px; list-style: disc outside; margin: 0; padding: 0 0 0 14px; }
.service-card li { position: relative; padding-inline-start: 3px; font-size: 14px; font-weight: 500; line-height: 1.7; color: var(--text); overflow-wrap: anywhere; letter-spacing: var(--tracking-copy); }
.service-card li::marker, .difference-card li::marker { color: #bfc1bc; font-size: .65em; }
.service-card ul li { font-size: 16px; }
.difference-grid { grid-template-columns: repeat(3,minmax(0,1fr)); }
.difference-card { min-height: 280px; padding: 32px; text-transform: uppercase; }
.difference-card .card-title { margin: 0 0 24px; min-height: 24px; }
.difference-card .card-title h3 { font-size: 18px; letter-spacing: var(--tracking-card-title); font-weight: 600; margin: 0; }
.difference-card ul { list-style: disc outside; margin: 0; padding: 0 0 0 14px; }
.difference-card li { max-width: 34ch; padding: 14px 0 14px 3px; font-size: 16px; line-height: 1.65; color: var(--text); text-wrap: pretty; overflow-wrap: anywhere; letter-spacing: var(--tracking-copy); }
.difference-card li:first-child { padding-top: 0; }
.difference-card li:last-child { padding-bottom: 0; }
.difference-card li + li { padding-top: 15px; } /* Retain the former 1px border's space, without drawing a divider. */
.referrals { background: var(--referrals-surface); }
.referrals-light { background: var(--referrals-ambient); }
.referral-heading { max-width: 780px; margin: 0 auto 40px; text-align: center; }
.referral-heading h2 { margin: 0; font-size: 22px; line-height: 1.4; letter-spacing: var(--tracking-section); font-weight: 600; }
.referral-grid { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 16px; max-width: 1000px; margin-inline: auto; }
/* Keep the light sweep clipped without a scroll container that focus can move. */
.referral-card { display: flex; flex-direction: column; min-height: 430px; padding: 44px 32px; overflow: clip; }
.referral-card-title { display: flex; align-items: flex-start; gap: 9px; }
.referral-card-title svg { flex-shrink: 0; color: var(--text); }
.referral-card-title h3 { margin: 0; font-size: 18px; line-height: 1.5; letter-spacing: var(--tracking-card-title); font-weight: 600; }
.referral-topics { display: grid; gap: 18px; list-style: disc outside; margin: 24px 0 20px; padding-inline-start: 18px; }
.referral-topics > li { padding-inline-start: 5px; overflow-wrap: anywhere; }
.referral-topics > li::marker { color: var(--text); font-size: 10px; }
.referral-action { display: grid; margin-top: auto; }
.referral-action .referral-cta { margin-top: 0; margin-inline-start: min(25px, max(0px, calc(100% - 260px))); max-width: calc(100% - min(25px, max(0px, calc(100% - 260px)))); }
.referral-description { font-size: 14px; line-height: 1.75; letter-spacing: var(--tracking-copy); text-wrap: pretty; }
.referral-cta { display: flex; align-items: center; justify-content: center; min-height: 48px; width: 260px; min-width: 0; max-width: 100%; align-self: flex-start; margin-top: auto; padding: 8px 12px; font-size: 13.5px; line-height: 1.2; letter-spacing: var(--tracking-control); font-weight: 600; text-align: center; transition: background-color .25s,transform .2s; }
.referral-cta[data-mode="commercial"] { font-size: 12.5px; }
.referral-commercial { max-width: 1320px; margin: 48px auto 0; text-align: center; }
.referral-commercial p { margin: 0; font-size: 22px; font-weight: 700; line-height: 1.6; color: var(--text); letter-spacing: var(--tracking-copy); text-wrap: balance; }
.benefits { background: var(--benefits-surface); }
.benefits-light { background: var(--benefits-ambient); }
.benefits-grid { --benefit-min-width: 260px; --benefit-gap: 14px; max-width: 960px; margin-inline: auto; }
.benefit-group { display: grid; grid-template-columns: repeat(auto-fit,minmax(min(100%,260px),1fr)); gap: var(--benefit-gap); }
.benefit-group .card-reveal { min-width: 0; }
.benefit-copy { display: none; }
.benefits-grid[data-moving="true"] { overflow: clip; }
.benefits-grid[data-moving="true"] .benefit-track { display: flex; gap: var(--benefit-gap); width: max-content; }
.benefits-grid[data-moving="true"] .benefit-group { display: flex; gap: var(--benefit-gap); }
.benefits-grid[data-moving="true"] .card-reveal { width: var(--benefit-width); flex: 0 0 var(--benefit-width); }
.benefit-group .benefit-card { height: 100%; }
.benefit-card { display: flex; flex-direction: column; justify-content: center; padding: 20px; overflow: clip; }
.benefit-logo-well { height: 56px; display: flex; align-items: center; justify-content: center; margin-bottom: 18px; }
.partner-logo { display: block; width: 100%; height: 100%; object-fit: contain; }
.benefit-logo-well .partner-logo:not(.partner-logo-grupo-mv) { max-width: 150px; max-height: 48px; }
.benefit-logo-well .partner-logo-grupo-mv { max-width: 48px; max-height: 48px; }
.benefit-card h3 { margin: 0 0 12px; font-size: 18px; font-weight: 600; letter-spacing: var(--tracking-card-title); line-height: 1.5; }
.benefit-offer { margin: 0; font-size: clamp(18px,1.5vw,20px); line-height: 1.25; letter-spacing: var(--tracking-financial); font-weight: 600; text-wrap: balance; }
.swipe-hint, .carousel-controls { display: none; }
.site-footer { position: relative; background: var(--footer-surface); padding: 25px 0 46px; letter-spacing: var(--tracking-footer); }
.footer-panel { overflow: clip; border-radius: 24px; padding: 50px clamp(28px,4.8vw,70px) 25px; background-image: radial-gradient(ellipse at 100% 0%,rgba(215,220,224,.045),transparent 60%),linear-gradient(135deg,rgba(215,220,224,.024),rgba(215,220,224,.006) 65%); }
.footer-logo { display: block; width: 224px; max-width: 100%; height: auto; margin-bottom: 50px; }
.footer-columns { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
.footer-columns h2 { color: #b8bab5; font-size: 18px; font-weight: 600; letter-spacing: var(--tracking-footer); text-transform: uppercase; margin: 0 0 21px; }
.footer-nav { display: flex; align-items: flex-start; flex-direction: column; }
.site-footer .footer-link { font-size: 16px; letter-spacing: var(--tracking-footer); min-height: 44px; display: inline-flex; align-items: center; padding: 9px 14px; margin-inline-start: -14px; font-weight: 500; border: 0; background: transparent; color: var(--text); transition: background-color .25s,color .25s,transform .2s; }
.footer-link:focus-visible { color: var(--text); background: linear-gradient(120deg,rgba(234,234,229,.065),rgba(214,211,209,.025)); box-shadow: inset 0 1px 0 rgba(255,255,255,.1),inset 0 0 0 1px rgba(234,234,229,.04); }
.institution-details { display: flex; align-items: flex-start; flex-direction: column; }
.institution p { margin: 0; font-size: 16px; font-weight: 500; line-height: 2; color: var(--text); letter-spacing: var(--tracking-footer); }
.copyright { border-top: 1px solid rgba(234,234,229,.13); padding-top: 22px; margin: 45px 0 0; font-size: 14px; letter-spacing: var(--tracking-footer); color: #b7b9b3; }
.floating-whatsapp { transition: transform 220ms var(--flow-ease); --wa-edge: max(24px,env(safe-area-inset-right)); --wa-bottom: max(24px,env(safe-area-inset-bottom)); position: fixed; right: var(--wa-edge); bottom: var(--wa-bottom); z-index: 25; }
.floating-whatsapp-button { position: relative; display: grid; place-items: center; width: 56px; height: 56px; padding: 0; color: var(--text); background-color: var(--glass-tint); animation: whatsapp-enter 220ms cubic-bezier(.23,1,.32,1) backwards; }
.floating-whatsapp-button::after { border-radius: inherit; }
.floating-whatsapp::before { content: ""; position: absolute; z-index: 2; inset: -1px; border: 1px solid #25d366; border-radius: 50%; box-shadow: 0 0 15px rgba(37,211,102,.25); opacity: 0; pointer-events: none; transition: opacity 160ms cubic-bezier(.23,1,.32,1); }
.floating-whatsapp:has(.floating-whatsapp-button:focus-visible)::before { opacity: 1; }
@media (hover:hover) and (pointer:fine) {
  .floating-whatsapp:has(.floating-whatsapp-button:hover)::before { opacity: 1; }
}
@media (hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference) {
  .floating-whatsapp:has(.floating-whatsapp-button:hover) { transform: translateY(-4px); }
}
@keyframes whatsapp-enter { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
.floating-whatsapp-menu { position: fixed; inset: auto; left: auto; right: calc(max(24px,env(safe-area-inset-right)) + 68px); bottom: max(24px,env(safe-area-inset-bottom)); width: min(424px,calc(100vw - max(24px,env(safe-area-inset-left)) - max(24px,env(safe-area-inset-right)) - 68px)); margin: 0; padding: 8px; border-radius: 9999px; color: var(--text); background-color: var(--glass-tint); opacity: 0; transform: translateX(10px); clip-path: inset(0 0 0 100% round 9999px); transform-origin: right center; transition: opacity 240ms cubic-bezier(.23,1,.32,1),transform 240ms cubic-bezier(.23,1,.32,1),clip-path 240ms cubic-bezier(.23,1,.32,1),display 240ms allow-discrete,overlay 240ms allow-discrete; }
.floating-whatsapp-menu:popover-open { display: flex; gap: 6px; opacity: 1; transform: translateX(0); clip-path: inset(0 round 9999px); }
@starting-style { .floating-whatsapp-menu:popover-open { opacity: 0; transform: translateX(10px); clip-path: inset(0 0 0 100% round 9999px); } }
.floating-person { display: flex; flex: 1 1 0; min-width: 0; min-height: 44px; align-items: center; justify-content: center; flex-direction: column; gap: 4px; padding: 6px; text-align: center; letter-spacing: var(--tracking-popover); }
.floating-person strong { font-size: 12px; font-weight: 600; letter-spacing: var(--tracking-popover); }
.floating-person span { font-size: 10px; color: var(--text); letter-spacing: var(--tracking-popover); }
.floating-whatsapp-menu:focus { outline: none; }
@media (hover:hover) and (pointer:fine) { .floating-person:hover { background-color: rgba(215,220,224,.035); } }
@media (max-width:420px) {
  .referral-cta { width: min(100%,260px); min-width: 0; }
  .floating-whatsapp { --wa-edge: max(12px,env(safe-area-inset-right)); --wa-bottom: max(18px,env(safe-area-inset-bottom)); }
  .floating-whatsapp-button { width: 52px; height: 52px; }
  .floating-whatsapp-menu { right: calc(max(12px,env(safe-area-inset-right)) + 64px); bottom: max(18px,env(safe-area-inset-bottom)); width: calc(100vw - max(12px,env(safe-area-inset-left)) - max(12px,env(safe-area-inset-right)) - 64px); padding: 6px; }
  .floating-person { padding: 6px 2px; }
  .floating-person strong { font-size: 11px; }
  .floating-person span { font-size: 9px; }
}
.icon-button { width: 44px; height: 44px; padding: 0; border-radius: 50%; display: inline-grid; place-items: center; background-color: transparent; border: 1px solid rgba(234,234,229,.22); transition: transform .2s, background-color .25s; }
.channel-panel { position: fixed; inset: auto; margin: 0; top: 100px; left: 16px; width: min(382px, calc(100vw - 24px)); max-height: calc(100dvh - 24px); padding: 23px; border-radius: 23px; color: var(--text); overflow-y: auto; overscroll-behavior: contain; background-color: var(--glass-tint); background-image: radial-gradient(ellipse at 10% 0%,rgba(215,220,224,.07),transparent 80%); -webkit-backdrop-filter: blur(var(--glass-blur)); backdrop-filter: blur(var(--glass-blur)); box-shadow: inset 0 1px 1px rgba(255,255,255,.23),0 16px 50px rgba(0,0,0,.22); }
.channel-panel:popover-open { animation: panel-open .18s var(--flow-ease) both; }
.channel-panel[data-side="right"]:popover-open { animation-name: panel-open-right; transform-origin: left center; }
@keyframes panel-open { from { opacity: 0; transform: translateY(8px) scale(.985); } to { opacity: 1; transform: translateY(0) scale(1); } }
@keyframes panel-open-right { from { opacity: 0; transform: translateX(-8px); } to { opacity: 1; transform: translateX(0); } }
.channel-heading { display: flex; align-items: center; justify-content: space-between; gap: 20px; padding-bottom: 15px; }
.channel-panel, .channel-panel * { letter-spacing: var(--tracking-popover); }
.channel-heading h2 { margin: 0; font-size: 22px; letter-spacing: var(--tracking-popover); font-weight: 600; }
.popover-close { border-color: rgba(234,234,229,.15); width: 44px; height: 44px; flex-shrink: 0; }
.channel-row { display: flex; width: 100%; text-align: left; gap: 14px; align-items: center; padding: 14px 18px; border: 0; min-height: 52px; margin-block: 8px; background: linear-gradient(120deg,rgba(234,234,229,.025),rgba(214,211,209,.01)); transition: background-color .3s,box-shadow .3s; }
.channel-row:disabled { opacity: .55; }
.whatsapp-collapse { display: grid; grid-template-rows: 0fr; opacity: 0; transition: grid-template-rows 140ms cubic-bezier(.23,1,.32,1),opacity 140ms cubic-bezier(.23,1,.32,1); }
.whatsapp-collapse[data-expanded="true"] { grid-template-rows: 1fr; opacity: 1; }
.whatsapp-collapse > div { min-height: 0; overflow: hidden; }
.channel-row > span:first-of-type { flex: 1; min-width: 0; }
.channel-row strong { display: block; font-size: 14px; font-weight: 600; }
.channel-row small { display: block; font-size: 12px; color: #c6c8c1; margin-top: 5px; overflow-wrap: anywhere; }
.channel-row > svg { flex-shrink: 0; }
.whatsapp-people { padding: 0 0 12px; }
.person-link { display: flex; min-height: 44px; justify-content: space-between; align-items: center; gap: 12px; padding: 14px 18px; margin-block: 7px; background: linear-gradient(120deg,rgba(234,234,229,.025),rgba(214,211,209,.01)); transition: background-color .3s,box-shadow .3s; }
.person-link strong { display: block; font-size: 13px; font-weight: 600; }
.person-link strong span { font-size: 11px; font-weight: 500; color: #d2d3ce; }
.flow-capsule:active, .icon-button:active { transform: scale(.975); }
@media (hover:hover) and (pointer:fine) {
  .referral-cta:hover { background-color: color-mix(in srgb,var(--light-satin) 8%,transparent); }
  .glass-card:hover { transform: translateY(-4px); border-color: rgba(234,234,229,.38); box-shadow: inset 0 1px 0 rgba(255,255,255,.25),0 18px 34px rgba(0,0,0,.12); }
  .flow-glass:hover::after { opacity: .85; transform: translateX(26%) skewX(-12deg); }
  .person-link:hover, a.channel-row:hover, summary.channel-row:hover { background-color: rgba(255,255,255,.035); }
  .nav-glass :is(a,button):hover, .footer-link:hover { background-color: rgba(255,255,255,.08); color: var(--text); }
  .icon-button:hover { background-color: rgba(255,255,255,.12); }
}
.glass-card:focus-within { border-color: rgba(234,234,229,.38); box-shadow: inset 0 1px 0 rgba(255,255,255,.25),0 18px 34px rgba(0,0,0,.12); }
@media (hover:none) { .glass-card:not(.footer-panel):active { border-color: rgba(234,234,229,.5); background-color: rgba(255,255,255,.07); } }
@supports not ((backdrop-filter:blur(1px)) or (-webkit-backdrop-filter:blur(1px))) {
  .glass { background-color: #353637; }
  .channel-panel, .nav-glass { background-color: #272829; }
}
@media (max-width:1199px) { .service-grid { grid-template-columns: repeat(2,minmax(0,1fr)); } }
/* Annotation target: 930 × 800, bounded by the usable viewport rather than a fixed overflowing width. */
@media (min-width:768px) and (max-width:1199px) {
  .container.hero-content { width: min(calc(100% - var(--gutter)), 930px); grid-template-columns: 57% 43%; }
  .hero h1 { font-size: clamp(31px, calc(3vw + 10px), 42px); }
  .hero-line:first-child { font-size: 40.89px; font-weight: 700; padding-top: 6px; padding-right: 51px; margin-top: 120px; height: 48.08px; opacity: .91; }
  .hero-line:nth-child(2) { opacity: .54; }
  .hero-line:last-child { font-size: 50px; }
  .hero-subtitle { font-size: 19.88px; font-weight: 500; }
}
/* Keep the 12px labels on one row at desktop/tablet widths without shrinking type. */
@media (min-width:768px) and (max-width:1000px) {
  .nav-glass { max-width: 100%; flex-wrap: nowrap; }
  .nav-glass :is(a,button) { padding-inline: 10px; }
}
@media (min-width:768px) and (max-width:902px) {
  .container.hero-content { grid-template-columns: 60% 40%; }
}
@media (max-width:767px) {
  html { scroll-padding-top: 96px; }
  .site-header { padding: 18px 12px 12px; gap: 17px; }
  .brand-link .official-logo { width: 165px; }
  .nav-glass { width: min(100%,500px); border-radius: 21px; flex-wrap: wrap; padding: 6px; column-gap: 0; row-gap: 0; }
  .nav-glass :is(a,button) { padding: 11px 10px; min-height: 44px; font-size: 12px; letter-spacing: var(--tracking-nav); }
  .container.hero-content { grid-template-columns: 1fr; text-align: center; min-height: 740px; padding-top: 235px; padding-bottom: 80px; font-size: 16px; }
  .hero h1 { font-size: clamp(22px,6.6vw,44px); line-height: 1.22; letter-spacing: var(--tracking-hero); }

  .container.hero-content { row-gap: 16px; }
  .hero-light { background: radial-gradient(ellipse 70% 55% at 65% 72%,color-mix(in srgb,var(--light-silver) 24%,transparent),transparent 85%); }
  .referral-grid { grid-template-columns: minmax(0,1fr); gap: 20px; }
  .referral-heading { margin-bottom: 34px; }
  .referral-card-title { min-height: 0; }
  .referral-card { padding: 38px 24px; }
  .referral-description { font-size: 15px; }
  .benefit-group { grid-template-columns: minmax(0,1fr); }
  .benefit-card { padding: 22px; }
  .benefit-card h3 { font-size: 18px; }
  .benefit-offer { font-size: 20px; }
  .content-section { padding-block: 85px 105px; }
  .section-heading { margin-bottom: 34px; }
  .carousel { display: flex; gap: 16px; overflow-x: auto; scroll-snap-type: x mandatory; scroll-padding-inline: 0; scrollbar-width: none; margin-right: calc(-1 * var(--gutter)); padding: 8px var(--gutter) 14px 0; }
  .carousel::-webkit-scrollbar { display: none; }
  .carousel > .card-reveal { flex: 0 0 86%; scroll-snap-align: start; }
  .carousel > .card-reveal:last-child { margin-right: 14%; }
  .service-card { min-height: 410px; padding: 28px; }
  .service-card .card-number { display: block; }
  .card-title { margin: 30px 0 22px; min-height: 39px; }
  .service-card li { font-size: 15px; line-height: 1.7; }
  .card-title h3 { font-size: 18px; }
  .swipe-hint { display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 9px; letter-spacing: var(--tracking-copy); font-weight: 500; color: #c2c4bd; margin: 0 0 14px; }
  .carousel-controls { display: flex; align-items: center; justify-content: center; gap: 22px; margin-top: 16px; }
  .carousel-controls span { color: #d0d2ca; font-size: 11px; letter-spacing: var(--tracking-control); font-variant-numeric: tabular-nums; }
  .carousel-controls { flex-direction: column; gap: 0; }
  .carousel-positions { display: flex; justify-content: center; width: 100%; }
  .carousel-positions button { width: min(44px,12.5%); height: 44px; padding: 0; border: 0; background: transparent; display: grid; place-items: center; }
  .carousel-positions button span { width: 5px; height: 5px; border-radius: 50%; background: #92948f; transition: background-color .2s, transform .2s; }
  .carousel-positions button[aria-current] span { background: #eaeae5; transform: scale(1.4); }
  .difference-card { min-height: 280px; padding: 28px; }
  .footer-panel { padding: 35px 26px 25px; }
  .footer-logo { width: 190px; margin-bottom: 35px; }
  .footer-columns { display: flex; flex-direction: column; gap: 29px; }
  .footer-nav { border-top: 1px solid rgba(234,234,229,.12); padding-top: 25px; }
  .footer-columns h2 { margin-bottom: 12px; }
  .copyright { margin-top: 30px; }
  .channel-panel { border-radius: 21px; padding: 20px; }
}
/* At 12px the seven-link navigation needs a third 44px row below 394px. */
@media (max-width:393px) {
  .hero { --boundary-top: 249px; }
  .container.hero-content { padding-top: 279px; }
}
@media (prefers-reduced-transparency:reduce), (prefers-contrast:more) {
  .glass, .channel-panel, .floating-whatsapp-menu { background-color: #202427; background-image: none; border-color: rgba(225,231,235,.48); -webkit-backdrop-filter: none; backdrop-filter: none; }
  @supports (mask-image: url("/brand/ZURY_Logo_Otimizada_Branco.svg")) {
    .official-logo { background: #eaeef1; }
  }
}
@media (prefers-reduced-motion:reduce) {
  html { scroll-behavior: auto !important; }
  *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; }
  .glass-card:hover, .flow-capsule:active { transform: none; }
  .flow-glass::after { transform: none !important; }
}
```

### 19.2. components/site/editorial-surfaces.css

```css
/* Mineral editorial rhythm: warm off-white, graphite ink, restrained silver grain. */
.hero-copy-position { min-width: 0; align-self: center; transform: translate(4%,-5%); }
.hero h1 .hero-line { font-family: var(--font-inter-tight),Arial,sans-serif; }
.hero h1 .hero-line-accent { display: inline-block; line-height: .9; background: linear-gradient(105deg,#f7f7f0 8%,#aeb7bd 38%,#ffffff 54%,#77848a 78%,#e9ece9 96%); background-clip: text; -webkit-background-clip: text; color: transparent; -webkit-text-fill-color: transparent; text-shadow: 0 0 22px rgba(223,229,228,.22); letter-spacing: .035em; }
.site-header { position: absolute; isolation: isolate; --text: #24282b; --glass-border: rgba(28,28,28,.14); --glass-tint: rgba(234,234,229,.16); background: none; border-bottom: 0; border-radius: 0 0 22px 22px; }
.site-header .header-surface { position: absolute; inset: 0; z-index: -1; pointer-events: none; border-radius: inherit; background: radial-gradient(ellipse at 75% 0%,#fffef8,transparent 75%),linear-gradient(110deg,#eaeae5,#deded8); }
.nav-entry { max-width: 100%; }
.zury-site :is(.hero,.about,.site-footer) { --text: #eeede5; color: var(--text); }
.site-header .official-logo { background: none; }
@supports (mask-image: url("/brand/ZURY_Logo_Otimizada_Branco.svg")) { .site-header .official-logo { background: linear-gradient(115deg,#181c1f,#4f4d4b 55%,#1c1c1c); } }
.zury-site .site-header .nav-glass { --text: #202829; --glass-tint: rgba(255,255,255,.08); --glass-border: rgba(40,52,52,.16); background: linear-gradient(125deg,rgba(255,255,255,.2),rgba(255,255,255,.035) 55%,rgba(117,131,128,.055)); border-color: var(--glass-border); box-shadow: inset 0 0 0 .5px rgba(255,255,255,.24),0 5px 18px rgba(20,27,28,.065); -webkit-backdrop-filter: blur(14px) saturate(1.08); backdrop-filter: blur(14px) saturate(1.08); }
.site-header .nav-glass :focus-visible { outline-color: #202829; }
.site-header .nav-glass :is(a,button) { transition-duration: 160ms; }
.nav-hover-glass { position:absolute; pointer-events:none; left:0; top:0; opacity:0; border-radius:999px; background:linear-gradient(125deg,rgba(42,58,53,.17),rgba(42,58,53,.08)); box-shadow:inset 0 1px 0 rgba(255,255,255,.6),inset 0 0 0 1px rgba(50,65,62,.15); }
@media (hover:hover) and (pointer:fine) {
  .zury-site button:not(:disabled) { transition: transform 180ms var(--flow-ease), background-color 180ms ease, box-shadow 180ms ease; }
  .zury-site button:not(:disabled):hover { transform: translateY(-2px); }
  .zury-site button:not(:disabled):active { transform: translateY(0) scale(.985); }
}
@media (hover:hover) and (min-width:768px) { .site-header .nav-glass :is(a,button):not(.priority-cta):hover:not(:focus-visible) { background:transparent; box-shadow:none; } }
.site-header .nav-glass :is(a,button):not(.priority-cta):is(:hover,:focus-visible) { background: linear-gradient(125deg,rgba(42,58,53,.17),rgba(42,58,53,.08)); color: #202829; box-shadow: inset 0 1px 0 rgba(255,255,255,.6),inset 0 0 0 1px rgba(50,65,62,.15); }
.site-header :focus-visible { outline-color: #24282b; }
.floating-whatsapp-button { background-color: rgba(18,22,26,.72); }
.zury-site :is(.solutions,.referrals,.companies,.benefits) {
  --text: #25292c; --muted: #535754; --glass-border: rgba(28,28,28,.16);
  --flow-reflection: linear-gradient(110deg,transparent 18%,rgba(255,255,255,.12) 32%,rgba(255,255,255,.65) 48%,rgba(214,211,209,.1) 62%,transparent 80%);
  color: var(--text); color-scheme: light;
  background: var(--zury-offwhite);
}
/* Sculpted light, not printed patterns: distinct studio illumination for each panel. */
.zury-site .solutions { background: radial-gradient(ellipse 65% 85% at 100% 10%,#fffef9 5%,transparent 80%),radial-gradient(ellipse 80% 70% at 0% 100%,#bfc4c0,transparent 85%),linear-gradient(125deg,#d8dcd7,#f4f3ec 55%,#dce0da); }
.zury-site .solutions-light { background: radial-gradient(ellipse 15% 110% at 82% 25%,rgba(255,255,255,.85),transparent 90%),linear-gradient(118deg,transparent 35%,rgba(255,255,255,.38) 52%,transparent 70%); }
.zury-site .referrals { background: radial-gradient(ellipse 80% 65% at 50% 5%,#fffef7 10%,transparent 85%),radial-gradient(ellipse 60% 90% at 100% 85%,#c3c9c3,transparent 85%),linear-gradient(150deg,#d9ddd6,#efeee5 50%,#e1e3db); }
.zury-site .referrals-light { background: radial-gradient(ellipse 40% 55% at 10% 45%,rgba(255,255,255,.7),transparent 85%),radial-gradient(ellipse 90% 16% at 60% 0%,rgba(255,255,255,.8),transparent 90%); }
.zury-site .benefits { background: var(--zury-offwhite); }
.zury-site .benefits-light { background: none; }
.zury-site .companies { background: var(--zury-offwhite); }
.zury-site .companies .company-logos { background: transparent; }
/* Fine mineral stipple, kept below content: no stripes or lateral fog masks. */
.zury-site :is(.solutions-light,.referrals-light,.companies-light,.benefits-light) {
  background-image: radial-gradient(circle at 2px 3px,rgba(35,45,40,.045) .55px,transparent .85px),radial-gradient(circle at 7px 8px,rgba(255,255,255,.55) .6px,transparent 1px);
  background-size: 11px 13px,17px 19px;
}
.hero-subtitle { display: flex; align-items: center; justify-content: center; width: fit-content; max-width: 100%; margin: 12px auto 0; font-size: clamp(14px,1.4vw,19px); font-weight: 400; line-height: 1.5; letter-spacing: .1em; color: #eaeae5; text-align: center; }
.hero-subtitle span { display: inline-flex; align-items: center; white-space: nowrap; }
.hero-subtitle span + span::before { content: ""; width: 4px; height: 4px; margin-inline: clamp(8px,1vw,14px); flex-shrink: 0; transform: rotate(45deg); background: #bfc6bf; box-shadow: 0 0 6px rgba(234,234,229,.2); }
.referral-commercial p { font-size: clamp(15px,2.05vw,22px); }
.referral-commercial-line { display: block; }
@media (min-width:768px) { .referral-commercial-line { white-space: nowrap; } }
.mobile-menu-toggle { display: none; }
.zury-site .glass:where(:not(.channel-panel):not(.floating-whatsapp-button)) { background: linear-gradient(130deg,rgba(255,255,255,.05),rgba(255,255,255,.008) 55%,rgba(255,255,255,.025)); box-shadow: inset 0 1px 0 rgba(255,255,255,.34),inset 0 -1px 0 rgba(255,255,255,.04),0 8px 24px rgba(4,8,12,.045); }
.zury-site :is(.solutions,.referrals,.benefits) .glass { background: linear-gradient(130deg,rgba(255,255,255,.09),rgba(255,255,255,.012) 55%,rgba(214,211,209,.025)); border-color: rgba(47,56,53,.2); box-shadow: inset 0 1px 0 rgba(255,255,255,.75),inset 0 -1px 0 rgba(255,255,255,.08),0 8px 24px rgba(28,28,28,.025); }
.zury-site :is(.referral-cta,.footer-link,.channel-row,.person-link,.icon-button) { transition-duration: 180ms; }
.zury-site .floating-whatsapp-menu { transition-duration: 180ms; }
.zury-site .whatsapp-collapse { transition-duration: 140ms; }
.zury-site :is(.channel-panel,.floating-whatsapp-menu) { --text: #f6f5ee; --glass-border: rgba(255,255,255,.24); color: var(--text); background: linear-gradient(130deg,rgba(23,30,31,.84),rgba(34,42,43,.76)); border-color: var(--glass-border); box-shadow: inset 0 1px 0 rgba(255,255,255,.35),0 12px 30px rgba(8,16,18,.16); }
.zury-site :is(.solutions,.referrals,.benefits) :focus-visible { outline-color: #24282b; }
.solutions .service-card li::marker { color: #535754; }
.solutions .card-number,.solutions .swipe-hint,.solutions .carousel-controls span { color: #535754; }
.solutions .carousel-positions button span { background: #777b78; }
.solutions .carousel-positions button[aria-current] span { background: #25292c; }
.referral-action .referral-cta { margin: 0 auto; max-width: 100%; width: 260px; min-height: 56px; height: 56px; align-self: center; }
.referral-action { display: flex; justify-content: center; width: 100%; min-width: 0; padding-top: 22px; }
.referral-cta[data-mode] { font-size: 13px; }
.benefits .benefit-logo-well { height: 88px; flex-shrink: 0; margin-bottom: 12px; overflow: hidden; }
.benefits .benefit-logo-well .partner-logo { max-width: 180px; max-height: 72px; }
.benefits .benefit-logo-well .partner-logo-grupo-mv { max-width: 64px; max-height: 64px; }
.benefits .benefit-logo-otica-vemos .partner-logo { width: 180px; height: 104px; max-height: 104px; object-fit: cover; object-position: 50% 60%; }
.benefits .benefit-logo-centrolab .partner-logo { width: 112px; max-height: 104px; }
.benefits .benefit-card { min-height: 240px; justify-content: flex-start; padding: 20px; }
.benefits .benefit-card h3 { margin-bottom: 8px; line-height: 1.3; }
.benefits .benefit-offer { margin-top: 0; }
.benefits-grid[data-moving="true"] .benefit-copy { display: flex; }
.benefits > .benefits-grid { width: 100%; max-width: none; margin: 0; padding-block: 8px; border: 0; border-radius: 0; }
.benefits > .benefits-grid[data-moving="true"] { overflow: clip; }
@media (max-width:767px), (prefers-reduced-motion:reduce) {
  .benefits > .benefits-grid { width: min(calc(100% - var(--gutter) * 2),1320px); margin-inline: auto; }
}
/* Rounded panels replace the former hard boundary rules and glow strips. */
.zury-site main > section,.zury-site .site-footer { border-radius: 24px; }
.zury-site main > section + section,.zury-site .site-footer { margin-top: 8px; }
.zury-site .site-footer > .container { width: 100%; max-width: none; }
.zury-site .site-footer { padding: 0; }
.site-footer .footer-panel { transform: none; }
.site-footer .footer-columns { grid-template-columns: repeat(3,minmax(0,1fr)); gap: clamp(24px,4vw,64px); }
.site-footer .footer-columns > * { min-width: 0; }
.site-footer .footer-link { max-width: calc(100% + 14px); overflow-wrap: break-word; }
.zury-site .section-boundary::before,.zury-site .section-boundary::after,.zury-site .hero::before,.zury-site .hero::after { content: none; }
.zury-site :is(h1,h2,h3,strong,.benefit-offer,.referral-commercial p) { --ink-gradient: linear-gradient(110deg,#fffef3 5%,#c5c5bb 50%,#faf8e9 95%); }
.zury-site :is(.solutions,.referrals,.companies,.benefits) :is(h2,h3,strong,.benefit-offer,.referral-commercial p) { --ink-gradient: linear-gradient(110deg,#121819 5%,#535c57 50%,#202727 95%); }
@supports (background-clip:text) or (-webkit-background-clip:text) {
  .zury-site :is(h1 .hero-line,h2,h3,strong,.benefit-offer,.referral-commercial p) { background-image: var(--ink-gradient); background-clip: text; -webkit-background-clip: text; color: transparent; -webkit-text-fill-color: transparent; }
}
@media (max-width:767px) {
  .zury-site main > section,.zury-site .site-footer { border-radius: 18px; }
  .site-footer .footer-panel { border-radius: 18px; }
  .site-footer .footer-columns { grid-template-columns: minmax(0,1fr); gap: 32px; }
  .zury-site .site-header { flex-direction: row; justify-content: space-between; align-items: center; padding: calc(16px + env(safe-area-inset-top)) 20px 16px; gap: 16px; }
  .site-header .brand-link .official-logo { width: 164px; }
  .site-header .nav-entry { display: contents; }
  .mobile-menu-toggle { display: grid; place-items: center; width: 48px; height: 48px; padding: 0; flex-shrink: 0; border-radius: 14px; color: #202829; }
  .zury-site .site-header .nav-glass { display: none; position: fixed; inset: calc(88px + env(safe-area-inset-top)) 12px auto; width: calc(100% - 24px); max-width: none; max-height: calc(100dvh - 108px - env(safe-area-inset-top)); overflow-y: auto; margin: 0; padding: 10px; border-radius: 20px; background: rgba(239,240,233,.94); }
  .zury-site .site-header .nav-glass:popover-open { display: flex; flex-direction: column; flex-wrap: nowrap; gap: 2px; animation: mobile-nav-in 180ms var(--flow-ease); }
  .site-header .nav-glass :is(a,button) { width: 100%; justify-content: flex-start; padding: 12px 16px; min-height: 46px; font-size: 13px; }
  .container.hero-content { padding-top: 144px; }
  .hero-subtitle { margin-top: 10px; font-size: clamp(12px,3.5vw,15px); letter-spacing: .055em; }
  .hero-subtitle span + span::before { width: 3px; height: 3px; margin-inline: 7px; }
  .referral-commercial-line { display: inline; }
}
@keyframes mobile-nav-in { from { opacity: 0; translate: 0 -8px; } to { opacity: 1; translate: 0 0; } }
/* Shared conversion accent: graphite rather than a new color outside the palette. */
.zury-site .referral-cta.priority-cta,.zury-site #site-navigation.nav-glass .priority-cta[popovertarget] {
  position: relative; isolation: isolate; overflow: hidden; color: #f6f5ee; -webkit-text-fill-color: currentColor; background: linear-gradient(120deg,#202829,#3d4743); border: 1px solid rgba(255,255,255,.18); box-shadow: inset 0 1px 0 rgba(255,255,255,.15),0 5px 16px rgba(20,28,25,.12);
}
.priority-cta::before { content: ""; position: absolute; pointer-events: none; z-index: -1; inset: 0; background: linear-gradient(110deg,transparent 25%,rgba(255,255,255,.24) 50%,transparent 75%); transform: translateX(-120%); opacity: 0; animation: cta-glint 5.5s 3; }
.cta-beam { position: relative; overflow: hidden; }
.cta-beam .cta-border-beam { position: absolute; z-index: 0; pointer-events: none; inset: 0; border-radius: inherit; padding: 1px; background: conic-gradient(from 0deg,transparent 0 72%,color-mix(in srgb,var(--cta-beam-color) 18%,transparent) 77%,var(--cta-beam-color) 82%,color-mix(in srgb,var(--cta-beam-color) 18%,transparent) 87%,transparent 92%); -webkit-mask: linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0); mask: linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0); -webkit-mask-composite: xor; mask-composite: exclude; animation: cta-border-beam 4.6s linear infinite; filter: drop-shadow(0 0 4px color-mix(in srgb,var(--cta-beam-color) 42%,transparent)); }
.quote-hero-trigger.cta-beam { --cta-beam-color: #f4f6f4; }
.priority-cta.cta-beam { --cta-beam-color: #4a514e; }
.cta-beam .cta-label,.cta-beam > svg { position: relative; z-index: 1; }
.cta-beam .cta-breathing-glow { position: absolute; z-index: 0; pointer-events: none; inset: 1px; border-radius: inherit; box-shadow: inset 0 0 18px color-mix(in srgb,var(--cta-beam-color) 40%,transparent),0 0 18px color-mix(in srgb,var(--cta-beam-color) 20%,transparent); animation: cta-breathing-glow 3.2s ease-in-out infinite; }
@keyframes cta-border-beam { to { transform: rotate(360deg); } }
@keyframes cta-breathing-glow { 0%,100% { opacity: .16; } 50% { opacity: .72; } }
@keyframes cta-glint { 0%,65% { opacity: 0; transform: translateX(-120%); } 72% { opacity: .7; } 90%,100% { opacity: 0; transform: translateX(120%); } }
@media (prefers-reduced-motion:reduce) { .priority-cta::before,.cta-beam .cta-border-beam,.cta-beam .cta-breathing-glow { animation: none; } .zury-site .site-header .nav-glass:popover-open { animation: none; } }
@media (prefers-contrast:more), (forced-colors:active) {
  .zury-site :is(h1 .hero-line,h2,h3,strong,.benefit-offer,.referral-commercial p) { background-image: none; color: var(--text); -webkit-text-fill-color: currentColor; }
}
@media (prefers-reduced-transparency:reduce), (prefers-contrast:more) {
  .zury-site :is(.solutions,.referrals,.benefits) .glass { background: #f1f1ed; border-color: #535754; }
  .zury-site .site-header .nav-glass { background: #eeefe9; border-color: #535754; }
  .zury-site :is(.channel-panel,.floating-whatsapp-menu) { background: #252c2d; }
}
```

### 19.3. components/site/quote-menu.css

```css
.quote-trigger { display:flex; align-items:center; justify-content:center; gap:12px; min-height:50px; padding:14px 24px; margin:24px auto 0; color:#f5f4ec; border:1px solid #ffffff40; font:600 13px var(--font-inter-tight),sans-serif; letter-spacing:.04em; cursor:pointer; }
.quote-trigger { position:relative; isolation:isolate; overflow:hidden; border-radius:999px; transition:background 180ms,transform 180ms; }
.quote-hero-trigger { min-width:260px; min-height:64px; padding:18px 34px; font-size:14px; color:#1c2429; background:linear-gradient(135deg,#f4f6f5eb,#bac6cedb); border-color:#ffffffa6; box-shadow:inset 0 1px 0 #fff,0 8px 28px #b7c9d333; -webkit-backdrop-filter:blur(12px); backdrop-filter:blur(12px); animation:quote-enter 1.2s ease-out both; }
.quote-trigger::before { content:""; position:absolute; inset:0; z-index:-1; pointer-events:none; background:linear-gradient(110deg,transparent 20%,#ffffff70 50%,transparent 80%); opacity:0; transform:translateX(-100%); transition:transform 600ms ease-out,opacity 180ms; }
.quote-hero-trigger::after { content:""; position:absolute; inset:0; pointer-events:none; border-radius:inherit; box-shadow:inset 0 0 18px #fff8; animation:quote-pulse 3.6s ease-in-out infinite; }
.quote-trigger:focus-visible { outline:2px solid currentColor; outline-offset:5px; }
.quote-card-trigger { background:#263139; color:#f4f5f1; border-color:#647078; width:100%; margin-top:auto; }
@media(hover:hover) and (pointer:fine) { .quote-trigger:hover::before { opacity:1; transform:translateX(100%); } .quote-trigger:hover { transform:translateY(-2px); } }
@keyframes quote-enter { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
@keyframes quote-pulse { 0%,100% { opacity:.12; } 50% { opacity:.8; } }
@media(prefers-reduced-motion:reduce) { .quote-trigger,.quote-trigger::before,.quote-trigger::after { animation:none; transition:none; } .quote-trigger:hover { transform:none; } }
@media(max-width:767px) { .quote-hero-trigger { width:min(100%,290px); min-height:54px; -webkit-backdrop-filter:none; backdrop-filter:none; } }
@media(min-width:768px) { .quote-hero-trigger { width:335px; min-width:335px; font-size:21px; } }
.quote-dialog { width:min(620px,calc(100% - 32px)); max-height:calc(100dvh - 40px); margin:auto; padding:28px; border:1px solid #ffffff70; border-radius:24px; color:#222b29; background:linear-gradient(135deg,#f6f6f0f5,#e4e9e2f5); box-shadow:0 24px 80px #0005; overflow-y:auto; }
.quote-dialog::backdrop { background:#10181980; backdrop-filter:blur(8px); }
.quote-header { display:flex; align-items:center; justify-content:space-between; gap:16px; }
.quote-header h2 { margin:0; font-size:23px; }
.zury-site .quote-dialog :is(h2,h3) { background:none; color:#222b29; -webkit-text-fill-color:currentColor; }
.quote-dialog { --text:#222b29; color-scheme:light; text-align:left; letter-spacing:.015em; }
.quote-close { border:0; background:transparent; display:grid; place-items:center; width:44px; height:44px; cursor:pointer; color:inherit; }
.quote-progress { margin:16px 0 24px; font-size:12px; letter-spacing:.06em; color:#4b5852; }
.quote-options { border:0; padding:0; margin:0; display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:12px; }
.quote-options legend { margin-bottom:16px; font-size:16px; font-weight:600; }
.quote-option { position:relative; display:flex; align-items:center; justify-content:space-between; gap:8px; min-height:70px; padding:16px; border:1px solid #35463f30; border-radius:14px; background:#ffffff35; cursor:pointer; font-size:14px; font-weight:600; transition:background 180ms,border-color 180ms; }
.quote-option input { position:absolute; width:1px; height:1px; opacity:0; }
.quote-option svg { flex-shrink:0; opacity:0; }
.quote-option:has(:checked) { background:#2d413b15; border-color:#304b40; }
.quote-option:has(:checked) svg { opacity:1; }
.quote-option:has(:focus-visible) { outline:2px solid #304b40; outline-offset:3px; }
.quote-actions { display:flex; justify-content:flex-end; margin-top:24px; }
.quote-actions button { display:flex; align-items:center; justify-content:center; gap:12px; min-height:48px; padding:12px 22px; border:0; border-radius:999px; background:#273831; color:#fafaf4; font:600 13px var(--font-inter-tight),sans-serif; cursor:pointer; }
.quote-actions button:disabled { opacity:.4; cursor:not-allowed; }
.quote-summary { min-height:170px; }
.quote-summary h3 { font-size:22px; }
.quote-summary p { font-size:15px; line-height:1.6; }
@media(max-width:480px) { .quote-dialog { padding:20px; } .quote-options { grid-template-columns:1fr; } .quote-option { min-height:54px; } .quote-header h2 { font-size:20px; } }
```

### 19.4. components/site/service-cards.css

```css
.service-card .card-title { flex-direction: column; align-items: flex-start; gap: 12px; min-height: 96px; }
.service-card .card-title svg { margin-top: 0; }
.service-card .card-title h3 { font-size: 20px; min-width: 0; overflow-wrap: normal; word-break: normal; }
.service-card[data-service="08"] .card-title h3 { font-size: 18px; letter-spacing: .025em; }
.service-card { display:flex; flex-direction:column; gap:24px; }
.service-card .card-title { margin-bottom:0; }
.solution-highlights { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:20px; margin-bottom:40px; }
.solution-highlights>div { display:flex; flex-direction:column; gap:16px; text-align:center; min-width:0; }
.solution-highlights strong { font-size:16px; line-height:1.5; color:#263139; }
.solution-highlights .quote-trigger { font-size:12px; padding-inline:12px; }
@media(max-width:767px) { .solution-highlights { grid-template-columns:repeat(2,minmax(0,1fr)); gap:24px 12px; } .solution-highlights strong { font-size:14px; } .service-card .quote-trigger { min-height:50px; } }
```

### 19.5. components/site/companies.css

```css
.companies { padding-block: 72px; background: radial-gradient(ellipse at 50% 100%,rgba(190,200,207,.045),transparent 65%),#1e2022; }
.companies .section-heading { margin-bottom: 0; }
.companies:has(.company-logos) .section-heading { margin-bottom: 48px; }
.companies-comparison { max-width:780px; margin:-24px auto 40px; color:#343d40; text-align:center; font-size:clamp(20px,2.4vw,26px); font-weight:700; line-height:1.55; letter-spacing:var(--tracking-copy); text-wrap:balance; }
.benefits-grid.company-logos { --benefit-min-width: 220px; --benefit-gap: 24px; width: 100%; max-width: none; margin: 0; padding-block: 24px; background: #eaeae5; }
.company-logos .benefit-group { grid-template-columns: repeat(auto-fit,minmax(min(100%,180px),1fr)); align-items: center; }
.company-logos .company-logo { display: grid; place-items: center; height: 144px; min-height: 144px; padding: 20px; border-radius: 20px; border:1px solid rgba(47,56,53,.18); }
.company-logo img { display: block; max-width: 100%; height: 72px; object-fit: contain; }
.company-logos:focus-visible { outline: 2px solid #25292c; outline-offset: -6px; }
@media (max-width: 767px), (prefers-reduced-motion:reduce) { .benefits-grid.company-logos { width: calc(100% - var(--gutter) * 2); margin-inline: auto; } .company-logos .benefit-group { grid-template-columns: repeat(auto-fit,minmax(min(100%,180px),1fr)); } }
@media (max-width:767px) {
  .company-logos .benefit-group { grid-template-columns: repeat(2,minmax(0,1fr)); gap: 24px; }
  .company-logos .company-logo { height:112px; min-height:112px; padding:14px; }
  .company-logo img { height: 64px; }
}
```

### 19.6. components/site/hero-shield.css

```css
.hero-shield {
  --hero-shield-art-size: 88.75838%; /* Previous size × 0.92: an additional 8% reduction. */
  width: min(100%, 620px, 44vw);
  aspect-ratio: 1;
  position: relative;
  justify-self: center;
  min-width: 0;
  isolation: isolate;
  perspective: 1400px;
}
.hero-shield::before, .hero-shield::after { content: ""; position: absolute; pointer-events: none; z-index: -1; }
.hero-shield::before {
  inset: -8% -16% -5%;
  background: radial-gradient(ellipse 34% 54% at 55% 47%,rgba(214,211,209,.13),transparent 76%),radial-gradient(ellipse 38% 40% at 82% 65%,rgba(234,234,229,.07),transparent 78%);
}
.hero-shield::after {
  left: -20%; top: 49%; width: 143%; height: 44%;
  border-bottom: 1px solid rgba(214,211,209,.38);
  border-radius: 0 0 65% 48%;
  background: radial-gradient(ellipse 46% 36% at 67% 100%,rgba(214,211,209,.18),transparent 85%);
  box-shadow: 0 14px 30px -21px rgba(234,234,229,.5);
  transform: rotate(-24deg);
  mask-image: linear-gradient(90deg,transparent,black 28%,black 78%,transparent);
}
.hero-shield-pose { position: relative; width: 100%; height: 100%; transform: rotateY(-16deg) rotateZ(5deg); transform-style: preserve-3d; }
.hero-shield .image-shield-tilt { display: grid; place-items: center; }
.hero-shield .image-shield-art { width: var(--hero-shield-art-size); height: var(--hero-shield-art-size); }
@media (max-width: 767px) {
  .hero-shield { width: 110%; max-width: 460px; }
  .hero-shield-pose { transform: rotateY(-9deg) rotateZ(3deg); }
  .hero-shield::before { opacity: .7; }
  .hero-shield::after { left: -5%; width: 115%; opacity: .7; }
}
```

### 19.7. components/site/site-motion.css

```css
/* Hover feedback belongs to the icon, never to a second transform on the card reveal. */
.zury-site :is(.card-title, .referral-card-title) > svg {
  transition: transform 220ms var(--flow-ease);
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .zury-site .glass-card:hover :is(.card-title, .referral-card-title) > svg { transform: translateY(-3px); }
}
```

### 19.8. components/shield/image-shield.css

```css
.image-shield { width: 100%; aspect-ratio: 1; position: relative; perspective: 1200px; touch-action: pan-y; isolation: isolate; }
.image-shield-scroll, .image-shield-entry, .image-shield-float, .image-shield-tilt { width: 100%; height: 100%; transform-style: preserve-3d; }
.image-shield-tilt { display: grid; place-items: center; }
.image-shield-art { position: relative; width: 100%; height: 100%; transform-style: flat; isolation: isolate; backface-visibility: hidden; }
.image-shield-reflection { position: absolute; inset: 0; width: 100%; height: 100%; overflow: hidden; pointer-events: none; }
.image-shield-reflection-sweep { opacity: 0; }
.image-shield-light { position: absolute; inset: -9% -6%; pointer-events: none; z-index: -1; }
.image-shield-light-drift, .image-shield-light-pointer { width: 100%; height: 100%; }
.image-shield-light-drift { opacity: .7; }
.image-shield-light-pointer {
  background:
    radial-gradient(ellipse 23% 57% at 70% 42%, rgba(214,211,209,.18), transparent 80%),
    radial-gradient(ellipse 45% 18% at 52% 79%, rgba(234,234,229,.09), transparent 85%);
}
.image-shield img { width: 100%; height: 100%; display: block; object-fit: contain; user-select: none; }
@media (prefers-reduced-motion: reduce) {
  .image-shield-scroll, .image-shield-entry, .image-shield-float, .image-shield-tilt { transform: none !important; opacity: 1 !important; visibility: visible !important; }
  .image-shield-light-drift, .image-shield-light-pointer { transform: none !important; }
  .image-shield-reflection { display: none; }
}
@media (hover: none), (pointer: coarse) { .image-shield-reflection { display: none; } }
```
