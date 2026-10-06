const KEY = "pp_ref";

export function saveReferral(code: string | null | undefined) {
  if (typeof window === "undefined" || !code) return;
  const clean = code.trim().slice(0, 32);
  if (!clean) return;
  try {
    localStorage.setItem(KEY, clean);
  } catch {
    /* ignore */
  }
}

export function getReferral(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function captureReferralFromSearch(search: string) {
  const q = new URLSearchParams(search);
  const ref = q.get("ref") || q.get("invite");
  if (ref) saveReferral(ref);
}
