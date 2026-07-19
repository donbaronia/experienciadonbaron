import type { Metadata } from "next";
import { Gift } from "lucide-react";
import { ComingSoon } from "@/components/ComingSoon";
import { PageContainer } from "@/components/PageContainer";
import { PageIntro } from "@/components/PageIntro";

export const metadata: Metadata = { title: "Benefícios" };

export default function BenefitsPage() {
  return (
    <PageContainer>
      <PageIntro
        eyebrow="Vantagens"
        title="Benefícios do clube"
        description="Privilégios contínuos de quem carrega a Moeda Don Baron — para além das recompensas pontuais do Vault."
      />
      <ComingSoon
        icon={Gift}
        note="Os benefícios do clube estão sendo desenhados. Em breve, aqui."
      />
    </PageContainer>
  );
}
