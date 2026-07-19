import type { Metadata } from "next";
import { PageContainer } from "@/components/PageContainer";
import { PageIntro } from "@/components/PageIntro";
import { FounderManifesto } from "@/features/founder/components/FounderManifesto";

export const metadata: Metadata = { title: "Fundador" };

export default function FounderPage() {
  return (
    <PageContainer>
      <PageIntro
        eyebrow="Origem"
        title="A mesa do fundador"
        description="A história por trás do balcão — do primeiro blend à operação que sustenta dezenas de famílias."
      />
      <FounderManifesto />
    </PageContainer>
  );
}
