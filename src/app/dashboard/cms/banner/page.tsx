"use client";

import * as React from "react";
import { BannerTable, Banner } from "@/components/cms/banner/BannerTable";
import { BannerForm } from "@/components/cms/banner/BannerForm";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
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

export default function BannerPage() {
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
  const [selectedBanner, setSelectedBanner] = React.useState<Banner | null>(null);

  const handleAdd = () => {
    setSelectedBanner(null);
    setIsFormOpen(true);
  };

  const handleEdit = (banner: Banner) => {
    setSelectedBanner(banner);
    setIsFormOpen(true);
  };

  const handleDelete = (banner: Banner) => {
    setSelectedBanner(banner);
    setIsDeleteOpen(true);
  };

  const handleSubmit = (data: any) => {
    console.log("Submitting:", data);
    setIsFormOpen(false);
  };

  const confirmDelete = () => {
    console.log("Deleting:", selectedBanner?.id);
    setIsDeleteOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-heading font-bold text-slate-900 tracking-tight">
            Banner & Pengumuman
          </h1>
          <p className="text-slate-500 text-sm">
            Manage announcements and banners displayed on the main church portal.
          </p>
        </div>
        <Button 
          onClick={handleAdd} 
          className="bg-[#1A365D] hover:bg-[#1A365D]/90 text-white shadow-sm h-10 px-4 rounded-lg flex items-center gap-2 transition-colors self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          Tambah
        </Button>
      </div>

      <BannerTable 
        onAdd={handleAdd} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />

      {/* Add/Edit Modal */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-heading">
              {selectedBanner ? "Edit Banner" : "Tambah Banner Baru"}
            </DialogTitle>
            <DialogDescription>
              Silakan isi formulir di bawah ini untuk {selectedBanner ? "memperbarui" : "menambahkan"} banner.
            </DialogDescription>
          </DialogHeader>
          <BannerForm 
            initialData={selectedBanner} 
            onSubmit={handleSubmit} 
            onCancel={() => setIsFormOpen(false)} 
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Banner "<strong>{selectedBanner?.title}</strong>" 
              akan dihapus secara permanen dari sistem.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Ya, Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
