export const revalidate = 3600;

export default function RenunganPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-16">
      <h1 className="text-4xl font-bold tracking-tighter md:text-5xl">
        Renungan Harian
      </h1>
      <p className="mt-4 text-muted-foreground">
        Santapan rohani setiap hari untuk menguatkan iman Anda.
      </p>
      {/* Article grid: asymmetric, VARIANCE 8 — no 3-col equal card row */}
      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr]">
        <div className="h-64 rounded-md bg-muted" />
        <div className="flex flex-col gap-4">
          <div className="h-28 rounded-md bg-muted" />
          <div className="h-28 rounded-md bg-muted" />
        </div>
      </div>
    </div>
  );
}
