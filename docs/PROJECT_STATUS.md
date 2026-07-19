# Relatório de Auditoria — Universo Don Baron

> Atualizado após a reestruturação "Project Crown v1.0" (extração de `lib/` para `core/services/config/providers/contexts`, renomeação Home → Lobby, abstração NFC, 6 módulos novos em stub, Zod/React Hook Form/Prettier instalados). Reflete o estado do repositório no commit desta reestruturação, branch `main`.

---

## 1. Estrutura completa de pastas

```
universo-don-baron/
├── .env.example
├── .eslintrc.json
├── .prettierrc                      # novo — Prettier + prettier-plugin-tailwindcss
├── .gitignore
├── README.md
├── app/                              # Next.js App Router — apenas composição de features
│   ├── layout.tsx                    # RootLayout (async): lê getSession(), envolve tudo em <Providers>
│   ├── template.tsx
│   ├── loading.tsx
│   ├── not-found.tsx
│   ├── page.tsx                      # rota "/" — agora composta por features/lobby
│   ├── beneficios/page.tsx           # novo — stub
│   ├── colecoes/page.tsx             # novo — stub
│   ├── configuracoes/page.tsx        # novo — stub
│   ├── conquistas/page.tsx           # novo — stub
│   ├── eventos/page.tsx              # novo — stub
│   ├── historico/page.tsx            # novo — stub
│   ├── fundador/page.tsx
│   ├── menu-reservado/page.tsx
│   ├── nfc/page.tsx
│   ├── pedidos/page.tsx
│   ├── perfil/page.tsx
│   └── vault/page.tsx
├── components/                       # componentes globais reutilizáveis
│   ├── ComingSoon.tsx                 # novo — tela "em construção" dos módulos stub
│   ├── ui/                            # reservado para primitivos shadcn/ui (adoção manual, hoje vazio)
│   └── (Button, Card, Footer, GlassPanel, GlowButton, Header, IntroReveal, Loader, Logo, PageContainer, PageIntro, Reveal — inalterados)
├── core/                              # novo — abstrações e tipos fundamentais, sem I/O
│   ├── repository.ts                  # Repository<T> / SingleRecordRepository<T>
│   ├── auth/types.ts                  # SessionUser, AuthGate
│   └── nfc/
│       ├── types.ts                   # NfcReadStatus, NfcTagPayload, NfcReader
│       └── nfc-reader.ts              # getNfcReader() — checa suporte; scan() ainda não implementado
├── services/                          # novo — serviços cross-feature
│   ├── auth/auth.service.ts           # getSession() (movido de lib/auth.ts)
│   └── supabase/
│       ├── client.ts                  # movido de lib/supabase/client.ts
│       ├── server.ts                  # movido de lib/supabase/server.ts
│       └── env.ts                     # movido de lib/supabase/env.ts
├── config/                            # novo — configuração estática
│   ├── brand.ts                       # BRAND (movido de lib/constants.ts)
│   └── navigation.ts                  # NAV_LINKS (movido + 6 novas entradas + "Lobby")
├── providers/
│   └── Providers.tsx                  # novo — composição raiz (hoje: SessionProvider)
├── contexts/
│   └── session-context.tsx            # novo — SessionProvider + useSession()
├── features/
│   ├── lobby/                         # renomeado de home/ (mesmo conteúdo; lobby.service.ts)
│   ├── vault/, exclusive-menu/, profile/, orders/, nfc/, founder/   # inalterados
│   └── (Benefícios, Eventos, Conquistas, Coleções, Histórico e Configurações NÃO têm feature ainda — são stub)
├── hooks/
│   └── useMounted.ts
├── lib/
│   └── utils.ts                       # único arquivo restante em lib/ (cn, formatCurrencyBRL, formatDateBR)
├── public/assets/                     # vazio
├── styles/globals.css
├── types/index.ts
└── docs/
    ├── PROJECT_STATUS.md              # este documento
    ├── ARCHITECTURE.md                # reescrito para a nova estrutura
    ├── DESIGN_SYSTEM.md               # renomeado de DESIGN-SYSTEM.md, + nota shadcn
    ├── DATABASE.md                    # renomeado de SUPABASE.md, + Policies/Storage/Repository
    ├── ROADMAP.md                     # novo
    └── CONTRIBUTING.md                # novo
```

---

## 2. Tecnologias instaladas

| Tecnologia | Papel | Status nesta entrega |
| --- | --- | --- |
| **Next.js 15** (App Router) | Framework | Inalterado |
| **React 19** | UI | Inalterado |
| **TypeScript 5** (`strict` + `noUncheckedIndexedAccess`) | Tipagem | Inalterado |
| **Tailwind CSS 3** | Estilização | Inalterado |
| **Framer Motion 11** | Animações | Inalterado |
| **Lucide React** | Ícones | Inalterado |
| **Supabase** (`@supabase/ssr` + `@supabase/supabase-js`) | Dados/auth preparados | Movido para `services/supabase/`, ainda não conectado |
| **Zod** | Validação de schema | **Novo** — instalado, ainda sem uso (aguarda primeiro formulário real) |
| **React Hook Form** + **@hookform/resolvers** | Formulários | **Novo** — instalado, ainda sem uso |
| **Prettier** + **prettier-plugin-tailwindcss** | Formatação | **Novo** — `.prettierrc` criado |
| **shadcn/ui** | Primitivos de UI | **Avaliado e não adotado via CLI** — ver nota abaixo |
| **class-variance-authority**, **clsx**, **tailwind-merge** | Variantes/classes | Inalterado |

