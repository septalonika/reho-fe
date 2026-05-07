# Frontend Implementation Guide: GKII Rehobot Dashboard

Dokumen ini adalah panduan high-level untuk mengimplementasikan frontend aplikasi manajemen gereja GKII Rehobot. Dokumen ini dirancang agar dapat dieksekusi langkah demi langkah oleh programmer atau AI agent.

## 1. Project Overview & Tech Stack
Bangun dashboard yang responsif dan modern dengan teknologi berikut:
- **Framework:** Next.js 15 (App Router) dengan TypeScript.
- **Styling & UI:** TailwindCSS v4 dan komponen dari shadcn/ui.
- **State Management:** Zustand (global state) dan TanStack Query v5 (server state/data fetching).
- **Forms & Validation:** React Hook Form dipadukan dengan Zod.
- **i18n:** `next-intl` untuk multi-bahasa (Bahasa Indonesia sebagai default utama).
- **Email Service:** React Email + Resend (dipanggil via Next.js API Routes).
- **Lain-lain:** Recharts (grafik), TanStack Table v8 (tabel), `nuqs` (URL state), jsPDF & SheetJS (export laporan).

## 2. Inisialisasi & Setup Proyek
- Lakukan inisialisasi project Next.js.
- Konfigurasikan TailwindCSS v4, fonts (Outfit untuk heading, Inter untuk body), dan color palette (Navy `#1a1f36` & Gold `#d4a843`).
- Setup arsitektur folder standar di dalam `src/` (app, components/ui, components/shared, store, lib, hooks, types).
- Konfigurasikan sistem multi-bahasa (i18n) dengan terjemahan dasar Bahasa Indonesia.

## 3. Shared Components & Layout
- **Dashboard Layout:** Buat layout utama yang terdiri dari Sidebar (kiri) dan Header (atas).
- **Responsive Behavior:** Sidebar harus bisa di-collapse. Di mobile, Sidebar menjadi overlay (drawer), dan Data Table berubah bentuk menjadi susunan Card (card stack) agar mudah dibaca.
- **Reusable UI:** Buat komponen generic terlebih dahulu, seperti `PageHeader`, `DataTable` (dengan pagination & search bawaan), `StatCard`, dan `ImageUploader`.

## 4. Implementasi Fitur Utama (Berdasarkan Modul)

### A. Autentikasi & Hak Akses (Role-Based Access)
- Buat halaman Login dengan desain modern (glassmorphism card).
- Implementasikan penjagaan rute (Route Guards / Middleware) berdasarkan 4 Role:
  - **Admin:** Akses penuh ke semua modul.
  - **Admin Media:** Akses ke CMS saja.
  - **Sekretaris:** Akses ke Jadwal & Roster saja.
  - **Bendahara:** Akses ke Keuangan saja.

### B. Dashboard Overview
- Tampilkan ringkasan data dari seluruh modul (hanya tampilkan widget yang sesuai dengan role user).
- Buat komponen chart untuk Tren Keuangan dan tabel kecil untuk Jadwal Terdekat.

### C. CMS (Content Management System)
- Buat halaman CRUD untuk **Banner** dan **Berita/Renungan**.
- Implementasikan form dengan validasi Zod dan uploader gambar yang memiliki fitur preview.

### D. Jadwal & Pelayanan (Roster)
- Buat halaman pengelolaan **Jadwal Ibadah**.
- Buat halaman **Roster Pelayanan** untuk membagi tugas (Worship Leader, Pemusik, dll).
- **Fitur Kritis:** Tambahkan deteksi bentrok (conflict detection) jika seseorang ditugaskan pada waktu yang sama.
- **Notifikasi:** Buat Next.js API Route yang menggunakan Resend + React Email untuk mengirimkan email pengingat (auto-reminder) ke petugas layanan.

### E. Keuangan
- Buat halaman pencatatan **Pemasukan** dan **Pengeluaran** (gunakan format currency Rupiah otomatis pada input).
- Buat halaman **Laporan Keuangan** yang menampilkan ringkasan visual (Pie Chart & Bar Chart).
- Sediakan tombol export data ke format PDF dan Excel.

## 5. Alur Pengerjaan (Workflow) disarankan:
1. Setup environment, dependencies, dan i18n.
2. Bangun sistem Layout utama dan navigasi Sidebar.
3. Kerjakan sistem Autentikasi dan proteksi Role.
4. Selesaikan pembuatan Shared Components (Tabel, Form Input).
5. Implementasikan modul satu per satu: CMS -> Jadwal -> Keuangan -> Dashboard.
6. Lakukan finalisasi UI/UX (termasuk Dark Mode jika perlu) dan pastikan tampilan sempurna di perangkat Mobile.
