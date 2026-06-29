"use client";

import { useQuery } from "@tanstack/react-query";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { StatCard } from "@/components/ui/stat-card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/utils";

const COLORS = ["#111111", "#787774", "#EAEAEA", "#2F3437"];

const mockReports = {
  summary: { income: 47_100_000, expense: 30_200_000, balance: 16_900_000 },
  monthly: [
    { month: "Jan", income: 8_500_000, expense: 5_200_000 },
    { month: "Feb", income: 7_800_000, expense: 4_900_000 },
    { month: "Mar", income: 9_200_000, expense: 6_100_000 },
    { month: "Apr", income: 8_900_000, expense: 5_800_000 },
    { month: "Mei", income: 10_200_000, expense: 7_400_000 },
    { month: "Jun", income: 12_500_000, expense: 8_200_000 },
  ],
  categories: [
    { name: "Perpuluhan", value: 62 },
    { name: "Persembahan", value: 24 },
    { name: "Diakonia", value: 9 },
    { name: "Lainnya", value: 5 },
  ],
};

export default function FinanceReportsPage() {
  const { data, isPending } = useQuery({
    queryKey: ["finance", "reports"],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 400));
      return mockReports;
    },
  });

  if (isPending) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-20" />)}
        </div>
        <Skeleton className="h-[250px]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[10px] text-ink-muted uppercase tracking-widest mb-0.5">Keuangan</p>
        <h1 className="text-2xl font-medium text-ink tracking-tight">Laporan Keuangan</h1>
        <p className="text-xs text-ink-muted mt-1">Januari – Juni 2026</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Total Masuk" value={formatCurrency(data!.summary.income)} />
        <StatCard label="Total Keluar" value={formatCurrency(data!.summary.expense)} />
        <StatCard label="Saldo" value={formatCurrency(data!.summary.balance)} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white border border-border rounded-lg p-5">
          <p className="text-xs text-ink-muted uppercase tracking-widest mb-4">Arus Kas Bulanan</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data!.monthly} barCategoryGap="35%">
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#787774" }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                formatter={(v: number) => formatCurrency(v)}
                contentStyle={{ fontSize: 12, border: "1px solid #EAEAEA", borderRadius: 8 }}
              />
              <Bar dataKey="income" fill="#111111" radius={[3, 3, 0, 0]} name="Masuk" />
              <Bar dataKey="expense" fill="#EAEAEA" radius={[3, 3, 0, 0]} name="Keluar" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-border rounded-lg p-5">
          <p className="text-xs text-ink-muted uppercase tracking-widest mb-4">Rincian Pemasukan</p>
          <div className="flex items-center gap-4">
            <PieChart width={130} height={130}>
              <Pie data={data!.categories} cx={60} cy={60} innerRadius={35} outerRadius={60} dataKey="value" strokeWidth={0}>
                {data!.categories.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
            <div className="space-y-2">
              {data!.categories.map((c, i) => (
                <div key={c.name} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-xs text-ink-2 flex-1">{c.name}</span>
                  <span className="text-xs text-ink-muted font-mono">{c.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
