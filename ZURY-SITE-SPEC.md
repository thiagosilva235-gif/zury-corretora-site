# ZURY CORRETORA — Especificação oficial do website

> **Status:** briefing consolidado e aprovado para implementação.  
> **Natureza:** fonte única de verdade para marca, conteúdo, experiência, comportamento visual e critérios de aceite.  
> **Idioma de interface:** português brasileiro (`pt-BR`).  
> **Escopo:** landing page premium, responsiva, de página única, com **exatamente quatro seções**.  
> **Documento complementar:** [`AGENTS.md`](./AGENTS.md) contém somente instruções de execução para o Codex; não substitui este documento.  
> **Regra essencial:** não inventar textos, produtos, contatos, afirmações comerciais ou áreas extras para preencher o layout.
> **Revisão visual de 19/10/2026:** Premium Dark Gradient, navegação com cinco opções e contatos em popovers aprovados expressamente no pedido de redesign. Esta revisão substitui as decisões anteriores correspondentes; o escudo continua sem aprovação e isolado.
> **Refinamento complementar de 19/10/2026:** Flow Glass compartilhado com cápsulas na navbar, interface sem setas visuais, CONTATOS textual à esquerda no rodapé e WhatsApp destacado. A navbar só reaparece no topo. Preservar a aplicação existente e o gate do escudo.

---

## 1. Objetivo e princípios do projeto

Construir do zero um website de apresentação institucional e comercial da **ZURY CORRETORA**, empresa brasileira de corretagem de seguros e serviços correlatos, com qualidade visual de estúdio especializado em marcas de alto padrão. O resultado deverá transmitir **confiança, solidez, credibilidade, sofisticação, exclusividade, precisão e modernidade**.

### 1.1. Direção criativa aprovada

- **Quiet luxury:** luxo discreto, sem ornamentação supérflua, ostentação, efeitos chamativos ou aparência genérica de template.
- **Linguagem arquitetônica e geométrica:** alinhamentos rigorosos, ritmos consistentes, proporções cuidadosas, áreas de respiro equilibradas.
- **Minimalismo expressivo:** poucos elementos com alta qualidade de execução; não compensar espaços vazios adicionando conteúdo não autorizado.
- **Visual contemporâneo e atemporal:** refinado, premium, limpo e corporativo, sem excesso de gradientes ou cores de destaque.
- **Crystalline Liquid Glass:** superfícies translúcidas sutis, contornos cristalinos, reflexos delicados, profundidade contida e contraste sempre legível.
- **Motion cinematográfico:** movimento deliberado, macio, progressivo, com continuidade entre seções, sem cortes bruscos, flashes ou movimentos que causem desconforto.
- **Fidelidade ao conteúdo e à marca:** a logo está pronta; **não a redesenhar nem recriar sua tipografia**.

### 1.2. Prioridades de decisão (ordem)

1. Exatidão dos conteúdos, marca e quatro seções aprovadas.
2. Legibilidade, acessibilidade e funcionamento em todos os dispositivos.
3. Fidelidade estética à direção premium, inclusive no mobile.
4. Performance real e estabilidade de carregamento.
5. Sofisticação técnica **somente onde agregue benefício perceptível**.

Se um efeito visual prejudicar a leitura, estabilidade, usabilidade ou desempenho, simplificar sua implementação **sem mudar a proposta de design**. Não remover indiscriminadamente todos os efeitos da versão mobile.

---

## 2. Arquitetura de informação: exatamente quatro seções

A página pública principal deve conter, **nesta ordem e somente estas quatro seções**:

| Ordem | ID semântico | Seção | Tom de referência |
| --- | --- | --- | --- |
| 1 | `inicio` | Hero | grafite profundo com luz cinza-prata |
| 2 | `servicos` | Nossas Soluções | cinza mineral e grafite, mais luminoso que o Hero |
| 3 | `sobre` | Nossos Diferenciais | cinza mineral escuro com profundidade própria |
| 4 | `contato` | Footer institucional e contatos | gradiente escuro até grafite profundo `#1C1C1C` |

**Esclarecimentos importantes:**

- A navegação/header não é uma quinta seção.
- **Não criar seção exclusiva de contato**: o destino `#contato` aponta para o footer.
- Não criar outras seções de depoimentos, parceiros, FAQ, estatísticas, formulário, newsletter, planos, logos de seguradoras ou chamada final.
- O design entre os quatro tons deve parecer **uma transição luminosa contínua ao rolar a página**, com gradientes neutros distintos derivados do rodapé existente. Unir as bordas das seções sem mudanças abruptas; não uniformizar todas no mesmo tom.
- Entre seções, compartilhar uma transição arquitetônica: filete prateado de aproximadamente 1 px, baixa opacidade e extremidades dissipadas, acompanhado de luminosidade difusa suave. Sem faixas rígidas, linhas pesadas, novas cores ou novas seções.
- Rotas ou ferramentas locais **de pré-visualização do escudo** são permitidas durante o desenvolvimento, desde que **não integrem a navegação nem sejam publicadas como uma quinta seção/área comercial**.

---

## 3. Marca oficial e arquivos SVG

### 3.1. Pasta de ativos

Os seguintes arquivos foram fornecidos/preparados e devem ficar exatamente em `public/brand/`:

```text
public/
└── brand/
    ├── 04_ZURY_Preto_Transparente.svg       # original entregue; não editar
    ├── ZURY_Logo_Otimizada_Preto.svg        # preto #090909
    ├── ZURY_Logo_Otimizada_Grafite.svg      # grafite #1C1C1C
    └── ZURY_Logo_Otimizada_Branco.svg       # branco #FFFFFF
```

Os três SVGs otimizados possuem `viewBox="280 96 1046 324"` e dimensões nominais `1046 × 324`; o original possui `viewBox="0 0 1600 535"`. A otimização remove apenas excesso de margem transparente pela janela de visualização. **As curvas e proporções do desenho devem permanecer rigorosamente idênticas**.

### 3.2. Regras mandatórias de aplicação

