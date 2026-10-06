"use client";

import { useEffect } from "react";
import { captureReferralFromSearch } from "@/lib/referral";

export function ReferralCapture() {
  useEffect(() => {
    captureReferralFromSearch(window.location.search);
  }, []);
  return null;
}
