export type MenuWindowStatus = "aberta" | "encerrando" | "esgotada";

export interface ExclusiveMenuItem {
  id: string;
  name: string;
  chapterNumber: number;
  description: string;
  priceInCents: number;
  windowStatus: MenuWindowStatus;
}
