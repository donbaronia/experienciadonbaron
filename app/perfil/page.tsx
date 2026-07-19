import type { Metadata } from "next";
import { PageContainer } from "@/components/PageContainer";
import { PageIntro } from "@/components/PageIntro";
import { ProfileCard } from "@/features/profile/components/ProfileCard";

export const metadata: Metadata = { title: "Perfil" };

export default function ProfilePage() {
  return (
    <PageContainer>
      <PageIntro
        eyebrow="Identidade"
        title="Seu lugar no Universo"
        description="Seu título, seus pontos e sua trajetória dentro do clube — tudo em um só lugar."
      />
      <ProfileCard />
    </PageContainer>
  );
}
