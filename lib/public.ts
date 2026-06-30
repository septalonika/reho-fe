// Server-side fetch for unauthenticated public endpoints.
// lib/api.ts is browser-only (reads token from localStorage); public Server
// Components fetch directly against the backend's no-auth reads instead.

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export interface Banner {
  id: string;
  title: string;
  imageUrl: string;
  linkUrl: string | null;
  active: boolean;
  startDate: string | null;
  endDate: string | null;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

/** Active banners, ordered by sortOrder then newest. Empty array on failure. */
export async function getBanners(): Promise<Banner[]> {
  try {
    const res = await fetch(`${BASE_URL}/api/v1/banners`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    return (await res.json()) as Banner[];
  } catch {
    return [];
  }
}
