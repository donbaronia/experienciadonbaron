import type { Metadata } from "next";
import { PageContainer } from "@/components/PageContainer";
import { PageIntro } from "@/components/PageIntro";
import { MenuShowcase } from "@/features/exclusive-menu/components/MenuShowcase";

export const metadata: Metadata = { title: "Menu Reservado" };

export default function ExclusiveMenuPage() {
  return (
    <PageContainer>
      <PageIntro
        eyebrow="Gastronomia"
        title="Menu Reservado"
        description="Criações fora de catálogo, lançadas em capítulos. Quando a janela fecha, a criação sai de cena — sem reposição."
      />
      <MenuShowcase />
    </PageContainer>
  );
}