1. Usar a **logo oficial completa** (símbolo/monograma + lettering) nos locais especificados; não substituir por texto digitado.
2. **Navbar e superfícies escuras:** usar `ZURY_Logo_Otimizada_Branco.svg`; em superfícies claras, preferir a variante grafite (`#1C1C1C`). Nunca recolorir o SVG com filtros.
3. **Footer grafite profundo:** usar `ZURY_Logo_Otimizada_Branco.svg` (`#FFFFFF`) para contraste.
4. Variante preta (`#090909`): disponível para superfícies muito claras e cenários auxiliares, se necessário.
5. Preservar o arquivo original como referência imutável. Não aplicar filtros que distorçam cor/contornos, não esticar, deformar, redesenhar, aplicar sombreamentos internos, recriar fonte, adicionar elementos ou recortar os caminhos visíveis.
6. Manter `aspect-ratio` natural, largura responsiva e alinhamento óptico. Não confiar somente na caixa externa para centralização visual; conferir renderização.
7. O efeito Liquid Glass deve estar **na superfície que hospeda a marca**, não dentro do desenho da logo.
8. Para a imagem informativa, garantir nome acessível apropriado: `ZURY CORRETORA`. Quando estiver adjacente a texto redundante, evitar anúncio duplo em leitores de tela.
9. Verificar visualmente o contraste e a legibilidade do lettering pequeno nos dispositivos reais/simulados.
10. O aumento sutil de espessura aparente foi solicitado, mas é condicionado à fidelidade absoluta. Não aplicar stroke, filtros ou font-weight sobre a imagem. Sem variante vetorial fiel aprovada, manter os quatro originais intactos; não simular a alteração.

### 3.3. Ativos que NÃO foram fornecidos

- **Não existe escudo 3D oficial pronto**. O Codex deve modelá-lo/desenvolvê-lo conforme o processo de aprovação do §7.
- Não assumir disponibilidade de fotos, ícones proprietários, vídeo, imagens decorativas ou novos arquivos de marca.
- Para os serviços, usar ícones vetoriais de traço da biblioteca aprovada (`lucide-react` ou equivalente tecnicamente consistente), sem introduzir imagens externas.

---

## 4. Design system: cor, tipografia, espaçamento e materiais

### 4.1. Paleta base aprovada

| Token sugerido | Cor | Emprego principal |
| --- | --- | --- |
| `--zury-offwhite` | `#EAEAE5` | texto e luz neutra sobre grafite |
| `--zury-stone` | `#D6D3D1` | prata e reflexos minerais |
| `--zury-midgray` | `#78716C` | referência mineral, misturada a grafite nos fundos |
| `--zury-graphite` | `#1C1C1C` | texto em superfícies claras, Footer |
| `--zury-white` | `#FFFFFF` | texto de alto contraste sobre fundo escuro |
| `--zury-logo-black` | `#090909` | cor técnica do SVG preto, **não** uma nova cor de UI |

- **Não acrescentar cores saturadas ou metalizados dourados/champagne** à identidade do site.
- Prata acetinada permanece o material do escudo; luminosidade cinza-prata neutra também pode compor gradientes e reflexos da interface. Não usar dourado, champagne, neon ou gradientes coloridos.
- Variações de opacidade, luminância e mistura entre tons neutros são permitidas para simular vidro e transições, desde que respeitem a paleta.
- Contrastes de texto, bordas, indicadores e controles devem ser aferidos sobre o **fundo composto real**, inclusive no movimento, não apenas sobre uma cor ideal. Sobre o cinza `#78716C`, o branco puro passa por margem relativamente pequena para texto comum; transparências e highlights podem diminuir esse contraste e devem ser testados.

### 4.2. Tipografia

- Família principal: **Inter Tight**; carregar de forma otimizada (ex.: `next/font/google`, se a stack final suportar).
- Peso predominante: **600 / semibold**. Outros pesos apenas se melhorarem hierarquia e leitura; evitar aspecto excessivamente fino.
- Títulos: prioritariamente **caixa alta**, tracking discreto/compacto, linhas de quebra conscientes e escala responsiva por `clamp()` ou sistema equivalente.
- Textos auxiliares: hierarquia clara, corpo com entrelinha confortável e peso suficiente para leitura sobre vidro.
- Não substituir o lettering vetorizado da logo por Inter Tight; a fonte Inter Tight se destina **ao conteúdo e à interface do site**.
- Não sacrificar legibilidade para manter tudo em uma única linha; quebras pensadas são preferíveis a fontes microscópicas.

### 4.3. Composição e grid

- Largura máxima confortável para conteúdo, com margens generosas e proporcionais; **não esticar excessivamente em monitores ultrawide**.
- Ritmo vertical elegante: títulos centralizados nas seções de conteúdo e espaçamento **moderado e equilibrado** entre títulos e cartões.
- Cortes/raios arquitetônicos: cantos moderadamente arredondados; controles tipo **pill** onde pertinente, sem tornar todos os cartões excessivamente arredondados.
- Alinhamentos rigorosos; evitar elementos decorativos gratuitos, separadores exagerados, linhas pesadas e sombras dramáticas.
- Componentes responsivos devem responder à **largura útil e ao conteúdo**, não somente a nomes de dispositivos.

### 4.4. Crystalline Liquid Glass

Aplicar este tratamento em **navbar, cartões de serviços, cartões institucionais, botões, popovers e painel do footer**:

- Translucidez moderada com efeito de vidro crível, **não** material opaco genérico nem transparência que apague o texto.
- Highlights estreitos/suaves, reflexos de borda e gradações sutis de luminosidade.
- Borda fina cristalina: **não** usar contorno branco espesso ou contraste teatral.
- Sombras difusas, leves, quase imperceptíveis.
- Hover/foco: sutil elevação/profundidade e resposta de luz, **sem inclinação dos cartões** (`tilt`) ou parallax intenso.
- Mobile: preservar sensação de vidro com luz ambiente sutil e resposta ao toque quando viável; adaptar intensidade/custo sem descaracterizar o projeto.
- Não usar `backdrop-filter` indiscriminadamente em camadas enormes e empilhadas; medir o custo de composição e manter fallback visual digno quando não houver suporte.
- O vidro deve ser perceptível e relativamente transparente, com blur controlado, realces especulares neutros, reflexo que responde discretamente à interação, foco acessível e feedback de pressão. Evitar aspecto leitoso, bordas brancas grossas e sombras pesadas.

### 4.5. Flow Glass

- Derivar o efeito da faixa diagonal de luz do antigo botão CONTATO: fluxo amplo e suave de prata/grafite atravessando a superfície, sem spotlight circular, rastreamento do cursor, neon ou pontos artificiais.
- Compartilhar tokens de gradiente, transparência, bordas, blur, raios, duração e easing. Animar apenas a camada decorativa limitada à superfície, por transform e opacity, sem mover texto ou animar blur.
- Aplicar aos cinco itens de navegação, botão WhatsApp, cards de serviços/institucionais e opções realmente selecionáveis dos popovers. Os cards continuam informativos, sem falso clique ou cursor de botão.
- Hover apresenta superfície cristalina leve e reflexo desacelerado; saída desvanece gradualmente. Estado ativo usa superfície estática ainda mais discreta, nunca underline. Foco visível independente do efeito.
- Touch recebe feedback de pressão sem hover persistente; reduced motion conserva resposta estática sem deslocamento do reflexo. Sem loops contínuos ou listeners de pointermove.
- Não existem setas visuais na landing page, inclusive em links, menus e carrosséis. Expansão WhatsApp pode usar sinal mais/menos, não chevron.

