# AGENTS.md — Instruções operacionais do Codex | ZURY CORRETORA

> **Escopo:** repositório inteiro.  
> **Leia primeiro:** o resumo inicial e apenas as seções pertinentes de [`ZURY-SITE-SPEC.md`](./ZURY-SITE-SPEC.md).
> Este arquivo governa **o processo de trabalho**; a especificação governa **marca, conteúdo, design, interações e critérios de aceite**. Não duplique aqui seus textos, cores, contatos ou listas de serviços.

> **Consolidado em 26/10/2026:** continuar a aplicação existente. A especificação foi reconciliada com o commit `2d93bc6`; revisões históricas contraditórias estão no Git, não são instruções vigentes. A Hero usa a imagem original autorizada; um novo modelo 3D ainda exige aprovação específica. A fila da auditoria está no §16.2 da especificação: executar cada item somente com permissão individual do usuário.

## 1. Contrato operacional e precedência

1. **Fonte de verdade para o produto:** `ZURY-SITE-SPEC.md`. Ler o resumo inicial e as seções pertinentes antes de planejar ou editar. Ler o documento inteiro somente em auditoria estrutural, revisão global ou quando a tarefa atravessar várias seções.
2. **Fonte de verdade para a execução:** este `AGENTS.md`. Instruções adicionais legítimas do usuário e regras superiores do ambiente prevalecem quando aplicável.
3. **Escopo:** manter e refinar a landing page premium da ZURY existente; não reinicializar o projeto nem ampliar o produto com features não solicitadas.
4. **Não presumir que links de GitHub correspondam a skills executáveis**, nem que plugins/MCPs indicados estejam acessíveis nesta sessão. Detectar disponibilidade efetiva e adaptar execução.
5. **Não inventar** aprovação, conteúdo, ativos, resultados de testes, acessos, credenciais ou medições.
6. **Não reabrir escolhas já aprovadas** em brainstorms recorrentes; fazer escolhas técnicas reversíveis quando não afetarem a especificação. Perguntar somente diante de bloqueio real ou de aprovação visual exigida.

## 2. Protocolo de início (sempre)

1. Ler este arquivo por completo; na especificação, ler o resumo inicial e localizar com `rg` os títulos das seções necessárias. Carregar somente esses trechos. A leitura integral fica reservada às revisões globais.
2. Inspecionar `git status` e somente os arquivos, scripts, configurações e ativos relacionados à tarefa. Fazer auditoria completa da árvore apenas no bootstrap ou em investigação ampla.
3. O projeto novo já foi iniciado neste diretório. Continuar a implementação existente, preservar alterações e nunca recriar ou apagar a base sem pedido expresso. A regra de pasta vazia aplica-se somente a um futuro bootstrap separado.
4. Verificar presença dos 4 SVGs oficiais. Se algum faltar, informar exatamente qual; **não desenhar uma logo substituta**.
5. Identificar versões reais de Node/React/Next.js/Three.js e compatibilidade de bibliotecas antes de instalar qualquer uma. Usar uma única ferramenta de gerenciamento de pacotes e manter lockfile coerente.
6. Definir plano de execução curto, com fases, dependências, riscos e critérios de verificação. Aplicar o **gate de aprovação visual do escudo** somente se a tarefa criar/substituir o modelo 3D: a imagem atual já teve integração autorizada. Não gerar documentos longos adicionais sem necessidade.
7. Trabalhar em pequenos incrementos verificáveis. Não entregar apenas uma descrição: criar e testar código quando a execução estiver autorizada.

## 3. Stack e decisões de engenharia

