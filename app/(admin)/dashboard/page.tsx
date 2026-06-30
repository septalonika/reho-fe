import Link from "next/link";
import { DashboardStats } from "@/components/admin/dashboard-stats";
import { Article, Image, Newspaper, Cake, CalendarBlank, UsersThree, ArrowDownLeft, ArrowUpRight, FileText } from "@phosphor-icons/react/dist/ssr";

export const metadata = { title: "Dashboard — GKII Rehobot" };

const modules = [
  {
    group: "Konten",
    desc: "Kelola konten jemaat",
    items: [
      { href: "/dashboard/konten/renungan", label: "Renungan", icon: Article },
      { href: "/dashboard/konten/banner", label: "Banner", icon: Image },
      { href: "/dashboard/konten/warta", label: "Warta", icon: Newspaper },
      { href: "/dashboard/konten/ultah", label: "Ulang Tahun", icon: Cake },
    ],
  },
  {
    group: "Jadwal",
    desc: "Ibadah dan roster pelayanan",
    items: [
      { href: "/dashboard/jadwal/ibadah", label: "Ibadah", icon: CalendarBlank },
      { href: "/dashboard/jadwal/roster", label: "Roster", icon: UsersThree },
    ],
  },
  {
    group: "Keuangan",
    desc: "Pemasukan, pengeluaran, laporan",
    items: [
      { href: "/dashboard/keuangan/pemasukan", label: "Pemasukan", icon: ArrowDownLeft },
      { href: "/dashboard/keuangan/pengeluaran", label: "Pengeluaran", icon: ArrowUpRight },
      { href: "/dashboard/keuangan/laporan", label: "Laporan", icon: FileText },
    ],
  },
];

export default function DashboardPage() {
  return (
    <div className="max-w-5xl xl:max-w-6xl">
      {/* Page header */}
      <div className="mb-10 border-b border-[#EAEAEA] pb-8">
        <h1 className="text-2xl font-bold tracking-[-0.02em] text-zinc-900 xl:text-3xl">
          Dashboard
        </h1>
        <p className="mt-1.5 text-sm text-zinc-500">
          Ringkasan aktifitas dan akses cepat ke modul.
        </p>
      </div>

      {/* Stats */}
      <DashboardStats />

      {/* Module shortcuts — divide-y list per group, not equal 3-col cards */}
      <div className="mt-12">
        <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-400">
          Modul
        </p>
        <div className="divide-y divide-[#EAEAEA] rounded-[8px] border border-[#EAEAEA]">
          {modules.map((mod) => (
            <div key={mod.group} className="grid grid-cols-[180px_1fr] divide-x divide-[#EAEAEA] xl:grid-cols-[220px_1fr]">
              {/* Group label */}
              <div className="flex flex-col justify-center px-6 py-5">
                <p className="text-sm font-semibold text-zinc-800">{mod.group}</p>
                <p className="mt-0.5 text-xs text-zinc-400">{mod.desc}</p>
              </div>
              {/* Items */}
              <div className="flex flex-wrap gap-2 px-6 py-5">
                {mod.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="inline-flex items-center gap-2 rounded-[4px] border border-[#EAEAEA] bg-white px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900 active:scale-[0.98]"
                    >
                      <Icon size={15} weight="duotone" className="text-zinc-400" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
