// 🔁 GANTI URL INI dengan link CSV dari Google Sheets Anda
const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ3B_3bz96kPXSafKlnY70baWV9cNjGDlR3Se7FgW_P8Hm_XKdsddjsWNx_WCDqYAmUf4gcAnMpPRhz/pub?gid=0&single=true&output=csv";

let barangData = [];
let chartInstance = null;

function formatRp(angka) {
    return "Rp " + new Intl.NumberFormat("id-ID").format(angka);
}

async function loadData() {
    const tableBody = document.getElementById("tableBody");
    const statsDiv = document.getElementById("stats");
    
    try {
        statsDiv.innerHTML = "⏳ Mengambil data dari Google Sheets...";
        
        const response = await fetch(SHEET_CSV_URL);
        if (!response.ok) throw new Error(`HTTP ${response.status}: Gagal ambil data`);
        
        const csvText = await response.text();
        console.log("CSV mentah (200 karakter pertama):", csvText.substring(0, 200));
        
        // Parse CSV sederhana (toleransi kutip)
        const rows = csvText.trim().split(/\r?\n/);
        if (rows.length < 2) throw new Error("File CSV hanya berisi header atau kosong");
        
        const headers = rows[0].split(",").map(h => h.trim().toLowerCase());
        console.log("Header terdeteksi:", headers);
        
        // Cari kolom yang paling mungkin
        let namaIndex = headers.findIndex(h => h.includes("nama") || h.includes("barang") || h === "produk");
        let kategoriIndex = headers.findIndex(h => h.includes("kategori") || h === "jenis" || h === "group");
        let hargaIndex = headers.findIndex(h => h.includes("harga") || h === "price" || h === "rp");
        
        // Jika tidak ditemukan, asumsikan urutan: nama, kategori, harga
        if (namaIndex === -1) namaIndex = 0;
        if (kategoriIndex === -1) kategoriIndex = 1;
        if (hargaIndex === -1) hargaIndex = 2;
        
        if (hargaIndex === -1) throw new Error("Tidak bisa menemukan kolom harga");
        
        barangData = [];
        for (let i = 1; i < rows.length; i++) {
            // Parse sederhana, abaikan kutip kompleks (asumsi tidak ada koma di dalam nilai)
            let cols = rows[i].split(",");
            if (cols.length <= Math.max(namaIndex, kategoriIndex, hargaIndex)) continue;
            
            let nama = cols[namaIndex]?.trim() || "Tanpa nama";
            let kategori = (kategoriIndex !== -1 && cols[kategoriIndex]) ? cols[kategoriIndex].trim() : "Lainnya";
            let harga = parseInt(cols[hargaIndex]?.trim());
            if (isNaN(harga)) continue; // skip baris harga tidak valid
            
            barangData.push({ nama, kategori, harga });
        }
        
        if (barangData.length === 0) throw new Error("Tidak ada data barang yang valid (periksa kolom harga)");
        
        // Sukses
        updateCategoryFilter();
        applyFiltersAndRender();
        statsDiv.innerHTML = "✅ Data berhasil dimuat (" + barangData.length + " barang)";
        
    } catch (error) {
        console.error(error);
        tableBody.innerHTML = `<tr><td colspan="3">❌ Error: ${error.message}<br><br>Pastikan:
        <ul><li>Link CSV benar dan dipublikasikan</li>
        <li>Kolom sheet berisi: nama_barang, kategori, harga (atau nama lain yang mirip)</li>
        <li>Tidak ada baris kosong di awal sheet</li></ul>
        Cek konsol browser untuk detail.</td></tr>`;
        statsDiv.innerHTML = "❌ Gagal memuat data: " + error.message;
    }
}

function updateCategoryFilter() {
    const kategoriSet = new Set(barangData.map(item => item.kategori));
    const select = document.getElementById("categoryFilter");
    select.innerHTML = '<option value="all">📁 Semua Kategori</option>';
    [...kategoriSet].sort().forEach(kat => {
        select.innerHTML += `<option value="${kat}">${kat}</option>`;
    });
}

function getFilteredData() {
    const search = document.getElementById("search").value.toLowerCase();
    const min = parseInt(document.getElementById("minPrice").value) || 0;
    const max = parseInt(document.getElementById("maxPrice").value) || Infinity;
    const kategori = document.getElementById("categoryFilter").value;
    
    return barangData.filter(item => {
        const matchNama = item.nama.toLowerCase().includes(search);
        const matchHarga = item.harga >= min && item.harga <= max;
        const matchKategori = (kategori === "all") || (item.kategori === kategori);
        return matchNama && matchHarga && matchKategori;
    });
}

function updateStatsAndTable(filtered) {
    if (!filtered.length) {
        document.getElementById("stats").innerHTML = "⚠️ Tidak ada barang dengan filter ini";
        document.getElementById("tableBody").innerHTML = `<tr><td colspan="3">Tidak ditemukan</td></tr>`;
        return;
    }
    
    const total = filtered.length;
    const termurah = Math.min(...filtered.map(i => i.harga));
    const termahal = Math.max(...filtered.map(i => i.harga));
    const rata = filtered.reduce((a,b) => a + b.harga, 0) / total;
    
    document.getElementById("stats").innerHTML = `
        <span>📦 ${total} barang</span>
        <span>⬇️ Termurah: ${formatRp(termurah)}</span>
        <span>⬆️ Termahal: ${formatRp(termahal)}</span>
        <span>📊 Rata-rata: ${formatRp(Math.round(rata))}</span>
    `;
    
    let html = "";
    filtered.forEach(item => {
        html += `<tr>
                    <td>${item.nama}</td>
                    <td>${item.kategori}</td>
                    <td>${formatRp(item.harga)}</td>
                 </tr>`;
    });
    document.getElementById("tableBody").innerHTML = html;
}

function updateChart(filtered) {
    const ctx = document.getElementById("priceChart").getContext("2d");
    if (chartInstance) chartInstance.destroy();
    
    const mapKategori = new Map();
    filtered.forEach(item => {
        if (!mapKategori.has(item.kategori)) mapKategori.set(item.kategori, []);
        mapKategori.get(item.kategori).push(item.harga);
    });
    const labels = [...mapKategori.keys()];
    const avgPrices = labels.map(kat => {
        const prices = mapKategori.get(kat);
        return prices.reduce((a,b) => a+b,0) / prices.length;
    });
    
    if (labels.length === 0) return;
    
    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Rata-rata Harga (Rp)',
                data: avgPrices,
                backgroundColor: '#f4a261',
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' },
                tooltip: { callbacks: { label: (ctx) => `Rp ${ctx.raw.toLocaleString('id-ID')}` } }
            },
            scales: {
                y: { ticks: { callback: (val) => 'Rp ' + val.toLocaleString('id-ID') } }
            }
        }
    });
}

function applyFiltersAndRender() {
    const filtered = getFilteredData();
    updateStatsAndTable(filtered);
    updateChart(filtered);
}

function bindEvents() {
    document.getElementById("search").addEventListener("input", applyFiltersAndRender);
    document.getElementById("minPrice").addEventListener("input", applyFiltersAndRender);
    document.getElementById("maxPrice").addEventListener("input", applyFiltersAndRender);
    document.getElementById("categoryFilter").addEventListener("change", applyFiltersAndRender);
}

// Jalankan
loadData();
bindEvents();
