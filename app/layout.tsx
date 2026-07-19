import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import type { ReactNode } from "react";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Header } from "@/components/Header";
import { BRAND } from "@/lib/constants";
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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen font-body">
        <AnimatedBackground />
        <Header />
        {children}
        <footer className="relative z-10 border-t border-ash-line/60 py-10 text-center">
          <p className="text-[0.65rem] uppercase tracking-crown text-ash">
            {BRAND.name} · {BRAND.city}
          </p>
        </footer>
      </body>
    </html>
  );
}
