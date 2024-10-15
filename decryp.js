function shiftCipherDecrypt() {
    // Mengambil nilai dari input dengan id="plain" (teks yang akan didekripsi)
    let ciphertext = document.getElementById("chiper").value.trim();

    // Validasi jika ciphertext kosong
    if (ciphertext === "") {
        document.getElementById("hasil").innerHTML = "Teks tidak boleh kosong.";
        return;
    }

    // Inisialisasi variabel untuk menyimpan semua kemungkinan hasil dekripsi
    let possibleDecryptions = '';

    // Looping untuk mencoba semua nilai kunci (0 hingga 25)
    for (let key = 0; key < 26; key++) {
        let decryptedText = ''; // Hasil dekripsi untuk setiap kunci

        // Looping untuk setiap karakter pada ciphertext
        for (let i = 0; i < ciphertext.length; i++) {
            let char = ciphertext[i]; // Mengambil karakter ke-i pada ciphertext

            // Dekripsi huruf besar (A-Z)
            if (char >= 'A' && char <= 'Z') {
                let newChar = String.fromCharCode(((char.charCodeAt(0) - 65 - key + 26) % 26) + 65);
                decryptedText += newChar;
            }
            // Dekripsi huruf kecil (a-z)
            else if (char >= 'a' && char <= 'z') {
                let newChar = String.fromCharCode(((char.charCodeAt(0) - 97 - key + 26) % 26) + 97);
                decryptedText += newChar;
            }
            // Jika bukan huruf, tetap ditambahkan tanpa perubahan (misal: spasi, angka, simbol)
            else {
                decryptedText += char;
            }
        }

        // Tambahkan hasil dekripsi untuk kunci saat ini ke daftar kemungkinan dekripsi
        possibleDecryptions += `Kunci ${key}: ${decryptedText}<br>`;
    }

    // Menampilkan semua hasil dekripsi di div dengan id="hasil"
    document.getElementById("hasil").innerHTML = possibleDecryptions;
}