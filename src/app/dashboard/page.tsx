"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Cake } from "@phosphor-icons/react";
import { AnimatedNumber } from "@/components/motion/AnimatedNumber";
import { formatCurrency } from "@/lib/utils";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";

const mockOverview = {
  birthdays: [
    { name: "Maria Lestari", date: "30 Jun" },
    { name: "Budi Kurniawan", date: "2 Jul" },
    { name: "Sari Dewi", date: "5 Jul" },
  ],
  stats: {
    members: 248,
    sermons: 47,
    upcomingServices: 3,
    monthlyBalance: 4_300_000,
  },
  recentActivity: [
    { label: "Warta minggu dipublikasikan", time: "2 jam lalu" },
    { label: "Entri keuangan: Persembahan Rp 5jt", time: "3 jam lalu" },
    { label: "Roster 6 Jul diperbarui", time: "Kemarin" },
    { label: "Permohonan doa baru masuk", time: "Kemarin" },
    { label: "Renungan harian 30 Jun ditambahkan", time: "2 hari lalu" },
  ],
  cashFlow: [
    { week: "2 Jun", income: 9_800_000, expense: 6_200_000 },
    { week: "9 Jun", income: 11_200_000, expense: 7_100_000 },
    { week: "16 Jun", income: 10_500_000, expense: 8_800_000 },
    { week: "23 Jun", income: 13_100_000, expense: 7_900_000 },
    { week: "29 Jun", income: 12_500_000, expense: 8_200_000 },
  ],
};

// Double-bezel wrapper for admin
function Bezel({ children, className, innerClass }: { children: React.ReactNode; className?: string; innerClass?: string }) {
  return (
    <div className={cn("p-[5px] rounded-[20px] bg-black/[0.03] ring-1 ring-black/[0.05]", className)}>
      <div className={cn("rounded-[calc(20px-5px)] bg-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] h-full", innerClass)}>
        {children}
      </div>
    </div>
  );
}

function StatBrick({
  label, value, format, delay = 0, span = 1, className,
}: {
  label: string; value: number; format?: (n: number) => string;
  delay?: number; span?: number; className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.32, 0.72, 0, 1] }}
      className={cn(span === 2 ? "md:col-span-2" : "", className)}
    >
      <Bezel innerClass="p-6">
        <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-3">{label}</p>
        <AnimatedNumber
          value={value}
          format={format ?? ((n) => String(Math.round(n)))}
          className="text-3xl font-medium text-gray-900 tracking-tight font-mono"
          duration={0.9}
        />
      </Bezel>
    </motion.div>
  );
}

function ActivityFeed({ items }: { items: typeof mockOverview.recentActivity }) {
  return (
    <>
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.35 + i * 0.07, ease: [0.32, 0.72, 0, 1] }}
          className="flex items-start gap-3 py-3 border-b border-black/[0.04] last:border-0"
        >
          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-200 shrink-0" />
          <p className="text-sm text-gray-700 flex-1 leading-snug">{item.label}</p>
          <span className="text-[10px] text-gray-400 font-mono whitespace-nowrap mt-0.5">{item.time}</span>
        </motion.div>
      ))}
    </>
  );
}

export default function DashboardPage() {
  const { data, isPending } = useQuery({
    queryKey: ["dashboard", "overview"],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 500));
      return mockOverview;
    },
  });

  if (isPending) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-8 w-48 bg-gray-100 rounded-xl" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[...Array(4)].map((_, i) => <div key={i} className="h-28 bg-gray-100 rounded-[20px]" />)}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-3">
          <div className="h-[240px] bg-gray-100 rounded-[20px]" />
          <div className="h-[240px] bg-gray-100 rounded-[20px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
        className="mb-2"
      >
        <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">
          {new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </p>
        <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Overview</h1>
      </motion.div>

      {/* Birthday banner */}
      {data!.birthdays.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, delay: 0.08, ease: [0.32, 0.72, 0, 1] }}
          className="flex items-center gap-3 bg-[#FBF3DB] ring-1 ring-[#956400]/12 rounded-xl px-4 py-3"
        >
          <Cake size={14} className="text-[#956400] shrink-0" />
          <p className="text-xs text-[#956400]">
            <span className="font-semibold">Ulang tahun minggu ini — </span>
            {data!.birthdays.map((b) => `${b.name} (${b.date})`).join(" · ")}
          </p>
        </motion.div>
      )}

      {/* Bento grid row 1 — asymmetric: balance takes 2/4, others 1/4 each */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatBrick
          label="Saldo Bulan Ini"
          value={data!.stats.monthlyBalance}
          format={(n) => formatCurrency(Math.round(n))}
          delay={0.1}
          span={2}
          className="col-span-2"
        />
        <StatBrick label="Anggota Jemaat" value={data!.stats.members} delay={0.17} />
        <StatBrick label="Total Khotbah" value={data!.stats.sermons} delay={0.22} />
      </div>

      {/* Bento grid row 2 — chart 3fr, activity 2fr */}
      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-3">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.28, ease: [0.32, 0.72, 0, 1] }}
        >
          <Bezel innerClass="p-6">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-5">Arus Kas — 5 Minggu Terakhir</p>
            <ResponsiveContainer width="100%" height={170}>
              <BarChart data={data!.cashFlow} barCategoryGap="35%">
                <XAxis
                  dataKey="week"
                  tick={{ fontSize: 10, fill: "#9CA3AF", fontFamily: "var(--font-geist-mono)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide />
                <Tooltip
                  formatter={(v: number) => formatCurrency(v)}
                  contentStyle={{
                    fontSize: 11,
                    fontFamily: "var(--font-geist-sans)",
                    border: "1px solid rgba(0,0,0,0.06)",
                    borderRadius: 10,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                    background: "#fff",
                  }}
                  cursor={{ fill: "rgba(0,0,0,0.02)", radius: 6 }}
                />
                <Bar dataKey="income" fill="#1A1714" radius={[4, 4, 0, 0]} name="Masuk" />
                <Bar dataKey="expense" fill="#E5E0D8" radius={[4, 4, 0, 0]} name="Keluar" />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex gap-5 mt-3">
              <span className="flex items-center gap-1.5 text-[10px] text-gray-400">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#1A1714] inline-block" /> Masuk
              </span>
              <span className="flex items-center gap-1.5 text-[10px] text-gray-400">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#E5E0D8] inline-block" /> Keluar
              </span>
            </div>
          </Bezel>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.34, ease: [0.32, 0.72, 0, 1] }}
        >
          <Bezel innerClass="p-6 flex flex-col">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Aktivitas Terbaru</p>
            <div className="flex-1 mt-3">
              <ActivityFeed items={data!.recentActivity} />
            </div>
          </Bezel>
        </motion.div>
      </div>
    </div>
  );
}
