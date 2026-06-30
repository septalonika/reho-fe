"use client";

import { usePathname } from "next/navigation";
import { Plus } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
  const breadcrumb = breadcrumbMap[pathname] ?? "Dashboard";

  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-background px-6 md:px-8">
      <p className="text-sm font-medium text-muted-foreground">{breadcrumb}</p>

      <div className="flex items-center gap-3">
        {/* Quick add */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" className="gap-1.5">
              <Plus size={14} weight="bold" />
              Tambah
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Renungan baru</DropdownMenuItem>
            <DropdownMenuItem>Banner baru</DropdownMenuItem>
            <DropdownMenuItem>Jadwal ibadah</DropdownMenuItem>
            <DropdownMenuItem>Catat pemasukan</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User avatar placeholder */}
        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
          A
        </button>
      </div>
    </header>
  );
}