### Nota técnica: shadcn/ui

O CLI (`npx shadcn@latest init`, v4.13.1) foi executado como parte desta entrega e **revertido** após comprovar quebra de build: a versão atual do CLI assume uma configuração Tailwind v4 CSS-first (`@import "shadcn/tailwind.css"`, variáveis `--background`/`--primary` em OKLCH consumidas via `@apply border-border` sem entrada correspondente no `tailwind.config.ts`), incompatível com o Tailwind v3.4.17 (config JS) deste projeto — `npm run build` falhava com `The border-border class does not exist`. O CLI também sobrescreveu `lib/utils.ts` (apagando `formatCurrencyBRL`/`formatDateBR`) e injetou uma fonte (Geist) fora do design system em `app/layout.tsx`. Todas essas alterações foram revertidas. **Decisão adotada:** shadcn/ui será incorporado componente a componente, copiando manualmente o código-fonte de cada primitivo e adaptando à paleta noir/gold já existente — nunca via `init`. Detalhado em `docs/DESIGN_SYSTEM.md`.

---

## 3. Dependências

**Produção** (`package.json`):
```
@hookform/resolvers      ^5.4.0   (novo)
@supabase/ssr            ^0.6.1
@supabase/supabase-js    ^2.47.10
class-variance-authority  ^0.7.1
clsx                      ^2.1.1
framer-motion             ^11.15.0
lucide-react               ^0.469.0
next                        ^15.1.3
react                        ^19.0.0
react-dom                    ^19.0.0
react-hook-form               ^7.82.0  (novo)
tailwind-merge                 ^2.6.0
zod                              ^4.4.3   (novo)
```

**Desenvolvimento**:
```
@types/node          ^22.10.2
@types/react           ^19.0.2
@types/react-dom         ^19.0.2
autoprefixer               ^10.4.20
eslint                        ^9.17.0
eslint-config-next               ^15.1.3
postcss                             ^8.4.49
prettier                             ^3.9.5   (novo)
prettier-plugin-tailwindcss           ^0.8.1   (novo)
tailwindcss                             ^3.4.17
typescript                                ^5.7.2
```

`node_modules/` agora está instalado neste ambiente — `npm run typecheck`, `npm run lint` e `npm run build` foram executados e validados como parte desta entrega (ver seção 9, item resolvido).

Ainda não há dependências de teste (Jest, Vitest, Playwright, Testing Library).

---

## 4. Componentes existentes

### Globais (`components/`)
Inalterados desde a última auditoria (`Button`, `GlowButton`, `Card`, `GlassPanel`, `PageContainer`/`PageIntro`, `Header`, `Footer`, `Logo`, `Loader`, `AnimatedBackground`, `IntroReveal`, `Reveal`), mais:

| Componente | Papel |
| --- | --- |
| `ComingSoon` (**novo**) | Tela "em construção" reutilizada pelos 6 módulos stub — ícone Lucide + `Card` elevado |

`Header` e `Footer` agora importam `NAV_LINKS`/`BRAND` de `config/` em vez de `lib/constants`. `Header` mostra "Lobby" (antes "Universo") no link raiz e no menu mobile.

### Por feature
Inalteradas na essência (Vault, Menu Reservado, Perfil, Pedidos, NFC, Fundador). `features/home/` foi renomeada para **`features/lobby/`** (`HeroSection`, `PillarsSection`, `useHeroParallax`, `lobby.service.ts`, `types/index.ts`). `features/nfc/hooks/useNfcSupport.ts` agora delega a checagem de suporte para `core/nfc/nfc-reader.ts` em vez de checar `window` diretamente.

---

## 5. Features existentes

**Completas (7):** Lobby (antes Home), Vault, Menu Reservado, Perfil, Pedidos, NFC, Fundador — comportamento inalterado, 100% dados mock (ver seção 7 da auditoria anterior, ainda válida).

**Em stub (6, novas nesta entrega):** Benefícios, Eventos, Conquistas, Coleções, Histórico, Configurações. Cada uma tem rota, entrada no menu e uma tela `ComingSoon` com a identidade visual do clube — **nenhuma tem `features/<nome>/` ainda** (nenhum dado, componente ou service específico). A ordem de implementação está em `docs/ROADMAP.md` (Fase 2).

---

## 6. Rotas existentes

