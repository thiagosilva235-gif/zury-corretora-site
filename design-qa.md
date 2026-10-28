# /cartao — evidências de 27/10/2026

Fonte visual: imagem de referência fornecida pelo usuário (665 × 1182 pixels), preservada na coluna esquerda da [comparação integral](./artifacts/cartao/comparacao.png).

Implementação: `http://localhost:3001/cartao`, build de produção. Estado de repouso, sem menus abertos, densidade 1.

- [Captura principal](./artifacts/cartao/cartao-864x1536.png): viewport/pixels 864 × 1536.
- [Comparação integral](./artifacts/cartao/comparacao.png): fonte à esquerda, implementação à direita, ambas normalizadas para 665 × 1182.
- [Comparação de logo e CTA](./artifacts/cartao/detalhes.png): recortes equivalentes da comparação integral.
- [WebKit](./artifacts/cartao/cartao-webkit.png) e [mobile](./artifacts/cartao/cartao-mobile.png).
- [Resultados por navegador/viewport](./artifacts/cartao/browser-results.json) e [diferença bruta de pixels](./artifacts/cartao/comparison-metrics.json). A diferença bruta não é uma porcentagem de fidelidade.

## Comparação visual

| Superfície | Resultado e limites |
| --- | --- |
| Tipografia | Textos/ordem literais; Arial bold aproxima a referência. A fonte da imagem não foi identificada como um arquivo original fornecido. Logo usa exclusivamente o SVG oficial; seu deslocamento posterior de −2.4cqw foi autorizado expressamente. |
| Layout/ritmo | Em 864 × 1536: cartão 864 × 1536; botões x=100,66, largura 662,69; CTA y=393,22 e altura 102,64; demais alturas 90,97, gaps 22,11. A referência, normalizada, tem aproximadamente x=100, largura 663 e CTA y=392. |
| Cores/materiais | Grafite, vidro translúcido, prata, texto branco e marcas coloridas; hover 240 ms, sem movimento contínuo. Borda do CTA com reflexos fixos no contorno. |
| Ativos | Quatro SVGs oficiais e PNG original presentes/inalterados. O fundo foi reconstruído em CSS com esse PNG; iluminação/curvas não são uma cópia raster exata do fundo da referência. Ícones sociais vetoriais locais; documento, telefone e envelope de Lucide, com pequenas diferenças de desenho. |
| Conteúdo | Nove controles; Facebook desabilitado por instrução expressa; WhatsApp/Contato abrem os três nomes/cargos oficiais; cotação preserva aviso de que nada foi enviado. |

Comparação integral e recorte detalhado foram inspecionados visualmente. Não se declara identidade de todos os pixels; diferenças residuais de textura/iluminação, desenho dos ícones e rasterização da fonte ficam como refinamento P3 e avaliação visual do usuário.

## Iterações e correções

1. P1: CSS Modules não exportava as classes pelo loader atual (`*.css` → `*.css.css`). Corrigido com CSS de prefixo exclusivo, sem alterar a configuração ou os estilos da landing. Captura inicial sem estilos descartada como evidência final.
2. P2: tamanho de setas, posição da logo/ícones, luminosidade do escudo, curva inferior e reflexos do CTA. Ajustados após comparações das rodadas 1 e 2; a comparação final acima registra o resultado.
3. Bloqueio de teste: dev em `127.0.0.1` falhava na conexão HMR e não hidratava. `localhost` ativou os controles; testes finais foram feitos no servidor de produção.
4. P2: WebKit não restaurava foco após fechar o menu pelo X. Corrigido no modo opcional usado pelo cartão; oito viewports WebKit e um caso final Chrome passaram após a correção.
5. Refinamento expressamente solicitado: logo 20,736 px acima em 864 px de largura (sem alterar a posição dos botões), glow de hover/foco em 240 ms e fade de 600 ms por elemento, com atrasos de 0–520 ms. Chrome e WebKit tiveram as animações inspecionadas em tempo 0, 300 ms e final: os onze alvos começam transparentes, entram em sequência e terminam visíveis. Movimento reduzido desativa a entrada; menus e cotação continuam funcionais. [Resultados](./artifacts/cartao/motion-results.json), [glow](./artifacts/cartao/glow-chromium.png) e [entrada intermediária](./artifacts/cartao/fade-chromium.png). Typecheck, lint, 44 testes e build passaram novamente.

## Verificação executada

- Chrome + WebKit: 864×1536, 320×568, 375×667, 390×844, 430×932, 768×1024, 1440×900 e 844×390. Dezesseis combinações passaram, sem overflow horizontal ou erros JavaScript; telas curtas rolam verticalmente e preservam alvos de pelo menos 44 px.
- Menus: três links/números/cargos corretos em cada modo, dentro do viewport; X/Escape fecham e devolvem foco. Contexto iPhone 13/WebKit com toque também passou.
- Cotação: oito radios, Continuar bloqueado sem seleção, resumo, retorno, Escape e restauração de foco. Fluxo provisório compartilhado com a landing.
- Links: hrefs exatos da fonte existente; navegação externa testada com interceptação local, sem enviar mensagens ou avaliações. `tel:`/`mailto:` verificados; não se acionaram aplicativos externos do sistema.
- Teclado, transição normal 240 ms e reduced motion 0 s; falha da imagem do escudo sem deslocamento dos controles.
- Acesso direto/reload de `/cartao` em produção; landing sem link para o cartão e cotação original funcional. `app/page.tsx`, `app/layout.tsx`, `app/globals.css`, dependências e lockfile sem alterações desta tarefa.
- `pnpm typecheck`, `pnpm lint`, `pnpm test` (44/44) e `pnpm build`: passaram. Warning preexistente `MODULE_TYPELESS_PACKAGE_JSON` nos testes. Build passou após descarte do cache que persistia o erro ambiental de bind do Turbopack.

Não verificados: iPhone físico/Safari instalado, abertura real dos aplicativos de telefone/e-mail, disponibilidade das contas externas e Core Web Vitals em produção. Nenhum ativo oficial faltante; único endereço faltante é Facebook, mantido sem destino conforme solicitado. Publicação não realizada.

final result: passed
