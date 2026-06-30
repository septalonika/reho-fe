"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  Article,
  Image,
  Newspaper,
  Cake,
  CalendarBlank,
  UsersThree,
  ArrowDownLeft,
  ArrowUpRight,
  FileText,
  ArrowLineLeft,
  ArrowLineRight,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/sidebar";

const navGroups = [
  {
    label: null,
    items: [{ href: "/dashboard", label: "Dashboard", icon: House }],
  },
  {
    label: "Konten",
    items: [
      { href: "/dashboard/konten/renungan", label: "Renungan", icon: Article },
      { href: "/dashboard/konten/banner", label: "Banner", icon: Image },
      { href: "/dashboard/konten/warta", label: "Warta", icon: Newspaper },
      { href: "/dashboard/konten/ultah", label: "Ulang Tahun", icon: Cake },
    ],
  },
  {
    label: "Jadwal",
    items: [
      { href: "/dashboard/jadwal/ibadah", label: "Ibadah", icon: CalendarBlank },
      { href: "/dashboard/jadwal/roster", label: "Roster", icon: UsersThree },
    ],
  },
  {
    label: "Keuangan",
    items: [
      { href: "/dashboard/keuangan/pemasukan", label: "Pemasukan", icon: ArrowDownLeft },
      { href: "/dashboard/keuangan/pengeluaran", label: "Pengeluaran", icon: ArrowUpRight },
      { href: "/dashboard/keuangan/laporan", label: "Laporan", icon: FileText },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { collapsed, toggle } = useSidebarStore();

  return (
    <aside
      className={cn(
        "relative flex flex-col border-r border-[#EAEAEA] bg-[#FAFAF9] transition-all duration-200",
        collapsed ? "w-[64px]" : "w-[248px]"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-[#EAEAEA] px-5">
        {!collapsed && (
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-zinc-900">
            Rehobot Admin
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4">
        {navGroups.map((group) => (
          <div key={group.label ?? "root"} className="mb-5">
            {group.label && !collapsed && (
              <p className="mb-1.5 px-5 text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-400">
                {group.label}
              </p>
            )}
            {group.items.map((item) => {
              const Icon = item.icon;
              const active =
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={collapsed ? item.label : undefined}
                  className={cn(
                    "flex items-center gap-3 px-5 py-2.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-zinc-100 text-zinc-900"
                      : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800"
                  )}
                >
                  <Icon
                    size={20}
                    weight={active ? "fill" : "regular"}
                    className={active ? "text-zinc-900" : "text-zinc-400"}
                  />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={toggle}
        className="flex h-12 items-center justify-center border-t border-[#EAEAEA] text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
        aria-label={collapsed ? "Buka sidebar" : "Kecilkan sidebar"}
      >
        {collapsed ? <ArrowLineRight size={16} /> : <ArrowLineLeft size={16} />}
      </button>
    </aside>
  );
}
