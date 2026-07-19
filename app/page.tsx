import { PageContainer } from "@/components/PageContainer";
import { HeroSection } from "@/features/lobby/components/HeroSection";
import { PillarsSection } from "@/features/lobby/components/PillarsSection";

export default function HomePage() {
  return (
    <PageContainer>
      <HeroSection />
      <PillarsSection />
    </PageContainer>
  );
}
