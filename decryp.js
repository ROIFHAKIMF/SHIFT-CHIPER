// Variabel global untuk grafik agar dapat dihancurkan saat diperbarui
let Chartchiper;
let Chartenglish;
let Chartindo;

// Event listener untuk input textarea agar hanya menerima huruf dan spasi
function decryptUsingFrequencyAnalysis() {
    const chipertext = document.getElementById("chiper").value.trim().toUpperCase();
    if (chipertext === "") {
        document.getElementById('hasil').innerHTML = "Input tidak boleh kosong";
        return;
    }

    let letterCount = {};
    let totalLetters = 0;

    // Hitung frekuensi kemunculan huruf dalam cipher text
    for (let char of chipertext) {
        if (char >= 'A' && char <= 'Z') {
            letterCount[char] = (letterCount[char] || 0) + 1;
            totalLetters++;
        }
    }

    // Temukan huruf dengan frekuensi tertinggi dalam cipher text
    let sortedCipherLetters = Object.keys(letterCount).sort((a, b) => letterCount[b] - letterCount[a]);
    let mostCommonCipherLetter = sortedCipherLetters[0]; // Huruf paling umum dalam cipher text

    // Deteksi bahasa yang aktif
    let mostCommonLanguageLetter;
    const switchIndonesia = document.getElementById('SwitchIndonesia').checked;

    if (switchIndonesia) {
        // Huruf paling umum dalam bahasa Indonesia
        mostCommonLanguageLetter = 'A'; // Misalnya, huruf paling umum adalah 'A'
    } else {
        // Huruf paling umum dalam bahasa Inggris
        mostCommonLanguageLetter = 'E'; // Huruf paling umum dalam bahasa Inggris
    }

    // Hitung kunci sebagai perbedaan nilai ASCII
    let key = mostCommonCipherLetter.charCodeAt(0) - mostCommonLanguageLetter.charCodeAt(0);
    key = (key + 26) % 26; // Normalisasi kunci antara 0 dan 25

    // Dekripsi dengan menggunakan kunci
    let decryptedText = "";
    for (let char of chipertext) {
        if (char >= 'A' && char <= 'Z') {
            // Geser huruf sesuai kunci
            let newCharCode = ((char.charCodeAt(0) - 65 - key + 26) % 26) + 65; // 65 adalah kode ASCII untuk 'A'
            decryptedText += String.fromCharCode(newCharCode);
        } else {
            decryptedText += char; // Jika bukan huruf, biarkan karakter asli
        }
    }

    // Tampilkan hasil
    displayResults(decryptedText, mostCommonCipherLetter, mostCommonLanguageLetter, key);
}


// Fungsi untuk menampilkan hasil dekripsi
function displayResults(decryptedText, mostCommonCipherLetter, mostCommonLanguageLetter, key) {
    let resultDiv = document.getElementById('hasil');
    resultDiv.innerHTML = `<strong>Hasil Dekripsi:</strong><br>${decryptedText}<br><br>`;
    resultDiv.innerHTML += `<strong>Huruf Paling Umum dalam Cipher Text:</strong> ${mostCommonCipherLetter}<br>`;
    resultDiv.innerHTML += `<strong>Huruf Paling Umum dalam Bahasa yang di pilih:</strong> ${mostCommonLanguageLetter}<br>`;
    resultDiv.innerHTML += `<strong>Kunci yang Digunakan:</strong> ${key}<br><br>`;
}

