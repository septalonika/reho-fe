"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DataTable, type Column } from "@/components/cms/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetBody, SheetFooter } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";

interface NewsItem {
  id: string;
  title: string;
  date: string;
  status: "draft" | "published";
  author: string;
}

const newsSchema = z.object({
  title: z.string().min(1, "Judul wajib diisi"),
  content: z.string().min(10, "Konten minimal 10 karakter"),
  date: z.string().min(1, "Tanggal wajib diisi"),
  status: z.enum(["draft", "published"]),
});

type NewsInput = z.infer<typeof newsSchema>;

const mockNews: NewsItem[] = [
  { id: "1", title: "Kamp Pemuda 2026", date: "29 Jun 2026", status: "published", author: "Admin" },
  { id: "2", title: "Persembahan Pembangunan", date: "20 Jun 2026", status: "published", author: "Admin" },
  { id: "3", title: "Draft Natal 2026", date: "15 Jun 2026", status: "draft", author: "Staf" },
  { id: "4", title: "Pelayanan Diakonia Q2", date: "10 Jun 2026", status: "published", author: "Admin" },
];

const columns: Column<NewsItem>[] = [
  {
    key: "title",
    label: "Judul",
    render: (row) => <span className="font-medium text-ink">{row.title}</span>,
  },
  { key: "date", label: "Tanggal" },
  { key: "author", label: "Oleh" },
  {
    key: "status",
    label: "Status",
    render: (row) => (
      <Badge variant={row.status}>
        {row.status === "published" ? "Dipublikasi" : "Draf"}
      </Badge>
    ),
  },
];

function NewsForm({
  defaultValues,
  onClose,
}: {
  defaultValues?: Partial<NewsInput & { id?: string }>;
  onClose: () => void;
}) {
  const qc = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewsInput>({
    resolver: zodResolver(newsSchema),
    defaultValues: {
      title: defaultValues?.title ?? "",
      content: defaultValues?.content ?? "",
      date: defaultValues?.date ?? new Date().toISOString().split("T")[0],
      status: defaultValues?.status ?? "draft",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: NewsInput) => {
      await new Promise((r) => setTimeout(r, 400));
      return { ...data, id: defaultValues?.id ?? String(Date.now()) };
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cms", "news"] });
      onClose();
    },
  });

  return (
    <form onSubmit={handleSubmit((d) => mutation.mutate(d))} className="space-y-4">
      <div>
        <label className="text-xs text-ink-muted mb-1 block">Judul</label>
        <Input placeholder="Judul berita…" error={errors.title?.message} {...register("title")} />
      </div>
      <div>
        <label className="text-xs text-ink-muted mb-1 block">Konten</label>
        <textarea
          placeholder="Isi berita…"
          className="w-full min-h-[120px] px-3 py-2 bg-white border border-border rounded-md text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:border-ink-2 transition-colors resize-none"
          {...register("content")}
        />
        {errors.content && <p className="mt-1 text-xs text-[#9F2F2D]">{errors.content.message}</p>}
      </div>
      <div>
        <label className="text-xs text-ink-muted mb-1 block">Tanggal</label>
        <Input type="date" error={errors.date?.message} {...register("date")} />
      </div>
      <div>
        <label className="text-xs text-ink-muted mb-2 block">Status</label>
        <div className="flex gap-4">
          {["draft", "published"].map((s) => (
            <label key={s} className="flex items-center gap-2 text-sm text-ink-2 cursor-pointer">
              <input
                type="radio"
                value={s}
                {...register("status")}
                className="accent-ink"
              />
              {s === "draft" ? "Draf" : "Dipublikasi"}
            </label>
          ))}
        </div>
      </div>
      <SheetFooter className="px-0 border-0 pt-2">
        <Button type="button" variant="outline" onClick={onClose}>Batal</Button>
        <Button type="submit" disabled={isSubmitting || mutation.isPending}>
          {isSubmitting || mutation.isPending ? "Menyimpan…" : "Simpan"}
        </Button>
      </SheetFooter>
    </form>
  );
}

export default function CmsNewsPage() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editing, setEditing] = useState<NewsItem | null>(null);

  const { data, isPending } = useQuery({
    queryKey: ["cms", "news"],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 400));
      return mockNews;
    },
  });

  function openCreate() { setEditing(null); setSheetOpen(true); }
  function openEdit(row: NewsItem) { setEditing(row); setSheetOpen(true); }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-[10px] text-ink-muted uppercase tracking-widest mb-0.5">CMS</p>
          <h1 className="text-2xl font-medium text-ink tracking-tight">Berita</h1>
        </div>
        <Button onClick={openCreate} size="sm" className="gap-1.5">
          <Plus size={14} weight="bold" />
          Buat Baru
        </Button>
      </div>

      {isPending ? (
        <div className="space-y-2">
          {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-12" />)}
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={data!}
          onEdit={openEdit}
          onDelete={(row) => console.log("delete", row.id)}
          searchPlaceholder="Cari berita…"
          searchKey="title"
        />
      )}

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>{editing ? "Edit Berita" : "Buat Berita"}</SheetTitle>
          </SheetHeader>
          <SheetBody>
            <NewsForm
              defaultValues={editing ?? undefined}
              onClose={() => setSheetOpen(false)}
            />
          </SheetBody>
        </SheetContent>
      </Sheet>
    </div>
  );
}
