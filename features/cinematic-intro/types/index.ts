export type IntroPhase =
  | "void"
  | "glow"
  | "coinAppear"
  | "coinRotate"
  | "cameraApproach"
  | "reveal"
  | "explode"
  | "menu"
  | "fade"
  | "done";

export interface IntroPhaseStep {
  phase: IntroPhase;
  /** Duração até avançar automaticamente para a próxima fase. `null` = aguarda interação do usuário. */
  durationMs: number | null;
}

export const INTRO_SEQUENCE: readonly IntroPhaseStep[] = [
  { phase: "void", durationMs: 500 },
  { phase: "glow", durationMs: 1400 },
  { phase: "coinAppear", durationMs: 1200 },
  { phase: "coinRotate", durationMs: 1600 },
  { phase: "cameraApproach", durationMs: 1400 },
  { phase: "reveal", durationMs: 1200 },
  { phase: "explode", durationMs: 1800 },
  { phase: "menu", durationMs: null },
  { phase: "fade", durationMs: 900 },
  { phase: "done", durationMs: null },
];

export interface EntryMenuOption {
  id: "enter" | "secret-menu" | "collection" | "profile";
  label: string;
  href: string;
}

export const ENTRY_MENU_OPTIONS: readonly EntryMenuOption[] = [
  { id: "enter", label: "Entrar", href: "#" },
  { id: "secret-menu", label: "Menu Secreto", href: "/menu-reservado" },
  { id: "collection", label: "Coleção", href: "/colecoes" },
  { id: "profile", label: "Perfil", href: "/perfil" },
];
