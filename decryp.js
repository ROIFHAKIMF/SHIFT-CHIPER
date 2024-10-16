// Frekuensi huruf paling umum dalam bahasa Inggris
const englishLetterFrequency = ['E', 'T', 'A', 'O', 'I', 'N', 'S', 'H', 'R', 'D', 'L', 'C', 'U', 'M', 'W', 'F', 'G', 'Y', 'P', 'B', 'V', 'K', 'J', 'X', 'Q', 'Z'];

// Fungsi untuk menghitung frekuensi huruf dalam teks cipher
function calculateFrequency(text) {
    let frequency = {};
    for (let char of text) {
        char = char.toUpperCase();
        if (char >= 'A' && char <= 'Z') {
            frequency[char] = (frequency[char] || 0) + 1;
        }
    }
    return frequency;
}

// Fungsi untuk mengurutkan huruf berdasarkan frekuensi kemunculan
function sortFrequency(frequency) {
    let sorted = Object.keys(frequency).sort((a, b) => frequency[b] - frequency[a]);
    return sorted;
}

// Fungsi dekripsi menggunakan analisis frekuensi dan menampilkan beberapa hasil yang mungkin
function shiftCipherDecryptWithFrequencyAnalysis() {
    let ciphertext = document.getElementById("chiper").value.trim();

    if (ciphertext === "") {
        document.getElementById("hasil").innerHTML = "Teks tidak boleh kosong.";
        return;
    }

    // Hitung frekuensi huruf dalam teks cipher
    let frequency = calculateFrequency(ciphertext);
    console.log("Frekuensi:", frequency);

    // Urutkan huruf berdasarkan frekuensi kemunculan
    let sortedChars = sortFrequency(frequency);
    console.log("Huruf terurut berdasarkan frekuensi:", sortedChars);

    // Tampilkan beberapa hasil dekripsi
    let possibleDecryptions = '';

    // Coba beberapa huruf yang sering muncul (misalnya bandingkan dengan 'E', 'T', 'A', dll.)
    for (let assumedChar of englishLetterFrequency.slice(0, 5)) { // Coba 5 huruf paling umum dalam bahasa Inggris
        let mostFrequentChar = sortedChars[0]; // Huruf paling sering muncul di cipher
        let key = (mostFrequentChar.charCodeAt(0) - assumedChar.charCodeAt(0) + 26) % 26;

        let decryptedText = '';
        for (let i = 0; i < ciphertext.length; i++) {
            let char = ciphertext[i];

            if (char >= 'A' && char <= 'Z') {
                let newChar = String.fromCharCode(((char.charCodeAt(0) - 65 - key + 26) % 26) + 65);
                decryptedText += newChar;
            } else if (char >= 'a' && char <= 'z') {
                let newChar = String.fromCharCode(((char.charCodeAt(0) - 97 - key + 26) % 26) + 97);
                decryptedText += newChar;
            } else {
                decryptedText += char; // Karakter lain tidak diubah
            }
        }

        possibleDecryptions += `Asumsi '${assumedChar}' adalah huruf paling umum, kunci: ${key} -> ${decryptedText}<br>`;
    }

    // Tampilkan hasil dekripsi yang memungkinkan
    document.getElementById("hasil").innerHTML = possibleDecryptions;
}
