export const metadata = { title: "Masuk" };

export default function LoginPage() {
  return (
    <div className="grid min-h-[100dvh] grid-cols-1 md:grid-cols-2">
      {/* Left: brand panel */}
      <div className="hidden flex-col justify-between bg-primary p-12 md:flex">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-primary-foreground/70">
            GKII Rehobot
          </p>
        </div>
        <div>
          <h1 className="text-4xl font-bold leading-none tracking-tighter text-primary-foreground">
            Portal
            <br />
            Administrasi
          </h1>
          <p className="mt-4 text-primary-foreground/70">
            Masuk untuk mengelola konten, jadwal, dan keuangan jemaat.
          </p>
        </div>
        <p className="text-xs text-primary-foreground/50">
          © {new Date().getFullYear()} GKII Rehobot
        </p>
      </div>
      {/* Right: login form placeholder */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-bold tracking-tight">Masuk</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Gunakan akun yang diberikan oleh administrator.
          </p>
          {/* Form implemented in Konten module phase */}
          <div className="mt-8 h-48 rounded-md border border-dashed border-border" />
        </div>
      </div>
    </div>
  );
}
