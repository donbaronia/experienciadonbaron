"use client";

import { useEffect, useState } from "react";
import { getNfcReader } from "@/core/nfc/nfc-reader";

type NfcSupport = "checking" | "supported" | "unsupported";

export function useNfcSupport(): NfcSupport {
  const [support, setSupport] = useState<NfcSupport>("checking");

  useEffect(() => {
    setSupport(getNfcReader().isSupported() ? "supported" : "unsupported");
  }, []);

  return support;
}
