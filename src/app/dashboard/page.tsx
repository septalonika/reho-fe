import { StatCard } from "@/components/shared/StatCard";
import { FinancialChart } from "@/components/dashboard/FinancialChart";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { UpcomingSchedule } from "@/components/dashboard/UpcomingSchedule";
import { 
  TrendingUp, 
  Calendar, 
  Megaphone, 
  Wallet 
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Stat Cards Section */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Pemasukan"
          value="Rp 12.500.000"
          icon={TrendingUp}
          trend={{ value: "12%", isUp: true }}
          description="dari bulan lalu"
        />
        <StatCard
          title="Jadwal Terdekat"
          value="11 Mei 2026"
          icon={Calendar}
          description="Ibadah Minggu Pagi"
        />
        <StatCard
          title="Pengumuman"
          value="8 Aktif"
          icon={Megaphone}
          description="3 belum dibaca"
        />
        <StatCard
          title="Saldo Kas"
          value="Rp 85.240.000"
          icon={Wallet}
          trend={{ value: "5%", isUp: true }}
          description="Total dari semua kas"
        />
      </section>

      {/* Main Grid: Chart & Activity Feed */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
        <FinancialChart />
        <RecentActivity />
      </div>

      {/* Bottom Section: Table */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <UpcomingSchedule />
        {/* Placeholder for future sidebar widget or just let the table be wide */}
        <div className="hidden lg:block lg:col-span-4" />
      </div>
    </div>
  );
}
