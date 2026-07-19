export type NfcReadStatus = "idle" | "scanning" | "success" | "error";

export interface NfcTagPayload {
  serialNumber: string;
  readAt: string;
}

export interface NfcReader {
  isSupported(): boolean;
  scan(): Promise<NfcTagPayload>;
}
