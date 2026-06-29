"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DotsThree } from "@phosphor-icons/react";
import { PUBLIC_NAV } from "@/lib/nav";
import { useUIStore } from "@/lib/store/ui.store";
import { cn } from "@/lib/utils";

export function PublicTabBar() {
  const pathname = usePathname();
  const { setMoreSheetOpen } = useUIStore();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-canvas/95 backdrop-blur-md border-t border-border md:hidden">
      <div className="flex items-center max-w-7xl mx-auto">
        {PUBLIC_NAV.map(({ href, label, icon: Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex-1 flex flex-col items-center gap-1 py-3 text-[10px] tracking-wide transition-colors duration-150",
                active ? "text-ink" : "text-ink-muted"
              )}
            >
              <Icon size={22} weight={active ? "fill" : "regular"} />
              <span>{label}</span>
            </Link>
          );
        })}
        <button
          onClick={() => setMoreSheetOpen(true)}
          className="flex-1 flex flex-col items-center gap-1 py-3 text-[10px] tracking-wide text-ink-muted transition-colors hover:text-ink"
        >
          <DotsThree size={22} />
          <span>Lainnya</span>
        </button>
      </div>
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
