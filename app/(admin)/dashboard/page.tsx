import { DashboardStats } from "@/components/admin/dashboard-stats";

export const metadata = { title: "Dashboard — GKII Rehobot" };

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Selamat datang kembali. Ini ringkasan hari ini.
        </p>
      </div>

      {/* Reminder banner slot — populated by ReminderBanner client component */}
      <div
        id="reminder-banner-slot"
        className="mb-6"
        aria-label="reminder-banner"
      />

      <DashboardStats />

      {/* Module shortcuts */}
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        {[
          {
            title: "Konten",
            desc: "Renungan, banner, warta, ulang tahun",
            href: "/dashboard/konten",
          },
          {
            title: "Jadwal",
            desc: "Ibadah dan roster pelayanan",
            href: "/dashboard/jadwal",
          },
          {
            title: "Keuangan",
            desc: "Pemasukan, pengeluaran, laporan",
            href: "/dashboard/keuangan",
          },
        ].map((mod) => (
          <a
            key={mod.title}
            href={mod.href}
            className="group rounded-lg border border-border p-6 transition-colors hover:border-primary hover:bg-accent"
          >
            <h3 className="font-semibold">{mod.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{mod.desc}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
