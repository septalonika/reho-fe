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
  CurrencyDollar,
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
      {
        href: "/dashboard/jadwal/ibadah",
        label: "Ibadah",
        icon: CalendarBlank,
      },
      { href: "/dashboard/jadwal/roster", label: "Roster", icon: UsersThree },
    ],
  },
  {
    label: "Keuangan",
    items: [
      {
        href: "/dashboard/keuangan/pemasukan",
        label: "Pemasukan",
        icon: ArrowDownLeft,
      },
      {
        href: "/dashboard/keuangan/pengeluaran",
        label: "Pengeluaran",
        icon: ArrowUpRight,
      },
      {
        href: "/dashboard/keuangan/laporan",
        label: "Laporan",
        icon: FileText,
      },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { collapsed, toggle } = useSidebarStore();

  return (
    <aside
      className={cn(
        "relative flex flex-col border-r border-sidebar-border bg-sidebar transition-all duration-200",
        collapsed ? "w-[60px]" : "w-[220px]"
      )}
    >
      {/* Logo */}
      <div className="flex h-14 items-center border-b border-sidebar-border px-4">
        {!collapsed && (
          <span className="text-xs font-bold uppercase tracking-widest text-sidebar-foreground/80">
            Rehobot Admin
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4">
        {navGroups.map((group) => (
          <div key={group.label ?? "root"} className="mb-4">
            {group.label && !collapsed && (
              <p className="mb-1 px-4 text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/40">
                {group.label}
              </p>
            )}
            {group.items.map((item) => {
              const Icon = item.icon;
              const active =
                pathname === item.href ||
                (item.href !== "/dashboard" &&
                  pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={collapsed ? item.label : undefined}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    active
                      ? "bg-sidebar-accent text-sidebar-primary"
                      : "text-sidebar-foreground/70"
                  )}
                >
                  <Icon size={18} weight={active ? "fill" : "regular"} />
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
        className="flex h-12 items-center justify-center border-t border-sidebar-border text-sidebar-foreground/50 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
        aria-label={collapsed ? "Buka sidebar" : "Kecilkan sidebar"}
      >
        {collapsed ? (
          <ArrowLineRight size={16} />
        ) : (
          <ArrowLineLeft size={16} />
        )}
      </button>
    </aside>
  );
}