---

## 5. Navegação e header

### 5.1. Desktop

- Logo oficial completa branca centralizada e navbar flutuante Liquid Glass, centralizada e bem distribuída sobre os novos fundos escuros.
- Exatamente cinco opções, nesta ordem: `SERVIÇOS` → `#servicos`; `DIFERENCIAIS` → `#sobre`; `SOBRE` → `#institucional` (conteúdo institucional dentro do footer); `CONTATO` → popover de canais ancorado à navbar; `REDES SOCIAIS` → popover próprio ancorado à navbar. Ambos abrem preferencialmente abaixo, com reposicionamento para caber na viewport.
- Não criar uma quinta seção para SOBRE. O ID `institucional` pertence à coluna legal já existente.
- Hover e ativo em cápsulas integradas ao painel (`border-radius: 9999px`), padding confortável e borda cristalina delicada. Flow Glass atrás do texto; ativo mais discreto e estático que hover, sem sublinhado. Informar `aria-current` quando aplicável; preservar foco e feedback de toque.
- Header visível inicialmente e no topo; oculta suavemente após pequeno limite de descida, com opacidade e deslocamento para cima em aproximadamente 450–650 ms. **Não reaparece ao subir: somente ao retornar ao topo.** Usar histerese contra flicker (referência: ocultar a partir de 88 px, revelar até 8 px). Remover a detecção de direção ascendente e o reaparecimento global por Tab. Não ocultar enquanto popover da navbar estiver aberto ou foco estiver em seus controles visíveis; ao terminar, retomar a política de posição. Nunca deixar foco preso em elemento invisível. Reduced motion mantém a regra sem deslocamento prolongado.
- Contraste e reflexos se ajustam aos fundos, sem troca abrupta de tema.

### 5.2. Mobile

- Logo oficial completa e **as cinco opções acessíveis e visíveis**, com distribuição compacta em múltiplas linhas quando necessário.
- **Não usar menu hamburger, dropdown para esconder links nem scroll horizontal da própria navbar**.
- Verificar obrigatoriamente **320, 360, 375, 390 e 430 px** de largura.
- Priorizar legibilidade e alvos de toque utilizáveis; não cortar textos ou provocar overflow horizontal para forçar uma linha.
- O conteúdo não pode ficar escondido sob o header; considerar `scroll-margin-top`, safe areas e posições reais do elemento fixo/flutuante.

### 5.3. Comportamento e acessibilidade

- Navegação por âncoras com deslocamento suave de caráter cinematográfico, **sem interceptar ou sequestrar o scroll nativo**.
- `prefers-reduced-motion: reduce`: navegação funcional e rápida, sem animações longas.
- Estados de hover, foco visível e ativo diferenciáveis. Informar link ativo adequadamente (`aria-current` quando aplicável).
- Não bloquear clique ou foco em elementos próximos; suportar teclado, mouse, toque e leitores de tela.

---

## 6. Hero: texto exato, layout e entrada

### 6.1. Elementos permitidos

**Somente:**

1. Headline **exatamente** `ENTREGAMOS VALOR ALÉM DE PREÇO`.
2. **Um escudo 3D** premium, com as características do §7.

**Não adicionar:** subtítulo, CTA/botão, texto de apoio, indicação de scroll, carrossel, números, selo, ícones extras, microcopy ou objetos 3D decorativos adicionais.

### 6.2. Composição

- Desktop: ocupar a altura útil inicial (considerando o header), sem colisão; **40% para headline à esquerda / 60% para escudo à direita** como proporção de referência.
- O escudo é protagonista visual sem empurrar a tipografia ou invadir margens.
- Mobile: headline **centralizada acima do escudo**, escudo com largura visual próxima de **75% da área útil**; altura responsiva, sem forçar corte de conteúdo ou viewport excessiva.
- Headline em caixa alta, Inter Tight, peso predominantemente semibold, com quebras lineares cuidadosamente compostas por largura.
- Tracking moderadamente ampliado em relação à versão anterior: referência `-0.025em` no desktop e `-0.02em` no mobile, com ajuste responsivo de tamanho para não invadir o espaço 40%/60% ou fragmentar palavras.
- Entrada visual: **texto primeiro** e escudo **depois**; uma vez estabilizado, flutuação muito discreta e rotação lenta parcial do escudo.
- Nenhuma rotação manual do escudo por gesto/toque no mobile.

### 6.3. Invariantes

- Não mover o layout quando o 3D for carregado; reservar o espaço desde o primeiro render.
- Hero não deve depender do WebGL para mostrar headline e marca.
- Não permitir que câmera, luz ou rotação exponham geometrias pobres, interseções ou materiais plásticos.

---

## 7. Escudo 3D: execução, visual e aprovação obrigatória

**Este é um fluxo de produção com gate de aprovação, não uma tarefa de implementação única.**

### 7.1. Aparência obrigatória

- Escudo tridimensional **verdadeiro**, sofisticado, geométrico e arquitetônico.
- **Face frontal:** prata acetinada/escovada, brilho controlado, microtextura apenas se contribuir para realismo.
- **Laterais/chanfros:** grafite, profundidade contida e bordas precisas, sem aparência de plástico ou brinquedo.
- Iluminação de estúdio premium, com highlights suaves e leitura volumétrica limpa.
- Silhueta reconhecível, proporções elegantes, cantos bem resolvidos, superfície contínua e sem facetas visuais indesejadas.
- **Não adicionar galhos, asas, partículas, brasões, textos, letras, reflexos coloridos, fundos cenográficos ou objetos secundários.**
- Movimentação: flutuação contida e rotação **lenta, parcial e contínua** em torno da pose principal; não girar 360° freneticamente nem revelar o verso de forma indevida.

### 7.2. Implementação preferencial

- Base técnica sugerida: **Three.js + React Three Fiber**, respeitando compatibilidade real com React e Next.js.
- **Real-time WebGL primário**, incluindo em dispositivos móveis capazes, mediante otimização e testes.
- Fallback: animação prerenderizada de alta qualidade **derivada do mesmo modelo**, e, para carregamento/redução de movimento/indisponibilidade, **poster estático premium** derivado do mesmo escudo.
- Nunca usar um escudo visualmente diferente no fallback: **mesma geometria, enquadramento, materiais e iluminação**.
- Evitar carregar todo o motor 3D no caminho crítico de leitura do Hero, usando carregamento oportuno/segmentação e preservando o layout.
- Detectar WebGL indisponível, falhas de inicialização, perda de contexto, baixa capacidade/desempenho real ou preferência por movimento reduzido; não trocar automaticamente para render prerenderizado **apenas por ser mobile**.
- Reduzir DPR/resolução/sombras/reflexos conforme capacidade antes de sacrificar a fidelidade visual. Evitar renderização ininterrupta fora da área visível quando possível.
- A experiência deve funcionar **sem áudio** e sem demandar interação para iniciar a exibição estática.

