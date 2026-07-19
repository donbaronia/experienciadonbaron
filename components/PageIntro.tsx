import { Reveal } from "@/components/Reveal";

interface PageIntroProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <div className="mb-16 text-center">
      <Reveal>
        <p className="text-xs uppercase tracking-crown text-gold">{eyebrow}</p>
      </Reveal>
      <Reveal delay={0.1}>
        <h1 className="mt-5 font-display text-4xl text-ivory md:text-6xl">
          {title}
        </h1>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ivory-dim">
          {description}
        </p>
      </Reveal>
    </div>
  );
}
