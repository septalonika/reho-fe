"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Newspaper, CalendarCheck, Images } from "@phosphor-icons/react";

const ease = [0.16, 1, 0.3, 1] as const;

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.6, ease, delay },
  };
}

const tile =
  "group relative flex flex-col justify-between overflow-hidden rounded-[8px] border border-[#EAEAEA] bg-white transition-shadow duration-200 hover:shadow-[0_2px_12px_rgba(0,0,0,0.05)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2";

export function HomeExplore() {
  return (
    <section className="border-b border-[#EAEAEA] bg-[#FAFAF9] py-24 xl:py-32">
      <div className="mx-auto max-w-[1400px] px-7 md:px-14 xl:px-28">
        {/* Section header */}
        <motion.div {...reveal(0)}>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#346538]">
            Jelajahi
          </p>
          <h2 className="mt-4 max-w-lg font-serif text-3xl font-bold leading-[1.1] tracking-[-0.025em] text-zinc-900 text-balance xl:text-4xl">
            Tetap terhubung dengan kehidupan jemaat
          </h2>
        </motion.div>

        {/* Bento grid */}
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-[2fr_1fr] xl:mt-14 xl:gap-5">

          {/* Feature tile — Renungan */}
          <motion.div {...reveal(0.08)}>
            <Link href="/renungan" className={`${tile} min-h-[16rem] p-9 xl:p-10`}>
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-[6px] border border-[#EAEAEA] bg-[#F7F6F3]">
                  <BookOpen size={22} weight="duotone" className="text-zinc-700" />
                </div>
                <ArrowUpRight
                  size={18}
                  weight="bold"
                  className="text-zinc-300 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-zinc-500"
                />
              </div>
              <div className="mt-auto pt-8">
                <h3 className="font-serif text-2xl font-bold leading-[1.1] tracking-[-0.02em] text-zinc-900 xl:text-3xl">
                  Renungan Harian
                </h3>
                <p className="mt-2.5 max-w-sm text-sm leading-relaxed text-zinc-500">
                  Santapan rohani setiap hari untuk menguatkan iman Anda.
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Stacked right column */}
          <div className="flex flex-col gap-4 xl:gap-5">
            <motion.div {...reveal(0.14)} className="flex-1">
              <Link href="/warta" className={`${tile} h-full min-h-[7.5rem] p-7`}>
                <div className="flex items-center justify-between">
                  <Newspaper size={20} weight="duotone" className="text-zinc-500" />
                  <ArrowUpRight
                    size={16}
                    weight="bold"
                    className="text-zinc-300 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-zinc-500"
                  />
                </div>
                <h3 className="mt-5 text-base font-semibold tracking-[-0.01em] text-zinc-800">
                  Warta Jemaat
                </h3>
              </Link>
            </motion.div>

            <motion.div {...reveal(0.2)} className="flex-1">
              <Link href="/jadwal" className={`${tile} h-full min-h-[7.5rem] p-7`}>
                <div className="flex items-center justify-between">
                  <CalendarCheck size={20} weight="duotone" className="text-zinc-500" />
                  <ArrowUpRight
                    size={16}
                    weight="bold"
                    className="text-zinc-300 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-zinc-500"
                  />
                </div>
                <h3 className="mt-5 text-base font-semibold tracking-[-0.01em] text-zinc-800">
                  Jadwal Ibadah
                </h3>
              </Link>
            </motion.div>
          </div>

          {/* Full-width strip — Galeri */}
          <motion.div {...reveal(0.26)} className="md:col-span-2">
            <Link href="/galeri" className={`${tile} flex-row items-center justify-between p-7 xl:p-8`}>
              <div className="flex items-center gap-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-[6px] border border-[#EAEAEA] bg-[#F7F6F3]">
                  <Images size={18} weight="duotone" className="text-zinc-600" />
                </div>
                <div>
                  <h3 className="text-base font-semibold tracking-[-0.01em] text-zinc-800">
                    Galeri
                  </h3>
                  <p className="mt-0.5 text-sm text-zinc-500">
                    Khotbah video dan foto kegiatan jemaat.
                  </p>
                </div>
              </div>
              <ArrowUpRight
                size={18}
                weight="bold"
                className="shrink-0 text-zinc-300 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-zinc-500"
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