- Para novo projeto vazio, seguir a **stack preferencial** e a arquitetura modular estabelecidas em `ZURY-SITE-SPEC.md`, §13.
- Verificar documentação atual e `peerDependencies`, especialmente compatibilidade entre React, `@react-three/fiber` e `three`; não fixar versões de memória nem adotar alphas desnecessárias.
- Manter componentes de servidor para estrutura e texto quando possível; limitar Client Components a motion, carrosséis, Canvas e interação real.
- Consolidar dados oficiais em **uma fonte tipada**, compartilhada entre desktop e mobile. Não copiar textos da especificação para diversos componentes.
- Preferir HTML semântico e CSS nativo para comportamento simples; usar ferramentas de terceiros apenas quando justificado.
- Evitar abstrações prematuras, repetição de hooks, efeitos que vazam, dependências duplicadas e CSS conflituoso.
- Nunca modificar desenhos, curvas e tipografia dos SVGs oficiais. Aplicar cada variante segundo as diretrizes do §3 da especificação.

## 4. Uso inteligente de skills, ferramentas e MCPs

### 4.0. Seleção automática definitiva

- O Codex deve escolher automaticamente as skills instaladas que correspondam ao pedido; o usuário não precisa nomeá-las.
- Ordem obrigatória: **regras superiores e skills explicitamente pedidas → adequação ao trabalho → especialização no stack/repositório → qualidade e segurança → estrelas no GitHub**.
- Usar a **menor combinação suficiente**. “Invoque todas” significa selecionar todas as necessárias, nunca carregar skills sem função concreta.
- Entre skills que façam o mesmo trabalho, no mesmo nível de adequação e autoridade, escolher o upstream com mais estrelas. Não comparar repositórios de categorias diferentes.
- Nenhuma skill é obrigatória apenas por regra deste projeto. Selecionar skills sob demanda conforme o pedido e o risco; gatilhos impostos pelo ambiente de execução continuam prevalecendo.
- Skills locais do projeto e instruções oficiais do stack vencem alternativas genéricas quando contêm contexto específico indispensável.
- Consultar [`.codex/skill-routing.json`](./.codex/skill-routing.json) apenas quando houver duas ou mais candidatas plausíveis. Atualizar a fotografia de estrelas no máximo a cada 90 dias, ou quando mudar o inventário; não consultar a rede em toda tarefa.
- Anunciar sucintamente as skills escolhidas e o motivo. Se uma skill ficar indisponível, usar a alternativa compatível e registrar a diferença.

**Inventário informado pelo usuário — disponibilidade precisa ser conferida no ambiente real:**

| Recurso informado | Quando usar | Limite / cuidado |
| --- | --- | --- |
| **Superpowers** (`obra/superpowers`) | Planejamento de etapas, diagnóstico, testes e revisão quando disponível | Não reiniciar discovery/brainstorm de decisões fechadas nem criar proliferação de documentos |
| **Caveman** (`JuliusBrussee/caveman`) | Compactação/organização de saída e contexto **somente** quando estiver instalado e for seguro | Nunca truncar requisitos, código, dados da marca, conteúdos ou relatório de erros; economia de tokens não presumida |
| **shadcn/ui** e **shadcn MCP** | Consultar primitivas e padrões acessíveis, instalar componentes pontuais | Não transformar o site em template genérico nem instalar coleção inteira de componentes |
| **GSAP + ScrollTrigger** | Principal recurso para scroll cinematográfico, reveals, transições e timelines | Gerenciar cleanup; não disputar propriedades com Motion; respeitar reduced motion |
| **Motion** (`motiondivision/motion`) | Microinterações locais apenas se CSS/GSAP não resolverem com clareza | É opcional; não misturar bibliotecas em um mesmo elemento/propriedade |
| **Browser / Chrome / Computer Use / Unified Computer Use** | Teste real em viewport, inspecionar responsividade, interações e capturas | Confirmar ferramenta acessível; não afirmar que testou sem executar |
| **Code Review** | Revisão de código, segurança, acessibilidade, performance e aderência à spec | Priorizar problemas verificáveis, não revisões estéticas sem justificativa |
| **Node REPL** | Experimentos ou inspeções de JavaScript/Node, se útil e disponível | Não substituir testes de produção ou browser QA |
| **Visualize** | Prévia/inspeção visual onde apropriado | Não tratar visualização como prova de funcionamento |
| **Codex App Tools** | Ferramentas do fluxo de desenvolvimento se disponíveis | Descobrir capacidades concretas antes de depender delas |
| **Documents / PDF / Spreadsheets / Presentations / Template Creator** | **Não utilizar** para construir esta landing page, salvo solicitação posterior explícita | Evitar overhead irrelevante |

