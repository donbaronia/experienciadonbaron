"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "Início" },
  { href: "/menu-reservado", label: "Exclusivos" },
  { href: "/colecoes", label: "Coleção" },
  { href: "/beneficios", label: "Benefícios" },
  { href: "/perfil", label: "Perfil" },
] as const;

export function LobbyNav() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between gap-6 overflow-x-auto px-6 md:px-10">
        <Link
          href="/"
          aria-label="Universo Don Baron"
          className="shrink-0 focus-visible:outline-none"
        >
          <Logo withWordmark={false} size={24} />
        </Link>
        <nav aria-label="Navegação do Lobby" className="shrink-0">
          <ul className="flex items-center gap-5 whitespace-nowrap md:gap-10">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "text-[0.65rem] uppercase tracking-wide2 transition-colors duration-300 focus-visible:outline-none",
                      active ? "text-gold" : "text-ivory-dim hover:text-gold"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
