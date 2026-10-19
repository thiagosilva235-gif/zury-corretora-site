# AGENTS.md — Instruções operacionais do Codex | ZURY CORRETORA

> **Escopo:** repositório inteiro.  
> **Leia primeiro:** [`ZURY-SITE-SPEC.md`](./ZURY-SITE-SPEC.md).  
> Este arquivo governa **o processo de trabalho**; a especificação governa **marca, conteúdo, design, interações e critérios de aceite**. Não duplique aqui seus textos, cores, contatos ou listas de serviços.

## 1. Contrato operacional e precedência

1. **Fonte de verdade para o produto:** `ZURY-SITE-SPEC.md`. Ler antes de planejar ou editar; consultar novamente a seção pertinente antes de cada implementação.
2. **Fonte de verdade para a execução:** este `AGENTS.md`. Instruções adicionais legítimas do usuário e regras superiores do ambiente prevalecem quando aplicável.
3. **Escopo:** construir uma nova landing page premium da ZURY; não ampliar o produto com features não solicitadas.
4. **Não presumir que links de GitHub correspondam a skills executáveis**, nem que plugins/MCPs indicados estejam acessíveis nesta sessão. Detectar disponibilidade efetiva e adaptar execução.
5. **Não inventar** aprovação, conteúdo, ativos, resultados de testes, acessos, credenciais ou medições.
6. **Não reabrir escolhas já aprovadas** em brainstorms recorrentes; fazer escolhas técnicas reversíveis quando não afetarem a especificação. Perguntar somente diante de bloqueio real ou de aprovação visual exigida.

## 2. Protocolo de início (sempre)

1. Ler este arquivo e `ZURY-SITE-SPEC.md` por completo.
2. Inspecionar a árvore atual, `package.json`, lockfile, configurações, scripts, assets em `public/brand/` e `git status` antes de editar.
3. **O objetivo é começar um projeto NOVO, do zero.** Se o diretório já contém versão anterior ou arquivos relevantes, **não apagar/reescrever**: preservar, relatar o conflito e usar/solicitar uma pasta nova vazia conforme o fluxo permitido pelo ambiente.
4. Verificar presença dos 4 SVGs oficiais. Se algum faltar, informar exatamente qual; **não desenhar uma logo substituta**.
5. Identificar versões reais de Node/React/Next.js/Three.js e compatibilidade de bibliotecas antes de instalar qualquer uma. Usar uma única ferramenta de gerenciamento de pacotes e manter lockfile coerente.
6. Definir plano de execução curto, com fases, dependências, riscos, critérios de verificação e o **gate de aprovação visual do escudo**. Não gerar documentos longos adicionais sem necessidade.
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
3. Escolher **a menor combinação necessária** (ex.: GSAP para scroll; CSS para hover; R3F para escudo; browser para QA).
4. Se o recurso não estiver disponível, usar abordagem técnica equivalente compatível e registrar a diferença; não bloquear o projeto por um plugin opcional.
5. Não instalar bibliotecas só porque uma skill existe; não adicionar agentes ou documentação operacional redundantes.

**Links do inventário fornecidos:** `https://github.com/obra/superpowers`, `https://github.com/JuliusBrussee/caveman`, `https://github.com/shadcn-ui/ui`, `https://github.com/greensock/GSAP`, `https://github.com/motiondivision/motion`. Os links documentam projetos; **não comprovam instalação funcional de skills**. MCP shadcn informado: `https://github.com/shadcn-ui/ui`.

## 5. Ordem de implementação e checkpoint do escudo

Executar o fluxo completo do §15 da especificação:

1. **Auditar** diretório e ativos, preservando arquivos pré-existentes.
2. **Preparar base** de Next.js/TypeScript/Tailwind, tipografia, tokens, semântica, scripts, dependências realmente necessárias.
3. **Implementar conteúdo e layout** das quatro seções com responsividade e estados reais de navegação/carrosséis.
4. **Criar o escudo 3D isolado** em preview de desenvolvimento, inspecionar qualidade visual e **PARAR PARA APROVAÇÃO EXPRESSA DO USUÁRIO**. **Não integrar o escudo 3D final no Hero antes desse aceite**.
5. **Após aprovação**, derivar poster e fallback do mesmo modelo e integrar progressivamente.
6. **Refinar motion, glass e QA** segundo checklist da spec; evitar depender de teste visual apenas.

É permitido trabalhar em tarefas **independentes** enquanto a aprovação do escudo não chega, mas **não simular aprovação** ou declarar Hero/website concluído.

## 6. Qualidade e testes obrigatórios

Antes de considerar uma fase concluída:

- Rodar os scripts realmente disponíveis para **typecheck, lint, testes e build**; registrar falhas e ações corretivas.
- Testar **links e âncoras, responsividade, card counts, 33 serviços, três contatos WhatsApp, cópias oficiais, foco/teclado**.
- Executar testes visuais/browsers, **se ferramentas disponíveis**, nas larguras-alvo da spec; conferir Safari/WebKit sempre que possível.
- Simular `prefers-reduced-motion`, falha de WebGL e carregamento do poster/fallback do Hero.
- Medir desempenho com ferramentas reais quando viável; **jamais inventar scores/LCP/INP/CLS**.
- Confirmar que carrosséis não fazem autoplay, que o indicador ativo não é underline e que links mobile permanecem visíveis.
- Validar que efeitos, Canvas e listeners tenham cleanup correto, sem loops concorrentes desnecessários.
- Se uma verificação não puder ser executada, rotular **"não verificado"** e indicar como executar posteriormente.

## 7. Fluxo de trabalho, comunicação e proteção de escopo

- Antes de mudanças substanciais: resumir em poucas linhas objetivo, arquivos esperados e critério de verificação. Não transformar cada ajuste trivial em longa aprovação.
- Depois de cada etapa: reportar **o que mudou, arquivos criados/alterados, comandos/testes executados, resultados e pendências**.
- Em problemas: reproduzir, localizar causa, corrigir com mínima alteração e retestar. Não ocultar warnings nem substituir erro por placeholder silencioso.
- Preservar segredos e credenciais; não adicionar scripts de rastreamento, APIs, backends ou formulários sem necessidade.
- Evitar páginas de demonstração públicas, assets externos sem licença clara, CSS e dados duplicados, arquivos `.md` extras e bibliotecas desnecessárias.
- Respeitar a estrutura e os textos exatamente como constam na spec, inclusive os **quatro blocos**, as restrições de mobile e a marca oficial.
- O checklist de conclusão é **exclusivamente** o §16 do `ZURY-SITE-SPEC.md` — não duplicar nem inventar checklists conflitantes aqui.

## 8. Critério de encerramento da tarefa

A entrega final deve disponibilizar o projeto funcional, documentar **como executar**, resumir alterações e testes com honestidade e indicar pendências, inclusive aprovações visuais. **Sem a aprovação do escudo isolado, a etapa final de integração do Hero fica formalmente pendente.**

> **Regra de economia de contexto:** especificação para o **quê**, `AGENTS.md` para o **como**, código para **implementação**, testes para **evidência**. Não duplicar o mesmo conteúdo nos quatro lugares.