### 7.3. Sequência mandatória de aprovação

**Fase E1 — Componente isolado:** criar o escudo em componente e ambiente de pré-visualização independente, sem inseri-lo no Hero final.

**Fase E2 — Inspeção visual:** apresentar ao responsável capturas/preview em ângulos e tamanhos representativos; conferir modelagem, profundidade, materiais, recortes, iluminação, reflexos, escala e rotação.

**Fase E3 — Gate:** **PARAR E SOLICITAR APROVAÇÃO VISUAL EXPLÍCITA**. Não presumir aprovação nem integrar o escudo definitivo ao Hero antes do aceite. O restante das tarefas não dependentes pode ser preparado separadamente, desde que não esconda este gate.

**Fase E4 — Assets derivados:** somente após a aprovação, gerar **poster estático e fallback prerenderizado** coerentes com o modelo aprovado. Se a modelagem procedural não conseguir a qualidade esperada, propor workflow para um `.glb` dedicado, mantendo a mesma aprovação visual.

**Fase E5 — Integração:** inserir o componente e fallbacks no Hero com reserva de espaço e transição suave do poster para o modelo pronto; validar desktop/mobile, FPS e ausência de CLS.

**Importante:** o escudo não é a logo. Não reinterpretar ou substituir o monograma oficial por ele.

---

## 8. Seção 2 — NOSSAS SOLUÇÕES

### 8.1. Título e layout

- Headline **exatamente** `NOSSAS SOLUÇÕES`.
- Centralizada em todos os dispositivos; distância até cartões moderada e visualmente equilibrada.
- **Oito cartões, na ordem abaixo**, com informações **sempre visíveis** (sem acordeão, flip, tooltip obrigatório, expansão ou clique para revelar serviços). Numeração `01` a `08` oculta no desktop/tablet em grid; pode permanecer nos cards mobile. Não alterar o contador funcional do carrossel.
- Cartões são **informativos, não links**: não criar cursores de botão, onClick decorativo ou falsa affordance.
- Cada cartão contém ícone linear correspondente, título e lista de serviços **sem marcadores/bullets**, com todos os textos visualmente em caixa alta por CSS. Preservar grafia, acentos, ordem e capitalização originais nos dados de `lib/content.ts`; numeração visual somente no mobile. Reorganizar espaço no desktop mantendo alinhamento e altura uniforme.
- Ícone **sem fundo, sem círculo, sem quadrado e sem contêiner decorativo**; deve estar ao lado do título, com alinhamento refinado.
- Conteúdo ancorado no topo; espaços inferiores vazios devem ser apenas consequência natural da altura uniforme.

### 8.2. Conteúdo oficial — reproduzir literalmente

#### 01 — BENS

- Ícone: `house`
- Residencial
- Condomínio
- Imóveis
- Empresarial
- Equipamentos agrícolas
- Industrial
- Armazéns
- Engenharia
- Usinas

#### 02 — VIDA E SAÚDE

- Ícone: `heart-pulse`
- Seguro de vida
- Plano de saúde
- Odontológico

#### 03 — AGRO

- Ícone: `sprout`
- Seguro agrícola
- Transporte
- Logística
- Safras
- Pecuário

#### 04 — AUTOMOTIVO

- Ícone: `car-front`
- Automóvel
- Frotas
- Moto
- Caminhões

#### 05 — CRÉDITO

- Ícone: `landmark`
- Consórcios
- Financiamentos
- Empréstimos

#### 06 — AÉREO E MARÍTIMO

- Ícone: `plane`
- Marítimo
- Aeronáuticos
- Hangar

#### 07 — TRANSPORTE

- Ícone: `truck`
- Nacional/internacional
- RC de cargas
- Transportador
- Operador

#### 08 — PREVIDÊNCIA

- Ícone: `hourglass`
- Previdência
- Prestamista

**Contagem de integridade:** 8 cartões, **33 linhas de produtos/serviços** no total; `BENS` possui 9 linhas e é o cartão mais longo. As 33 linhas devem estar presentes e na ordem oficial; preservar letras acentuadas, caixa, barra e grafia exatamente como especificadas.

### 8.3. Responsividade e dimensionamento

- Desktop: **grid de quatro colunas por duas linhas (4 × 2)**, visualmente balanceado; **todos os oito cartões com a mesma altura**, determinada pelo maior conteúdo (`BENS`), e não altura distinta por linha.
- Tablet/intermediário: **duas colunas** quando quatro não comportarem de modo legível; usar breakpoint fundamentado no espaço disponível.
- Mobile: **carrossel horizontal de gesto/swipe**, com próximo cartão parcialmente visível (`peek`), `scroll-snap`, sem rotação automática, e todos os 8 cartões acessíveis.
- Mobile: **todos os cartões com altura uniforme, tomando BENS (9 linhas) como referência mínima**; calcular/acomodar a altura real máxima caso quebras de linha em outro cartão exijam mais espaço. Nenhum conteúdo pode ser cortado.
- Mobile: mostrar **imediatamente acima do carrossel** uma instrução em caixa alta, acompanhada de ícone gestual discreto, por exemplo: `ARRASTE PARA A ESQUERDA PARA VER MAIS`.
- Sem setas visuais. Preservar gesto bidirecional, scroll-snap, contador **`01 / 08` a `08 / 08`** e indicadores discretos selecionáveis por clique/toque/teclado, com nome acessível de cada cartão.
- O contador deve refletir o cartão efetivamente ativo, inclusive após swipe manual, resize e navegação por indicador.
- Evitar overflow horizontal da **página**; scroll horizontal limitado ao trilho dos cartões.

---

## 9. Seção 3 — NOSSOS DIFERENCIAIS

### 9.1. Título e layout

- Headline **exatamente** `NOSSOS DIFERENCIAIS`.
- Não apresentar `DIFERENÇA ZURY`, `A DIFERENÇA ZURY` ou qualquer subtítulo substituto acima desse título.
- Centralizada em todas as larguras, com espaçamento equilibrado até os cartões.
- Três cartões institucionais numerados na ordem `01`, `02`, `03`, com o mesmo tratamento Liquid Glass da seção anterior, ajustado ao cinza de fundo.
- Desktop: **três cartões lado a lado**, de mesma altura, tendo como referência o texto mais longo.
- Mobile: carrossel de swipe com próximo cartão parcial, instrução gestual **em caixa alta imediatamente acima**, indicadores selecionáveis sem setas e contador **`01 / 03` a `03 / 03`**. Nenhum conteúdo pode ser truncado.
- Sem expansão, flip, links falsos ou clickboxes não funcionais.

