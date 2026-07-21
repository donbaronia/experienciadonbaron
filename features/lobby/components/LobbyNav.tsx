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
                      "group relative inline-block pb-2 text-[0.65rem] uppercase tracking-wide2 focus-visible:outline-none",
                      active ? "text-gold" : "text-ivory-dim"
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left bg-gold transition-transform duration-500 ease-crown",
                        active
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      )}
                    />
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
