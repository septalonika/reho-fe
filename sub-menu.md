# Implementation Plan: Sub-Menu Navigasi CMS

## 1. Ringkasan Tugas
Mengubah struktur navigasi pada *sidebar* (`SideNavBar.tsx`) agar mendukung fitur sub-menu (*collapsible menu*). Fokus utamanya adalah menambahkan sub-menu pada menu **CMS** yang mengarah ke halaman `Banner` (`/dashboard/cms/banner`) dan `Berita & Renungan` (`/dashboard/cms/news`). Instruksi ini dibuat secara *high-level* untuk memandu eksekusi oleh *developer* atau agen AI.

## 2. Pembaruan Struktur Data Navigasi
Ubah definisi *array* `navigation` di dalam file `src/components/layout/SideNavBar.tsx` untuk mendukung properti `subItems`.

- **Sebelumnya**:
  ```typescript
  { name: "CMS", href: "/dashboard/cms", icon: FileText }
  ```
- **Harus Diubah Menjadi**:
  ```typescript
  { 
    name: "CMS", 
    icon: FileText,
    subItems: [
      { name: "Banner & Pengumuman", href: "/dashboard/cms/banner" },
      { name: "Berita & Renungan", href: "/dashboard/cms/news" }
    ] 
  }
  ```
*(Catatan: Hapus properti `href` utama pada item CMS jika ia hanya berfungsi sebagai parent)*.

## 3. Manajemen State & Logika Komponen
Tambahkan state lokal pada komponen `SideNavBar` untuk melacak menu mana yang sedang terbuka (di-*expand*).

- **State `expandedMenus`**: Buat state (misal: `Record<string, boolean>`) untuk menyimpan status buka/tutup dari setiap parent menu.
- **Auto-Expand (Opsional tapi Direkomendasikan)**: Gunakan `useEffect` dan `pathname` (dari `next/navigation`) untuk membuka parent menu secara otomatis jika user sedang berada di salah satu halaman sub-menu tersebut (contoh: jika URL adalah `/dashboard/cms/news`, maka menu CMS otomatis terbuka).

## 4. Pembaruan Render UI
Ubah logika `map` pada variabel `navigation` di dalam blok JSX `SideNavBar.tsx` untuk menangani dua jenis item:

1. **Item Tanpa Sub-menu** (contoh: Dashboard, Jadwal):
   - Tetap di-render sebagai komponen `<Link>` seperti logika yang sudah ada saat ini.
2. **Item Dengan Sub-menu** (contoh: CMS):
   - Render sebagai elemen `<button>` atau `<div>` yang bisa diklik untuk melakukan *toggle state* buka/tutup.
   - Tambahkan ikon indikator seperti `ChevronDown` (dari `lucide-react`) yang berputar (menggunakan class `rotate-180`) saat menu terbuka.
   - Di bawah tombol parent, buat *container* untuk me-render *list* dari `subItems`.
   - Gunakan *conditional rendering* (atau transisi tinggi/CSS class) untuk menyembunyikan atau menampilkan list `subItems` berdasarkan state `expanded`.
   - Pastikan *styling* sub-menu memiliki sedikit *indentation* (padding kiri lebih menjorok) agar membedakannya dari menu utama secara hierarki.

## 5. Penanganan State Aktif (*Active State*)
Pastikan pewarnaan visual (background/teks) tetap berfungsi:
- **Sub-menu Aktif**: Jika `pathname` sama dengan `subItem.href`, beri gaya warna *highlight* (misal: teks warna sekunder atau background khusus).
- **Parent Aktif**: Jika salah satu sub-menunya sedang aktif, parent menu-nya juga bisa diberi penanda visual ringan agar user tahu mereka masih berada di bawah modul tersebut.
