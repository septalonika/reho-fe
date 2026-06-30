export function PublicFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-4 px-6 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:px-16">
        <div>
          <p className="font-bold uppercase tracking-widest text-foreground">
            GKII Rehobot
          </p>
          <p className="mt-1">Gereja Kemah Injil Indonesia - Rehobot</p>
        </div>
        <p>© {new Date().getFullYear()} GKII Rehobot. Semua hak dilindungi.</p>
      </div>
    </footer>
  );
}