// Fungsi untuk menampilkan frekuensi huruf dalam bahasa Indonesia
function listindoletter() {
    const indonesianLetterFrequency = {
    'A': 11.5, 'I': 9.8, 'N': 8.7, 'E': 8.5, 'T': 7.4, 'U': 7.0,
    'R': 6.8, 'O': 5.7, 'K': 5.2, 'L': 5.0, 'M': 4.6, 'S': 4.5,
    'D': 3.5, 'P': 3.2, 'B': 2.7, 'G': 2.1, 'H': 1.9, 'Y': 1.7,
    'J': 1.4, 'C': 1.3, 'W': 1.2, 'F': 0.9, 'Z': 0.5, 'Q': 0.3,
    'V': 0.2, 'X': 0.1
    };
    
    
    let result = "Frekuensi huruf dalam bahasa Indonesia standar:<br>";
    for (let letter in indonesianLetterFrequency) {
        result += `Huruf ${letter}: ${indonesianLetterFrequency[letter]}%<br>`;
    }
    
    document.getElementById("indo-freq").innerHTML = result; // Tampilkan hasil di elemen dengan ID indo-freq
    displayChart3(indonesianLetterFrequency);
}


// Fungsi untuk menampilkan frekuensi huruf dalam bahasa Inggris
function listeglishletter() {
    const englishLetterFrequency = {
        'E': 12.70, 'T': 9.06, 'A': 8.17, 'O': 7.51, 'I': 6.97, 'N': 6.75,
        'S': 6.33, 'H': 6.09, 'R': 5.99, 'D': 4.25, 'L': 4.03, 'C': 2.78,
        'U': 2.76, 'M': 2.41, 'W': 2.36, 'F': 2.23, 'G': 2.02, 'Y': 1.97,
        'P': 1.93, 'B': 1.29, 'V': 0.98, 'K': 0.77, 'X': 0.15, 'J': 0.15,
        'Q': 0.10, 'Z': 0.07
    };
    let result = "Frekuensi huruf dalam bahasa Inggris standar:<br>";
    for (let letter in englishLetterFrequency) {
        result += `Huruf ${letter}: ${englishLetterFrequency[letter]}%<br>`;
    }
    document.getElementById("english-freq").innerHTML = result;
    displayChart2(englishLetterFrequency);
}

// Fungsi untuk menghitung frekuensi huruf dalam cipher text
function Listchiperletter() {
    const chipertext = document.getElementById("chiper").value.trim().toUpperCase();
    let letterCount = {};
    let totalLetters = 0;

    // Hitung frekuensi kemunculan huruf dalam ciphertext
    for (let char of chipertext) {
        if (char >= 'A' && char <= 'Z') {
            letterCount[char] = (letterCount[char] || 0) + 1;
            totalLetters++;
        }
    }

    // Daftar lengkap huruf alfabet
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let letterFrequencies = {};

    // Inisialisasi frekuensi huruf menjadi 0 jika tidak ditemukan di ciphertext
    for (let letter of alphabet) {
        if (letter in letterCount) {
            letterFrequencies[letter] = (letterCount[letter] / totalLetters) * 100;
        } else {
            letterFrequencies[letter] = 0;
        }
    }

    // Urutkan huruf berdasarkan frekuensi tertinggi
    let sortedFrequencies = Object.keys(letterFrequencies).sort((a, b) => letterFrequencies[b] - letterFrequencies[a]);

    let result = 'Frekuensi huruf dalam cipher text:<br>';
    for (let letter of sortedFrequencies) {
        result += 'Huruf ' + letter + ': ' + letterFrequencies[letter].toFixed(2) + '%<br>';
    }

    document.getElementById('cipher-freq').innerHTML = result;
    displayChart1(letterFrequencies);
}

// Fungsi untuk menampilkan grafik frekuensi huruf dalam cipher text
function displayChart1(letterFrequencies) {
    const ctx1 = document.getElementById('Chartchiper').getContext('2d');

    // Hancurkan grafik sebelumnya jika ada
    if (Chartchiper) Chartchiper.destroy();

    // Mengambil label dan data dari frekuensi huruf
    const labels = Object.keys(letterFrequencies).sort((a, b) => letterFrequencies[b] - letterFrequencies[a]);
    const data = labels.map(letter => letterFrequencies[letter]);

    Chartchiper = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Frekuensi Huruf Cipher Text (%)',
                data: data,
                backgroundColor: 'rgba(58,90,121,0.8)',
                borderColor: 'rgba(5, 5, 66, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                }
            }
        }
    });
}

