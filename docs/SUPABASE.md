# Supabase — Plano de Integração

## Estado atual

- Clients prontos: `lib/supabase/client.ts` (browser) e `lib/supabase/server.ts` (server, com cookies via `@supabase/ssr`).
- Variáveis: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (ver `.env.example`).
- `isSupabaseConfigured()` permite fallback para mock quando o ambiente não está configurado.
- Autenticação **não** implementada — apenas a fronteira `lib/auth.ts`.

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

## Passo a passo da migração

1. Criar projeto no Supabase e rodar o SQL acima.
2. Preencher `.env.local`.
3. Em cada `*.service.ts`, substituir o retorno mock por uma query via `createClient()` de `lib/supabase/server.ts`, mantendo a assinatura `ServiceResult<T>` com `source: "supabase"`.
4. Implementar autenticação em `lib/auth.ts` (magic link ou OTP por telefone) e ativar RLS nas tabelas.
