# Contribuindo — Project Crown

## Como rodar

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm run build
```

`npm install` é obrigatório antes de qualquer outro comando — `node_modules/` não é versionado.

## Convenções (ver ARCHITECTURE.md e DESIGN_SYSTEM.md para o detalhe)

- Feature-first: nada em `features/<a>` importa de `features/<b>`.
- Server Components por padrão; `"use client"` só onde há interatividade/animação/contexto.
- Todo acesso a dado passa por um `*.service.ts` retornando `ServiceResult<T>`.
- TypeScript estrito, zero `any` explícito (lint bloqueia).
- Sem comentários que descrevem o óbvio; comente apenas o não-óbvio (uma decisão, uma restrição).
- Textos de interface em pt-BR; identificadores de código em inglês.
- Formatação via Prettier (`prettier-plugin-tailwindcss` ordena classes automaticamente) — rode antes de commitar se seu editor não formatar ao salvar.

## Como adicionar um módulo novo

### Como stub (rota navegável, sem dados reais)
1. Criar `app/<rota>/page.tsx` com `metadata.title`, `PageContainer`, `PageIntro` e `<ComingSoon icon={...} note="..." />`.
2. Adicionar a entrada em `config/navigation.ts`.
3. Não criar `features/<módulo>/` vazia — isso só nasce na promoção a módulo completo.

### Promovendo um stub a módulo completo
1. Validar o conceito (que dado o módulo representa, que ações o usuário faz).
2. Criar `features/<módulo>/{components,hooks,services,types}` seguindo o padrão de uma feature existente (ex.: `features/vault/`) como referência de organização.
3. O service da feature deve implementar `Repository<T>` ou `SingleRecordRepository<T>` (`core/repository.ts`) e retornar `source: "mock"` até a migração para Supabase.
4. Substituir `<ComingSoon />` pela composição real em `app/<rota>/page.tsx`.
5. Atualizar `docs/ARCHITECTURE.md` (tabela de rotas) e `docs/PROJECT_STATUS.md`.

## Commits

Mensagens em português, descrevendo o porquê da mudança, não só o quê. Um commit por unidade de trabalho coerente — evitar misturar reestruturação com feature nova.
