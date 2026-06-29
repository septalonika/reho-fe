import { z } from "zod";

export const ledgerEntrySchema = z.object({
  id: z.string().optional(),
  date: z.string().min(1, "Tanggal wajib diisi"),
  category: z.enum(["perpuluhan", "persembahan", "diakonia", "operasional", "pemeliharaan", "lainnya"]),
  type: z.enum(["income", "expense"]),
  amount: z.number().positive("Jumlah harus lebih dari 0"),
  description: z.string().optional(),
  receiptUrl: z.string().url().optional().or(z.literal("")),
  approvalStatus: z.enum(["pending", "approved", "rejected"]).default("pending"),
});

export type LedgerEntry = z.infer<typeof ledgerEntrySchema>;

export const CATEGORY_LABELS: Record<LedgerEntry["category"], string> = {
  perpuluhan: "Perpuluhan",
  persembahan: "Persembahan",
  diakonia: "Diakonia",
  operasional: "Operasional",
  pemeliharaan: "Pemeliharaan",
  lainnya: "Lainnya",
};