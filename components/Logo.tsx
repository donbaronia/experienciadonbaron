import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  withWordmark?: boolean;
  drawOnMount?: boolean;
}

export function Logo({
  className,
  withWordmark = true,
  drawOnMount = false,
}: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <svg
        viewBox="0 0 48 48"
        aria-hidden="true"
        className="h-9 w-9 shrink-0"
        fill="none"
      >
        <path
          d="M9 33 L12 17 L18.5 25 L24 13 L29.5 25 L36 17 L39 33 Z"
          stroke="#C6A15B"
          strokeWidth="1.5"
          strokeLinejoin="round"
          fill="rgba(198,161,91,0.06)"
          strokeDasharray={drawOnMount ? 200 : undefined}
          className={drawOnMount ? "animate-crown-draw" : undefined}
        />
        <path
          d="M11 37.5 H37"
          stroke="#C6A15B"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="24" cy="12" r="1.6" fill="#E3C88F" />
        <circle cx="12" cy="16.5" r="1.2" fill="#E3C88F" />
        <circle cx="36" cy="16.5" r="1.2" fill="#E3C88F" />
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
