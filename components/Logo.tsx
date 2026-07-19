import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  withWordmark?: boolean;
}

export function Logo({ className, withWordmark = true }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <svg
        viewBox="0 0 48 48"
        aria-hidden="true"
        className="h-9 w-9 shrink-0"
        fill="none"
      >
        <path
          d="M8 34 L11 16 L18 25 L24 12 L30 25 L37 16 L40 34 Z"
          stroke="#C6A15B"
          strokeWidth="2"
          strokeLinejoin="round"
          fill="rgba(198,161,91,0.08)"
        />
        <path d="M8 38 H40" stroke="#C6A15B" strokeWidth="2" />
        <circle cx="24" cy="12" r="1.8" fill="#E3C88F" />
        <circle cx="11" cy="16" r="1.5" fill="#E3C88F" />
        <circle cx="37" cy="16" r="1.5" fill="#E3C88F" />
      </svg>
      {withWordmark ? (
        <span className="flex flex-col leading-none">
          <span className="font-display text-lg tracking-crown text-ivory">
            DON BARON
          </span>
          <span className="mt-1 text-[0.6rem] uppercase tracking-[0.5em] text-gold">
            Universo
          </span>
        </span>
      ) : null}
    </span>
  );
}