### 9.2. Conteúdo textual oficial — reproduzir literalmente

| Nº | Título | Descrição |
| --- | --- | --- |
| 01 | **SEGURANÇA** | `Equipe qualificada, atuação autorizada pela SUSEP e parceria com diversas seguradoras para proteger seu patrimônio.` |
| 02 | **SUPORTE** | `Atendimento humanizado e especializado, disponível 24 horas por dia.` |
| 03 | **AGILIDADE** | `Agilidade nas cotações e no acompanhamento e resolução de sinistros.` |

A ordem SEGURANÇA → SUPORTE → AGILIDADE e a numeração correspondente são únicas nos dados e se aplicam ao desktop, tablet, carrossel e navegação acessível.

**Observação editorial:** o responsável pela marca **confirmou e autorizou expressamente** as afirmações sobre disponibilidade 24h, autorização SUSEP e parceria com seguradoras. Implementar o texto aprovado sem inventar novas alegações de prazo, cobertura, garantia, preço ou ranking. A confirmação foi fornecida pelo responsável; não constitui verificação independente do registro.

---

## 10. Seção 4 — Footer, contatos e dados institucionais

### 10.1. Aspecto

- Fundo grafite profundo `#1C1C1C`, transição gradual a partir da seção institucional.
- **Painel Crystalline Liquid Glass** refinado com cantos de raio moderado, contorno fino e luz sutil.
- **Logo oficial completa branca** (SVG otimizado branco), proporcional, visível e nítida.
- Não inserir um formulário, CTA extra, mapa, links sociais não fornecidos, badges inventados ou áreas promocionais.

### 10.2. Colunas e ordem

- Desktop: três colunas **`Navegação` → `Contato` → `Institucional`**.
- Mobile: empilhamento **`Contato` → `Navegação` → `Institucional`**, espaços compactos e divisórias discretas, sem repetir logo ou conteúdo desnecessariamente.

**Navegação** — links na mesma página, sem duplicar o botão principal de contato:

- `CONTATOS` — gatilho textual do popover, na lateral esquerda imediatamente acima de SERVIÇOS; mesma tipografia e hierarquia dos links, sem ícone, fundo, borda ou cápsula. Operável por clique, toque e teclado, com hover discreto.
- `SERVIÇOS` → `#servicos`
- `DIFERENCIAIS` → `#sobre`
- `SOBRE` → `#institucional`

**Contato** — o antigo CONTATO textual central é substituído por CONTATOS na coluna esquerda, conforme acima. Abre o mesmo conteúdo de canais da navbar, sem navegar/rolar. Separadamente, preservar botão `WHATSAPP` com ícone de marca, gradiente exclusivamente grafite/prata/cinza mineral/preto, cantos arquitetônicos moderados, borda fina e Flow Glass. Abre popover exclusivo contendo exatamente os três contatos abaixo, individualmente clicáveis e identificados como `THIAGO — CORRETOR`, `VALDIR — CONSULTOR`, `JOANA — SAÚDE`. Reutilizar dados e lógica; nenhum número ou canal em lista estática fora dos menus:

| Nome | Identificação | Telefone exibido | Link exato |
| --- | --- | --- | --- |
| Thiago | Corretor | `(38) 99864-5200` | `https://wa.me/5538998645200` |
| Valdir | Consultor | `(38) 99961-5862` | `https://wa.me/5538999615862` |
| Joana | Saúde | `(61) 98563-8090` | `https://wa.me/5561985638090` |

- Cada telefone deve ser **seu próprio link**; preservar associação nome/cargo/telefone.
- Preferir âncoras externas corretas (`target="_blank"` e `rel="noopener noreferrer"` se abrir em nova aba), foco visível e nome acessível contextualizado.
- **Não incluir mensagem pré-preenchida inventada** no WhatsApp.

### 10.3. Balões de contato e redes sociais

- Um único componente-base compartilhado para contato, redes sociais e WhatsApp, mutuamente exclusivos. CONTATO e REDES SOCIAIS da navbar abrem abaixo de seus gatilhos, sem rolagem até o rodapé. CONTATOS do footer abre preferencialmente à direita do texto, com fade e deslocamento horizontal sutil; reposicionar automaticamente quando a abertura lateral não couber, inclusive no mobile. WhatsApp do rodapé mostra diretamente os três contatos, sem outros canais.
- Canais: WhatsApp com os três contatos oficiais; Instagram `@zury_corretora`; TikTok `@zury_corretora`; e-mail `contato@zurycorretora.com` com `mailto:contato@zurycorretora.com`.
- Candidatos sociais: `https://www.instagram.com/zury_corretora/` e `https://www.tiktok.com/@zury_corretora`. Ativar somente após validação dos perfis. Em 19/10/2026, a consulta pública não permitiu confirmação suficiente (Instagram indisponível na consulta; TikTok bloqueado). Exibir identificadores e pendência, sem links ativos enquanto não forem validados.
- Popovers ancorados com transparência contextual, blur, bordas finas, ícones discretos e abertura suave. Fechar por Escape, clique fora e botão fechar; teclado, foco/restauração e posição sempre dentro do viewport. Mobile pode usar painel flutuante responsivo.
- Nenhum formulário. Dados legais e copyright permanecem visíveis, exatamente uma vez.

**Institucional** — dados oficiais, **exatamente uma vez na coluna institucional**:

```text
ZURY CORRETORA LTDA
CNPJ: 49.393.734/0001-77
SUSEP: 262180499
```

**Faixa final de copyright** — exatamente:

```text
© 2026 · Todos os direitos reservados.
```

- Não repetir razão social, CNPJ ou SUSEP na faixa de copyright.
- Não adicionar a expressão `ZURY CORRETORA LTDA` antes ou depois do copyright.
- Repetições técnicas necessárias em metadados estruturados de SEO não contam como repetição **visual**, mas não devem causar conteúdo visível duplicado.

---

## 11. Sistema de animação e scroll

### 11.1. Direção da experiência

- A sensação deve ser de uma narrativa contínua, **cinematográfica, refinada, suave e não intrusiva**.
- **Transição progressiva de luminosidade entre os quatro tons**; pode ser implementada com camadas de fundo e interpolação de scroll, respeitando performance.
- Elementos surgem com opacidade e deslocamento mínimos, em tempos coordenados, sem `bounce`, elasticidade excessiva ou trajetórias decorativas.
- **Revelações devem poder acontecer novamente quando o usuário voltar à seção**; implementar com controle de reentrada estável, sem flicker ou reanimações compulsivas a cada pixel.
- Navbar inteligente ao rolar; estados ativos e transições de vidro bem sincronizados.
- Hover em cartões: leve aumento da percepção de profundidade e luz; sem inclinação 3D.
- Mobile: combinar luz ambiente discreta com feedback ao toque, sem disparar animações caras continuamente.

