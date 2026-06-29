"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CrosshairSimple,
  DotsThree,
  HandsPraying,
  User,
  Archive,
  Info,
  SignIn,
  SquaresFour,
} from "@phosphor-icons/react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { PUBLIC_NAV } from "@/lib/nav";
import { useUIStore } from "@/lib/store/ui.store";
import { useAuthStore } from "@/lib/store/auth.store";
import { cn } from "@/lib/utils";

const moreItems = [
  { href: "/prayer", label: "Permohonan Doa", icon: HandsPraying },
  { href: "/account", label: "Akun & Bookmark", icon: User },
  { href: "/bulletin/archive", label: "Arsip Warta", icon: Archive },
  { href: "/about", label: "Tentang Gereja", icon: Info },
];

export function PublicHeader() {
  const pathname = usePathname();
  const { setMoreSheetOpen } = useUIStore();
  const { user } = useAuthStore();

  const today = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
  });

  return (
    <>
      {/* Mobile — compact sticky bar */}
      <header className="md:hidden sticky top-0 z-30 bg-canvas/90 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-5 h-12">
          <Link href="/" className="flex items-center gap-2">
            <CrosshairSimple size={18} weight="bold" className="text-ink" />
            <span className="text-sm font-semibold text-ink tracking-tight">GKII Rehobot</span>
          </Link>
          <span className="text-xs text-ink-muted font-mono">{today}</span>
        </div>
      </header>

      {/* Desktop — floating pill nav */}
      <div className="hidden md:flex justify-center pt-5 pb-3 sticky top-0 z-30">
        <nav
          className={cn(
            "flex items-center gap-1 px-2 py-2 rounded-pill",
            "bg-canvas/80 backdrop-blur-md",
            "ring-1 ring-[rgba(26,23,20,0.08)]",
            "shadow-ambient-md",
            "shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]",
            "transition-shadow duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
          )}
        >
          <Link href="/" className="flex items-center gap-1.5 px-3 py-1.5 mr-1">
            <CrosshairSimple size={15} weight="bold" className="text-ink" />
            <span className="text-xs font-semibold text-ink tracking-tight">GKII</span>
          </Link>

          <div className="w-px h-4 bg-border" />

          {PUBLIC_NAV.map(({ href, label }) => {
            const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "px-3.5 py-1.5 text-xs rounded-pill transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
                  active
                    ? "bg-ink text-canvas font-medium shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
                    : "text-ink-muted hover:text-ink hover:bg-surface"
                )}
              >
                {label}
              </Link>
            );
          })}

          {/* Desktop — Radix dropdown */}
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="flex items-center gap-1 px-3.5 py-1.5 text-xs rounded-pill text-ink-muted hover:text-ink hover:bg-surface transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] outline-none data-[state=open]:bg-surface data-[state=open]:text-ink">
                <DotsThree size={14} weight="bold" />
                Lainnya
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                sideOffset={10}
                align="end"
                className={cn(
                  "z-50 min-w-[200px]",
                  "p-[5px] rounded-[18px]",
                  "bg-canvas/90 backdrop-blur-xl",
                  "ring-1 ring-[rgba(26,23,20,0.08)]",
                  "shadow-ambient-lg",
                  "shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]",
                  "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
                  "origin-top-right"
                )}
              >
                <div className="rounded-[calc(18px-5px)] overflow-hidden bg-canvas/60 py-1">
                  {moreItems.map(({ href, label, icon: Icon }) => (
                    <DropdownMenu.Item key={href} asChild>
                      <Link
                        href={href}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-ink-muted hover:text-ink hover:bg-surface/80 transition-colors duration-150 outline-none cursor-pointer"
                      >
                        <Icon size={15} className="shrink-0" />
                        {label}
                      </Link>
                    </DropdownMenu.Item>
                  ))}

                  <div className="mx-3 my-1 h-px bg-border" />

                  {user && user.role !== "congregation" ? (
                    <DropdownMenu.Item asChild>
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-ink font-medium hover:bg-surface/80 transition-colors duration-150 outline-none cursor-pointer"
                      >
                        <SquaresFour size={15} className="shrink-0" />
                        Dashboard
                      </Link>
                    </DropdownMenu.Item>
                  ) : !user ? (
                    <DropdownMenu.Item asChild>
                      <Link
                        href="/login"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-ink font-medium hover:bg-surface/80 transition-colors duration-150 outline-none cursor-pointer"
                      >
                        <SignIn size={15} className="shrink-0" />
                        Masuk / Daftar
                      </Link>
                    </DropdownMenu.Item>
                  ) : null}
                </div>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>

          <div className="w-px h-4 bg-border mx-1" />
          <span className="text-[10px] text-ink-muted font-mono px-2">{today}</span>
        </nav>
      </div>
    </>
  );
}
