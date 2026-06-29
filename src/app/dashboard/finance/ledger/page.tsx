"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Paperclip, Check, Clock } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DataTable, type Column } from "@/components/cms/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetBody, SheetFooter } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { z } from "zod";
import { ledgerEntrySchema, CATEGORY_LABELS, type LedgerEntry } from "@/lib/schemas/finance.schema";

type LedgerFormInput = z.input<typeof ledgerEntrySchema>;
import { formatCurrency } from "@/lib/utils";

const mockLedger: (LedgerEntry & { id: string })[] = [
  { id: "1", date: "2026-06-29", category: "perpuluhan", type: "income", amount: 5_000_000, description: "Ibadah Pagi", approvalStatus: "approved" },
  { id: "2", date: "2026-06-29", category: "persembahan", type: "income", amount: 2_500_000, description: "Ibadah Sore", approvalStatus: "approved" },
  { id: "3", date: "2026-06-28", category: "operasional", type: "expense", amount: 800_000, description: "Listrik & Air", approvalStatus: "pending" },
  { id: "4", date: "2026-06-27", category: "diakonia", type: "expense", amount: 1_200_000, description: "Bantuan Jemaat", approvalStatus: "approved" },
];

const columns: Column<LedgerEntry & { id: string }>[] = [
  { key: "date", label: "Tanggal" },
  {
    key: "category",
    label: "Kategori",
    render: (row) => CATEGORY_LABELS[row.category],
  },
  {
    key: "type",
    label: "Jenis",
    render: (row) => (
      <Badge variant={row.type === "income" ? "accepted" : "declined"}>
        {row.type === "income" ? "Masuk" : "Keluar"}
      </Badge>
    ),
  },
  {
    key: "amount",
    label: "Jumlah",
    render: (row) => (
      <span className={row.type === "income" ? "text-[#346538]" : "text-[#9F2F2D]"}>
        {row.type === "income" ? "+" : "-"}{formatCurrency(row.amount)}
      </span>
    ),
  },
  {
    key: "description",
    label: "Keterangan",
    render: (row) => <span className="text-ink-muted">{row.description || "—"}</span>,
  },
  {
    key: "approvalStatus",
    label: "Status",
    render: (row) => (
      <div className="flex items-center gap-1">
        {row.approvalStatus === "approved" ? (
          <Check size={14} className="text-[#346538]" />
        ) : (
          <Clock size={14} className="text-[#956400]" />
        )}
        <Badge variant={row.approvalStatus === "approved" ? "accepted" : "pending"}>
          {row.approvalStatus === "approved" ? "Disetujui" : "Menunggu"}
        </Badge>
      </div>
    ),
  },
];

function LedgerForm({ onClose }: { onClose: () => void }) {
  const qc = useQueryClient();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LedgerFormInput>({
    resolver: zodResolver(ledgerEntrySchema),
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      type: "income",
      approvalStatus: "pending",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: LedgerFormInput) => {
      await new Promise((r) => setTimeout(r, 400));
      return { ...data, id: String(Date.now()) };
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["finance", "ledger"] });
      onClose();
    },
  });

  return (
    <form onSubmit={handleSubmit((d) => mutation.mutate(d))} className="space-y-4">
      <div>
        <label className="text-xs text-ink-muted mb-1 block">Tanggal</label>
        <Input type="date" error={errors.date?.message} {...register("date")} />
      </div>
      <div>
        <label className="text-xs text-ink-muted mb-1 block">Kategori</label>
        <select
          className="w-full h-9 px-3 bg-white border border-border rounded-md text-sm text-ink focus:outline-none focus:border-ink-2 transition-colors"
          {...register("category")}
        >
          {Object.entries(CATEGORY_LABELS).map(([val, label]) => (
            <option key={val} value={val}>{label}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-xs text-ink-muted mb-2 block">Jenis</label>
        <div className="flex gap-4">
          {[{ val: "income", label: "Masuk" }, { val: "expense", label: "Keluar" }].map(({ val, label }) => (
            <label key={val} className="flex items-center gap-2 text-sm text-ink-2 cursor-pointer">
              <input type="radio" value={val} {...register("type")} className="accent-ink" />
              {label}
            </label>
          ))}
        </div>
      </div>
      <div>
        <label className="text-xs text-ink-muted mb-1 block">Jumlah (Rp)</label>
        <Input
          type="number"
          placeholder="5000000"
          error={errors.amount?.message}
          {...register("amount", { valueAsNumber: true })}
        />
      </div>
      <div>
        <label className="text-xs text-ink-muted mb-1 block">Keterangan</label>
        <Input placeholder="Keterangan transaksi…" {...register("description")} />
      </div>
      <div>
        <label className="text-xs text-ink-muted mb-1 block">Bukti (URL)</label>
        <div className="relative">
          <Paperclip size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
          <Input
            className="pl-8"
            placeholder="https://…"
            error={errors.receiptUrl?.message}
            {...register("receiptUrl")}
          />
        </div>
      </div>
      <SheetFooter className="px-0 border-0 pt-2">
        <Button type="button" variant="outline" onClick={onClose}>Batal</Button>
        <Button type="submit" disabled={isSubmitting || mutation.isPending}>
          {mutation.isPending ? "Menyimpan…" : "Simpan"}
        </Button>
      </SheetFooter>
    </form>
  );
}

export default function FinanceLedgerPage() {
  const [sheetOpen, setSheetOpen] = useState(false);

  const { data, isPending } = useQuery({
    queryKey: ["finance", "ledger"],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 400));
      return mockLedger;
    },
  });

  const totalIncome = (data ?? []).filter((e) => e.type === "income").reduce((s, e) => s + e.amount, 0);
  const totalExpense = (data ?? []).filter((e) => e.type === "expense").reduce((s, e) => s + e.amount, 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-[10px] text-ink-muted uppercase tracking-widest mb-0.5">Keuangan</p>
          <h1 className="text-2xl font-medium text-ink tracking-tight">Buku Kas</h1>
        </div>
        <Button onClick={() => setSheetOpen(true)} size="sm" className="gap-1.5">
          <Plus size={14} weight="bold" />
          Entri Baru
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Pemasukan", value: formatCurrency(totalIncome), color: "text-[#346538]" },
          { label: "Pengeluaran", value: formatCurrency(totalExpense), color: "text-[#9F2F2D]" },
          { label: "Saldo", value: formatCurrency(totalIncome - totalExpense), color: "text-ink" },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-border rounded-lg p-4">
            <p className="text-[10px] text-ink-muted uppercase tracking-widest mb-1">{s.label}</p>
            <p className={`text-xl font-medium tracking-tight ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {isPending ? (
        <div className="space-y-2">
          {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-12" />)}
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={data!}
          onEdit={(row) => console.log("edit", row)}
          searchPlaceholder="Cari transaksi…"
          searchKey="description"
        />
      )}

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Entri Kas Baru</SheetTitle>
          </SheetHeader>
          <SheetBody>
            <LedgerForm onClose={() => setSheetOpen(false)} />
          </SheetBody>
        </SheetContent>
      </Sheet>
    </div>
  );
}
