"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SquaresFour,
  NewspaperClipping,
  CalendarBlank,
  CurrencyDollar,
  CrosshairSimple,
  CaretDown,
} from "@phosphor-icons/react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/lib/store/ui.store";

const nav = [
  { href: "/dashboard", label: "Overview", icon: SquaresFour },
  {
    label: "CMS",
    icon: NewspaperClipping,
    children: [
      { href: "/dashboard/cms/bulletin", label: "Warta" },
      { href: "/dashboard/cms/news", label: "Berita" },
      { href: "/dashboard/cms/devotional", label: "Renungan" },
      { href: "/dashboard/cms/members", label: "Anggota" },
      { href: "/dashboard/cms/sermons", label: "Khotbah" },
    ],
  },
  {
    label: "Jadwal",
    icon: CalendarBlank,
    children: [
      { href: "/dashboard/schedule/roster", label: "Penugasan" },
      { href: "/dashboard/schedule/conflicts", label: "Bentrokan" },
    ],
  },
  {
    label: "Keuangan",
    icon: CurrencyDollar,
    children: [
      { href: "/dashboard/finance/reports", label: "Laporan" },
      { href: "/dashboard/finance/ledger", label: "Buku Kas" },
    ],
  },
] as const;

export function SideNavBar() {
  const pathname = usePathname();
  const { adminSidebarCollapsed } = useUIStore();
  const [expanded, setExpanded] = useState<string[]>(["CMS", "Jadwal", "Keuangan"]);

  const toggle = (label: string) =>
    setExpanded((p) => (p.includes(label) ? p.filter((x) => x !== label) : [...p, label]));

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 bottom-0 z-30 bg-white border-r border-black/[0.06] flex flex-col",
        "transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
        adminSidebarCollapsed ? "w-14" : "w-52"
      )}
    >
      <div className="flex items-center gap-2 px-4 h-14 border-b border-black/[0.06] shrink-0">
        <CrosshairSimple size={18} weight="bold" className="text-ink shrink-0" />
        {!adminSidebarCollapsed && (
          <span className="text-sm font-medium text-ink truncate">GKII Rehobot</span>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-2">
        {nav.map((item) => {
          if (!("children" in item)) {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-200",
                  active
                    ? "bg-black/[0.05] text-ink font-medium"
                    : "text-ink-muted hover:bg-black/[0.03] hover:text-ink"
                )}
              >
                <item.icon size={16} weight={active ? "fill" : "regular"} className="shrink-0" />
                {!adminSidebarCollapsed && item.label}
              </Link>
            );
          }

          const isExpanded = expanded.includes(item.label);
          const hasActive = item.children.some((c) => pathname.startsWith(c.href));

          return (
            <div key={item.label}>
              <button
                onClick={() => toggle(item.label)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors",
                  hasActive ? "text-ink" : "text-ink-muted hover:text-ink"
                )}
              >
                <item.icon size={16} weight={hasActive ? "fill" : "regular"} className="shrink-0" />
                {!adminSidebarCollapsed && (
                  <>
                    <span className="flex-1 text-left">{item.label}</span>
                    <CaretDown
                      size={12}
                      className={cn("transition-transform", isExpanded && "rotate-180")}
                    />
                  </>
                )}
              </button>
              {!adminSidebarCollapsed && isExpanded && (
                <div className="ml-7 border-l border-border pl-3 py-1">
                  {item.children.map((child) => {
                    const active = pathname === child.href;
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "block py-1.5 text-sm transition-colors",
                          active ? "text-ink font-medium" : "text-ink-muted hover:text-ink"
                        )}
                      >
                        {child.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
