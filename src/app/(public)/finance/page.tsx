"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";
import { StatCard } from "@/components/ui/stat-card";
import { formatCurrency } from "@/lib/utils";

const COLORS = ["#1A1714", "#8C8070", "#EDE9E0", "#2F2B27", "#C4A882"];

const mockFinance = {
  summary: {
    totalIncome: 12_500_000,
    totalExpense: 8_200_000,
    balance: 4_300_000,
  },
  weekly: [
    { week: "2 Jun", income: 9_800_000, expense: 6_200_000 },
    { week: "9 Jun", income: 11_200_000, expense: 7_100_000 },
    { week: "16 Jun", income: 10_500_000, expense: 8_800_000 },
    { week: "23 Jun", income: 13_100_000, expense: 7_900_000 },
    { week: "29 Jun", income: 12_500_000, expense: 8_200_000 },
  ],
  breakdown: [
    { name: "Perpuluhan", value: 60 },
    { name: "Persembahan", value: 25 },
    { name: "Diakonia", value: 10 },
    { name: "Lainnya", value: 5 },
  ],
};

export default function FinancePage() {
  const { data, isPending } = useQuery({
    queryKey: ["finance", "public"],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 400));
      return mockFinance;
    },
  });

  return (
    <div className="py-8 md:py-14">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
        className="mb-10 md:mb-14"
      >
        <span className="inline-flex px-3 py-1 rounded-pill bg-surface-2 text-[10px] font-medium text-ink-muted uppercase tracking-[0.15em] mb-5">
          Keuangan Gereja
        </span>
        <h1 className="font-serif text-4xl md:text-6xl text-ink tracking-[-0.03em] leading-[1.05] mb-2">
          Transparansi
        </h1>
        <p className="text-sm text-ink-muted">Data per Juni 2026 · Tanpa nama pribadi</p>
      </motion.div>

      {isPending ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[...Array(3)].map((_, i) => <div key={i} className="h-28 rounded-[20px] skeleton-shimmer" />)}
          </div>
          <div className="h-64 rounded-[20px] skeleton-shimmer" />
          <div className="h-64 rounded-[20px] skeleton-shimmer" />
        </div>
      ) : (
        <div className="space-y-5">
          {/* Stat row — asymmetric: balance large */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
            className="grid grid-cols-2 md:grid-cols-3 gap-3"
          >
            <StatCard
              label="Saldo Juni"
              value={formatCurrency(data!.summary.balance)}
              sub="Setelah semua pengeluaran"
              className="col-span-2 md:col-span-1"
            />
            <StatCard label="Pemasukan" value={formatCurrency(data!.summary.totalIncome)} />
            <StatCard label="Pengeluaran" value={formatCurrency(data!.summary.totalExpense)} />
          </motion.div>

          {/* Charts row */}
          <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-5">
            {/* Bar chart */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
              className="p-[5px] rounded-[20px] bg-[rgba(26,23,20,0.04)] ring-1 ring-[rgba(26,23,20,0.06)]"
            >
              <div className="rounded-[calc(20px-5px)] bg-canvas shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] p-6">
                <p className="text-[10px] text-ink-muted uppercase tracking-widest mb-5">Arus Kas Mingguan</p>
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart data={data!.weekly} barCategoryGap="35%">
                    <XAxis
                      dataKey="week"
                      tick={{ fontSize: 10, fill: "#8C8070", fontFamily: "var(--font-geist-mono)" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis hide />
                    <Tooltip
                      formatter={(v: number) => formatCurrency(v)}
                      contentStyle={{
                        fontSize: 11,
                        fontFamily: "var(--font-geist-sans)",
                        border: "1px solid rgba(26,23,20,0.06)",
                        borderRadius: 10,
                        boxShadow: "0 4px 20px rgba(26,23,20,0.06)",
                        background: "#FDFBF7",
                      }}
                      cursor={{ fill: "rgba(26,23,20,0.02)", radius: 6 }}
                    />
                    <Bar dataKey="income" fill="#1A1714" radius={[4, 4, 0, 0]} name="Masuk" />
                    <Bar dataKey="expense" fill="#EDE9E0" radius={[4, 4, 0, 0]} name="Keluar" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="flex gap-5 mt-3">
                  <span className="flex items-center gap-1.5 text-[10px] text-ink-muted">
                    <span className="w-2.5 h-2.5 rounded-sm bg-ink inline-block" /> Masuk
                  </span>
                  <span className="flex items-center gap-1.5 text-[10px] text-ink-muted">
                    <span className="w-2.5 h-2.5 rounded-sm bg-surface-2 inline-block border border-border" /> Keluar
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Pie chart */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.28, ease: [0.32, 0.72, 0, 1] }}
              className="p-[5px] rounded-[20px] bg-[rgba(26,23,20,0.04)] ring-1 ring-[rgba(26,23,20,0.06)]"
            >
              <div className="rounded-[calc(20px-5px)] bg-canvas shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] p-6">
                <p className="text-[10px] text-ink-muted uppercase tracking-widest mb-5">Rincian Pemasukan</p>
                <div className="flex items-center gap-5">
                  <PieChart width={110} height={110}>
                    <Pie
                      data={data!.breakdown}
                      cx={50}
                      cy={50}
                      innerRadius={28}
                      outerRadius={50}
                      dataKey="value"
                      strokeWidth={0}
                      paddingAngle={2}
                    >
                      {data!.breakdown.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                  <div className="space-y-2.5 flex-1">
                    {data!.breakdown.map((item, i) => (
                      <div key={item.name} className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                        <span className="text-xs text-ink-2 flex-1">{item.name}</span>
                        <span className="text-[10px] text-ink-muted font-mono">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}
