const TOKEN_KEY = "auth-token";
const EMAIL_KEY = "auth-email";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export function setAuth(token: string, email: string) {
  const opts = `path=/; max-age=${MAX_AGE}; samesite=lax`;
  document.cookie = `${TOKEN_KEY}=${token}; ${opts}`;
  document.cookie = `${EMAIL_KEY}=${encodeURIComponent(email)}; ${opts}`;
}

export function clearAuth() {
  document.cookie = `${TOKEN_KEY}=; path=/; max-age=0`;
  document.cookie = `${EMAIL_KEY}=; path=/; max-age=0`;
}

export function getToken(): string | null {
  return getCookie(TOKEN_KEY);
}

export function getEmail(): string | null {
  const v = getCookie(EMAIL_KEY);
  return v ? decodeURIComponent(v) : null;
}

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}
