"use client";

import { useEffect, useState } from "react";

type NfcSupport = "checking" | "supported" | "unsupported";

export function useNfcSupport(): NfcSupport {
  const [support, setSupport] = useState<NfcSupport>("checking");

  useEffect(() => {
    setSupport("NDEFReader" in window ? "supported" : "unsupported");
  }, []);

  return support;
}
