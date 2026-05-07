"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: string;
    isUp: boolean;
  };
  className?: string;
  index?: number;
}

export function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  description, 
  trend, 
  className,
  index = 0
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      <Card className={cn(
        "overflow-hidden border-none shadow-sm transition-shadow hover:shadow-md", 
        className
      )}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <h3 className="text-2xl font-bold mt-1 tracking-tight text-primary">{value}</h3>
              
              {trend && (
                <div className="flex items-center gap-1 mt-1">
                  {trend.isUp ? (
                    <TrendingUp className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-rose-500" />
                  )}
                  <span className={cn(
                    "text-xs font-medium",
                    trend.isUp ? "text-emerald-500" : "text-rose-500"
                  )}>
                    {trend.value}
                  </span>
                  {description && (
                    <span className="text-xs text-muted-foreground ml-1">
                      {description}
                    </span>
                  )}
                </div>
              )}
              
              {!trend && description && (
                <p className="text-xs text-muted-foreground mt-1">{description}</p>
              )}
            </div>
            
            <div className="rounded-xl bg-primary/5 p-3 text-primary ring-1 ring-primary/10 transition-colors group-hover:bg-primary/10">
              <Icon className="h-6 w-6" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

