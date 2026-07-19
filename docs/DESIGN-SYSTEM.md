# Design System — Universo Don Baron

## Direção

Clube privado, não lanchonete. Escuro, contido, dourado usado como metal — nunca como cor chamativa. Silêncio visual: poucas cores, muito espaço, tipografia fazendo o trabalho.

## Cores

| Token | Hex | Uso |
| --- | --- | --- |
| `noir` | `#0A0A09` | Fundo base |
| `noir-soft` | `#111110` | Superfícies |
| `noir-raised` | `#171715` | Superfícies elevadas |
| `gold` | `#C6A15B` | Acento principal |
| `gold-light` | `#E3C88F` | Brilho / hover |
| `gold-dark` | `#8C6D33` | Sombra do metal |
| `ivory` | `#F4F1E8` | Texto principal |
| `ivory-dim` | `#C9C5B8` | Texto secundário |
| `ash` | `#8A8578` | Texto terciário / labels |
| `ash-line` | `#25241F` | Bordas |

Proibido: cores saturadas, neon, gradientes coloridos.

## Tipografia

- **Display:** Cormorant Garamond (`font-display`) — títulos, números de destaque.
- **Body:** Manrope (`font-body`) — texto corrido, botões, labels.
- Labels e navegação em uppercase com tracking largo (`tracking-crown` = 0.32em).

## Componentes globais

| Componente | Papel |
| --- | --- |
| `Button` | Botão base (variants: solid, outline, ghost) |
| `GlowButton` | CTA especial com sheen dourado animado |
| `Card` / `CardLabel` / `CardTitle` | Superfície padrão de conteúdo |
| `PageContainer` | Container de página com espaçamento global |
| `PageIntro` | Cabeçalho de página (eyebrow, título, descrição) |
| `Header` | Navegação fixa com blur |
| `Logo` | Coroa SVG + wordmark |
| `AnimatedBackground` | Aura dourada + grão, fixa atrás do conteúdo |
| `Reveal` | Entrada suave on-scroll (respeita reduced motion) |

## Movimento

- Curva padrão: `cubic-bezier(0.22, 1, 0.36, 1)`, durações 0.6–0.9s.
- Animações ambientais lentas (9–12s) na aura de fundo.
- `prefers-reduced-motion` respeitado em todos os componentes animados.
