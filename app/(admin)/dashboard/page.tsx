export const metadata = { title: "Dashboard" };

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

      {/* Stat row — divide-x, not 3 equal cards (per taste-skill) */}
      <div className="grid grid-cols-2 divide-x divide-border rounded-lg border border-border md:grid-cols-4">
        {[
          { label: "Ibadah Mendatang", value: "—" },
          { label: "Slot Belum Diisi", value: "—" },
          { label: "Saldo Bulan Ini", value: "—" },
          { label: "Draft Konten", value: "—" },
        ].map((stat) => (
          <div key={stat.label} className="p-6">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {stat.label}
            </p>
            <p className="mt-2 font-mono text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

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