### 11.2. Responsabilidade de bibliotecas

- **GSAP + ScrollTrigger:** mecanismo principal para timeline cinematográfica, reveals, mudanças de fundo coordenadas ao scroll, header inteligente quando apropriado.
- **CSS:** preferir para estados simples, transições básicas de hover/foco, layout, scroll-snap e propriedades visuais de baixo custo.
- **Motion** (biblioteca conhecida anteriormente como Framer Motion): opcional para microinterações isoladas que tenham justificativa; não instalar/usá-la se GSAP e CSS cobrirem as necessidades.
- **Nunca deixar GSAP e Motion disputando o mesmo `transform`, `opacity` ou outra propriedade do mesmo elemento ao mesmo tempo.**
- **shadcn/ui:** aproveitar primitivas acessíveis quando realmente úteis; não forçar o visual padronizado do kit sobre a direção autoral da ZURY.

### 11.3. Regras operacionais

- Implementar `prefers-reduced-motion`: reduzir/cessar flutuação e rotação contínuas, suavizar/retirar reveals e scrolling prolongado, preservar o conteúdo completo e o poster do escudo.
- Usar `gsap.context()` e/ou abstração própria equivalente com limpeza de instâncias em desmontagem; usar `ScrollTrigger.matchMedia`/`gsap.matchMedia` ou equivalentes compatíveis para breakpoints e motion preferences.
- Debounce/throttle/observers quando adequados, evitando listeners e `requestAnimationFrame` duplicados.
- Nada de `scroll-jacking`, scroll artificial que impede interação normal, wheel overrides, interceptação agressiva do touch ou `overflow: hidden` no `body` sem motivo.
- O carrossel deve ser **gestual e manual**, sem autoplay.

---

## 12. Requisitos responsivos e de acessibilidade

### 12.1. Matriz mínima de visualização

Testar, no mínimo:

- **Mobile:** 320, 360, 375, 390, 414/430 px.
- **Tablet e transição de grid:** 768, 820, 1024 px (e larguras limítrofes descobertas durante o teste).
- **Desktop:** 1280, 1440, 1920 px.
- **Ultrawide:** largura superior a 1920 px com conteúdo contido e proporções estáveis.
- Orientações de viewport significativas, diferentes densidades de pixel e pelo menos um navegador baseado em WebKit/Safari, além de Chromium.

Critérios gerais:

- Nenhum overflow horizontal da página, texto sobreposto, componente escondido por navbar ou conteúdo cortado.
- Ajustar grid aos comprimentos reais dos textos; quebra de linha não pode esconder produtos ou números.
- Hero deve permanecer equilibrado, com texto e escudo visíveis.
- Site mantém aparência premium e reflexos discretos também no mobile.
- Áreas de clique/toque utilizáveis; controles e links têm rótulos acessíveis, sem setas visuais.

### 12.2. Acessibilidade prática

- HTML semântico, idioma `pt-BR`, hierarquia correta de heading (headline no Hero como `h1`; seções como `h2`).
- Contraste de referência WCAG AA para conteúdo textual: **4.5:1 em texto comum; 3:1 em texto grande**, aferido sobre composição final com vidro/fundo em movimento.
- Foco por teclado visível e não suprimido; ordem de tabulação previsível; não depender de hover.
- SVGs decorativos (`lucide`) devem ser ocultados para tecnologias assistivas quando o título comunica a mesma informação; logo e poster devem ter semântica adequada ao contexto.
- Informar seção ativa na navegação sem depender só de cor.
- Não usar animação que cause flashing ou impeça leitura.
- **Carrosséis mobile:** indicadores selecionáveis nativos sem setas, operáveis por `Enter`/`Space`, grupos/descrição de cartões e anúncio de mudança quando apropriado. Swipes e controles devem atualizar o mesmo estado.
- Se permitir tecla de seta esquerda/direita dentro do trilho focado, não capturar setas globalmente nem romper rolagem natural de toda a página.
- **Sem autoplay nos carrosséis**; assim, não há necessidade de controles de pausa.
- Preferir `scroll-snap` com detecção robusta da posição efetiva, considerando scroll programático e arrasto nativo, não uma implementação frágil de contador baseada apenas no clique.

---

## 13. Arquitetura técnica recomendada

### 13.1. Base

**Preferência aprovada para projeto novo e vazio:**

- **Next.js App Router**, versões estáveis atuais e compatíveis;
- **TypeScript** com tipagem explícita dos dados de cartões;
- **React** compatível com a versão de Next.js selecionada;
- **Tailwind CSS** para layout/tokens/utilitários; CSS dedicado quando necessário para materiais e motion;
- **ESLint e checagem TypeScript**, com scripts verificáveis;
- **Inter Tight**, com carregamento otimizado;
- **Lucide React** para os oito ícones;
- **GSAP + ScrollTrigger** como motor principal de animações;
- **Three.js + React Three Fiber** para escudo 3D, depois de verificar versões compatíveis;
- `@react-three/drei` apenas se simplificar de fato câmera, controles de ambiente, material ou carregamento;
- **shadcn/ui** de maneira seletiva e somente quando agregar acessibilidade e reduzir código;
- **Motion opcional**; não é dependência obrigatória.

**Não fixar números de versão de memória.** Consultar documentação e `peerDependencies` oficiais no momento da instalação. Em particular, React Three Fiber deve corresponder à versão principal de React. Preferir dependências estáveis e evitar bibliotecas experimentais apenas por estética.

### 13.2. Server/Client e carregamento

- Preservar o shell informacional da landing page renderizável sem exigir JavaScript para os textos essenciais, usando componentes de servidor onde apropriado.
- Isolar efeitos de scroll, carrosséis e Canvas em **Client Components pequenos**, evitando marcar toda a página como client desnecessariamente.
- Carregar WebGL de forma dinâmica, do lado do cliente, com fallback/poster estável, sem hidratação quebrada.
- Usar o diretório `public/brand/` para SVGs existentes. Não embutir as quatro variantes inteiras em JS sem benefício comprovado.
- Manter o conteúdo literal em estrutura de dados tipada e única; gerar cartões desktop/mobile a partir dessa mesma fonte. **Não duplicar arrays de conteúdo para as duas versões.**
- O layout desktop 4×2 e o carrossel mobile devem preferencialmente compartilhar os mesmos componentes/dados, mudando somente a apresentação/interação.

### 13.3. Estrutura sugerida — não rígida

