# Universo Don Baron

Plataforma de experiência premium do Don Baron. Não é um site de hamburgueria: é um clube digital de acesso restrito, com recompensas (Vault), criações reservadas, cartão de membro NFC e a história do fundador.

## Stack

- Next.js 15 (App Router)
- TypeScript estrito
- Tailwind CSS
- Framer Motion
- Lucide React
- Supabase (estrutura preparada, sem autenticação implementada)

## Como rodar

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Scripts

| Script | Descrição |
| --- | --- |
| `npm run dev` | Ambiente de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Servidor de produção |
| `npm run lint` | Lint |
| `npm run typecheck` | Verificação de tipos |

## Supabase

O projeto já possui clients prontos em `lib/supabase` (browser e server, via `@supabase/ssr`). Para conectar:

1. Copie `.env.example` para `.env.local`
2. Preencha `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Enquanto o Supabase não está conectado, os services das features servem dados mock com a mesma interface (`ServiceResult<T>`), permitindo trocar a fonte de dados sem alterar componentes.

## Documentação

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — arquitetura e convenções
- [`docs/DESIGN-SYSTEM.md`](docs/DESIGN-SYSTEM.md) — tema, tipografia e componentes
- [`docs/SUPABASE.md`](docs/SUPABASE.md) — plano de integração e modelagem sugerida
