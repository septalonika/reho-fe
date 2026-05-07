import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SummaryCardProps {
  title: string;
  amount: string;
  icon: LucideIcon;
  trendText?: string;
  trendType?: "primary" | "secondary" | "danger" | "neutral";
  className?: string;
}

export function SummaryCard({
  title,
  amount,
  icon: Icon,
  trendText,
  trendType = "neutral",
  className,
}: SummaryCardProps) {
  const trendStyles = {
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/20 text-secondary-foreground",
    danger: "bg-destructive/10 text-destructive",
    neutral: "bg-muted text-muted-foreground",
  };

  return (
    <Card className={cn("overflow-hidden border-border/50 hover:border-secondary/50 transition-colors group", className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
            trendType === "primary" ? "bg-primary text-white" : 
            trendType === "secondary" ? "bg-secondary text-primary" :
            "bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-white"
          )}>
            <Icon size={20} />
          </div>
          {trendText && (
            <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider", trendStyles[trendType])}>
              {trendText}
            </span>
          )}
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <div className="text-2xl font-bold tracking-tight text-foreground">
            {amount}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