```text
AGENTS.md
ZURY-SITE-SPEC.md
public/
  brand/                               # 4 arquivos oficiais do §3
  shield/                              # poster/fallback APÓS aprovação
src/
  app/
    layout.tsx
    page.tsx
    globals.css
  components/
    layout/                            # Header, Footer, SectionShell
    hero/                              # Hero, escudo 3D, fallback
    cards/                             # ServiceCard, InstitutionalCard
    carousel/                          # carrossel acessível reutilizável
    ui/                                # primitivas, se necessárias
  content/                             # conteúdos oficiais tipados
  lib/                                 # animações, observadores, utilitários
  styles/                              # tokens/materiais específicos
```

A implementação pode ajustar a árvore à convenção do framework, mas **não criar pastas vazias, frameworks paralelos, múltiplas fontes de tokens nem abstrações sem uso**.

### 13.4. SEO técnico e segurança básica

- `title` e descrição institucional precisos, sem alegar superioridade, prêmios ou garantias não aprovadas. Sugestão de título: `ZURY CORRETORA | Proteção e soluções em seguros`.
- Metadados em português, Open Graph básico se houver imagem apropriada aprovada. Não improvisar fotografia/mockup como imagem oficial.
- URLs, anchors e telefones corretos; links externos com atributos de segurança aplicáveis.
- Evitar exposição de informações sensíveis, chaves em código de cliente, scripts de analytics sem solicitação ou bibliotecas externas desnecessárias.
- Se publicar, validar domínio, favicon e informações legais pertinentes separadamente, sem inventar dados ausentes.

---

## 14. Performance, estabilidade e métricas

**Diretriz:** a qualidade deve ser medida em dispositivos reais ou perfis representativos; metas não equivalem a garantia prévia.

### 14.1. Metas objetivas

Em condições reais, almejar os limiares de boa experiência de Core Web Vitals no percentil 75:

- **LCP ≤ 2,5 segundos**;
- **INP ≤ 200 ms**;
- **CLS ≤ 0,1**.

Essas são **metas de performance**, não promessas de que todo dispositivo terá resultados idênticos. Registrar resultados de Lighthouse/lab e, após publicação, observações de campo se disponível. Testar separadamente desktop e mobile.

### 14.2. Medidas esperadas

- Reservar dimensões para logo, cards, viewport do escudo, poster e controles (sem layout shift quando imagem/Canvas/fonts surgirem).
- Usar fontes otimizadas, poucos pesos e `font-display` adequado.
- Priorizar conteúdo e texto acima da dobra; carga pesada de 3D não deve impedir interação na landing page.
- Limitar custo de `backdrop-filter`, sombras grandes, blur e camadas animadas em todo o viewport.
- Fazer lazy load de recursos não críticos onde fizer sentido; preservar visibilidade inicial do poster e headline.
- Evitar render contínuo de WebGL fora de foco/viewport; pausar/reduzir quando o documento estiver oculto ou o recurso não estiver visível, se aplicável.
- Otimizar geometria, materiais, draw calls, DPR, luz, shadow maps e texturas sem comprometer a aparência premium.
- Fazer testes com degradação: sem WebGL, rede lenta, 3D que falha, JS limitado, dispositivo móvel de menor capacidade e preferência por movimento reduzido.
- Validar que efeitos de fundo e reveal não mantêm vários loops concorrentes desnecessariamente.

---

## 15. Processo de implementação e pontos de aprovação

O Codex deve executar fases rastreáveis, preferindo pequenos conjuntos coerentes de mudanças e relato dos resultados. **A ordem abaixo é o fluxo desejado, não autorização para pular o gate do escudo.**

### Fase 0 — Auditoria inicial (antes de escrever código)

- Inspecionar o diretório atual e diferenciar pasta vazia de pasta com arquivos existentes; **o projeto foi solicitado como novo, do zero**.
- Se já existirem arquivos na pasta, **não apagar nem sobrescrever silenciosamente**: reportar conflito e propor criar um diretório novo/vazio, preservando projetos anteriores.
- Confirmar presença dos dois documentos e dos quatro SVGs; listar ausências de forma objetiva.
- Verificar versão instalada de Node, gerenciador de pacotes e quais skills/MCPs estão **realmente disponíveis**, sem pressupor acesso por nome.

### Fase 1 — Fundação

- Inicializar stack estável compatível; configurar lint, scripts, tipagem, layout global, tokens, tipografia e importação de SVGs.
- Produzir shell acessível da página, hierarquia das quatro seções e conteúdo oficial antes dos efeitos custosos.

### Fase 2 — Layout responsivo e conteúdo

- Implementar navbar, Hero com **espaço reservado/poster provisório apenas de desenvolvimento** para o futuro escudo, grade/carrossel dos 8 serviços, 3 diferenciais e footer.
- Não publicar um escudo alternativo improvisado como resultado final.
- Conferir contagem de produtos, links, ordem de seções e alinhamentos.

### Fase 3 — Escudo independente e gate

- Seguir integralmente §7.3, fases E1 a E3.
- **Pedir aprovação visual explícita. Não integrar o modelo final ao Hero antes da aprovação.**

### Fase 4 — Integração 3D e motion

- Após aprovação, criar poster/fallback do mesmo modelo, integrar 3D com carregamento progressivo e implementar as transições cinematográficas, glass e navbar inteligente.
- Refinar responsividade e comportamento dos carrosséis.

### Fase 5 — QA, revisão e entrega

- Rodar verificação de tipos, lint, build, testes pertinentes e navegação real no navegador (Playwright/browser/Chrome/Computer Use se realmente disponíveis).
- Inspecionar capturas nos tamanhos obrigatórios e corrigir clipping/contraste/overflow.
- Reportar evidências: testes executados, resultados, problemas remanescentes, assets criados e itens pendentes do responsável.
- **Não apresentar como testado** nada que não tenha sido executado.

---

## 16. Critérios de aceite verificáveis (Definition of Done)

O site **somente** será considerado pronto para publicação depois de todos os itens obrigatórios abaixo serem aprovados.

### Marca, conteúdo e estrutura

