export default function HomePage() {
  return (
    <div>
      <section className="grid min-h-[100dvh] grid-cols-1 md:grid-cols-2">
        {/* Left: Hero content */}
        <div className="flex flex-col justify-center px-8 py-16 md:px-16 lg:px-24">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary">
            GKII Rehobot
          </p>
          <h1 className="text-5xl font-bold leading-none tracking-tighter text-foreground md:text-6xl lg:text-7xl">
            Bertumbuh
            <br />
            <span className="text-primary">Bersama</span>
            <br />
            dalam Iman
          </h1>
          <p className="mt-6 max-w-md font-serif text-lg leading-relaxed text-muted-foreground">
            Jemaat Tuhan yang hidup, bertumbuh, dan berbuah bagi kemuliaan-Nya.
          </p>
        </div>
        {/* Right: Latest banner / announcement placeholder */}
        <div className="relative hidden bg-zinc-100 md:block">
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-sm text-muted-foreground">Banner terbaru</p>
          </div>
        </div>
      </section>
    </div>
  );
}
