async function backupData() {
    const usaha = await getAll("usaha");
    const produk = await getAll("produk");
    const history = await getAll("history");
    const backupObj = { usaha, produk, history, version: 1, date: new Date().toISOString() };
    const dataStr = JSON.stringify(backupObj, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `warung_backup_${new Date().toISOString().slice(0,19)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Backup berhasil");
}

async function restoreData(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const backup = JSON.parse(e.target.result);
                if (!backup.usaha || !backup.produk || !backup.history) throw new Error("Format backup salah");
                // Kosongkan semua store
                await clearStore("usaha");
                await clearStore("produk");
                await clearStore("history");
                // Restore
                for (let u of backup.usaha) await addItem("usaha", u);
                for (let p of backup.produk) await addItem("produk", p);
                for (let h of backup.history) await addItem("history", h);
                showToast("Restore berhasil");
                resolve();
            } catch (err) {
                reject(err);
            }
        };
        reader.onerror = () => reject(reader.error);
        reader.readAsText(file);
    });
}