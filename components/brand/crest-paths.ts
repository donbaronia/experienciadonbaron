/**
 * Path data do brasão Don Baron (viewBox "0 0 100 120").
 * Fonte única usada por Logo.tsx e Loader.tsx — nunca duplicar coordenadas.
 * Redesenho próprio (linhas geométricas), inspirado no brasão de referência
 * (escudo + monograma "D"+"B" entrelaçado + coroa), não um traçado da imagem original.
 */

export const CREST_VIEEWBOX = "0 0 100 120";

export const CREST_SHIELD_OUTLINE =
  "M50,6 L14,17 L14,58 C14,89 33,105 50,116 C67,105 86,89 86,58 L86,17 Z";

export const CREST_D_OUTER =
  "M22,32 L22,88 C40,88 55,76 55,60 C55,44 40,32 22,32 Z";
export const CREST_D_INNER =
  "M30,42 L30,78 C39,78 46,70 46,60 C46,50 39,42 30,42 Z";

export const CREST_B_SPINE = "M50,32 L58,32 L58,88 L50,88 Z";
export const CREST_B_TOP_OUTER =
  "M58,32 C73,32 81,37 81,44 C81,52 72,57 58,57 Z";
export const CREST_B_TOP_INNER =
  "M58,39 C68,39 74,42 74,44 C74,47 68,50 58,50 Z";
export const CREST_B_BOTTOM_OUTER =
  "M58,58 C78,58 88,66 88,75 C88,84 75,88 58,88 Z";
export const CREST_B_BOTTOM_INNER =
  "M58,66 C70,66 78,70 78,75 C78,80 70,81 58,81 Z";

export const CREST_CROWN =
  "M40,22 L43,11 L50,17 L57,11 L60,22 Z";
export const CREST_CROWN_DOTS: ReadonlyArray<[number, number, number]> = [
  [43, 10, 1.6],
  [50, 8, 1.8],
  [57, 10, 1.6],
];
