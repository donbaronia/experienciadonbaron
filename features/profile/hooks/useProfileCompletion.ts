"use client";

import { useMemo } from "react";
import type { MemberProfile } from "../types";

export function useProfileCompletion(profile: MemberProfile): number {
  return useMemo(() => {
    const checks = [
      profile.name.length > 0,
      profile.favoriteCreation.length > 0,
      profile.ordersCount > 0,
      profile.crownPoints > 0,
    ];
    const completed = checks.filter(Boolean).length;
    return Math.round((completed / checks.length) * 100);
  }, [profile]);
}
