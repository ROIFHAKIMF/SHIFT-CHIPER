// Frekuensi huruf paling umum dalam bahasa Inggris
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

function Listchiperletter() {
    let chipertext = document.getElementById("chiper").value.trim().toUpperCase();
    if (chipertext === "") {
        document.getElementById('hasil').innerHTML = "Input tidak boleh kosong";
        return;
    }

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

    document.getElementById('hasil').innerHTML = result;

    // Tampilkan chart
    displayChart1(letterFrequencies);
}

function displayChart1(letterFrequencies) {
    const ctx1 = document.getElementById('Chartchiper').getContext('2d');
    
    // Daftar lengkap huruf alfabet (A-Z)
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
    
    // Buat array nilai frekuensi dengan urutan alfabet, termasuk 0 untuk huruf yang tidak ada
    const data1 = alphabet.map(letter => letterFrequencies[letter] || 0);
    
    const Chartchiper = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: alphabet,  // Tampilkan semua huruf A-Z sebagai label
            datasets: [{
                label: 'Frekuensi Huruf Cipher Text (%)',
                data: data1,  // Data dari frekuensi huruf, 0 jika tidak ada
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                }
            }
        }
    });
}

function displayChart2(englishLetterFrequency) {
    const ctx2 = document.getElementById('Chartenglish').getContext('2d');
    const labels2 = Object.keys(englishLetterFrequency);
    const data2 = Object.values(englishLetterFrequency);

    const Chartenglish = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: labels2,
            datasets: [{
                label: 'Frekuensi Huruf (%)',
                data: data2,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                }
            }
        }
    });
}

// Fungsi untuk memanggil dua analisis sekaligus
function decryption() {
    listeglishletter(); // Frekuensi huruf bahasa Inggris
    Listchiperletter(); // Analisis huruf cipher text
}