| Rota | Feature | Status |
| --- | --- | --- |
| `/` | lobby | Completa |
| `/vault` | vault | Completa |
| `/menu-reservado` | exclusive-menu | Completa |
| `/beneficios` | — | **Stub (novo)** |
| `/eventos` | — | **Stub (novo)** |
| `/conquistas` | — | **Stub (novo)** |
| `/colecoes` | — | **Stub (novo)** |
| `/pedidos` | orders | Completa |
| `/historico` | — | **Stub (novo)** |
| `/nfc` | nfc | Completa |
| `/fundador` | founder | Completa |
| `/perfil` | profile | Completa |
| `/configuracoes` | — | **Stub (novo)** |
| `*` (404) | — | `not-found.tsx` |

14 rotas totais (era 8). Ainda não há rotas de API, rotas dinâmicas nem `middleware.ts`.

---

## 7. Banco de dados preparado

Inalterado em essência frente à auditoria anterior — nenhum banco conectado, todos os dados mock. Mudanças estruturais:

- Clients Supabase movidos de `lib/supabase/` para `services/supabase/` (mesmo conteúdo).
- Novo contrato formal `core/repository.ts` (`Repository<T>`, `SingleRecordRepository<T>`) documentando o padrão que os services já seguiam informalmente.
- `docs/DATABASE.md` (renomeado de `SUPABASE.md`) agora inclui diretrizes de **Policies (RLS)** e **Storage**, além do schema SQL já existente.
- Nenhum service usa Supabase de fato ainda — continua 100% mock.

---

## 8. Integrações preparadas

| Integração | Estado |
| --- | --- |
| **Supabase (dados)** | Clients prontos em `services/supabase/`, schema documentado, zero uso real |
| **Supabase Auth** | Não implementada. `services/auth/auth.service.ts` sempre retorna `guest`. **Novo:** a sessão agora é distribuída via `providers/Providers.tsx` → `contexts/session-context.tsx` (`useSession()`), lida uma vez em `app/layout.tsx` — pronta para consumo em qualquer Client Component quando a auth real chegar |
| **NFC físico** | **Novo:** abstração formal em `core/nfc/` (`NfcReader`, `types`) além da UI existente. `isSupported()` funciona hoje (checa `NDEFReader`); `scan()` ainda rejeita com erro explícito — leitura real não implementada |
| **Zod / React Hook Form** | **Novo:** instalados, sem uso ainda — aguardam o primeiro formulário real (Fase 6 do roadmap) |
| **shadcn/ui** | Avaliado, CLI revertido por incompatibilidade (ver seção 2). Adoção manual planejada |
| **Analytics / observabilidade** | Nenhuma |
| **E-mail / notificações** | Nenhuma |
| **Pagamentos** | Nenhuma |
| **CI/CD** | Nenhum workflow |

---

## 9. Problemas encontrados

**Resolvidos nesta entrega:**
1. ~~Dependências não instaladas~~ — `npm install` executado; `typecheck`, `lint` e `build` validados e passando.
2. ~~Duplicação de checagem de capability NFC~~ — centralizada em `core/nfc/nfc-reader.ts`.

**Ainda presentes:**
1. **`middleware.ts` ausente** — o comentário em `services/supabase/server.ts` ainda referencia refresh de sessão via middleware inexistente. Inofensivo enquanto a auth não está ativa (ver `docs/ROADMAP.md`, Fase 4).
2. **`public/assets/` vazio** — nenhum asset real versionado; sem favicon, ícone ou imagem Open Graph.
3. **100% dos dados são mock** — as 7 features completas e os 6 módulos stub não têm nenhuma persistência real.
4. **Nenhuma rota é protegida** — `getSession()`/`useSession()` sempre retornam `guest`; qualquer rota é publicamente acessível.
5. **Ausência de testes automatizados.**
6. **Ausência de `app/error.tsx`** — existe `not-found.tsx` e `loading.tsx`, mas nenhum boundary de erro.
7. **Sem CI/CD** — nenhum pipeline roda lint/typecheck/build a cada push.
8. **6 módulos são apenas navegação** — Benefícios, Eventos, Conquistas, Coleções, Histórico e Configurações não têm conteúdo real; risco de o clube parecer "cheio de portas fechadas" se ficarem assim por muito tempo (ver Roadmap Fase 2 para mitigar).

---

## 10. Melhorias sugeridas

Consolidadas em `docs/ROADMAP.md` (fases 2 a 7). Destaques imediatos:
1. Priorizar a Fase 2 do roadmap (implementar os módulos stub, um por vez, começando por Benefícios ou Histórico — os mais próximos do que já existe).
2. Adicionar `middleware.ts` antes de iniciar a Fase 4 (autenticação real).
3. Popular `public/assets/` com favicon/ícones/OG image.
4. Adicionar `app/error.tsx`.
5. Configurar CI (GitHub Actions) rodando `typecheck`/`lint`/`build` a cada push — teria pego a ausência de `node_modules` antes de qualquer sessão de trabalho depender de instalação manual.
6. Introduzir testes antes de a superfície de código crescer com os 6 módulos novos.

---

## Confirmação de escopo

Esta entrega reestruturou pastas, criou stubs navegáveis e documentação — nenhuma feature completa existente (Vault, Menu Reservado, Perfil, Pedidos, NFC, Fundador) teve comportamento alterado. Build, lint e typecheck foram validados após cada etapa.
