# 🏪 Warung Pintar - Aplikasi Kasir Offline untuk Toko Sembako & Eceran

Aplikasi web progresif (PWA) untuk manajemen toko, kasir offline, multi usaha, produk dengan satuan bertingkat (eceran), backup & restore data.  
**Fokus:** Ringan, minimalis, berorientasi biru, dan dapat diinstall sebagai APK dari browser.

## ✨ Fitur Utama

- ✅ **Multi usaha** – Kelola beberapa toko/warung dalam satu aplikasi.
- ✅ **Kasir offline penuh** – Transaksi tetap berjalan tanpa internet (data disimpan di HP).
- ✅ **Produk eceran dengan satuan bertingkat** – Contoh: rokok bisa dijual per batang, per 6 batang, per 12 batang dengan harga berbeda.
- ✅ **Backup & restore data** – Simpan seluruh data (usaha, produk, history) ke file JSON, pulihkan kapan saja.
- ✅ **Tema gelap/terang** – Mode malam dan siang, tanpa animasi (ringan).
- ✅ **History transaksi** – Lihat riwayat, hapus jika perlu.
- ✅ **Desain minimalis biru** – Nyaman di mata, responsif untuk HP dan desktop.
- ✅ **PWA** – Install sebagai aplikasi dari Chrome/Android.

## 📱 Demo & Instalasi

1. Buka web (GitHub Pages) di Chrome Android.
2. Klik menu tiga titik → **Install app** / **Tambahkan ke layar utama**.
3. Aplikasi akan terinstall seperti APK.

## 🛠️ Cara Penggunaan

### 1. Persiapan Google Sheets (Sumber Data Produk)

Buat spreadsheet dengan kolom berikut (wajib sesuai):

| nama_barang | kategori | harga_satuan_dasar | satuan_dasar | ecer | daftar_satuan |
|-------------|----------|--------------------|--------------|------|----------------|
| Rokok A | Rokok | 2000 | batang | ya | 6 batang:11000;12 batang:20000 |
| Beras Premium | Sembako | 15000 | kg | tidak | |
| Kopi Bubuk | Kopi | 12000 | kg | ya | 250 gram:3500 |

**Penjelasan kolom:**
- `nama_barang` : Nama produk.
- `kategori` : Kelompok produk (Sembako, Rokok, Kopi, dll).
- `harga_satuan_dasar` : Harga untuk satuan terkecil (misal per batang, per kg).
- `satuan_dasar` : Nama satuan dasar (batang, kg, pcs).
- `ecer` : Isi `ya` jika produk bisa dijual dalam beberapa kemasan. Jika tidak, isi `tidak` atau kosong.
- `daftar_satuan` : Hanya untuk produk eceran. Format: `nama_satuan:harga;nama_satuan:harga`. Pisahkan dengan titik koma.

> **Contoh:** `6 batang:11000;12 batang:20000` artinya pembeli bisa memilih satuan 6 batang (Rp 11.000) atau 12 batang (Rp 20.000). Satuan dasar (batang) otomatis tersedia.

### 2. Publikasikan Sheet ke Web

- Buka Google Sheets di HP/komputer.
- **File → Share → Publish to web**.
- Pilih tab yang berisi data → format **CSV** → Publish.
- Salin URL (contoh: `https://docs.google.com/spreadsheets/d/.../export?format=csv`).

### 3. Menambahkan Usaha di Aplikasi

- Buka menu **Setelan** → **Tambah Usaha Baru**.
- Masukkan **Nama Warung** dan **URL CSV**.
- Klik **Tambah & Import Data** (butuh internet sekali saja).
- Setelah berhasil, data produk tersimpan offline.

### 4. Memilih Usaha Aktif

- Di menu **Setelan**, klik **Aktifkan** pada usaha yang ingin digunakan.
- Nama usaha aktif akan tampil di halaman **Home**.

### 5. Bertransaksi (Kasir)

- Buka menu **Kasir**.
- Cari produk, pilih **satuan** (jika eceran, akan muncul opsi satuan).
- Masukkan **jumlah** (bisa desimal jika satuan dasar eceran).
- Klik **+** untuk memasukkan ke keranjang.
- Ulangi untuk produk lain.
- Klik **Simpan Transaksi** – transaksi langsung tersimpan ke **History** (tanpa cetak nota).

> **Catatan:** Fitur cetak nota sementara ditunda. Nanti bisa ditambahkan.

### 6. Melihat & Menghapus History

- Buka menu **History**.
- Setiap transaksi menampilkan daftar barang, jumlah, total.
- Klik **🗑️ Hapus** untuk menghapus satu transaksi.

### 7. Backup & Restore Data

- **Backup** : Di menu **Setelan**, klik **Backup Data** → file JSON akan diunduh.
- **Restore** : Pilih file backup, klik **Restore Data** → semua data akan diganti.


## 🔧 Teknologi

- HTML5, CSS3 (minimalis, biru, dark mode)
- JavaScript ES6+
- IndexedDB (penyimpanan lokal offline)
- PWA (Service Worker, manifest)
- Font Inter

## ❓ FAQ

**Apakah bisa digunakan tanpa internet?**  
Ya. Setelah data usaha diimpor (butuh internet sekali), semua fitur (kasir, history, backup/restore) berjalan offline.

**Bagaimana update harga dari Google Sheets?**  
Untuk saat ini, hapus usaha lalu tambah lagi dengan URL yang sama. Nanti bisa ditambahkan tombol "Sinkronkan".

**Apakah bisa cetak nota?**  
Fitur ini ditunda. Rencana akan ditambahkan di versi mendatang (thermal via window.print atau Bluetooth).

**Data history tersimpan di mana?**  
Di penyimpanan internal browser (IndexedDB). Backup sangat disarankan sebelum ganti HP.

## 🚀 Rencana Pengembangan ke Depan

- [ ] Tombol sinkronisasi manual dari Google Sheets
- [ ] Cetak nota thermal & PDF
- [ ] Stok barang & pengurangan otomatis
- [ ] Laporan laba/rugi harian
- [ ] Scan barcode

## 📄 Lisensi

MIT

---

**Dibuat untuk pemilik toko sembako Indonesia. Selamat berjualan!**  
Jika ada pertanyaan atau permintaan fitur, silakan hubungi pengembang.