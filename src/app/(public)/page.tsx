"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { CaretRight, MegaphoneSimple, CaretDown } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const mockBulletin = {
  weekDate: "29 Juni 2026",
  title: "Ibadah Minggu",
  theme: "Kasih yang Memberi",
  liturgy: [
    { order: 1, title: "Pujian Pembuka", officiant: "Tim Worship" },
    { order: 2, title: "Doa Pembuka", officiant: "Pnt. Budi Santoso" },
    { order: 3, title: "Pembacaan Alkitab", description: "Yohanes 3:1-21" },
    { order: 4, title: "Khotbah", officiant: "Pdt. Yohanes Sutrisno", description: "Kasih yang Memberi" },
    { order: 5, title: "Persembahan", officiant: "Diaken Maria" },
    { order: 6, title: "Doa Syafaat" },
    { order: 7, title: "Pujian Penutup", officiant: "Tim Worship" },
    { order: 8, title: "Doa Berkat", officiant: "Pdt. Yohanes Sutrisno" },
  ],
  announcements: [
    { id: "1", text: "Kamp Pemuda 12–14 Juli. Pendaftaran di meja gereja sebelum 5 Juli." },
    { id: "2", text: "Rapat Majelis Minggu depan pukul 17.00 di ruang konsistori." },
    { id: "3", text: "Kolekte bulan Juli untuk pembangunan gedung serbaguna." },
  ],
};

// ─── Announcement pill ────────────────────────────────────────────────────
function AnnouncementBar({ items }: { items: typeof mockBulletin.announcements }) {
  const [i, setI] = useState(0);
  return (
    <div className="flex items-center gap-3 mb-10 md:mb-14">
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill bg-surface-2 text-[10px] font-medium text-ink-muted uppercase tracking-widest shrink-0">
        <MegaphoneSimple size={11} />
        Pengumuman
      </span>
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="text-sm text-ink-muted truncate"
          >
            {items[i].text}
          </motion.p>
        </AnimatePresence>
      </div>
      <button
        onClick={() => setI((p) => (p + 1) % items.length)}
        className="shrink-0 w-7 h-7 rounded-full bg-surface-2 flex items-center justify-center text-ink-muted hover:bg-surface hover:text-ink transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-95"
      >
        <CaretRight size={12} weight="bold" />
      </button>
    </div>
  );
}

