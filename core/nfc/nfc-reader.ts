import type { NfcReader, NfcTagPayload } from "./types";

class UnavailableNfcReader implements NfcReader {
  isSupported(): boolean {
    return typeof window !== "undefined" && "NDEFReader" in window;
  }

  scan(): Promise<NfcTagPayload> {
    return Promise.reject(new Error("Leitura NFC ainda não implementada."));
  }
}

export function getNfcReader(): NfcReader {
  return new UnavailableNfcReader();
}
