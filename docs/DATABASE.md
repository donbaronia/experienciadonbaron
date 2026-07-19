# Banco de Dados — Plano de Integração (Supabase)

## Estado atual

- Clients prontos: `services/supabase/client.ts` (browser) e `services/supabase/server.ts` (server, com cookies via `@supabase/ssr`).
- Variáveis: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (ver `.env.example`).
- `isSupabaseConfigured()` (`services/supabase/env.ts`) permite fallback para mock quando o ambiente não está configurado.
- Autenticação **não** implementada — apenas a fronteira `services/auth/auth.service.ts` (tipos em `core/auth/types.ts`).
- Nenhum service de feature usa Supabase hoje; todos retornam dados mock com `source: "mock"`.

## Repository pattern

`core/repository.ts` define o contrato formal que todo `*.service.ts` já segue implicitamente:

```ts
export interface Repository<T> {
  list(): Promise<ServiceResult<T[]>>;
}

export interface SingleRecordRepository<T> {
  get(): Promise<ServiceResult<T>>;
}
```

Ao migrar um service de mock para Supabase, a função exportada troca o corpo (array hardcoded → query), mas mantém a assinatura e o formato `ServiceResult<T>` com `source: "supabase"`. Nenhum componente muda.

## Modelagem sugerida

```sql
create table members (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid references auth.users,
  name text not null,
  tier text not null default 'barao',
  crown_points integer not null default 0,
  member_since timestamptz not null default now()
);

create table vault_rewards (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  rarity text not null,
  cost_crown_points integer not null,
  remaining_units integer
);

create table exclusive_menu_items (
  id uuid primary key default gen_random_uuid(),
  chapter_number integer not null,
  name text not null,
  description text not null,
  price_cents integer not null,
  window_status text not null default 'aberta'
);

create table orders (
  id uuid primary key default gen_random_uuid(),
  member_id uuid references members,
  code text not null,
  status text not null,
  items jsonb not null,
  total_cents integer not null,
  crown_points_earned integer not null,
  created_at timestamptz not null default now()
);

create table nfc_cards (
  id uuid primary key default gen_random_uuid(),
  member_id uuid references members,
  serial_number text not null unique,
  status text not null default 'aguardando_ativacao',
  issued_at timestamptz not null default now()
);
```

As tabelas para os módulos ainda em stub (Benefícios, Eventos, Conquistas, Coleções, Histórico) serão modeladas quando cada um for implementado — ver [`ROADMAP.md`](ROADMAP.md). Histórico provavelmente não é uma tabela própria, e sim uma consulta agregada sobre `orders` + futuras tabelas de pontos/ativações.

## Policies (RLS)

Nenhuma policy foi criada ainda — não há tabelas no Supabase. Diretriz para quando a migração começar:

- **RLS ligado em todas as tabelas** desde a criação (nunca deixar uma tabela pública por padrão).
- `members`: um usuário autenticado só lê/edita a própria linha (`auth_user_id = auth.uid()`).
- `orders`, `nfc_cards`: mesma regra, via `member_id` relacionado ao `auth_user_id` do membro.
- `vault_rewards`, `exclusive_menu_items`: leitura pública (catálogo), escrita restrita a uma role de admin/serviço.
- Nenhuma policy de escrita para o cliente anônimo em nenhuma tabela — toda escrita de pedido/resgate passa por uma function/edge function autenticada, nunca por insert direto do browser.

## Storage

Ainda não há buckets criados. Quando os módulos com mídia forem implementados:

- `collections` — imagens das peças/edições limitadas (módulo Coleções).
- `events` — banners e fotos de eventos (módulo Eventos).
- `founder` — mídia da narrativa do fundador, se migrar de estático para dinâmico.

Todos privados por padrão, com leitura via URL assinada ou policy pública somente para o bucket que a exigir.

## Passo a passo da migração

1. Criar projeto no Supabase e rodar o SQL acima.
2. Preencher `.env.local`.
3. Ativar RLS e escrever as policies da seção acima antes de expor qualquer tabela.
4. Em cada `*.service.ts`, substituir o retorno mock por uma query via `createClient()` de `services/supabase/server.ts`, mantendo a assinatura `Repository<T>`/`SingleRecordRepository<T>` com `source: "supabase"`.
5. Implementar autenticação em `services/auth/auth.service.ts` (magic link ou OTP por telefone).
