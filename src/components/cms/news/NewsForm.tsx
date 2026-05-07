"use client";

import * as React from "react";
import { ImagePlus, X } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { News } from "./NewsTable";

interface NewsFormProps {
  initialData?: News | null;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export function NewsForm({ initialData, onSubmit, onCancel }: NewsFormProps) {
  const [imagePreview, setImagePreview] = React.useState<string | null>(
    initialData?.thumbnailUrl || null
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
        <Label className="text-sm font-semibold text-[#1A365D]">Thumbnail</Label>
        <div className="relative flex aspect-[16/9] w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 transition-colors hover:bg-slate-100">
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
                className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow-sm hover:bg-red-600 transition-transform active:scale-95"
              >
                <X className="h-4 w-4" />
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center gap-2 text-slate-400">
              <div className="rounded-full bg-white p-3 shadow-sm border border-slate-100">
                <ImagePlus className="h-6 w-6 text-[#1A365D]" />
              </div>
              <p className="text-xs font-medium">Klik untuk unggah thumbnail</p>
              <p className="text-[10px]">Rekomendasi 800 x 450px</p>
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
          <Label htmlFor="title" className="text-sm font-semibold text-[#1A365D]">Judul Berita / Renungan</Label>
          <Input 
            id="title" 
            placeholder="Masukkan judul konten..." 
            defaultValue={initialData?.title}
            className="bg-white border-slate-200 focus:ring-[#1A365D]/20 focus:border-[#1A365D]"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm font-semibold text-[#1A365D]">Kategori</Label>
            <Select defaultValue={initialData?.category || "Berita"}>
              <SelectTrigger id="category" className="bg-white border-slate-200">
                <SelectValue placeholder="Pilih Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Berita">Berita</SelectItem>
                <SelectItem value="Renungan">Renungan</SelectItem>
                <SelectItem value="Artikel">Artikel</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col space-y-3 pt-1">
            <Label className="text-sm font-semibold text-[#1A365D]">Status Publikasi</Label>
            <div className="flex items-center gap-3">
              <Switch id="status" defaultChecked={initialData?.status === "Published"} />
              <Label htmlFor="status" className="font-normal text-slate-500 text-sm">
                Published
              </Label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
        <Button variant="outline" type="button" onClick={onCancel} className="border-slate-200">
          Batal
        </Button>
        <Button type="button" onClick={() => onSubmit({})} className="bg-[#1A365D] hover:bg-[#1A365D]/90 text-white min-w-[100px]">
          Simpan
        </Button>
      </div>
    </form>
  );
}
