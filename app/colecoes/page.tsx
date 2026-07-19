import type { Metadata } from "next";
import { LayoutGrid } from "lucide-react";
import { ComingSoon } from "@/components/ComingSoon";
import { PageContainer } from "@/components/PageContainer";
import { PageIntro } from "@/components/PageIntro";

export const metadata: Metadata = { title: "Coleções" };

export default function CollectionsPage() {
  return (
    <PageContainer>
      <PageIntro
        eyebrow="Acervo"
        title="Coleções"
        description="Séries e edições limitadas do Universo, reunidas para quem faz parte da história."
      />
      <ComingSoon
        icon={LayoutGrid}
        note="As coleções do clube estão sendo organizadas. Em breve, aqui."
      />
    </PageContainer>
  );
}
