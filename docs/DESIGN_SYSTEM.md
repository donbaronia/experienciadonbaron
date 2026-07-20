# Design System — Universo Don Baron

## Direção

Clube privado, não lanchonete. Referências: a precisão da Apple, a tensão contida da Ferrari, o artesanato da Louis Vuitton, o silêncio da Bang & Olufsen. Tradução prática: **minimalismo absoluto** — poucos elementos, muito espaço negativo, dourado usado como metal (nunca como cor chamativa), movimento lento e deliberado.

Regra de ouro: se um elemento não carrega significado, ele sai.

## 1. Cor

| Token | Hex | Uso |
| --- | --- | --- |
| `noir` | `#050505` | Fundo base |
| `noir-soft` | `#141414` | Superfícies |
| `noir-raised` | `#1B1B1B` | Superfícies elevadas |
| `gold` | `#D4AF37` | Acento principal (metal) |
| `gold-light` | `#F6D777` | Reflexo / hover |
| `gold-dark` | `#8C6D33` | Sombra do metal |
| `ivory` | `#F4F1E8` | Texto principal |
| `ivory-dim` | `#C9C5B8` | Texto secundário |
| `ash` | `#8A8578` | Labels / terciário |
| `ash-line` | `#25241F` | Bordas hairline |

Paleta revisada no Sprint 010 (`noir`/`gold` receberam valores novos — mesmos nomes de token, então nenhum componente precisou ser tocado). Proibido: cores saturadas, neon, gradientes coloridos, branco puro `#FFF`.

**Nota sobre "branco":** o spec do Sprint 010 pede texto branco. Mantivemos `ivory` (`#F4F1E8`, off-white) em vez de `#FFFFFF` puro — branco puro sobre um fundo quase preto (`#050505`) cria um contraste duro que quebra a leitura "luxo discreto" do resto deste documento. `ivory` já cumpre o papel de "branco" pretendido pelo spec sem essa aspereza.

## 2. Tipografia

| Papel | Fonte | Uso |
| --- | --- | --- |
| Display | Cormorant Garamond | Títulos, números de destaque, wordmark |
| Body | Manrope | Texto corrido, botões, navegação |

Escala: labels `0.6–0.65rem` uppercase com tracking largo → corpo `0.875–1rem` → títulos de seção `2xl–3xl` → títulos de página `4xl–7xl`. Trackings nomeados: `tracking-wide2` (0.2em) para navegação, `tracking-crown` (0.32em) para labels cerimoniais.

## 3. Espaçamento

Base de 4px via escala Tailwind. Tokens fluidos:

- `--space-section` = `clamp(6rem, 12vh, 10rem)` — respiro entre seções
- `--space-block` = `clamp(3rem, 6vh, 5rem)` — respiro entre blocos

Densidade baixa é parte da identidade: na dúvida, mais espaço.

## 4. Sombras (elevação)

| Token | Uso |
| --- | --- |
| `shadow-elevation-1` | Repouso |
| `shadow-elevation-2` | Hover / destaque |
| `shadow-elevation-3` | Modais / overlays |
| `shadow-glow` | Aura dourada sutil |
| `shadow-glow-strong` | Aura dourada em CTAs |

Sombras são pretas e difusas; o dourado só aparece como *glow*, nunca como sombra dura.

## 5. Gradientes

| Token | Uso |
| --- | --- |
| `bg-gold-sheen` | Metal escovado animável (texto e CTAs) |
| `bg-noir-depth` | Profundidade radial do fundo |
| `bg-gold-fade` | Linhas de luz (loader, divisores) |

## 6. Glassmorphism

Classe utilitária `.glass` e componente `GlassPanel`:

- Fundo `rgba(17,17,16,0.55)` + `backdrop-blur(20px) saturate(1.2)`
- Borda hairline dourada `rgba(198,161,91,0.14)`
- Highlight interno superior `rgba(244,241,232,0.06)` (luz vinda de cima)

Usado no Header ao rolar, menu móvel e superfícies flutuantes. Nunca em áreas grandes de leitura.

## 7. Componentes reutilizáveis

| Componente | Papel |
| --- | --- |
| `Button` | Base (solid, outline, ghost) |
| `GlowButton` | CTA premium — `hairline` (padrão, borda + varredura de luz) e `filled` (metal com sheen) |
| `Card` | Superfície de conteúdo (`glass`, `elevated`) |
| `GlassPanel` | Superfície de vidro pura |
| `PageContainer` / `PageIntro` | Estrutura de página |
| `Header` | Navegação fixa: transparente no topo, vidro ao rolar, sublinhado dourado animado no item ativo, menu móvel |
| `Footer` | Encerramento com navegação e assinatura do clube |
| `Logo` | Coroa hairline SVG (logo temporário) com opção de desenho animado |
| `Loader` | Coroa se desenhando + linha de luz (usado em `app/loading.tsx`) |
| `AnimatedBackground` | Aura dourada, brasas subindo, grão e vinheta |
| `IntroReveal` | Animação de entrada (1x por sessão): coroa se desenha, wordmark expande |
| `Reveal` | Entrada on-scroll |
| `ComingSoon` | Tela "em construção" dos módulos stub — reaproveita `Card` + ícone Lucide |

## 8. shadcn/ui

O projeto adota **Zod + React Hook Form** para formulários e reserva `components/ui/` para primitivos shadcn/ui — mas a instalação é **manual**, componente a componente, copiando o código-fonte da [documentação oficial](https://ui.shadcn.com) e adaptando à paleta acima. O CLI (`npx shadcn init`) não é usado: sua versão atual assume Tailwind v4 (CSS-first, `@theme`), enquanto este projeto está em Tailwind v3.4.17 com config JS — rodar o init sobrescreve `styles/globals.css` e `lib/utils.ts` com um tema claro/cinza incompatível e quebra o build. Ao copiar um componente manualmente: usar `cn()` de `lib/utils.ts` (já compatível), mapear `bg-primary`/`bg-background`/etc. para os tokens desta tabela (nunca inserir as variáveis OKLCH padrão do shadcn) e manter `class-variance-authority` (já instalado) para variantes.

## 9. Movimento

- Curvas: `ease-crown` `cubic-bezier(0.22,1,0.36,1)` para entradas; `ease-silk` `cubic-bezier(0.65,0,0.35,1)` para varreduras.
- Durações: 300ms (micro) · 600ms (padrão) · 900ms (cerimonial).
- Transições entre páginas em `app/template.tsx`: fade + rise + desfoque saindo.
- Ambiente lento: aura 10–13s, brasas 16–26s.
- `prefers-reduced-motion` desliga intro, brasas, transições e parallax em todos os componentes.

## 10. Voz

Curta, confiante, em pt-BR. Nunca vende — convida. "Entrar no Vault", não "Confira nossas promoções".
