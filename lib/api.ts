import { getToken, getRefreshToken, setAuth, clearAuth, getEmail } from "./auth";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  params?: Record<string, string | number | boolean | undefined>;
};

interface RefreshResponse {
  access_token: string;
  refresh_token: string;
  expires_at: number;
}

let isRefreshing = false;
let refreshQueue: Array<(token: string) => void> = [];

async function doRefresh(): Promise<string> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) throw new ApiError(401, "Sesi berakhir, silakan login kembali");

  const res = await fetch(`${BASE_URL}/api/v1/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  if (!res.ok) {
    clearAuth();
    throw new ApiError(401, "Sesi berakhir, silakan login kembali");
  }

  const data: RefreshResponse = await res.json();
  const email = getEmail() ?? "";
  setAuth(data.access_token, email, data.refresh_token, data.expires_at);
  return data.access_token;
}

async function getValidToken(): Promise<string | null> {
  const token = getToken();
  if (!token) return null;

  if (isRefreshing) {
    return new Promise((resolve) => {
      refreshQueue.push(resolve);
    });
  }

  return token;
}

function getAuthHeader(token?: string | null): Record<string, string> {
  const t = token ?? getToken();
  if (!t) return {};
  return { Authorization: `Bearer ${t}` };
}

function buildUrl(path: string, params?: RequestOptions["params"]): string {
  const url = new URL(`/api/v1${path}`, BASE_URL);
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined) url.searchParams.set(k, String(v));
    }
  }
  return url.toString();
}

async function request<T>(path: string, options: RequestOptions = {}, retry = true): Promise<T> {
  const { body, params, headers, ...rest } = options;

  const res = await fetch(buildUrl(path, params), {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (res.status === 401 && retry) {
    if (isRefreshing) {
      const newToken = await new Promise<string>((resolve) => {
        refreshQueue.push(resolve);
      });
      return request<T>(path, { ...options, headers: { ...headers, Authorization: `Bearer ${newToken}` } }, false);
    }

    isRefreshing = true;
    try {
      const newToken = await doRefresh();
      refreshQueue.forEach((cb) => cb(newToken));
      refreshQueue = [];
      isRefreshing = false;
      return request<T>(path, { ...options, headers: { ...headers, Authorization: `Bearer ${newToken}` } }, false);
    } catch (err) {
      refreshQueue = [];
      isRefreshing = false;
      throw err;
    }
  }

  if (!res.ok) {
    const payload = await res.json().catch(() => ({ error: res.statusText }));
    throw new ApiError(res.status, payload.error ?? res.statusText);
  }

  if (res.status === 204) return undefined as T;

  return res.json() as Promise<T>;
}

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export const api = {
  get: <T>(path: string, params?: RequestOptions["params"]) =>
    request<T>(path, { method: "GET", params }),

  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "POST", body }),

  patch: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "PATCH", body }),

  delete: <T>(path: string) =>
    request<T>(path, { method: "DELETE" }),
};
