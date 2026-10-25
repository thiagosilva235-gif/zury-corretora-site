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

Os testes comparam os conteúdos à especificação e verificam aberturas reais, chanfros expostos, continuidade das malhas, orçamento geométrico e limites de movimento do escudo. O Node pode emitir um aviso não bloqueante sobre inferência ESM dos arquivos TypeScript nesses testes.

Se o executor retornar `binding to a port: Operation not permitted` no Turbopack, o build não está validado nessa execução. É possível tentar o mesmo comando diretamente com Node, sem reinstalações; a tentativa também pode depender das permissões do host:

```sh
node node_modules/next/dist/bin/next build
node node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port 3001
```

## Estado da entrega

### Hero, indicações, benefícios e menus — etapa 7

Tracking centralizado em nove tokens semânticos; Hero ampliada, três linhas desktop e reserva 40%/60%. Cards de Indicações perceptivelmente mais altos e redistribuídos. Título comercial único sem ponto e mensagem provisória branca/negrito em duas linhas quando couber, para contratação própria de afiliados/parceiros. Benefícios sem chamada ou descrição auxiliar.

CNPJ e SUSEP abrem as páginas oficiais de consulta da Receita Federal e SUSEP em nova aba, sem parâmetros presumidos. Reutilizam as mesmas classes Flow Glass dos links do rodapé, incluindo repouso, hover e foco. Isso não constitui validação independente dos registros.

`FloatingWhatsApp` reutiliza `contacts` e o ícone existente. Botão fixo de Liquid Glass com entrada única e verde restrito à borda/glow em hover/foco; menu horizontal à esquerda, três nomes/cargos confirmados, sem telefones ou e-mail. Popover nativo fecha por Escape, clique fora, segundo clique e seleção. Safe areas, foco e reduced motion preservados. Menus do rodapé reutilizam `ChannelsPopover` integralmente, com prioridade de abertura acima para evitar clipping.

FARMELHOR UNAÍ, ZAPP e GRUPO MV permanecem estáticos quando couberem. `BenefitTrack` mede largura real e mínimo legível de 260 px + gap 14 px; excedentes no desktop/tablet ativam cards completos em loop à direita a 42 px/s, pausável por hover/foco/interação. Mobile e reduced motion usam grid estático. A faixa de logos isoladas permanece cancelada. Logos preservadas em `public/partners/`; ZAPP usa o ativo metálico centralizado. Navbar usa SOLUÇÕES e INDICAÇÕES; menus verticais de contato/social compartilham `ChannelsPopover` com o rodapé, sem telefones, e-mail visível ou handles. Facebook sem destino fica desabilitado.

Benefícios aparece em desenvolvimento ou com `ZURY_BENEFITS_PREVIEW=true` durante o build local. Para a prévia completa: `ZURY_REFERRAL_PREVIEW=true ZURY_BENEFITS_PREVIEW=true pnpm build`, seguido do start local. Sem as variáveis, o build público padrão omite as duas ofertas e seus links. Não publicar o artefato de prévia: parcerias, marcas e condições ainda exigem validação. Remover avisos da interface não constitui aprovação comercial. Não há backend, pagamentos ou códigos implementados.

### Prévia do Programa de Indicações

Em `pnpm dev`, a seção e o link INDICAÇÕES ficam visíveis. Para avaliar um build local de produção, use `ZURY_REFERRAL_PREVIEW=true pnpm build` (ou o mesmo prefixo no comando direto de Node acima) e depois inicie o servidor. A opção é resolvida no build: reiniciar o servidor não altera um artefato já gerado.

**Não publicar o artefato de prévia.** Sem essa variável, o build de produção omite seção e link; isso ainda não libera o restante do site, cujo escudo segue pendente. Regras comerciais, regulamento, pagamentos/estornos, atribuição, comissões, privacidade e exigências regulatórias precisam de validação expressa. A headline mensal proposta continua documentada como pendente; a headline provisória anterior foi removida da interface, sem substituta. Confirmar emissão real dos códigos e política de redução/repasse de comissão por produto. CTAs somente abrem uma conversa preparada com o WhatsApp oficial do Thiago, sem enviar mensagens automaticamente.

O redesign utiliza gradientes neutros, divisões luminosas sutis e Flow Glass sem spotlight. Navbar sai em 475 ms e só reaparece no topo; foco e menus abertos são protegidos. CONTATOS do rodapé prioriza abertura acima; CONTATO da navbar abre abaixo. Ambos oferecem WhatsApp/e-mail sem números/endereço visíveis. REDES SOCIAIS tem dois links oficiais e Facebook desabilitado. O antigo botão WhatsApp do rodapé continua removido; o flutuante é independente. NOS AVALIE NO GOOGLE preserva o perfil oficial. Serviços e diferenciais mantêm seus carrosséis manuais mobile. SVGs oficiais intactos.

