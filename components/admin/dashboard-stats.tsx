"use client";

import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/lib/api";

interface Stats {
  upcomingServices: number;
  draftContent: number;
  monthlyBalance: number | null;
}

function formatBalance(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function DashboardStats() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: () => api.get<Stats>("/dashboard/stats"),
    staleTime: 60_000,
  });

  const stats = [
    {
      label: "Ibadah Mendatang",
      value: isLoading ? null : String(data?.upcomingServices ?? 0),
    },
    {
      label: "Slot Belum Diisi",
      value: "—",
    },
    {
      label: "Saldo Bulan Ini",
      value: isLoading
        ? null
        : data?.monthlyBalance == null
          ? "—"
          : formatBalance(data.monthlyBalance),
    },
    {
      label: "Draft Konten",
      value: isLoading ? null : String(data?.draftContent ?? 0),
    },
  ];

  return (
    <div className="grid grid-cols-2 divide-x divide-border rounded-lg border border-border md:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="p-6">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {stat.label}
          </p>
          {stat.value === null ? (
            <Skeleton className="mt-2 h-9 w-16" />
          ) : (
            <p className="mt-2 font-mono text-3xl font-bold">{stat.value}</p>
          )}
        </div>
      ))}
    </div>
  );
}
