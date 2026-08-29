const fs = require('fs');
const path = require('path');
const https = require('https');

// 1. Definisikan Struktur Folder
const dirs = [
    path.join(__dirname, 'assets', 'css'),
    path.join(__dirname, 'assets', 'webfonts')
];

// Membuat folder jika belum ada
dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// 2. Daftar File Font Awesome yang Harus Diunduh
const BASE_URL = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0';
const filesToDownload = [
    {
        url: `${BASE_URL}/css/all.min.css`,
        dest: path.join(__dirname, 'assets', 'css', 'all.min.css')
    },
    {
        url: `${BASE_URL}/webfonts/fa-solid-900.woff2`,
        dest: path.join(__dirname, 'assets', 'webfonts', 'fa-solid-900.woff2')
    },
    {
        url: `${BASE_URL}/webfonts/fa-regular-400.woff2`,
        dest: path.join(__dirname, 'assets', 'webfonts', 'fa-regular-400.woff2')
    }
];

// Fungsi helper untuk mengunduh file via HTTPS
function downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Gagal mengunduh. Status Code: ${response.statusCode}`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`✓ Berhasil mengunduh: ${path.basename(dest)}`);
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => {}); 
            reject(err);
        });
    });
}

// Eksekusi proses unduh
async function main() {
    console.log("Memulai setup aset offline...");
    try {
        for (const file of filesToDownload) {
            await downloadFile(file.url, file.dest);
        }
        console.log("\n Setup Selesai! Semua aset kini tersimpan secara lokal di folder /assets.");
    } catch (error) {
        console.error("Terjadi kesalahan saat mengunduh aset:", error);
    }
}

main();