function formatRp(angka) {
    return "Rp " + new Intl.NumberFormat("id-ID").format(angka);
}

function showToast(msg) {
    const toast = document.getElementById("toast");
    toast.innerText = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2000);
}