**Procedimento de seleção** (a cada subtarefa):

1. Identificar a entrega e os critérios de aceite na spec.
2. Verificar se existe skill/MCP **de fato acessível** que reduza erro ou trabalho.
3. Escolher **a menor combinação necessária** e aplicar a ordem de prioridade da §4.0 (ex.: GSAP para scroll; CSS para hover; R3F para escudo; browser para QA).
4. Se o recurso não estiver disponível, usar abordagem técnica equivalente compatível e registrar a diferença; não bloquear o projeto por um plugin opcional.
5. Não instalar bibliotecas só porque uma skill existe; não adicionar agentes ou documentação operacional redundantes.

**Links do inventário fornecidos:** `https://github.com/obra/superpowers`, `https://github.com/JuliusBrussee/caveman`, `https://github.com/shadcn-ui/ui`, `https://github.com/greensock/GSAP`, `https://github.com/motiondivision/motion`. Os links documentam projetos; **não comprovam instalação funcional de skills**. MCP shadcn informado: `https://github.com/shadcn-ui/ui`.

## 5. Ordem de implementação e checkpoint do escudo

Em manutenção, executar o fluxo do §15 da especificação proporcional ao escopo, sem repetir bootstrap nem etapas já autorizadas. Para uma futura substituição por modelo 3D, usar a sequência abaixo:

1. **Auditar** diretório e ativos, preservando arquivos pré-existentes.
2. **Preparar base** de Next.js/TypeScript/Tailwind, tipografia, tokens, semântica, scripts, dependências realmente necessárias.
3. **Implementar conteúdo e layout** conforme a arquitetura e os gates vigentes da especificação, com responsividade e estados reais de navegação/carrosséis.
4. **Criar o escudo 3D isolado** em preview de desenvolvimento, inspecionar qualidade visual e **PARAR PARA APROVAÇÃO EXPRESSA DO USUÁRIO**. **Não integrar o escudo 3D final no Hero antes desse aceite**.
5. **Após aprovação**, derivar poster e fallback do mesmo modelo e integrar progressivamente.
6. **Refinar motion, glass e QA** segundo checklist da spec; evitar depender de teste visual apenas.

É permitido trabalhar em tarefas **independentes e autorizadas** enquanto a aprovação de um novo modelo não chega. Não simular aprovação do estudo procedural, reabrir a autorização da imagem atual nem declarar o website pronto para publicação sem homologação.

## 6. Qualidade e testes obrigatórios

Antes de considerar uma fase concluída:

- Rodar os scripts realmente disponíveis para **typecheck, lint, testes e build**; registrar falhas e ações corretivas.
- Testar **links e âncoras, responsividade, contagens e cópias atuais da especificação, três contatos WhatsApp, foco/teclado**; não usar contagens históricas superadas.
- Executar testes visuais/browsers, **se ferramentas disponíveis**, nas larguras-alvo da spec; conferir Safari/WebKit sempre que possível.
- Simular `prefers-reduced-motion` e carregamento/falha da imagem principal. Falha de WebGL/poster derivado é teste adicional somente de uma tarefa que use o estudo 3D; a Hero vigente não usa Canvas.
- Medir desempenho com ferramentas reais quando viável; **jamais inventar scores/LCP/INP/CLS**.
- Confirmar que Soluções/Diferenciais permanecem manuais sem autoplay, que indicadores não são underline e que links mobile estão acessíveis pelo menu autorizado. Companhias/Benefícios seguem suas exceções de loop e modos estáticos da especificação.
- Validar que efeitos, Canvas e listeners tenham cleanup correto, sem loops concorrentes desnecessários.
- Se uma verificação não puder ser executada, rotular **"não verificado"** e indicar como executar posteriormente.

## 7. Fluxo de trabalho, comunicação e proteção de escopo

