import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/Card";
import { Reveal } from "@/components/Reveal";

interface ComingSoonProps {
  icon: LucideIcon;
  note: string;
}

export function ComingSoon({ icon: Icon, note }: ComingSoonProps) {
  return (
    <Reveal>
      <Card
        elevated
        className="mx-auto flex max-w-md flex-col items-center gap-5 text-center"
      >
        <Icon className="h-7 w-7 text-gold" strokeWidth={1.25} />
        <p className="text-xs uppercase tracking-crown text-gold">
          Em construção
        </p>
        <p className="text-sm leading-relaxed text-ivory-dim">{note}</p>
      </Card>
    </Reveal>
  );
}
