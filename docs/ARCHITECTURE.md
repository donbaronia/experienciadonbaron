# Arquitetura — Project Crown

## Princípios

1. **Feature-first.** Cada domínio do produto vive em `features/<nome>` com suas próprias `components/`, `hooks/`, `types/` e `services/`. Nada de um domínio importa internamente de outro; o que é compartilhado sobe para `components/`, `core/`, `config/`, `hooks/` ou `types/` na raiz.
2. **Server Components por padrão.** Páginas e componentes de dados são Server Components. `"use client"` aparece apenas onde há interatividade ou animação (Framer Motion, NFC, estado local, contexto de sessão).
3. **Services como fronteira de dados.** Componentes nunca sabem de onde o dado vem. Todo acesso passa por um service que retorna `ServiceResult<T>` com o campo `source: "mock" | "supabase"`. Trocar mock por Supabase é uma mudança local no service. O contrato formal está em [`core/repository.ts`](../core/repository.ts) (`Repository<T>` / `SingleRecordRepository<T>`) — todo `*.service.ts` deve se encaixar em uma dessas formas.
4. **TypeScript estrito, zero `any`.** `strict`, `noUncheckedIndexedAccess` e lint bloqueando `any` explícito.
5. **Módulo antes de conteúdo.** Um módulo novo nasce como *stub* (rota + tela "em construção", ver seção Stubs) antes de ganhar dados, componentes e services reais — isso mantém a navegação do clube sempre coerente mesmo com features em construção.

## Estrutura

```
app/                  Rotas (App Router) — apenas composição de features
components/           Componentes globais reutilizáveis (inclui ComingSoon, usado pelos módulos stub)
  ui/                 Reservado para primitivos shadcn/ui adotados manualmente (ver DESIGN_SYSTEM.md)
core/                 Abstrações e tipos fundamentais, sem lógica de UI nem de infraestrutura
  repository.ts        Contrato Repository<T> / SingleRecordRepository<T> seguido pelos services
  auth/types.ts         SessionUser, AuthGate
  nfc/                   Abstração de hardware NFC (types.ts + nfc-reader.ts) — não depende de nenhuma feature
services/             Serviços cross-feature (infraestrutura compartilhada, não específica de um domínio)
  auth/auth.service.ts   getSession() — hoje sempre "guest"
  supabase/               Clients Supabase (browser/server) + validação de env
config/               Configuração estática da aplicação (BRAND, NAV_LINKS)
providers/            Composição raiz de providers client-side (hoje: Providers.tsx → SessionProvider)
contexts/             Definições de React Context (hoje: session-context.tsx) e seus hooks (useSession)
features/
  <feature>/
    components/       UI da feature
    hooks/            Hooks da feature (client)
    services/         Acesso a dados específico da feature (mock hoje, Supabase amanhã)
    types/            Tipos da feature
hooks/                Hooks compartilhados entre features
lib/                  Apenas utils.ts (cn, formatCurrencyBRL, formatDateBR) — convenção mantida para compatibilidade com shadcn/ui
styles/               CSS global e tokens
types/                Tipos compartilhados entre features (Member, ServiceResult<T>)
public/assets/        Assets estáticos
docs/                 Documentação
```

**Diferença entre `core/` e `services/`:** `core/` contém contratos e abstrações puras (interfaces, tipos, implementações sem efeitos colaterais de rede) — nada ali faz I/O. `services/` contém código que efetivamente acessa dados ou infraestrutura externa (Supabase, sessão). Um service de feature (`features/x/services/x.service.ts`) pode depender de `core/` e de `services/` da raiz, nunca o contrário.

## Rotas

| Rota | Feature | Status |
| --- | --- | --- |
| `/` | lobby | Completo |
| `/vault` | vault | Completo |
| `/menu-reservado` | exclusive-menu | Completo |
| `/beneficios` | — | Stub |
| `/eventos` | — | Stub |
| `/conquistas` | — | Stub |
| `/colecoes` | — | Stub |
| `/pedidos` | orders | Completo |
| `/historico` | — | Stub |
| `/nfc` | nfc | Completo |
| `/fundador` | founder | Completo |
| `/perfil` | profile | Completo |
| `/configuracoes` | — | Stub |

## Módulos stub

Um módulo "Stub" tem rota, entrada no menu (`config/navigation.ts`) e uma tela `ComingSoon` (`components/ComingSoon.tsx`) com a identidade visual do clube — mas nenhuma `features/<módulo>/` ainda. Isso evita pastas vazias e código morto: a feature só nasce quando o módulo é implementado de verdade. Ver [`ROADMAP.md`](ROADMAP.md) para a ordem planejada de implementação.

Passo a passo para promover um stub a módulo completo:
1. Validar o conceito do módulo com o time (dado que ele representa, ações do usuário).
2. Criar `features/<módulo>/{components,hooks,services,types}` seguindo o padrão das features existentes.
3. Substituir `<ComingSoon />` pela composição real na página em `app/<rota>/page.tsx`.
4. Atualizar este documento e `PROJECT_STATUS.md`.

## Autenticação (preparada, não implementada)

`services/auth/auth.service.ts` expõe `getSession(): Promise<AuthGate>`. Hoje retorna sempre `guest`. O resultado é lido uma vez em `app/layout.tsx` (Server Component) e distribuído via `providers/Providers.tsx` → `contexts/session-context.tsx`, disponível em qualquer Client Component através do hook `useSession()`. Quando a autenticação Supabase for implementada, apenas `auth.service.ts` muda; páginas que precisarem de proteção consultam `useSession()` (client) ou `getSession()` (server) e redirecionam.

## NFC (arquitetura preparada, hardware não implementado)

`core/nfc/types.ts` define o contrato (`NfcReader`, `NfcTagPayload`, `NfcReadStatus`), independente de qualquer feature. `core/nfc/nfc-reader.ts` implementa hoje apenas a checagem de suporte do navegador (`"NDEFReader" in window`); `scan()` rejeita com um erro explícito até a leitura real ser implementada. `features/nfc/hooks/useNfcSupport.ts` consome essa abstração em vez de checar a API do navegador diretamente — qualquer feature futura que precise de NFC (ex.: desbloqueio de benefício via toque) reaproveita o mesmo `core/nfc`, sem duplicar a checagem de capability.

## Convenções

- Componentes em PascalCase, hooks com prefixo `use`, services com sufixo `.service.ts`.
- Sem comentários desnecessários; o código deve se explicar.
- Textos de interface em pt-BR; código em inglês.
- Formatação via Prettier (`prettier-plugin-tailwindcss` ordena classes Tailwind automaticamente) — ver `.prettierrc`.
