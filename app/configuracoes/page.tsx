import type { Metadata } from "next";
import { Settings } from "lucide-react";
import { ComingSoon } from "@/components/ComingSoon";
import { PageContainer } from "@/components/PageContainer";
import { PageIntro } from "@/components/PageIntro";

export const metadata: Metadata = { title: "Configurações" };

export default function SettingsPage() {
  return (
    <PageContainer>
      <PageIntro
        eyebrow="Preferências"
        title="Configurações"
        description="Dados da conta, notificações e privacidade do seu acesso ao clube."
      />
      <ComingSoon
        icon={Settings}
        note="As configurações de conta estão sendo construídas. Em breve, aqui."
      />
    </PageContainer>
  );
}
