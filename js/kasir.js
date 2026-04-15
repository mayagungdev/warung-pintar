let currentKeranjang = []; // { produkId, nama, satuanTerpilih, hargaSatuan, jumlah, subtotal }

function tambahKeKeranjang(produk, satuanDipilih, jumlah) {
    // satuanDipilih adalah objek dari produk.daftarSatuan
    const subtotal = satuanDipilih.harga * jumlah;
    currentKeranjang.push({
        produkId: produk.id,
        nama: produk.nama,
        satuanTerpilih: satuanDipilih.nama,
        hargaSatuan: satuanDipilih.harga,
        jumlah: jumlah,
        subtotal: subtotal
    });
    renderKeranjang();
}

function hapusDariKeranjang(index) {
    currentKeranjang.splice(index, 1);
    renderKeranjang();
}

function hitungTotal() {
    return currentKeranjang.reduce((sum, item) => sum + item.subtotal, 0);
}

function renderKeranjang() {
    const container = document.getElementById("keranjangList");
    if (!container) return;
    if (currentKeranjang.length === 0) {
        container.innerHTML = "<div class='card'>Keranjang kosong</div>";
        document.getElementById("totalBayar").innerText = formatRp(0);
        return;
    }
    let html = "<div>";
    currentKeranjang.forEach((item, idx) => {
        html += `<div class="cart-item">
                    <div><strong>${item.nama}</strong><br>${item.jumlah} x ${item.satuanTerpilih} (${formatRp(item.hargaSatuan)})</div>
                    <div>${formatRp(item.subtotal)} <button class="icon-btn" onclick="hapusDariKeranjang(${idx})">❌</button></div>
                 </div>`;
    });
    html += `<div class="total-price">Total: ${formatRp(hitungTotal())}</div>
             <button class="primary" onclick="simpanTransaksi()">✅ Simpan Transaksi</button>
             </div>`;
    container.innerHTML = html;
    document.getElementById("totalBayar").innerText = formatRp(hitungTotal());
}

async function simpanTransaksi() {
    if (currentKeranjang.length === 0) {
        showToast("Keranjang kosong");
        return;
    }
    const total = hitungTotal();
    const transaksi = {
        usahaId: currentUsahaId,
        tanggal: new Date().toISOString(),
        items: JSON.parse(JSON.stringify(currentKeranjang)),
        total: total
    };
    await addItem("history", transaksi);
    currentKeranjang = [];
    renderKeranjang();
    showToast("Transaksi tersimpan");
    // refresh halaman history jika terbuka
    if (document.querySelector("nav button.active")?.dataset.page === "history") {
        loadHistoryPage();
    }
}