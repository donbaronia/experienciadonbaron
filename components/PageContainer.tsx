import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  as?: "main" | "section" | "div";
}

export function PageContainer({
  children,
  className,
  as: Tag = "main",
}: PageContainerProps) {
  return (
    <Tag
      className={cn(
        "relative z-10 mx-auto w-full max-w-6xl px-6 pb-24 pt-32 md:px-10",
        className
      )}
    >
      {children}
    </Tag>
  );
}
