import Link from "next/link";
import { MapPin, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";

const footerLinks = [
  { href: "/renungan", label: "Renungan" },
  { href: "/warta", label: "Warta" },
  { href: "/jadwal", label: "Jadwal" },
  { href: "/galeri", label: "Galeri" },
];

export function PublicFooter() {
  return (
    <footer className="border-t border-[#EAEAEA]">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-7 py-16 md:grid-cols-[1.6fr_1fr_1fr] md:px-14 xl:px-28 xl:py-20">
        {/* Brand */}
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-zinc-900">
            GKII Rehobot
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-zinc-500">
            Gereja Kemah Injil Indonesia &mdash; Rehobot.
            <br />
            Bertumbuh bersama dalam iman.
          </p>
          <div className="mt-6 flex flex-col gap-2.5 text-sm text-zinc-500">
            <span className="inline-flex items-center gap-2">
              <MapPin size={15} weight="duotone" className="text-zinc-400" />
              Jl. Rehobot, Indonesia
            </span>
            <a
              href="mailto:info@gkiirehobot.org"
              className="inline-flex w-fit items-center gap-2 transition-colors hover:text-zinc-900"
            >
              <EnvelopeSimple size={15} weight="duotone" className="text-zinc-400" />
              info@gkiirehobot.org
            </a>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-400">
            Navigasi
          </p>
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="w-fit text-sm text-zinc-600 transition-colors hover:text-zinc-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Service times */}
        <div className="flex flex-col gap-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-400">
            Ibadah Minggu
          </p>
          <p className="text-sm leading-relaxed text-zinc-600">
            Pagi &middot; 08.00 WIB
            <br />
            Sore &middot; 17.00 WIB
          </p>
          <Link
            href="/jadwal"
            className="w-fit text-sm font-medium text-zinc-900 underline underline-offset-2 transition-opacity hover:opacity-60"
          >
            Lihat jadwal lengkap
          </Link>
        </div>
      </div>

      <div className="border-t border-[#EAEAEA]">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-2 px-7 py-6 text-xs text-zinc-400 md:flex-row md:items-center md:px-14 xl:px-28">
          <p>&copy; {new Date().getFullYear()} GKII Rehobot. Semua hak dilindungi.</p>
          <p>Dibangun untuk melayani jemaat.</p>
        </div>
      </div>
    </footer>
  );
}
