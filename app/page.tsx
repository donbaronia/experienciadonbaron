import { PageContainer } from "@/components/PageContainer";
import { HeroSection } from "@/features/home/components/HeroSection";
import { PillarsSection } from "@/features/home/components/PillarsSection";

export default function HomePage() {
  return (
    <PageContainer>
      <HeroSection />
      <PillarsSection />
    </PageContainer>
  );
}
