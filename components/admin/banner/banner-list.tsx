"use client";

import { useState } from "react";
import Image from "next/image";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, ApiError } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, PencilSimple, Trash } from "@phosphor-icons/react";
import { useToast } from "@/hooks/use-toast";
import {
  BannerFormDialog,
  type Banner,
  type BannerFormValues,
} from "./banner-form-dialog";

function getBannerStatus(banner: Banner) {
  if (!banner.active)
    return {
      label: "Nonaktif",
      style: { background: "#F4F4F5", color: "#71717A" },
    };
  const now = new Date();
  const start = banner.startDate ? new Date(banner.startDate) : null;
  const end = banner.endDate ? new Date(banner.endDate) : null;
  if (start && now < start)
    return {
      label: "Terjadwal",
      style: { background: "#FBF3DB", color: "#956400" },
    };
  if (end && now > end)
    return {
      label: "Kadaluarsa",
      style: { background: "#FDEBEC", color: "#9F2F2D" },
    };
  return {
    label: "Tayang",
    style: { background: "#EDF3EC", color: "#346538" },
  };
}

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function TableSkeleton() {
  return (
    <div className="divide-y divide-border">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 px-4 py-3">
          <Skeleton className="h-10 w-16 shrink-0 rounded" />
          <Skeleton className="h-4 flex-1 rounded" />
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-4 w-32 rounded" />
          <Skeleton className="h-5 w-9 rounded-full" />
          <Skeleton className="h-7 w-16 rounded" />
        </div>
      ))}
    </div>
  );
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <p className="text-sm font-medium text-foreground">Belum ada banner</p>
      <p className="mt-1 text-xs text-muted-foreground">
        Banner yang ditambahkan akan tampil di halaman publik.
      </p>
      <button
        onClick={onAdd}
        className="mt-4 flex items-center gap-1.5 rounded-[4px] bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-zinc-700 active:scale-[0.98] active:-translate-y-[1px]"
      >
        <Plus size={14} weight="bold" />
        Tambah Banner
      </button>
    </div>
  );
}

export function BannerList() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Banner | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Banner | null>(null);

  const { data: banners, isLoading, isError, error } = useQuery({
    queryKey: ["banners"],
    queryFn: () => api.get<Banner[]>("/banners"),
    staleTime: 30_000,
  });

  const createMutation = useMutation({
    mutationFn: (body: BannerFormValues) => api.post<Banner>("/banners", body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
      toast({ title: "Banner ditambahkan" });
    },
    onError: (err) => {
      toast({
        title: "Gagal menambahkan banner",
        description: err instanceof ApiError ? err.message : "Coba lagi.",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, body }: { id: string; body: Partial<BannerFormValues> }) =>
      api.patch<Banner>(`/banners/${id}`, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
      toast({ title: "Banner diperbarui" });
    },
    onError: (err) => {
      toast({
        title: "Gagal memperbarui banner",
        description: err instanceof ApiError ? err.message : "Coba lagi.",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/banners/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
      toast({ title: "Banner dihapus" });
      setDeleteTarget(null);
    },
    onError: (err) => {
      toast({
        title: "Gagal menghapus banner",
        description: err instanceof ApiError ? err.message : "Coba lagi.",
        variant: "destructive",
      });
    },
  });

  function openAdd() {
    setEditTarget(null);
    setFormOpen(true);
  }

  function openEdit(banner: Banner) {
    setEditTarget(banner);
    setFormOpen(true);
  }

  async function handleFormSubmit(values: BannerFormValues) {
    if (editTarget) {
      await updateMutation.mutateAsync({ id: editTarget.id, body: values });
    } else {
      await createMutation.mutateAsync(values);
    }
  }

  function toggleActive(banner: Banner) {
    updateMutation.mutate({ id: banner.id, body: { active: !banner.active } });
  }

  const isPendingForm = createMutation.isPending || updateMutation.isPending;

  return (
    <>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            Banner
          </h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Kelola banner pengumuman dengan penjadwalan aktif/nonaktif.
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-1.5 rounded-[4px] bg-zinc-900 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-zinc-700 btn-press"
        >
          <Plus size={14} weight="bold" />
          Tambah Banner
        </button>
      </div>

      {/* Table */}
      <div className="mt-6 rounded-lg border border-border">
        <div className="grid grid-cols-[64px_1fr_90px_160px_52px_72px] items-center gap-4 border-b border-border bg-muted/40 px-4 py-2.5">
          {["Gambar", "Judul", "Status", "Periode", "Aktif", "Aksi"].map((col) => (
            <span
              key={col}
              className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground"
            >
              {col}
            </span>
          ))}
        </div>

        {isLoading && <TableSkeleton />}

        {isError && (
          <div className="px-4 py-6 text-sm text-destructive">
            {error instanceof ApiError ? error.message : "Gagal memuat data banner."}
          </div>
        )}

        {!isLoading && !isError && banners?.length === 0 && (
          <EmptyState onAdd={openAdd} />
        )}

        {!isLoading && !isError && banners && banners.length > 0 && (
          <div className="divide-y divide-border">
            {banners.map((banner) => {
              const status = getBannerStatus(banner);
              return (
                <div
                  key={banner.id}
                  className="grid grid-cols-[64px_1fr_90px_160px_52px_72px] items-center gap-4 px-4 py-3"
                >
                  {/* Thumbnail */}
                  <div className="h-10 w-16 shrink-0 overflow-hidden rounded border border-border bg-muted">
                    {banner.imageUrl ? (
                      <Image
                        src={banner.imageUrl}
                        alt=""
                        width={64}
                        height={40}
                        className="h-full w-full object-cover"
                        unoptimized={!process.env.NEXT_PUBLIC_S3_PUBLIC_URL}
                      />
                    ) : null}
                  </div>

                  {/* Title */}
                  <span className="truncate text-sm font-medium text-foreground">
                    {banner.title}
                  </span>

                  {/* Status badge */}
                  <span
                    className="inline-flex items-center self-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest"
                    style={status.style}
                  >
                    {status.label}
                  </span>

                  {/* Periode */}
                  <span className="font-mono text-xs text-muted-foreground">
                    {formatDate(banner.startDate)} – {formatDate(banner.endDate)}
                  </span>

                  {/* Toggle active */}
                  <Switch
                    checked={banner.active}
                    onCheckedChange={() => toggleActive(banner)}
                    disabled={updateMutation.isPending}
                    aria-label={banner.active ? "Nonaktifkan" : "Aktifkan"}
                  />

                  {/* Aksi */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEdit(banner)}
                      className="flex h-7 w-7 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-accent hover:text-foreground active:scale-[0.98]"
                      aria-label="Edit banner"
                    >
                      <PencilSimple size={14} />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(banner)}
                      className="flex h-7 w-7 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive active:scale-[0.98]"
                      aria-label="Hapus banner"
                    >
                      <Trash size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <BannerFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        banner={editTarget}
        onSubmit={handleFormSubmit}
        isPending={isPendingForm}
      />

      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base font-semibold tracking-tight">
              Hapus banner ini?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">
                {deleteTarget?.title}
              </span>{" "}
              akan dihapus secara permanen dan tidak dapat dikembalikan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <button className="rounded-[4px] border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent btn-press">
                Batal
              </button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <button
                onClick={() => deleteTarget && deleteMutation.mutate(deleteTarget.id)}
                disabled={deleteMutation.isPending}
                className="rounded-[4px] bg-destructive px-3 py-1.5 text-xs font-medium text-destructive-foreground transition-colors hover:bg-destructive/90 btn-press"
              >
                {deleteMutation.isPending ? "Menghapus..." : "Hapus"}
              </button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
