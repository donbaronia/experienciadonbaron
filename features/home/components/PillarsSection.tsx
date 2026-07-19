import Link from "next/link";
import { Card, CardLabel, CardTitle } from "@/components/Card";
import { Reveal } from "@/components/Reveal";
import { getExperiencePillars } from "../services/home.service";

export async function PillarsSection() {
  const { data: pillars } = await getExperiencePillars();

  return (
    <section aria-labelledby="pillars-heading" className="mt-16">
      <Reveal>
        <h2
          id="pillars-heading"
          className="text-center text-xs uppercase tracking-crown text-ash"
        >
          Os quatro pilares do Universo
        </h2>
      </Reveal>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {pillars.map((pillar, index) => {
          const Icon = pillar.icon;
          return (
            <Reveal key={pillar.id} delay={index * 0.1}>
              <Link
                href={pillar.href}
                className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
              >
                <Card className="h-full">
                  <Icon className="h-6 w-6 text-gold" strokeWidth={1.25} />
                  <CardLabel className="mt-5">{pillar.label}</CardLabel>
                  <CardTitle>{pillar.title}</CardTitle>
                  <p className="mt-3 text-sm leading-relaxed text-ivory-dim">
                    {pillar.description}
                  </p>
                </Card>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
