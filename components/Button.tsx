import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-body text-sm uppercase tracking-[0.2em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-noir disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        solid:
          "bg-gold text-noir hover:bg-gold-light active:bg-gold-dark",
        outline:
          "border border-gold/50 text-gold hover:border-gold hover:bg-gold/10",
        ghost: "text-ivory-dim hover:text-gold",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-11 px-6",
        lg: "h-13 px-8 py-4",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "md",
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { buttonVariants };
