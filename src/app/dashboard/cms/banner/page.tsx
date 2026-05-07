"use client";

import * as React from "react";
import { Suspense } from "react";
import { BannerTable, Banner } from "@/components/cms/banner/BannerTable";
import { BannerForm } from "@/components/cms/banner/BannerForm";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
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

function BannerSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <Skeleton className="h-10 w-72" />
        <Skeleton className="h-10 w-40" />
      </div>
      <div className="rounded-xl border border-slate-200 overflow-hidden">
        <div className="h-12 bg-slate-50 border-b border-slate-100" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-20 border-b border-slate-50 flex items-center px-4 gap-4">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-14 w-24" />
            <Skeleton className="h-4 flex-1" />
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-8 w-8 ml-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}

function BannerContent() {
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
  const [selectedBanner, setSelectedBanner] = React.useState<Banner | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

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

      {isLoading ? (
        <BannerSkeleton />
      ) : (
        <BannerTable 
          onAdd={handleAdd} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      )}

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

export default function BannerPage() {
  return (
    <Suspense fallback={<BannerSkeleton />}>
      <BannerContent />
    </Suspense>
  );
}