// ─── Liturgy accordion item ───────────────────────────────────────────────
function LiturgyItem({
  item,
  index,
}: {
  item: (typeof mockBulletin.liturgy)[0];
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const hasDetail = !!(item.description || item.officiant);

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.08 + index * 0.06, ease: [0.32, 0.72, 0, 1] }}
      className="border-b border-border last:border-0"
    >
      <button
        className="w-full flex items-center gap-5 py-4 text-left group disabled:cursor-default"
        onClick={() => hasDetail && setOpen((p) => !p)}
        disabled={!hasDetail}
      >
        {/* Large muted ordinal */}
        <span className="text-2xl font-serif text-ink/10 w-8 shrink-0 select-none leading-none">
          {item.order}
        </span>
        <span className="flex-1 text-sm font-medium text-ink group-hover:text-ink-2 transition-colors duration-200">
          {item.title}
        </span>
        {hasDetail && (
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
            className="text-ink-muted shrink-0"
          >
            <CaretDown size={13} />
          </motion.span>
        )}
      </button>
      <AnimatePresence>
        {open && hasDetail && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-4 pl-13 ml-[52px] space-y-1">
              {item.description && (
                <p className="text-xs text-ink-muted">{item.description}</p>
              )}
              {item.officiant && (
                <p className="text-xs text-ink-2 italic">{item.officiant}</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Skeleton ────────────────────────────────────────────────────────────
function BulletinSkeleton() {
  return (
    <div className="py-8 md:py-16 space-y-8">
      <div className="space-y-3">
        <div className="h-3 w-28 rounded-pill skeleton-shimmer" />
        <div className="h-12 w-72 rounded-xl skeleton-shimmer" />
        <div className="h-3 w-44 rounded-pill skeleton-shimmer" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
        <div className="space-y-px">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-14 rounded-xl skeleton-shimmer" />
          ))}
        </div>
        <div className="hidden md:block h-64 rounded-2xl skeleton-shimmer" />
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────
export default function BulletinPage() {
  const { data, isPending } = useQuery({
    queryKey: ["bulletin", "current"],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 400));
      return mockBulletin;
    },
  });

  if (isPending) return <BulletinSkeleton />;

  return (
    <div className="py-8 md:py-14">
      <AnnouncementBar items={data!.announcements} />

      {/* Editorial hero split — date left, meta right */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
        className="mb-12 md:mb-16"
      >
        <span className="inline-flex px-3 py-1 rounded-pill bg-surface-2 text-[10px] font-medium text-ink-muted uppercase tracking-[0.15em] mb-5">
          Warta Jemaat
        </span>

        <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] items-end gap-6">
          <div>
            <h1 className="font-serif text-5xl md:text-7xl text-ink tracking-[-0.03em] leading-[1.05] mb-3">
              {data!.weekDate}
            </h1>
            <p className="text-base text-ink-muted">{data!.title}</p>
          </div>
          {data!.theme && (
            <div className="hidden md:flex flex-col items-end pb-1.5">
              <span className="text-[10px] text-ink-muted uppercase tracking-widest mb-2">Tema</span>
              <p className="font-serif text-lg text-ink italic text-right leading-snug">
                &ldquo;{data!.theme}&rdquo;
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Asymmetric bento — liturgy left, info card right on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-8 md:gap-12">
        {/* Liturgy list */}
        <div>
          <p className="text-[10px] text-ink-muted uppercase tracking-[0.15em] mb-5">Tata Ibadah</p>
          <div>
            {data!.liturgy.map((item, i) => (
              <LiturgyItem key={item.order} item={item} index={i} />
            ))}
          </div>
        </div>

        {/* Right column — double-bezel info card + archive */}
        <div className="hidden md:flex flex-col gap-5">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.32, 0.72, 0, 1] }}
          >
            {/* Double-bezel outer */}
            <div className="p-[5px] rounded-[20px] bg-[rgba(26,23,20,0.04)] ring-1 ring-[rgba(26,23,20,0.06)]">
              {/* Inner core */}
              <div className="rounded-[calc(20px-5px)] bg-canvas shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] p-6">
                <p className="text-[10px] text-ink-muted uppercase tracking-widest mb-4">Informasi</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-[10px] text-ink-muted mb-0.5">Pengkhotbah</p>
                    <p className="text-sm text-ink font-medium">Pdt. Yohanes Sutrisno</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-ink-muted mb-0.5">Worship Leader</p>
                    <p className="text-sm text-ink font-medium">Maria Lestari</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-ink-muted mb-0.5">Tema</p>
                    <p className="text-sm text-ink font-medium italic">"{data!.theme}"</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.32, 0.72, 0, 1] }}
          >
            <p className="text-[10px] text-ink-muted uppercase tracking-widest mb-2">Arsip</p>
            <select className="w-full text-xs text-ink-muted bg-transparent border-0 focus:outline-none cursor-pointer hover:text-ink transition-colors">
              <option value="">Minggu sebelumnya…</option>
              <option value="2026-06-22">22 Juni 2026</option>
              <option value="2026-06-15">15 Juni 2026</option>
              <option value="2026-06-08">8 Juni 2026</option>
            </select>
          </motion.div>
        </div>
      </div>

      {/* Mobile-only: archive + theme */}
      <div className="md:hidden mt-8 space-y-4 pt-6 border-t border-border">
        {data!.theme && (
          <p className="font-serif text-base italic text-ink-muted">&ldquo;{data!.theme}&rdquo;</p>
        )}
        <select className="w-full text-xs text-ink-muted bg-transparent border-0 focus:outline-none cursor-pointer">
          <option value="">Arsip warta sebelumnya…</option>
          <option value="2026-06-22">22 Juni 2026</option>
          <option value="2026-06-15">15 Juni 2026</option>
        </select>
      </div>
    </div>
  );
}
