import type { Metadata } from "next";
import { Trophy } from "lucide-react";
import { ComingSoon } from "@/components/ComingSoon";
import { PageContainer } from "@/components/PageContainer";
import { PageIntro } from "@/components/PageIntro";

export const metadata: Metadata = { title: "Conquistas" };

export default function AchievementsPage() {
  return (
    <PageContainer>
      <PageIntro
        eyebrow="Trajetória"
        title="Conquistas"
        description="Marcos alcançados dentro do clube — reconhecidos, não comprados."
      />
      <ComingSoon
        icon={Trophy}
        note="O sistema de conquistas está sendo construído. Em breve, aqui."
      />
    </PageContainer>
  );
}
