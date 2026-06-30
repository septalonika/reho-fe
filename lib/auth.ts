const TOKEN_KEY = "auth-token";
const REFRESH_KEY = "auth-refresh";
const EMAIL_KEY = "auth-email";
const EXPIRES_KEY = "auth-expires";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export function setAuth(
  token: string,
  email: string,
  refreshToken: string,
  expiresAt: number
) {
  const opts = `path=/; max-age=${MAX_AGE}; samesite=lax`;
  document.cookie = `${TOKEN_KEY}=${token}; ${opts}`;
  document.cookie = `${REFRESH_KEY}=${refreshToken}; ${opts}`;
  document.cookie = `${EMAIL_KEY}=${encodeURIComponent(email)}; ${opts}`;
  document.cookie = `${EXPIRES_KEY}=${expiresAt}; ${opts}`;
}

export function clearAuth() {
  const clear = `path=/; max-age=0`;
  document.cookie = `${TOKEN_KEY}=; ${clear}`;
  document.cookie = `${REFRESH_KEY}=; ${clear}`;
  document.cookie = `${EMAIL_KEY}=; ${clear}`;
  document.cookie = `${EXPIRES_KEY}=; ${clear}`;
}

export function getToken(): string | null {
  return getCookie(TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  return getCookie(REFRESH_KEY);
}

export function getEmail(): string | null {
  const v = getCookie(EMAIL_KEY);
  return v ? decodeURIComponent(v) : null;
}

export function isTokenExpired(): boolean {
  const exp = getCookie(EXPIRES_KEY);
  if (!exp) return true;
  // expires_at from Supabase is Unix seconds; subtract 60s buffer
  return Date.now() / 1000 > Number(exp) - 60;
}

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}