O responsável autorizou integrar a própria imagem do escudo à Hero após a prévia isolada. `HeroShield` reutiliza `ImageShield`, preservando o PNG original e a headline atual: escala próxima da captura fornecida, perspectiva contida e luz difusa/curva prateada somente atrás da arte. No mobile, texto acima e escudo abaixo. A imagem ocupa espaço reservado, não usa Canvas e mantém reduced motion; entrada do escudo começa depois do início da headline. Esta integração não libera a publicação das ofertas comerciais nem substitui o checklist final.

### Estudo cinematográfico do escudo — 20/10/2026

**Alternativa atual autorizada:** Hero e `/preview/escudo` usam diretamente o PNG original transparente `public/shield/references/geometry.png`, idêntico ao arquivo recebido, sem filtros/reconstrução. `ImageShield` separa entrada, flutuação e inclinação de até 3° em camadas; a prévia permite visualização estática. Reduced motion fica estático e toque não inclina. Na Hero, `HeroShield` mantém a pose inclinada e os efeitos de fundo separados dessas camadas, sem conflito de transforms. Os arquivos do estudo 3D abaixo foram preservados, mas não são carregados pelo site.

#### Histórico do estudo procedural — não utilizado pela Hero atual

Em `/preview/escudo`, o componente independente usa as duas imagens fornecidas: imagem 2 para traçado da silhueta/recortes do Z e imagem 1 apenas para direção da luz. Extrusões reais, aro com perfil inclinado, chanfros, metal PBR e iluminação de ambiente de estúdio. Contornos e motions ficam centralizados em `components/shield/`; nenhuma dependência nova. Canvas transparente, DPR limitado, suspensão fora da área visível/aba oculta, cleanup e poster PNG derivado do estudo. Reduced motion dispensa o Canvas. Controles permitem comparar frente, três quartos, perfil, traçado e fallback.

**Não é uma reprodução hiper-realista aprovada.** A inspeção mostrou diferenças no relevo, escovação e resposta das bordas. A Hero foi preservada por esse motivo, não por falta de autorização para integrar. Para atingir a prioridade de fidelidade: modelagem dedicada em Blender/CAD sobre a imagem 2, revisão frontal dos contornos e volumes, UV/PBR de metal escovado, iluminação inspirada na imagem 1 e exportação GLB otimizada com poster do mesmo modelo. A parte oculta e a espessura absoluta não são determinadas pelas imagens; exigem validação, sem inventar detalhes. O componente permite reaproveitar motion, lifecycle e fallback na futura integração.

Refinamento seguinte: checkpoint local `cff6386` preserva o estudo anterior. Silhueta ajustada à borda alpha do PNG, com tolerância de 2 px nos pontos de referência cobertos pelos testes; isso não certifica todos os contornos nem a geometria oculta. Terminações dos canais e aro revistas, chanfros mais finos, laterais grafite separadas da frente prateada e paredes sem coplanaridade. Normais dos caps não herdam os fillets. UV/tangentes direcionam a escovação; materiais neutros usam microaltura/rugosidade, anisotropia e dithering. Câmera ortográfica evita uma segunda distorção de perspectiva na comparação frontal. Ambiente HDR com orientação vertical corrigida e duas luzes de área físicas; inspeção em três quartos e perfil mais pronunciados. A Hero permanece intacta e o resultado continua sujeito a avaliação visual.
# Logos das companhias

A seção COMPANHIAS está preparada sem marcas fictícias. Ao receber os PNGs autorizados, salvar em `public/companies/` e cadastrar `id`, `name`, `src`, `width` e `height` em `companyLogos`, em `lib/content.ts`. Não criar a pasta vazia antecipadamente. As logos ficam livres, sem cards; quando excederem a largura desktop, o trilho compartilhado com Benefícios move para a direita a 42 px/s. Mobile e movimento reduzido ficam estáticos. Sem arquivos cadastrados, aparece apenas o título.

## Colaboração com Git

O projeto usa `main` como branch principal. Para iniciar uma tarefa, crie uma branch a partir de `main`:

```sh
git switch main
git pull --ff-only origin main
git switch -c codex/nome-da-tarefa
```

Faça commits pequenos e descritivos na branch de trabalho. Não faça force push, não altere `main` diretamente e não versiona arquivos `.env`, credenciais, tokens, `node_modules`, `.next` ou caches.

Ao terminar, envie a branch e abra um Pull Request contra `main`:

```sh
git push -u origin codex/nome-da-tarefa
```

O outro desenvolvedor deve revisar o diff, os testes disponíveis e a preservação dos assets antes do merge. Depois do merge, atualize o clone local com `git switch main && git pull --ff-only origin main` e remova a branch de trabalho apenas quando ela não for mais necessária.

Para colaborar pelo Codex em outro computador, cada desenvolvedor deve autenticar sua própria conta GitHub, clonar o repositório privado e trabalhar em uma branch própria. Convites são gerenciados em GitHub: **Settings → Collaborators** do repositório. O Codex pode auxiliar na criação, revisão e atualização de branches/PRs quando a integração GitHub estiver conectada.
