import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";
import { Logo } from "@/components/Logo";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ash-line/60 bg-noir/70 backdrop-blur-md">
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-6 md:px-10">
        <Link
          href="/"
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
        >
          <Logo />
        </Link>
        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.filter((link) => link.href !== "/").map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-xs uppercase tracking-[0.25em] text-ivory-dim transition-colors duration-300 hover:text-gold focus-visible:text-gold focus-visible:outline-none"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
