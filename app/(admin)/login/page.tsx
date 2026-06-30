import { LoginForm } from "@/components/admin/login-form";

export const metadata = { title: "Masuk — GKII Rehobot" };

export default function LoginPage() {
  return (
    <div className="grid min-h-[100dvh] grid-cols-1 md:grid-cols-[1fr_1fr]">
      {/* Left: editorial brand panel — dark, not primary-colored */}
      <div className="hidden flex-col justify-between bg-zinc-950 p-14 md:flex xl:p-16">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
          GKII Rehobot
        </p>
        <div>
          <h1 className="font-serif text-5xl font-bold leading-[0.95] tracking-[-0.03em] text-white xl:text-6xl">
            Portal
            <br />
            Administrasi
          </h1>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-zinc-400">
            Masuk untuk mengelola konten, jadwal, dan keuangan jemaat.
          </p>
        </div>
        <p className="font-mono text-xs text-zinc-600">
          &copy; {new Date().getFullYear()} GKII Rehobot
        </p>
      </div>

      {/* Right: login form */}
      <div className="flex items-center justify-center bg-[#FAFAF9] p-8">
        <div className="w-full max-w-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-400 md:hidden">
            GKII Rehobot
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold tracking-[-0.025em] text-zinc-900 md:mt-0">
            Masuk
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-500">
            Gunakan akun yang diberikan oleh administrator.
          </p>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
