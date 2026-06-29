"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Heart, BookOpen, ArrowRight } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/lib/store/auth.store";
import { useUIStore } from "@/lib/store/ui.store";

const DAYS = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

const mockDevotionals = Array.from({ length: 7 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() - (6 - i));
  return {
    id: String(i + 1),
    date: d.toISOString().split("T")[0],
    dayLabel: DAYS[d.getDay()],
    dateNum: d.getDate(),
    title: ["Kasih yang Abadi", "Harapan di Tengah Badai", "Kekuatan dalam Kelemahan", "Damai Sejahtera", "Pertolongan Tuhan", "Firman yang Hidup", "Hidup dalam Kasih"][i],
    scripture: ["1 Yohanes 4:7-12", "Roma 8:18-25", "2 Korintus 12:9-10", "Yohanes 14:27", "Mazmur 121:1-8", "Ibrani 4:12-13", "1 Korintus 13:4-8"][i],
    scriptureText: [
      "Saudara-saudaraku yang kekasih, marilah kita saling mengasihi, sebab kasih itu berasal dari Allah; dan setiap orang yang mengasihi, lahir dari Allah dan mengenal Allah.",
      "Aku yakin, bahwa penderitaan zaman sekarang ini tidak dapat dibandingkan dengan kemuliaan yang akan dinyatakan kepada kita.",
      "Sebab itu terlebih suka aku bermegah atas kelemahanku, supaya kuasa Kristus turun menaungi aku.",
      "Damai sejahtera Kutinggalkan bagimu. Damai sejahtera-Ku Kuberikan kepadamu, dan apa yang Kuberikan tidak seperti yang diberikan oleh dunia kepadamu.",
      "Aku melayangkan mataku ke gunung-gunung; dari manakah akan datang pertolonganku? Pertolonganku ialah dari TUHAN.",
      "Firman Allah hidup dan kuat dan lebih tajam dari pedang bermata dua mana pun; ia menusuk amat dalam sampai memisahkan jiwa dan roh.",
      "Kasih itu sabar; kasih itu murah hati; ia tidak cemburu. Ia tidak memegahkan diri dan tidak sombong.",
    ][i],
    reflection: "Renungkan bagaimana kasih Allah telah nyata dalam hidupmu hari ini dan bagaimana kamu dapat meneruskannya kepada sesama.",
    liked: false,
  };
});

export default function DevotionalPage() {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const { openAuthSheet } = useUIStore();

  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);

  const { data: devotionals, isPending } = useQuery({
    queryKey: ["devotionals", "week"],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 350));
      return mockDevotionals;
    },
  });

  const likeMutation = useMutation({
    mutationFn: async (id: string) => {
      if (!user) {
        openAuthSheet();
        throw new Error("auth");
      }
      await new Promise((r) => setTimeout(r, 200));
      return id;
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["devotionals", "week"] });
      const prev = queryClient.getQueryData(["devotionals", "week"]);
      queryClient.setQueryData(["devotionals", "week"], (old: typeof mockDevotionals) =>
        old.map((d) => d.id === id ? { ...d, liked: !d.liked } : d)
      );
      return { prev };
    },
    onError: (_err, _id, ctx) => {
      if (ctx?.prev) queryClient.setQueryData(["devotionals", "week"], ctx.prev);
    },
  });

  const selected = devotionals?.find((d) => d.date === selectedDate) ?? devotionals?.[devotionals.length - 1];

  return (
    <div className="py-8 md:py-14">
      {/* Eyebrow + title */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
        className="mb-10 md:mb-14"
      >
        <span className="inline-flex px-3 py-1 rounded-pill bg-surface-2 text-[10px] font-medium text-ink-muted uppercase tracking-[0.15em] mb-5">
          Renungan Harian
        </span>
        <h1 className="font-serif text-4xl md:text-6xl text-ink tracking-[-0.03em] leading-[1.05]">
          {selected?.title ?? "—"}
        </h1>
      </motion.div>

      {/* 7-day strip */}
      {isPending ? (
        <div className="flex gap-2 mb-10">
          {[...Array(7)].map((_, i) => <div key={i} className="h-16 flex-1 rounded-xl skeleton-shimmer" />)}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
          className="flex gap-1.5 mb-10"
        >
          {devotionals!.map((d, i) => {
            const active = d.date === selectedDate;
            return (
              <motion.button
                key={d.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.05, ease: [0.32, 0.72, 0, 1] }}
                onClick={() => setSelectedDate(d.date)}
                className={cn(
                  "flex-1 flex flex-col items-center gap-1 py-3 rounded-xl text-[10px] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
                  active
                    ? "bg-ink text-canvas shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
                    : "bg-surface text-ink-muted hover:bg-surface-2 hover:text-ink"
                )}
              >
                <span className="text-[9px] uppercase tracking-wider">{d.dayLabel}</span>
                <span className={cn("text-base font-medium", active ? "text-canvas" : "text-ink")}>{d.dateNum}</span>
                {d.liked && <div className={cn("w-1 h-1 rounded-full", active ? "bg-canvas/50" : "bg-ink/30")} />}
              </motion.button>
            );
          })}
        </motion.div>
      )}

      {/* Main content — asymmetric split */}
      {selected && (
        <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-8 md:gap-16">
          {/* Left — scripture */}
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="flex items-center gap-2 mb-6">
              <BookOpen size={13} className="text-ink-muted" />
              <span className="text-xs text-ink-muted font-medium">{selected.scripture}</span>
            </div>

            <blockquote className="font-serif text-2xl md:text-3xl text-ink leading-[1.45] mb-8 tracking-[-0.01em]">
              &ldquo;{selected.scriptureText}&rdquo;
            </blockquote>

            <div className="border-l-2 border-border-strong pl-5">
              <p className="text-[10px] text-ink-muted uppercase tracking-widest mb-2">Perenungan</p>
              <p className="text-sm text-ink-muted leading-relaxed">{selected.reflection}</p>
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => likeMutation.mutate(selected.id)}
              className={cn(
                "mt-8 inline-flex items-center gap-2.5 px-5 py-2.5 rounded-pill text-sm transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
                selected.liked
                  ? "bg-ink text-canvas shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
                  : "bg-surface text-ink-muted hover:bg-surface-2 hover:text-ink"
              )}
            >
              <Heart size={14} weight={selected.liked ? "fill" : "regular"} />
              {selected.liked ? "Sudah direnungkan" : "Tandai direnungkan"}
            </motion.button>
          </motion.div>

          {/* Right — other days */}
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
            className="hidden md:block"
          >
            <p className="text-[10px] text-ink-muted uppercase tracking-widest mb-5">Bacaan Lain Minggu Ini</p>
            <div className="space-y-1">
              {devotionals?.filter((d) => d.id !== selected.id).map((d) => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDate(d.date)}
                  className="w-full flex items-start gap-4 py-4 px-3 rounded-xl hover:bg-surface group transition-all duration-200 text-left"
                >
                  <span className="text-xs text-ink-muted font-mono w-6 mt-0.5 shrink-0">{d.dateNum}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-ink truncate group-hover:text-ink-2 transition-colors">{d.title}</p>
                    <p className="text-[10px] text-ink-muted mt-0.5">{d.scripture}</p>
                  </div>
                  <ArrowRight size={13} className="text-ink/0 group-hover:text-ink-muted transition-all shrink-0 mt-0.5" />
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
