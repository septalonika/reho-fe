"use client";

import { useState, useEffect } from "react";
import { StatCard } from "@/components/shared/StatCard";
import { FinancialChart } from "@/components/dashboard/FinancialChart";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { UpcomingSchedule } from "@/components/dashboard/UpcomingSchedule";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";
import { 
  TrendingUp, 
  Calendar, 
  Megaphone, 
  Wallet 
} from "lucide-react";

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-8 pb-8">
      {/* Stat Cards Section */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          index={0}
          title="Pemasukan"
          value="Rp 12.500.000"
          icon={TrendingUp}
          trend={{ value: "12%", isUp: true }}
          description="dari bulan lalu"
        />
        <StatCard
          index={1}
          title="Jadwal Terdekat"
          value="11 Mei 2026"
          icon={Calendar}
          description="Ibadah Minggu Pagi"
        />
        <StatCard
          index={2}
          title="Pengumuman"
          value="8 Aktif"
          icon={Megaphone}
          description="3 belum dibaca"
        />
        <StatCard
          index={3}
          title="Saldo Kas"
          value="Rp 85.240.000"
          icon={Wallet}
          trend={{ value: "5%", isUp: true }}
          description="Total dari semua kas"
        />
      </section>

      {/* Main Grid: Chart & Activity Feed */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-stretch">
        <FinancialChart />
        <RecentActivity />
      </div>

      {/* Bottom Section: Table */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <UpcomingSchedule />
        {/* Decorative card or secondary info can go here to fill Bento space */}
        <div className="hidden lg:flex lg:col-span-4 flex-col gap-4">
          <div className="flex-1 rounded-3xl bg-secondary/10 border border-secondary/20 p-6 flex flex-col justify-end">
            <h4 className="font-heading font-bold text-primary">System Health</h4>
            <p className="text-sm text-muted-foreground">All systems are running smoothly.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

