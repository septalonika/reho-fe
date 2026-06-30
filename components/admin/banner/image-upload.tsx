"use client";

import { useRef, useState, useCallback } from "react";
import { UploadSimple, ImageSquare, X } from "@phosphor-icons/react";
import { api, ApiError } from "@/lib/api";
import { cn } from "@/lib/utils";

interface PresignResponse {
  uploadUrl: string;
  key: string;
  publicUrl: string;
}

const ACCEPTED = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_WIDTH = 1920;
const WEBP_QUALITY = 0.85;

export async function convertToWebP(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      const scale = Math.min(1, MAX_WIDTH / img.naturalWidth);
      const w = Math.round(img.naturalWidth * scale);
      const h = Math.round(img.naturalHeight * scale);

      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(objectUrl);
        reject(new Error("Canvas tidak tersedia"));
        return;
      }

      ctx.drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(objectUrl);

      canvas.toBlob(
        (blob) =>
          blob ? resolve(blob) : reject(new Error("Konversi WebP gagal")),
        "image/webp",
        WEBP_QUALITY
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Gagal membaca gambar"));
    };

    img.src = objectUrl;
  });
}

export async function uploadImageFile(
  file: File,
  folder: "banners" | "devotionals" | "gallery" | "birthdays" | "bulletins"
): Promise<string> {
  const webpBlob = await convertToWebP(file);

  const presign = await api.post<PresignResponse>("/uploads/presign", {
    filename: "image.webp",
    contentType: "image/webp",
    folder,
  });

  const putRes = await fetch(presign.uploadUrl, {
    method: "PUT",
    body: webpBlob,
    headers: { "Content-Type": "image/webp" },
  });

  if (!putRes.ok) throw new Error(`Upload ke S3 gagal (${putRes.status})`);

  return presign.publicUrl;
}

interface Props {
  existingUrl: string;
  onFileSelect: (file: File | null) => void;
  error?: string;
}

export function ImageUpload({ existingUrl, onFileSelect, error }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  const preview = localPreview ?? (existingUrl || null);

  const handleFile = useCallback(
    (file: File) => {
      if (!ACCEPTED.includes(file.type)) {
        setFileError("Format tidak didukung. Gunakan JPG, PNG, WebP, atau GIF.");
        return;
      }
      setFileError(null);
      const blobUrl = URL.createObjectURL(file);
      if (localPreview) URL.revokeObjectURL(localPreview);
      setLocalPreview(blobUrl);
      onFileSelect(file);
    },
    [localPreview, onFileSelect]
  );

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  function clear() {
    if (localPreview) URL.revokeObjectURL(localPreview);
    setLocalPreview(null);
    setFileError(null);
    onFileSelect(null);
  }

  return (
    <div className="space-y-1.5">
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED.join(",")}
        className="hidden"
        onChange={onInputChange}
      />

      {preview ? (
        <div className="relative overflow-hidden rounded border border-border bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview}
            alt="Preview banner"
            className="h-32 w-full object-cover"
          />
          <div className="absolute right-2 top-2 flex gap-1">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex items-center gap-1 rounded-[3px] bg-background/90 px-2 py-1 text-[10px] font-medium text-foreground transition-colors hover:bg-background active:scale-[0.98]"
            >
              <UploadSimple size={11} weight="bold" />
              Ganti
            </button>
            <button
              type="button"
              onClick={clear}
              className="flex h-6 w-6 items-center justify-center rounded-[3px] bg-background/90 text-muted-foreground transition-colors hover:bg-background hover:text-destructive active:scale-[0.98]"
              aria-label="Hapus gambar"
            >
              <X size={11} weight="bold" />
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={onDrop}
          className={cn(
            "flex w-full flex-col items-center justify-center gap-2 rounded border border-dashed py-8 text-center transition-colors",
            isDragOver
              ? "border-foreground/40 bg-accent"
              : "border-border bg-muted/30 hover:bg-muted/60"
          )}
        >
          <ImageSquare size={20} className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            Klik atau seret gambar ke sini
          </span>
          <span className="text-[10px] text-muted-foreground/60">
            JPG, PNG, WebP, GIF — maks. {MAX_WIDTH}px lebar
          </span>
        </button>
      )}

      {(fileError || error) && (
        <p className="text-xs text-destructive">{fileError ?? error}</p>
      )}
    </div>
  );
}
