"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { SignOut } from "@phosphor-icons/react";
import { clearAuth, getEmail } from "@/lib/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const breadcrumbMap: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/konten": "Konten",
  "/dashboard/konten/renungan": "Konten / Renungan",
  "/dashboard/konten/banner": "Konten / Banner",
  "/dashboard/konten/warta": "Konten / Warta",
  "/dashboard/konten/ultah": "Konten / Ulang Tahun",
  "/dashboard/jadwal": "Jadwal",
  "/dashboard/jadwal/ibadah": "Jadwal / Ibadah",
  "/dashboard/jadwal/roster": "Jadwal / Roster",
  "/dashboard/keuangan": "Keuangan",
  "/dashboard/keuangan/pemasukan": "Keuangan / Pemasukan",
  "/dashboard/keuangan/pengeluaran": "Keuangan / Pengeluaran",
  "/dashboard/keuangan/laporan": "Keuangan / Laporan",
};

export function AdminTopbar() {
  const pathname = usePathname();
  const router = useRouter();
  const breadcrumb = breadcrumbMap[pathname] ?? "Dashboard";
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    setEmail(getEmail());
  }, []);

  function handleLogout() {
    clearAuth();
    router.push("/login");
    router.refresh();
  }

  const initial = email?.[0]?.toUpperCase() ?? "A";

  return (
    <header className="flex h-16 items-center justify-between border-b border-[#EAEAEA] bg-[#FAFAF9] px-8 md:px-10 xl:px-12">
      <p className="text-sm font-medium text-zinc-500">{breadcrumb}</p>

      <div className="flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex h-8 w-8 items-center justify-center rounded-[4px] bg-zinc-900 text-xs font-bold text-white transition-colors hover:bg-zinc-700 active:scale-[0.98]">
              {initial}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            {email && (
              <>
                <div className="px-2 py-1.5">
                  <p className="truncate text-xs text-zinc-500">{email}</p>
                </div>
                <DropdownMenuSeparator />
              </>
            )}
            <DropdownMenuItem
              onClick={handleLogout}
              className="gap-2 text-destructive focus:text-destructive"
            >
              <SignOut size={14} />
              Keluar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
