"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, BookOpen, ArrowUpRight } from "@phosphor-icons/react";
import type { Banner } from "@/lib/public";

const ease = [0.16, 1, 0.3, 1] as const;

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease, delay },
  };
}

export function HomeHero({ banner }: { banner: Banner | null }) {
  const RightPane = banner ? (
    <Link
      href={banner.linkUrl || "/warta"}
      className="group relative block h-full min-h-[44vh] w-full overflow-hidden md:min-h-0"
      aria-label={banner.title}
    >
      <Image
        src={banner.imageUrl}
        alt={banner.title}
        fill
        priority
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover saturate-[0.82] transition-transform duration-700 ease-out group-hover:scale-[1.025]"
      />
      <div className="absolute inset-0 bg-zinc-950/25" />
      <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-zinc-950/55 px-7 py-5 backdrop-blur-[2px]">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/55">
          Pengumuman
        </p>
        <div className="mt-1.5 flex items-center justify-between gap-4">
          <p className="text-sm font-medium leading-snug text-white/90 text-balance">
            {banner.title}
          </p>
          <ArrowUpRight
            size={16}
            weight="bold"
            className="shrink-0 text-white/50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>
      </div>
    </Link>
  ) : (
    <div className="relative flex h-full min-h-[44vh] flex-col justify-end overflow-hidden bg-[#F2F1EE] px-7 py-8 md:min-h-0">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(52,101,56,0.07)_0%,_transparent_70%)]"
      />
      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-400">
        Firman Tuhan
      </p>
      <blockquote className="mt-3 max-w-xs font-serif text-2xl italic leading-snug tracking-[-0.02em] text-zinc-700 text-balance">
        &ldquo;Hendaklah kamu selalu bersukacita.&rdquo;
      </blockquote>
      <p className="mt-3 font-mono text-xs text-zinc-400">1 Tesalonika 5:16</p>
    </div>
  );

  return (
    <>
      {/* Ambient blob — fixed, pointer-events-none, ~25s drift */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -left-1/4 top-1/3 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,_rgba(52,101,56,0.03)_0%,_transparent_70%)]"
          animate={{ x: [0, 40, 0], y: [0, -25, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <section className="grid grid-cols-1 border-b border-[#EAEAEA] md:min-h-[calc(100dvh-65px)] md:grid-cols-[1.1fr_1fr]">
        {/* Left: editorial content */}
        <div className="flex flex-col justify-center px-7 py-20 md:px-14 lg:px-20 xl:px-28">
          <motion.p
            {...fadeUp(0)}
            className="text-xs font-semibold uppercase tracking-[0.12em] text-[#346538]"
          >
            GKII Rehobot
          </motion.p>

          <motion.h1
            {...fadeUp(0.08)}
            className="mt-5 font-serif text-5xl font-bold leading-[0.92] tracking-[-0.03em] text-zinc-900 text-balance md:text-6xl lg:text-7xl xl:text-[5.5rem]"
          >
            Bertumbuh
            <br />
            Bersama
            <br />
            dalam Iman
          </motion.h1>

          <motion.p
            {...fadeUp(0.16)}
            className="mt-7 max-w-[50ch] text-base leading-[1.7] text-zinc-500 text-pretty xl:text-[1.0625rem]"
          >
            Jemaat Tuhan yang hidup, bertumbuh, dan berbuah bagi kemuliaan-Nya.
            Temukan jadwal ibadah, renungan harian, dan warta jemaat di sini.
          </motion.p>

          <motion.div
            {...fadeUp(0.24)}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/jadwal"
              className="inline-flex items-center gap-2 rounded-[4px] bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
            >
              <Calendar size={15} weight="bold" />
              Jadwal Ibadah
            </Link>
            <Link
              href="/renungan"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
            >
              <BookOpen size={15} weight="bold" />
              Baca Renungan
            </Link>
          </motion.div>
        </div>

        {/* Right: banner or scripture */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease, delay: 0.1 }}
          className="relative border-t border-[#EAEAEA] md:border-l md:border-t-0"
        >
          {RightPane}
        </motion.div>
      </section>
    </>
  );
}