- Antes de mudanças substanciais: resumir em poucas linhas objetivo, arquivos esperados e critério de verificação. Não transformar cada ajuste trivial em longa aprovação.
- Depois de cada etapa: reportar **o que mudou, arquivos criados/alterados, comandos/testes executados, resultados e pendências**.
- Em problemas: reproduzir, localizar causa, corrigir com mínima alteração e retestar. Não ocultar warnings nem substituir erro por placeholder silencioso.
- Preservar segredos e credenciais; não adicionar scripts de rastreamento, APIs, backends ou formulários sem necessidade.
- Evitar páginas de demonstração públicas, assets externos sem licença clara, CSS e dados duplicados, arquivos `.md` extras e bibliotecas desnecessárias.
- Respeitar estrutura, textos, seções e gates atuais da spec, restrições de mobile e marca oficial; não restaurar a arquitetura histórica de quatro blocos sem Companhias, a proibição superada de hamburger ou Hero sem CTA/subtítulo.
- O checklist de conclusão é **exclusivamente** o §16 do `ZURY-SITE-SPEC.md` — não duplicar nem inventar checklists conflitantes aqui.

### 7.1. Economia de contexto e tokens

- Agrupar ajustes relacionados em uma rodada e evitar reabrir decisões aprovadas.
- Pesquisar primeiro com `rg`/`rg --files`; ler arquivos grandes por trechos pertinentes e limitar saídas de terminal ao necessário.
- Não repetir screenshots, logs, diffs ou explicações já comprovados; conservar uma evidência representativa por estado, salvo regressão ou comparação visual.
- Durante a implementação, rodar a verificação mais focada disponível. Rodar typecheck/lint/test/build completos no gate final ou quando a alteração afetar integração global.
- Respostas intermediárias devem informar decisão, risco e resultado sem recontar o histórico. A resposta final resume alterações, provas e pendências uma única vez.
- Ao concluir um marco grande, sugerir uma nova conversa para a próxima fase quando isso reduzir contexto; nunca fragmentar uma correção em andamento.
- Não criar documentos auxiliares, planos longos ou relatórios permanentes quando uma nota curta neste arquivo, na spec ou no código resolver.

### 7.2. Auditoria, documentação e autorização individual

- A fila de melhorias autorizáveis é exclusivamente o §16.2 da especificação; o checklist de homologação de publicação é o §16.1. Não marcar um item como concluído sem sua evidência.
- O item 01 de inspeção visual foi autorizado; permanece em andamento. Não avançar aos itens 02–15 sem permissão específica, mesmo que a recomendação tenha aparecido em uma auditoria anterior.
- Pedidos para revisar/documentar/commitar não autorizam implementar recomendações, alterar o design, publicar ofertas ou criar o fluxo final de cotação.
- Distinguir intenção, declaração CSS e resultado computado. Revisar especificidade, ordem de carregamento e media queries antes de afirmar valores universais.
- Não afirmar que `line-height` diminui os glifos, que rotação de uma camada comprova beam seguindo a cápsula, nem que uma captura estática valida animação ou contraste em movimento.
- Capturas de página inteira com reveals ainda ocultos não são evidência de conteúdo ausente; revelar cada seção e conferir a captura antes de usá-la.
- Atualizar README, especificação e referência de estilos do §19 quando o escopo modificar seus dados; não editar a transcrição CSS como se ela alterasse a aplicação.
- Para pedidos de documentação completa, consolidar as fontes existentes e registrar limites conhecidos; não prometer certificação de 100% de navegadores/estados sem testes correspondentes.

## 8. Critério de encerramento da tarefa

A entrega final deve disponibilizar os arquivos pertinentes, documentar **como executar**, resumir alterações e testes com honestidade e indicar pendências, inclusive aprovações visuais. **A integração da imagem original já foi autorizada; eventual modelo 3D novo depende de aprovação isolada antes de substituí-la.** Não declarar a publicação pronta enquanto gates comerciais, build e homologação estiverem pendentes.

> **Regra de economia de contexto:** especificação para o **quê**, `AGENTS.md` para o **como**, código para **implementação**, testes para **evidência**. Não duplicar o mesmo conteúdo nos quatro lugares.

