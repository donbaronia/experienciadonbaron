import type { Metadata } from "next";
import { PageContainer } from "@/components/PageContainer";
import { PageIntro } from "@/components/PageIntro";
import { MemberCardVisual } from "@/features/nfc/components/MemberCardVisual";
import { NfcActivation } from "@/features/nfc/components/NfcActivation";
import { getMemberCard } from "@/features/nfc/services/nfc.service";

export const metadata: Metadata = { title: "Cartão de Membro" };

export default async function NfcPage() {
  const { data: card } = await getMemberCard();

  return (
    <PageContainer>
      <PageIntro
        eyebrow="Identidade física"
        title="Cartão de membro"
        description="Um cartão com NFC que identifica você no balcão e desbloqueia benefícios em um toque."
      />
      <div className="flex flex-col items-center gap-12">
        <MemberCardVisual serialNumber={card.serialNumber} />
        <NfcActivation />
      </div>
    </PageContainer>
  );
}
