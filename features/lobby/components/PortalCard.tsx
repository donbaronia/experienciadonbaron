import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PortalCardProps {
  href: string;
  label: string;
  icon: LucideIcon;
  className?: string;
}

export function PortalCard({ href, label, icon: Icon, className }: PortalCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "glass group flex flex-col items-center justify-center gap-3 border border-gold/20 px-6 py-8 text-center",
        "transition-all duration-500 ease-crown hover:-translate-y-1 hover:border-gold/50 hover:shadow-glow",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60",
        className
      )}
    >
      <Icon
        className="h-6 w-6 text-gold transition-transform duration-500 group-hover:scale-110"
        strokeWidth={1.25}
      />
      <span className="text-xs uppercase tracking-wide2 text-ivory-dim transition-colors duration-300 group-hover:text-ivory">
        {label}
      </span>
    </Link>
  );
}
