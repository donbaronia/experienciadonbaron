import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  elevated?: boolean;
}

export function Card({ className, elevated = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "border border-ash-line bg-noir-soft/80 p-6 backdrop-blur-sm transition-colors duration-300",
        elevated && "bg-noir-raised shadow-glow",
        "hover:border-gold/30",
        className
      )}
      {...props}
    />
  );
}

export function CardLabel({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "text-[0.65rem] uppercase tracking-[0.35em] text-gold",
        className
      )}
      {...props}
    />
  );
}

export function CardTitle({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("mt-2 font-display text-2xl text-ivory", className)}
      {...props}
    />
  );
}
