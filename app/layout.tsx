import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import type { ReactNode } from "react";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { IntroReveal } from "@/components/IntroReveal";
import { BRAND } from "@/config/brand";
import { Providers } from "@/providers/Providers";
import { getSession } from "@/services/auth/auth.service";
import "@/styles/globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
});

const body = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: {
    default: BRAND.name,
    template: `%s · ${BRAND.shortName}`,
  },
  description:
    "Plataforma de experiência premium do Don Baron. Recompensas, criações reservadas e acesso exclusivo para membros.",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getSession();

  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen font-body">
        <Providers session={session}>
          <IntroReveal />
          <AnimatedBackground />
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
