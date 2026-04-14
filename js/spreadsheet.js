async function fetchSpreadsheetData(csvUrl) {
    try {
        const response = await fetch(csvUrl);
        if (!response.ok) throw new Error("Gagal fetch CSV");
        const csvText = await response.text();
        const rows = csvText.trim().split(/\r?\n/);
        if (rows.length < 2) throw new Error("CSV kosong");
        
        const headers = rows[0].split(",").map(h => h.trim().toLowerCase());
        let namaIndex = headers.findIndex(h => h.includes("nama") || h.includes("barang"));
        let kategoriIndex = headers.findIndex(h => h.includes("kategori"));
        let hargaIndex = headers.findIndex(h => h.includes("harga"));
        let eceranIndex = headers.findIndex(h => h.includes("ecer") || h === "jenis");
        
        if (namaIndex === -1) namaIndex = 0;
        if (hargaIndex === -1) hargaIndex = 2;
        
        const produkList = [];
        for (let i = 1; i < rows.length; i++) {
            const cols = rows[i].split(",");
            if (cols.length <= Math.max(namaIndex, hargaIndex)) continue;
            let nama = cols[namaIndex]?.trim();
            let kategori = kategoriIndex !== -1 ? cols[kategoriIndex]?.trim() : "Umum";
            let harga = parseInt(cols[hargaIndex]?.trim());
            let isEceran = false;
            if (eceranIndex !== -1) {
                let val = cols[eceranIndex]?.trim().toLowerCase();
                isEceran = (val === "ecer" || val === "ya" || val === "true");
            }
            if (nama && !isNaN(harga)) {
                produkList.push({ nama, kategori, harga, isEceran });
            }
        }
        return produkList;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

// Simpan data produk ke IndexedDB berdasarkan usahaId
async function importProdukFromSheet(usahaId, csvUrl) {
    const produkBaru = await fetchSpreadsheetData(csvUrl);
    // Hapus produk lama untuk usaha ini
    const existing = await getByIndex("produk", "usahaId", usahaId);
    for (let prod of existing) {
        await deleteItem("produk", prod.id);
    }
    for (let p of produkBaru) {
        await addItem("produk", { ...p, usahaId });
    }
    return produkBaru.length;
}