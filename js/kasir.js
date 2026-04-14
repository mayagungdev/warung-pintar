let currentKeranjang = []; // { produkId, nama, harga, jumlah, isEceran, subtotal }

function tambahKeKeranjang(produk, jumlah) {
    const subtotal = produk.harga * jumlah;
    currentKeranjang.push({
        produkId: produk.id,
        nama: produk.nama,
        harga: produk.harga,
        jumlah: jumlah,
        isEceran: produk.isEceran,
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
        document.getElementById("totalBayar").innerText = "Rp 0";
        return;
    }
    let html = "<ul style='list-style:none; padding:0'>";
    currentKeranjang.forEach((item, idx) => {
        html += `<li class='card' style='margin:8px 0; display:flex; justify-content:space-between'>
                    <div><strong>${item.nama}</strong><br>${item.jumlah} x ${formatRp(item.harga)}</div>
                    <div>${formatRp(item.subtotal)} <button class="icon-btn" onclick="hapusDariKeranjang(${idx})">❌</button></div>
                 </li>`;
    });
    html += "</ul>";
    container.innerHTML = html;
    document.getElementById("totalBayar").innerText = formatRp(hitungTotal());
}

async function simpanTransaksi(usahaId, metodeNota) {
    if (currentKeranjang.length === 0) {
        showToast("Keranjang kosong");
        return;
    }
    const total = hitungTotal();
    const transaksi = {
        usahaId: usahaId,
        tanggal: new Date().toISOString(),
        items: JSON.parse(JSON.stringify(currentKeranjang)),
        total: total,
        metodeNota: metodeNota // "thermal" atau "pdf"
    };
    await addItem("history", transaksi);
    // Cetak nota
    cetakNota(transaksi, metodeNota);
    currentKeranjang = [];
    renderKeranjang();
    showToast("Transaksi tersimpan");
    loadHistoryPage(); // refresh history jika terbuka
}

function cetakNota(transaksi, metode) {
    const notaHTML = `
    <div class="nota-print" style="font-family: monospace; padding: 16px;">
        <h3>Warung Pintar</h3>
        <p>Tanggal: ${new Date(transaksi.tanggal).toLocaleString()}</p>
        <hr>
        <table style="width:100%">
            <tr><th>Barang</th><th>Jumlah</th><th>Harga</th><th>Subtotal</th></tr>
            ${transaksi.items.map(item => `
                <tr><td>${item.nama}</td><td>${item.jumlah}</td><td>${formatRp(item.harga)}</td><td>${formatRp(item.subtotal)}</td></tr>
            `).join('')}
        </table>
        <hr>
        <h4>Total: ${formatRp(transaksi.total)}</h4>
        <p>Terima kasih</p>
    </div>
    `;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html><head><title>Nota</title>
        <style>body { font-family: monospace; } table { width:100%; border-collapse: collapse; } td, th { border-bottom:1px solid #ccc; padding:4px; }</style>
        </head><body>${notaHTML}</body></html>
    `);
    printWindow.document.close();
    if (metode === "pdf") {
        printWindow.print(); // print to PDF
    } else {
        printWindow.print(); // thermal tetap print, user bisa pilih printer
    }
} 