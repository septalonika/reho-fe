"use client";

import Link from "next/link";
import {
  HandsPraying,
  User,
  Archive,
  Info,
  SignIn,
  SquaresFour,
} from "@phosphor-icons/react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useUIStore } from "@/lib/store/ui.store";
import { useAuthStore } from "@/lib/store/auth.store";

const items = [
  { href: "/prayer", label: "Permohonan Doa", icon: HandsPraying },
  { href: "/account", label: "Akun & Bookmark", icon: User },
  { href: "/bulletin/archive", label: "Arsip Warta", icon: Archive },
  { href: "/about", label: "Tentang Gereja", icon: Info },
];

export function MoreSheet() {
  const { moreSheetOpen, setMoreSheetOpen } = useUIStore();
  const { user } = useAuthStore();

  return (
    <Sheet open={moreSheetOpen} onOpenChange={setMoreSheetOpen}>
      <SheetContent side="bottom">
        <div className="px-6 pt-4 pb-6 space-y-1">
          {items.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMoreSheetOpen(false)}
              className="flex items-center gap-3 px-3 py-3 rounded-md text-sm text-ink-2 hover:bg-surface transition-colors"
            >
              <Icon size={18} className="text-ink-muted" />
              {label}
            </Link>
          ))}
          <div className="border-t border-border my-2" />

          {user && user.role !== "congregation" ? (
            <Link
              href="/dashboard"
              onClick={() => setMoreSheetOpen(false)}
              className="flex items-center gap-3 px-3 py-3 rounded-md text-sm font-medium text-ink hover:bg-surface transition-colors"
            >
              <SquaresFour size={18} />
              Dashboard
            </Link>
          ) : !user ? (
            <Link
              href="/login"
              onClick={() => setMoreSheetOpen(false)}
              className="flex items-center gap-3 px-3 py-3 rounded-md text-sm font-medium text-ink hover:bg-surface transition-colors"
            >
              <SignIn size={18} />
              Masuk / Daftar
            </Link>
          ) : null}
        </div>
      </SheetContent>
    </Sheet>
  );
}
