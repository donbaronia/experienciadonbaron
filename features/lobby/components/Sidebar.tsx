"use client";

import { Gift, Home, LayoutGrid, Lock, UserCircle2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const SIDEBAR_ITEMS = [
  { href: "/", label: "Início", icon: Home },
  { href: "/menu-reservado", label: "Exclusivos", icon: Lock },
  { href: "/colecoes", label: "Coleção", icon: LayoutGrid },
  { href: "/beneficios", label: "Benefícios", icon: Gift },
  { href: "/perfil", label: "Perfil", icon: UserCircle2 },
] as const;

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 flex h-16 items-center justify-center gap-4",
        "border-t border-ash-line/60 bg-noir/80 backdrop-blur-md",
        "md:inset-y-0 md:left-0 md:right-auto md:h-full md:w-20",
        "md:flex-col md:justify-center md:gap-2 md:border-r md:border-t-0"
      )}
    >
      <nav
        aria-label="Navegação do Lobby"
        className="flex items-center gap-2 md:flex-col"
      >
        {SIDEBAR_ITEMS.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              className={cn(
                "hairline-gold group relative flex h-14 w-14 flex-col items-center justify-center gap-1 transition-colors duration-300",
                active ? "text-gold" : "text-ivory-dim hover:text-gold"
              )}
            >
              <Icon className="h-5 w-5" strokeWidth={1.25} />
              <span className="hidden text-[0.5rem] uppercase tracking-wide2 md:block">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
