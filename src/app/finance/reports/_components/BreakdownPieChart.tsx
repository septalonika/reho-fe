import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BreakdownItem {
  label: string;
  percentage: number;
  color: string;
}

interface BreakdownPieChartProps {
  title: string;
  totalLabel: string;
  totalAmount: string;
  data: BreakdownItem[];
}

export function BreakdownPieChart({
  title,
  totalLabel,
  totalAmount,
  data,
}: BreakdownPieChartProps) {
  // Generate conic gradient string
  let currentPercentage = 0;
  const gradientParts = data.map((item) => {
    const start = currentPercentage;
    currentPercentage += item.percentage;
    return `${item.color} ${start}% ${currentPercentage}%`;
  });
  const gradient = `conic-gradient(${gradientParts.join(", ")})`;

  return (
    <Card className="border-border/50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-border/50 mb-4">
        <CardTitle className="text-lg font-bold">{title}</CardTitle>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
          <MoreHorizontal size={16} />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-center gap-8 py-2">
          {/* CSS Pie Chart */}
          <div 
            className="w-40 h-40 rounded-full shadow-inner relative flex-shrink-0" 
            style={{ background: gradient }}
          >
            <div className="absolute inset-0 m-auto w-24 h-24 bg-card rounded-full flex items-center justify-center shadow-sm">
              <div className="text-center leading-tight">
                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">{totalLabel}</p>
                <p className="text-lg font-bold text-foreground">{totalAmount}</p>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex-1 flex flex-col gap-3 w-full">
            {data.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                </div>
                <span className="text-sm font-bold text-foreground">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
