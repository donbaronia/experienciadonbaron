"use client";

import { useReducedMotion } from "framer-motion";
import {
  Component,
  lazy,
  Suspense,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const IntroExperience = lazy(() =>
  import("./IntroExperience").then((mod) => ({
    default: mod.IntroExperience,
  }))
);

const STORAGE_KEY = "db-intro-seen";

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

class IntroErrorBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { hasError: boolean }
> {
  override state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  override componentDidCatch(error: Error) {
    // eslint-disable-next-line no-console
    console.error("[IntroExperience] falhou, indo direto para o Lobby", error);
    this.props.onError();
  }

  override render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

export function IntroGate() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    if (sessionStorage.getItem(STORAGE_KEY) === "1") return;
    if (!supportsWebGL()) return;
    sessionStorage.setItem(STORAGE_KEY, "1");
    setVisible(true);
  }, [reduceMotion]);

  if (!visible) return null;

  return (
    <IntroErrorBoundary onError={() => setVisible(false)}>
      <Suspense fallback={null}>
        <IntroExperience onComplete={() => setVisible(false)} />
      </Suspense>
    </IntroErrorBoundary>
  );
}
