import { Reveal } from "@/components/Reveal";
import { getFounderChapters } from "../services/founder.service";

export async function FounderManifesto() {
  const { data: chapters } = await getFounderChapters();

  return (
    <div className="mx-auto max-w-3xl">
      {chapters.map((chapter, index) => (
        <Reveal key={chapter.id} delay={index * 0.12}>
          <article className="border-l border-gold/30 py-10 pl-8">
            <p className="text-[0.65rem] uppercase tracking-crown text-gold">
              {chapter.year}
            </p>
            <h3 className="mt-3 font-display text-3xl text-ivory">
              {chapter.title}
            </h3>
            <p className="mt-4 text-base leading-relaxed text-ivory-dim">
              {chapter.narrative}
            </p>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
