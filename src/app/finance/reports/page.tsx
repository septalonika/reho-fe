"use client";

import * as React from "react";
import { useQueryState, parseAsInteger } from "nuqs";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { ReportHeader } from "./_components/ReportHeader";
import { SummaryCard } from "./_components/SummaryCard";
import { BreakdownPieChart } from "./_components/BreakdownPieChart";
import { CashFlowBarChart } from "./_components/CashFlowBarChart";
import { useFinanceReport } from "./_hooks/useFinanceReport";
import { Skeleton } from "@/components/ui/skeleton";

export default function FinanceReportsPage() {
  const [month] = useQueryState("month", parseAsInteger.withDefault(12));
  const [year] = useQueryState("year", parseAsInteger.withDefault(2023));

  const { data, isLoading } = useFinanceReport(month, year);

  const icons = [TrendingUp, TrendingDown, Wallet];

  return (
    <div className="flex flex-col h-full">
      <ReportHeader />

      {isLoading ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-32 w-full rounded-xl" />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <Skeleton key={i} className="h-64 w-full rounded-xl" />
            ))}
          </div>
          <Skeleton className="h-80 w-full rounded-xl" />
        </div>
      ) : data ? (
        <div className="space-y-8 pb-8">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.summary.map((item, index) => (
              <SummaryCard
                key={index}
                title={item.title}
                amount={item.amount}
                icon={icons[index]}
                trendText={item.trendText}
                trendType={item.trendType}
              />
            ))}
          </div>

          {/* Breakdown Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <BreakdownPieChart
              title="Breakdown Pemasukan"
              totalLabel="Total"
              totalAmount="45M"
              data={data.incomeBreakdown}
            />
            <BreakdownPieChart
              title="Breakdown Pengeluaran"
              totalLabel="Total"
              totalAmount="28M"
              data={data.expenseBreakdown}
            />
          </div>

          {/* Cash Flow Chart */}
          <CashFlowBarChart data={data.cashFlow} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
          <p>Gagal memuat data laporan keuangan.</p>
        </div>
      )}
    </div>
  );
}
