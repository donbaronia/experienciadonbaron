import { Reveal } from "@/components/Reveal";
import { getExclusiveMenu } from "../services/exclusive-menu.service";
import { MenuChapter } from "./MenuChapter";

export async function MenuShowcase() {
  const { data: items } = await getExclusiveMenu();

  return (
    <div>
      {items.map((item, index) => (
        <Reveal key={item.id} delay={index * 0.1}>
          <MenuChapter item={item} />
        </Reveal>
      ))}
    </div>
  );
}