- [ ] Há **exatamente 4 seções**, na ordem Hero → Soluções → Diferenciais → Footer, sem formulário ou seção de contato adicional.
- [ ] Hero apresenta **exatamente** `ENTREGAMOS VALOR ALÉM DE PREÇO` e escudo aprovado, sem CTA/subtítulo/scroll cue.
- [ ] Navbar contém **exatamente** `SERVIÇOS`, `DIFERENCIAIS`, `SOBRE`, `CONTATO`, `REDES SOCIAIS`; destinos e balões funcionam conforme §5.
- [ ] Ativo da navbar usa **reflexão sutil atrás do texto**, **não** underline.
- [ ] SVG oficial **não foi redesenhado**; variante branca na navegação escura e no footer; original preservado.
- [ ] Seção serviços apresenta oito títulos na ordem `BENS`, `VIDA E SAÚDE`, `AGRO`, `AUTOMOTIVO`, `CRÉDITO`, `AÉREO E MARÍTIMO`, `TRANSPORTE`, `PREVIDÊNCIA`.
- [ ] Todos os **33 itens** de serviço correspondem exatamente à lista oficial, com ícones correspondentes e sem bullets.
- [ ] Diferenciais apresentam **SEGURANÇA**, **SUPORTE**, **AGILIDADE**, numerados 01/02/03, com cópias literais do §9.2 em todas as larguras.
- [ ] Footer tem CONTATOS textual à esquerda acima de SERVIÇOS, menu preferencialmente à direita e botão WhatsApp separado. Popover WhatsApp contém exatamente três contatos; CONTATOS oferece WhatsApp, canais digitais e e-mail. Sem números estáticos. Dados legais e copyright aparecem uma vez; perfis sociais pendentes não recebem links ativos.
- [ ] Balões de contato e redes sociais compartilham lógica, são mutuamente exclusivos e fecham por Escape, clique fora e botão fechar, com foco e posicionamento corretos.
- [ ] A expressão DIFERENÇA ZURY foi removida; gradientes neutros distintos, vidro cristalino e microinterações refletem o redesign aprovado.

### Responsividade e UX

- [ ] Desktop: serviços **4 × 2**, oito cartões de altura igual; institucional 3 colunas de altura igual.
- [ ] Largura intermediária comporta 2 colunas nos serviços quando necessário.
- [ ] Mobile: serviços e institucionais em carrossel de toque, com **peek**, instrução gestual, indicadores selecionáveis sem setas, contador correto e todos os conteúdos visíveis.
- [ ] Flow Glass compartilhado substitui spotlight; cápsulas nos cinco itens da navbar com ativo/foco/touch e reduced motion. Navbar oculta após limite, continua oculta ao subir e só reaparece no topo, sem flicker; interações abertas/foco visível são protegidos.
- [ ] Serviços sem números no desktop, textos em caixa alta por CSS e dados originais preservados. Hero com tracking ampliado, sem clipping. Três transições de seção compartilham filete prateado difuso e discreto.
- [ ] BENS com suas 9 linhas está completamente legível em todos os dispositivos.
- [ ] Navbar mobile mantém cinco opções acessíveis e logo legível, sem hamburger e sem overflow.
- [ ] Não há clipping, sobreposição, overflow horizontal de página ou header ocultando anchors, nas larguras de §12.1.
- [ ] Espaçamentos, cores e glass refletem o briefing premium com contraste suficiente.

### Escudo e animação

- [ ] Escudo 3D **foi aprovado visualmente em preview isolado** antes de sua integração final.
- [ ] Face de prata acetinada, chanfros/laterais grafite, materiais e enquadramento consistentes.
- [ ] Poster e fallback derivam do mesmo modelo aprovado, sem troca visual perceptível.
- [ ] Carregamento do 3D não causa layout shift; falha de WebGL mantém Hero íntegro.
- [ ] Transições entre seções são contínuas, reveals podem se repetir sem flicker e movimentos são suaves.
- [ ] `prefers-reduced-motion` foi validado; navegação e carrosséis continuam plenamente funcionais.

### Técnica e qualidade

- [ ] TypeScript, lint e build de produção passam (ou qualquer impedimento está explicitamente documentado).
- [ ] Carrosséis e navegação operam com teclado/leitor de tela, foco visível e links corretos.
- [ ] Há evidências de testes no navegador, inclusive larguras 320, 360, 375, 390/430, 768, 1024, 1440 e 1920 px.
- [ ] Core Web Vitals foram medidos ou estimados por ferramenta adequada, com métricas e condições declaradas; não inventar pontuações.
- [ ] Não há dependências, imagens, claims ou seções supérfluas.
- [ ] O usuário recebeu resumo claro do que foi executado, do que foi verificado e do que ainda depende de aprovação.

---

## 17. Restrições explícitas e prevenção de escopo

**NÃO fazer:**

- Criar logos novas ou alterar o monograma, a tipografia e os caminhos SVG oficiais.
- Criar uma quinta seção, formulário, CTA no Hero, botão de orçamento genérico, depoimentos inventados ou perguntas frequentes. CONTATOS textual e botão WhatsApp do §10 são autorizados.
- Esconder serviços em accordions, criar cards clicáveis falsos ou cortar linhas longas para uniformizar alturas.
- Trocar carrossel mobile por empilhamento vertical sem justificativa aceita, remover o peek ou ocultar os controles.
- Criar hamburger como atalho para resolver o espaço da navbar mobile.
- Trocar o indicador ativo por sublinhado.
- Aplicar dourado, champagne, cores saturadas, sombras fortes, parallax agressivo ou rotação de cartões.
- Substituir 3D real por imagem estática como estratégia primária sem falha/capacidade justificável.
- Fazer o escudo definitivamente integrado antes da aprovação visual isolada.
- Declarar performance, conformidade SUSEP independente, funcionamento 24h auditado, testes executados ou assets existentes sem evidência.
- Adicionar várias bibliotecas que realizam as mesmas tarefas apenas por estarem instaladas no ambiente Codex.

**Pode fazer sem nova decisão estética:** ajustes de espaçamento fino, escolha de tamanhos responsivos, técnicas de renderização, simplificação de código, melhoria de contraste/acessibilidade e resolução de conflitos técnicos, **desde que não alterem os requisitos fixados**.

---

## 18. Referências técnicas para execução (não são briefing de marca)

Documentação oficial/autoridade a consultar conforme necessário; não substitui este documento nem exige novas dependências:

- Next.js — App Router e instalação: https://nextjs.org/docs/app/getting-started/installation
- React Three Fiber — instalação e compatibilidade: https://r3f.docs.pmnd.rs/getting-started/installation
- GSAP — ScrollTrigger: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- GSAP — `gsap.matchMedia()`: https://gsap.com/docs/v3/GSAP/gsap.matchMedia%28%29/
- W3C WAI — padrões de carrossel: https://www.w3.org/WAI/ARIA/apg/patterns/carousel/ e https://www.w3.org/WAI/tutorials/carousels/
- web.dev — Core Web Vitals: https://web.dev/articles/vitals

**Regra final:** este documento determina **o que** construir, como a ZURY deve se apresentar e quais resultados aceitar. O `AGENTS.md` determina **como** o Codex deve operar, utilizar ferramentas e reportar evidências. Manter as responsabilidades separadas para preservar contexto, reduzir repetição e evitar interpretações conflitantes.
