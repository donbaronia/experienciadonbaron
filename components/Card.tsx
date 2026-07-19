import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  elevated?: boolean;
  glass?: boolean;
}

export function Card({
  className,
  elevated = false,
  glass = false,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "p-6 transition-all duration-500 ease-crown",
        glass
          ? "glass"
          : "border border-ash-line bg-noir-soft/80 backdrop-blur-sm",
        elevated && "bg-noir-raised shadow-glow",
        "hover:-translate-y-0.5 hover:border-gold/30 hover:shadow-elevation-2",
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
