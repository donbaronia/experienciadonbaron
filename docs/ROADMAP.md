# Roadmap — Project Crown

Ordem de execução planejada. Cada fase parte da anterior; nada pula fila sem decisão explícita.

## Fase 1 — Reestruturação e stubs (concluída nesta entrega)

- Extração de `lib/` para `core/`, `services/`, `config/`, `providers/`, `contexts/`.
- Renomeação Home → Lobby.
- Abstração NFC em `core/nfc/`.
- Seis módulos novos como stub navegável: Benefícios, Eventos, Conquistas, Coleções, Histórico, Configurações.
- Zod, React Hook Form e `@hookform/resolvers` instalados e prontos para o primeiro formulário real.
- Documentação completa em `docs/`.

## Fase 2 — Um módulo por vez

Cada módulo stub vira feature completa nesta ordem (a definir com o time, sujeita a prioridade de negócio):

1. **Benefícios** — depende de decidir o que o distingue do Vault (perene vs. resgatável).
2. **Histórico** — provavelmente uma visão agregada sobre Pedidos + pontos, não uma tabela nova.
3. **Conquistas** — depende de definir critérios (o que conta como marco).
4. **Eventos** — depende de um fluxo de agenda/inscrição.
5. **Coleções** — depende de assets reais (fotos das peças).

Para cada módulo: validar o conceito → criar `features/<módulo>/` → substituir `<ComingSoon />` pela composição real → atualizar `ARCHITECTURE.md` e `PROJECT_STATUS.md`.

## Fase 3 — Supabase real, service por service

Seguir `DATABASE.md`: criar projeto, aplicar schema + RLS, migrar um `*.service.ts` de cada vez (sugestão: começar por `profile`, o mais simples) trocando mock por query real sem tocar componentes.

## Fase 4 — Autenticação real

Implementar `services/auth/auth.service.ts` com magic link ou OTP. Definir quais rotas passam a exigir `status: "authenticated"` via `useSession()`/`getSession()`.

## Fase 5 — NFC real

Implementar `scan()` em `core/nfc/nfc-reader.ts` via Web NFC API (Android/Chrome) e o fluxo de fallback para navegadores sem suporte (já tratado na UI hoje).

## Fase 6 — shadcn/ui e formulários

No primeiro formulário real do produto (provável candidato: ativação de cartão ou configurações de conta), adotar Zod + React Hook Form e copiar manualmente os primitivos shadcn/ui necessários, seguindo a nota de compatibilidade em `DESIGN_SYSTEM.md`.

## Fase 7 — Performance

Auditoria Lighthouse (meta ≥ 95 em todas as categorias): lazy loading e dynamic imports nos módulos mais pesados, otimização de imagens (quando `public/assets` deixar de estar vazio), revisão de First Load JS por rota.
