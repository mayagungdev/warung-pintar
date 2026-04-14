# 🏪 Warung Pintar - Aplikasi Kasir & Manajemen Toko Sembako

Aplikasi web progresif (PWA) untuk toko sembako, warung, atau usaha kecil. Mendukung **multi usaha**, **produk eceran**, **kasir dengan nota thermal/PDF**, **history transaksi**, dan **tema dinamis** (gelap dengan kunang-kunang / terang dengan awan bergerak).

## ✨ Fitur Utama

- ✅ Multi usaha – kelola beberapa toko dalam satu aplikasi
- ✅ Data dari Google Sheets – update harga & produk tanpa upload ulang
- ✅ Kasir cepat – tambah produk, input jumlah (eceran/ non-eceran), hitung otomatis
- ✅ Cetak nota – thermal (printer 58mm) atau simpan sebagai PDF
- ✅ History pembelian – lihat riwayat, hapus transaksi
- ✅ Tema dinamis – dark mode dengan animasi kunang-kunang, light mode dengan awan
- ✅ PWA – bisa diinstall sebagai APK dari Chrome/Android

## 📱 Demo & Instalasi

1. Buka web Anda (GitHub Pages) di Chrome Android.
2. Klik menu tiga titik → **Install app** / **Tambahkan ke layar utama**.
3. Aplikasi akan terinstall seperti APK.

## 🛠️ Cara Penggunaan

### 1. Persiapan Google Sheets

Buat spreadsheet dengan kolom:
| nama_barang | kategori | harga | ecer |
|-------------|----------|-------|------|
| Beras Premium | Sembako | 15000 | tidak |
| Kopi Bubuk | Kopi | 12000 | ya |
| Rokok A | Rokok | 25000 | tidak |

> Kolom `ecer` diisi `ya` jika produk bisa dijual eceran (desimal).  
> Publikasikan sheet ke web → format CSV → salin URL.

### 2. Menambahkan Usaha di Aplikasi

- Buka menu **Setelan** → **Tambah Usaha Baru**
- Masukkan nama warung dan URL CSV
- Klik simpan, data produk akan otomatis diambil

### 3. Bertransaksi

- Buka menu **Kasir**
- Pilih produk, masukkan jumlah, klik **+**
- Keranjang akan terisi, klik **Nota Thermal** atau **Simpan PDF**
- Transaksi tersimpan di **History**

### 4. Ganti Tema

- Klik ikon ☀️/🌙 di pojok kanan atas

## 📁 Struktur File
warung-pintar/
├── index.html
├── manifest.json
├── sw.js
├── css/style.css
├── js/
│   ├── app.js
│   ├── db.js
│   ├── spreadsheet.js
│   ├── kasir.js
│   ├── theme.js
│   └── utils.js
├── pages/
│   ├── home.html
│   ├── kasir.html
│   ├── history.html
│   ├── setting.html
│   └── produk.html
└── assets/icons/


## 🔧 Teknologi

- HTML5, CSS3 (modern, responsive, dark/light theme)
- JavaScript (ES6+)
- IndexedDB (penyimpanan lokal)
- Chart.js (grafik, opsional)
- PWA (Service Worker, manifest)

## 📝 Catatan Pengembangan

- Data produk diambil dari Google Sheets setiap kali menambah usaha. Untuk update harga, cukup edit sheet lalu **refresh halaman web**.
- History disimpan di browser. Jika ganti HP, data tidak ikut. (Fitur backup bisa ditambahkan nanti)
- Untuk printer thermal, pastikan perangkat mendukung cetak via Bluetooth / USB OTG.

## 🧪 Rencana Fitur Mendatang

- [ ] Stok barang & pengurangan otomatis
- [ ] Laporan laba/rugi harian
- [ ] Scan barcode
- [ ] Backup & restore data
- [ ] Diskon & pajak

## 🤝 Kontribusi

Silakan fork repository ini untuk dikembangkan sesuai kebutuhan toko Anda.

## 📄 Lisensi

MIT

---

**Dibuat dengan ❤️ untuk pemilik toko sembako Indonesia**