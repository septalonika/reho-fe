# Implementation Plan: Dashboard Overview (GKII Rehobot)

Dokumen ini berisi panduan *high-level* untuk mengimplementasikan tampilan utama **Dashboard Overview**. Panduan ini ditujukan bagi programmer atau AI agent sebagai rujukan struktur halaman dan komponen yang harus dibangun menggunakan Next.js App Router, TailwindCSS, dan shadcn/ui.

## 1. Konsep Layout Utama (DashboardLayout)
Halaman ini menggunakan layout berlapis yang terdiri dari:
- **SideNavBar (Kiri):** Lebar tetap (misal: 260px) di desktop. Berisi info/branding "GKII Rehobot", navigasi menu utama (Dashboard, CMS, Jadwal, Keuangan, Settings), dan tombol Logout di bawah. Di mobile, ubah menjadi *drawer* (overlay).
- **TopNavBar (Atas):** Sticky header. Berisi Judul Halaman ("Dashboard" atau nama menu aktif), input pencarian global (Search), icon Notifikasi, dan Avatar Profil pengguna.
- **Main Canvas (Kanan/Bawah TopNav):** Area konten yang bisa di-scroll secara independen.

## 2. Struktur Konten Dashboard Overview
Di dalam area *Main Canvas* pada rute `/dashboard`, bangun grid layout yang responsif untuk menampung komponen-komponen berikut:

### A. Stat Cards (Bento Grid)
Buat baris teratas (grid 1 kolom di mobile, 2 di tablet, 4 di desktop) untuk menampilkan 4 kartu ringkasan (*Stat Cards*):
1. **Pemasukan:** Tampilkan angka (misal: Rp 12.5jt) dengan indikator persentase naik/turun.
2. **Jadwal Terdekat:** Tampilkan tanggal dan nama ibadah/kegiatan terdekat.
3. **Pengumuman:** Tampilkan jumlah pengumuman aktif saat ini.
4. **Saldo Kas:** Tampilkan total saldo kas yang tersedia.
*(Catatan: Buat komponen `StatCard` generic agar mudah di-reuse).*

### B. Chart Section: Trend Keuangan
- **Posisi:** Kolom kiri/tengah di bawah Stat Cards (mengambil porsi grid lebih besar, misal 2/3 lebar di desktop).
- **Komponen:** Gunakan *Recharts* (atau library chart pilihan) untuk membuat Line Chart / Bar Chart.
- **Konten:** Menampilkan perbandingan pemasukan per bulan (misal dari rentang 6 bulan terakhir). Berikan header "Trend Keuangan" dan link "Lihat Detail".

### C. Table Section: Jadwal Terdekat
- **Posisi:** Di bawah area Chart.
- **Komponen:** Gunakan *TanStack Table* yang disederhanakan.
- **Konten:** Menampilkan daftar 5 jadwal ibadah/kegiatan terdekat.
- **Kolom Tabel:** Kegiatan, Tanggal, Waktu, dan Status (gunakan Badge/Pill untuk warna status).

### D. Activity Feed (Aktivitas Terbaru)
- **Posisi:** Kolom kanan di samping Chart & Tabel (mengambil porsi 1/3 lebar di desktop). Di mobile, akan ditumpuk di bawah.
- **Komponen:** List vertikal sederhana.
- **Konten:** Daftar aktivitas terbaru (log audit) di dalam sistem, misal: "Banner baru ditambahkan", "Persembahan dicatat", "Jadwal diubah". 
- **Elemen:** Tiap item menampilkan icon aksi, deskripsi (teks bold untuk aksi), dan waktu kejadian (misal: "2 jam yang lalu").

## 3. Langkah Pengerjaan (Workflow)
1. **Setup Wrapper:** Buat komponen `DashboardLayout` (Sidebar + TopNav) jika belum ada. Pastikan handling responsive (mobile menu) berfungsi.
2. **Skeleton & Grid:** Buat halaman `app/(dashboard)/page.tsx`. Susun struktur grid Tailwind (`grid-cols-1 md:grid-cols-2 lg:grid-cols-12` dll) untuk membagi area Stat Cards, Chart, Table, dan Feed.
3. **Komponen StatCard:** Buat `StatCard.tsx`, lalu implementasikan ke-4 kartu di bagian atas.
4. **Komponen Feed:** Buat area list "Recent Activity Feed" di sisi kanan.
5. **Komponen Chart & Table:** Terakhir, pasang grafik *Recharts* dan tabel jadwal menggunakan *shadcn/ui table* di area utama.
6. **Mock Data:** Gunakan *mock data* (hardcoded JSON array) terlebih dahulu sebelum menghubungkan ke API (Zustand/TanStack Query).
