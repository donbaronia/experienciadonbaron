import type { Metadata } from "next";
import { History } from "lucide-react";
import { ComingSoon } from "@/components/ComingSoon";
import { PageContainer } from "@/components/PageContainer";
import { PageIntro } from "@/components/PageIntro";

export const metadata: Metadata = { title: "Histórico" };

export default function HistoryPage() {
  return (
    <PageContainer>
      <PageIntro
        eyebrow="Memória"
        title="Seu histórico no clube"
        description="Toda a sua trajetória no Universo — pontos, ativações e marcos — em uma única linha do tempo."
      />
      <ComingSoon
        icon={History}
        note="A linha do tempo completa está sendo construída. Em breve, aqui."
      />
    </PageContainer>
  );
}
