import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MonthlyData {
  month: string;
  income: number; // percentage 0-100
  expense: number; // percentage 0-100
}

interface CashFlowBarChartProps {
  data: MonthlyData[];
}

export function CashFlowBarChart({ data }: CashFlowBarChartProps) {
  const currentMonth = "Dec"; // For highlighting

  return (
    <Card className="border-border/50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6 border-b border-border/50 mb-6">
        <CardTitle className="text-lg font-bold">Arus Kas Bulanan (Pemasukan vs Pengeluaran)</CardTitle>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-primary" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Pemasukan</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-muted-foreground/30" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Pengeluaran</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full h-72 flex flex-col">
          {/* Chart Area */}
          <div className="flex-1 border-b border-border/50 flex items-end justify-between px-2 pt-6 relative">
            {/* Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-0">
              <div className="w-full h-px bg-border/30" />
              <div className="w-full h-px bg-border/30" />
              <div className="w-full h-px bg-border/30" />
              <div className="w-full h-px bg-border/30" />
              <div className="w-full h-px bg-transparent" />
            </div>

            {/* Bars */}
            {data.map((item, index) => (
              <div key={index} className="flex items-end gap-1 h-full w-full justify-center group relative z-10">
                <div 
                  className="w-3 md:w-6 bg-primary rounded-t-sm transition-all duration-300 group-hover:opacity-80" 
                  style={{ height: `${item.income}%` }}
                  title={`Income: ${item.income}%`}
                />
                <div 
                  className="w-3 md:w-6 bg-muted-foreground/30 rounded-t-sm transition-all duration-300 group-hover:opacity-80" 
                  style={{ height: `${item.expense}%` }}
                  title={`Expense: ${item.expense}%`}
                />
              </div>
            ))}
          </div>

          {/* X Axis Labels */}
          <div className="flex justify-between px-2 pt-3 text-center">
            {data.map((item, index) => (
              <div 
                key={index} 
                className={cn(
                  "w-full text-[10px] font-bold uppercase tracking-wider",
                  item.month === currentMonth ? "text-secondary" : "text-muted-foreground"
                )}
              >
                {item.month}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
