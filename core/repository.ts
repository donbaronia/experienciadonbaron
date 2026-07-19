import type { ServiceResult } from "@/types";

export interface Repository<T> {
  list(): Promise<ServiceResult<T[]>>;
}

export interface SingleRecordRepository<T> {
  get(): Promise<ServiceResult<T>>;
}
