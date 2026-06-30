"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { List, X } from "@phosphor-icons/react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/renungan", label: "Renungan" },
  { href: "/warta", label: "Warta" },
  { href: "/jadwal", label: "Jadwal" },
  { href: "/galeri", label: "Galeri" },
];

export function PublicNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#EAEAEA] bg-[#FAFAF9]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-7 py-4 md:px-14 xl:px-28">
        <Link
          href="/"
          className="text-[11px] font-bold uppercase tracking-[0.14em] text-zinc-900 transition-opacity hover:opacity-70"
        >
          GKII Rehobot
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative py-1 text-sm font-medium transition-colors",
                  active ? "text-zinc-900" : "text-zinc-500 hover:text-zinc-800"
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute -bottom-[1px] left-0 h-px rounded-full bg-zinc-900 transition-all duration-300",
                    active ? "w-full" : "w-0"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        {/* Mobile hamburger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <button
              aria-label="Buka menu"
              className="flex h-9 w-9 items-center justify-center rounded-[4px] text-zinc-600 transition-colors hover:bg-zinc-100"
            >
              <List size={20} weight="bold" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64 bg-[#FAFAF9] p-6">
            <div className="mb-8 flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-zinc-900">
                Menu
              </span>
              <button
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-[4px] text-zinc-500 transition-colors hover:bg-zinc-100"
                aria-label="Tutup menu"
              >
                <X size={18} />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-[4px] px-3 py-2.5 text-sm font-medium transition-colors hover:bg-zinc-100",
                    pathname === link.href
                      ? "bg-zinc-100 text-zinc-900"
                      : "text-zinc-600"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
