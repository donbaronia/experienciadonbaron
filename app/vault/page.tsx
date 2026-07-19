import type { Metadata } from "next";
import { PageContainer } from "@/components/PageContainer";
import { PageIntro } from "@/components/PageIntro";
import { VaultGrid } from "@/features/vault/components/VaultGrid";

export const metadata: Metadata = { title: "Vault" };

export default function VaultPage() {
  return (
    <PageContainer>
      <PageIntro
        eyebrow="Recompensas"
        title="O Vault"
        description="O que está aqui não se compra no cardápio. Cada recompensa é resgatada com pontos de coroa acumulados em pedidos reais."
      />
      <VaultGrid />
    </PageContainer>
  );
}
