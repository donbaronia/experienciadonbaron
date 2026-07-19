import type { Metadata } from "next";
import { CalendarDays } from "lucide-react";
import { ComingSoon } from "@/components/ComingSoon";
import { PageContainer } from "@/components/PageContainer";
import { PageIntro } from "@/components/PageIntro";

export const metadata: Metadata = { title: "Eventos" };

export default function EventsPage() {
  return (
    <PageContainer>
      <PageIntro
        eyebrow="Encontros"
        title="Eventos do Universo"
        description="Noites, degustações e encontros reservados a membros — anunciados apenas dentro do clube."
      />
      <ComingSoon
        icon={CalendarDays}
        note="A agenda de eventos está sendo construída. Em breve, aqui."
      />
    </PageContainer>
  );
}
