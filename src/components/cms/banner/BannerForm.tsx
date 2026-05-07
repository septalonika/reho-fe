"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { ImagePlus, X } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Banner } from "./BannerTable";

interface BannerFormProps {
  initialData?: Banner | null;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export function BannerForm({ initialData, onSubmit, onCancel }: BannerFormProps) {
  const [imagePreview, setImagePreview] = React.useState<string | null>(
    initialData?.imageUrl || null
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
  };

  return (
    <form className="space-y-6 py-4">
      <div className="space-y-4">
        <Label className="text-sm font-semibold text-primary">Preview Banner</Label>
        <div className="relative flex aspect-[2/1] w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted bg-slate-50 transition-colors hover:bg-slate-100">
          {imagePreview ? (
            <>
              <Image
                src={imagePreview}
                alt="Preview"
                fill
                className="rounded-lg object-cover p-1"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-white shadow-sm hover:bg-destructive/90 transition-transform active:scale-95"
              >
                <X className="h-4 w-4" />
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <div className="rounded-full bg-white p-3 shadow-sm">
                <ImagePlus className="h-6 w-6 text-primary" />
              </div>
              <p className="text-xs font-medium">Klik untuk unggah gambar</p>
              <p className="text-[10px]">Rekomendasi 1200 x 600px</p>
              <input
                type="file"
                className="absolute inset-0 cursor-pointer opacity-0"
                onChange={handleImageChange}
                accept="image/*"
              />
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm font-semibold text-primary">Judul Banner</Label>
          <Input 
            id="title" 
            placeholder="Masukkan judul banner..." 
            defaultValue={initialData?.title}
            className="bg-white border-muted"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="order" className="text-sm font-semibold text-primary">Urutan</Label>
            <Input 
              id="order" 
              type="number" 
              placeholder="1" 
              defaultValue={initialData?.order}
              className="bg-white border-muted"
            />
          </div>
          <div className="flex flex-col space-y-3 pt-1">
            <Label className="text-sm font-semibold text-primary">Status</Label>
            <div className="flex items-center gap-3">
              <Switch id="status" defaultChecked={initialData?.status === "Active"} />
              <Label htmlFor="status" className="font-normal text-muted-foreground">
                Tampilkan Banner
              </Label>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="url" className="text-sm font-semibold text-primary">URL / Link (Opsional)</Label>
          <Input 
            id="url" 
            placeholder="https://example.com/kegiatan" 
            className="bg-white border-muted"
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-muted">
        <Button variant="outline" type="button" onClick={onCancel} className="border-muted">
          Batal
        </Button>
        <Button type="button" onClick={() => onSubmit({})} className="bg-primary hover:bg-primary/90 text-white min-w-[100px]">
          Simpan
        </Button>
      </div>
    </form>
  );
}
