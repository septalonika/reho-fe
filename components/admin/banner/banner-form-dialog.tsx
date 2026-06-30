"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { ImageUpload, uploadImageFile } from "./image-upload";
import { ApiError } from "@/lib/api";

export interface Banner {
  id: string;
  title: string;
  imageUrl: string;
  active: boolean;
  startDate: string | null;
  endDate: string | null;
  createdAt: string;
}

export const bannerSchema = z
  .object({
    title: z.string().min(1, "Judul wajib diisi").max(120),
    imageUrl: z.string(),
    startDate: z.string().min(1, "Tanggal mulai wajib diisi"),
    endDate: z.string().nullable().optional(),
    active: z.boolean(),
  })
  .refine(
    (d) => !d.endDate || new Date(d.endDate) >= new Date(d.startDate),
    {
      message: "Tanggal selesai harus setelah atau sama dengan tanggal mulai",
      path: ["endDate"],
    }
  );

export type BannerFormValues = z.infer<typeof bannerSchema>;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  banner?: Banner | null;
  onSubmit: (values: BannerFormValues) => Promise<void>;
  isPending: boolean;
}

export function BannerFormDialog({
  open,
  onOpenChange,
  banner,
  onSubmit,
  isPending,
}: Props) {
  const isEdit = !!banner;
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [noEndDate, setNoEndDate] = useState(!banner?.endDate);

  const form = useForm<BannerFormValues>({
    resolver: zodResolver(bannerSchema),
    defaultValues: {
      title: "",
      imageUrl: "",
      startDate: "",
      endDate: "",
      active: true,
    },
  });

  useEffect(() => {
    if (open) {
      setPendingFile(null);
      setUploadError(null);
      const hasEndDate = !!banner?.endDate;
      setNoEndDate(!hasEndDate);
      form.reset(
        banner
          ? {
              title: banner.title,
              imageUrl: banner.imageUrl,
              startDate: banner.startDate?.slice(0, 10) ?? "",
              endDate: banner.endDate?.slice(0, 10) ?? "",
              active: banner.active,
            }
          : {
              title: "",
              imageUrl: "",
              startDate: "",
              endDate: "",
              active: true,
            }
      );
    }
  }, [open, banner, form]);

  function handleFileSelect(file: File | null) {
    setPendingFile(file);
    setUploadError(null);
    if (!file) form.setValue("imageUrl", "");
  }

  async function handleSubmit(values: BannerFormValues) {
    const hasExisting = !!values.imageUrl;

    if (!pendingFile && !hasExisting) {
      form.setError("imageUrl", { message: "Gambar wajib diunggah" });
      return;
    }

    let finalUrl = values.imageUrl;

    if (pendingFile) {
      setIsUploading(true);
      setUploadError(null);
      try {
        finalUrl = await uploadImageFile(pendingFile, "banners");
        // Persist URL into form immediately — if API fails below, retry skips re-upload
        form.setValue("imageUrl", finalUrl);
        setPendingFile(null);
      } catch (err) {
        setUploadError(
          err instanceof ApiError
            ? err.message
            : err instanceof Error
              ? err.message
              : "Upload gambar gagal"
        );
        setIsUploading(false);
        return;
      }
      setIsUploading(false);
    }

    await onSubmit({
      ...values,
      imageUrl: finalUrl,
      endDate: noEndDate ? null : values.endDate,
    });
    onOpenChange(false);
  }

  const isBusy = isUploading || isPending;

  const submitLabel = isUploading
    ? "Mengunggah..."
    : isPending
      ? "Menyimpan..."
      : isEdit
        ? "Simpan"
        : "Tambah";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold tracking-tight">
            {isEdit ? "Edit Banner" : "Tambah Banner"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Judul
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Ibadah Minggu, 13 Juli 2025" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Gambar
                  </FormLabel>
                  <FormControl>
                    <ImageUpload
                      existingUrl={field.value}
                      onFileSelect={handleFileSelect}
                      error={fieldState.error?.message ?? uploadError ?? undefined}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        Mulai
                      </FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        Selesai
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          value={noEndDate ? "" : (field.value ?? "")}
                          disabled={noEndDate}
                          className={noEndDate ? "opacity-40" : ""}
                        />
                      </FormControl>
                      {!noEndDate && <FormMessage />}
                      {fieldState.error && noEndDate && null}
                    </FormItem>
                  )}
                />
              </div>

              <label className="flex cursor-pointer items-center gap-2">
                <Checkbox
                  checked={noEndDate}
                  onCheckedChange={(checked) => {
                    setNoEndDate(!!checked);
                    if (checked) form.setValue("endDate", undefined);
                  }}
                />
                <span className="text-xs text-muted-foreground">
                  Tampilkan selamanya (tanpa batas waktu)
                </span>
              </label>
            </div>

            <FormField
              control={form.control}
              name="active"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between rounded-md border border-border px-3 py-2.5">
                    <FormLabel className="cursor-pointer text-sm font-medium">
                      Aktif
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />

            <DialogFooter className="pt-2">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  disabled={isBusy}
                >
                  Batal
                </Button>
              </DialogClose>
              <Button
                type="submit"
                size="sm"
                disabled={isBusy}
                className="btn-press"
              >
                {submitLabel}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
