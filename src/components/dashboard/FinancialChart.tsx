"use client";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Area,
  AreaChart
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const data = [
  { month: "Jan", pemasukan: 4000 },
  { month: "Feb", pemasukan: 3000 },
  { month: "Mar", pemasukan: 5000 },
  { month: "Apr", pemasukan: 4500 },
  { month: "Mei", pemasukan: 6000 },
  { month: "Jun", pemasukan: 5500 },
];


export function FinancialChart() {
  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-8 border-none shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-heading font-semibold">Trend Keuangan</CardTitle>
        <Link 
          href="/dashboard/keuangan" 
          className={cn(buttonVariants({ variant: "link" }), "text-secondary hover:text-secondary/80 p-0 h-auto")}
        >
          Lihat Detail
        </Link>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPemasukan" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1a1f36" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#1a1f36" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: "#888" }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: "#888" }} 
              />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Area 
                type="monotone" 
                dataKey="pemasukan" 
                stroke="#1a1f36" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorPemasukan)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