// Fungsi untuk menampilkan grafik frekuensi huruf dalam bahasa Inggris
function displayChart2(englishLetterFrequency) {
    const ctx2 = document.getElementById('Chartenglish').getContext('2d');

    // Hancurkan grafik sebelumnya jika ada
    if (Chartenglish) Chartenglish.destroy();

    const labels2 = Object.keys(englishLetterFrequency);
    const data2 = Object.values(englishLetterFrequency);

    Chartenglish = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: labels2,
            datasets: [{
                label: 'Frekuensi Huruf ENG (%)',
                data: data2,
                backgroundColor: 'rgba(58,90,121,0.8)',
                borderColor: 'rgba(5, 5, 66, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 15,
                }
            }
        }
    });
}
function displayChart3(indonesianLetterFrequency) {
    const ctx3 = document.getElementById('Chartindo').getContext('2d');

    // Hancurkan grafik sebelumnya jika ada
    if (Chartindo) Chartindo.destroy();

    const labels3 = Object.keys(indonesianLetterFrequency);
    const data3 = Object.values(indonesianLetterFrequency);

    Chartindo = new Chart(ctx3, {
        type: 'bar',
        data: {
            labels: labels3,
            datasets: [{
                label: 'Frekuensi Huruf IND (%)',
                data: data3,
                backgroundColor: 'rgba(58,90,121,0.8)',
                borderColor: 'rgba(5, 5, 66, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 15,
                }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const SwitchIndonesia = document.getElementById('SwitchIndonesia');
    const SwitchEnglish = document.getElementById('SwitchEnglish');
    
    SwitchIndonesia.addEventListener('change', function () {
        const indoFreqContainer = document.getElementById('indo-freq');
        const englishFreqContainer = document.getElementById('english-freq');
        const chartIndo = document.getElementById('Chartindo');
        const chartEnglish = document.getElementById('Chartenglish');
        
        if (this.checked) {
            indoFreqContainer.style.display = 'block'; // Tampilkan frekuensi Indonesia
            chartIndo.style.display = 'block'; // Tampilkan chart Indonesia
            englishFreqContainer.style.display = 'none'; // Sembunyikan frekuensi Inggris
            chartEnglish.style.display = 'none'; // Sembunyikan chart Inggris
            listindoletter(); // Panggil fungsi untuk memuat data bahasa Indonesia
        }
    });

    SwitchEnglish.addEventListener('change', function () {
        const indoFreqContainer = document.getElementById('indo-freq');
        const englishFreqContainer = document.getElementById('english-freq');
        const chartIndo = document.getElementById('Chartindo');
        const chartEnglish = document.getElementById('Chartenglish');
        
        if (this.checked) {
            englishFreqContainer.style.display = 'block'; // Tampilkan frekuensi Inggris
            chartEnglish.style.display = 'block'; // Tampilkan chart Inggris
            indoFreqContainer.style.display = 'none'; // Sembunyikan frekuensi Indonesia
            chartIndo.style.display = 'none'; // Sembunyikan chart Indonesia
            listeglishletter(); // Panggil fungsi untuk memuat data bahasa Inggris
        }
    });
});





// Fungsi utama untuk memanggil proses dekripsi dan analisis frekuensi cipher text
function decryption() {
    const chipertext = document.getElementById("chiper").value.trim().toUpperCase();
    
    if (chipertext === "") {
        document.getElementById('hasil').innerHTML = "Input tidak boleh kosong";
        document.getElementById('cipher-freq').innerHTML = "";

        // Sembunyikan grafik jika input kosong
        document.getElementById('Chartchiper').style.display = 'none';
        return;
    }

    decryptUsingFrequencyAnalysis(); // Proses dekripsi
    Listchiperletter(); // Analisis huruf cipher text

    // Tampilkan grafik Cipher Text jika ada input
    document.getElementById('Chartchiper').style.display = 'block';
}



