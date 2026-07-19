import Link from "next/link";
import { Logo } from "@/components/Logo";
import { BRAND, NAV_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-ash-line/60">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 md:px-10">
        <div className="flex flex-col items-center gap-10 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col items-center gap-4 md:items-start">
            <Logo />
            <p className="max-w-xs text-center text-xs leading-relaxed text-ash md:text-left">
              {BRAND.tagline}
            </p>
          </div>
          <nav aria-label="Rodapé">
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.65rem] uppercase tracking-wide2 text-ivory-dim transition-colors duration-300 hover:text-gold focus-visible:text-gold focus-visible:outline-none"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-14 flex flex-col items-center gap-3 border-t border-ash-line/40 pt-8 md:flex-row md:justify-between">
          <p className="text-[0.6rem] uppercase tracking-crown text-ash">
            {BRAND.name} · {BRAND.city}
          </p>
          <p className="text-[0.6rem] uppercase tracking-wide2 text-ash-deep">
            Acesso reservado a membros
          </p>
        </div>
      </div>
    </footer>
  );
}
