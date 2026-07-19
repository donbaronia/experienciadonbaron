# Arquitetura — Project Crown

## Princípios

1. **Feature-first.** Cada domínio do produto vive em `features/<nome>` com suas próprias `components/`, `hooks/`, `types/` e `services/`. Nada de um domínio importa internamente de outro; o que é compartilhado sobe para `components/`, `lib/`, `hooks/` ou `types/` na raiz.
2. **Server Components por padrão.** Páginas e componentes de dados são Server Components. `"use client"` aparece apenas onde há interatividade ou animação (Framer Motion, NFC, estado local).
3. **Services como fronteira de dados.** Componentes nunca sabem de onde o dado vem. Todo acesso passa por um service que retorna `ServiceResult<T>` com o campo `source: "mock" | "supabase"`. Trocar mock por Supabase é uma mudança local no service.
4. **TypeScript estrito, zero `any`.** `strict`, `noUncheckedIndexedAccess` e lint bloqueando `any` explícito.

## Estrutura

```
app/                  Rotas (App Router) — apenas composição de features
components/           Componentes globais reutilizáveis
features/
  <feature>/
    components/       UI da feature
    hooks/            Hooks da feature (client)
    services/         Acesso a dados (mock hoje, Supabase amanhã)
    types/            Tipos da feature
hooks/                Hooks compartilhados
lib/                  Utilitários, constantes, clients Supabase, auth
styles/               CSS global e tokens
types/                Tipos compartilhados entre features
public/assets/        Assets estáticos
docs/                 Documentação
```

## Rotas

| Rota | Feature |
| --- | --- |
| `/` | home |
| `/vault` | vault |
| `/menu-reservado` | exclusive-menu |
| `/perfil` | profile |
| `/pedidos` | orders |
| `/nfc` | nfc |
| `/fundador` | founder |

## Autenticação (preparada, não implementada)

`lib/auth.ts` expõe `getSession(): Promise<AuthGate>`. Hoje retorna sempre `guest`. Quando a autenticação Supabase for implementada, apenas esta função muda; páginas que precisarem de proteção consultam `getSession()` e redirecionam.

## Convenções

- Componentes em PascalCase, hooks com prefixo `use`, services com sufixo `.service.ts`.
- Sem comentários desnecessários; o código deve se explicar.
- Textos de interface em pt-BR; código em inglês.
