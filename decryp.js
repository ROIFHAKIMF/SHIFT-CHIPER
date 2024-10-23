document.getElementById("chiper").addEventListener("input", function(event) {
    let input = event.target.value;
    event.target.value = input.replace(/[^a-zA-Z\s]/, '');
});

function decryptUsingFrequencyAnalysis() {
    let chipertext = document.getElementById("chiper").value.trim().toUpperCase();
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

    // Tentukan huruf paling umum dalam bahasa Inggris
    const mostCommonEnglishLetter = 'E'; // Huruf paling umum dalam bahasa Inggris
    
    // Hitung kunci sebagai perbedaan nilai ASCII
    let key = mostCommonCipherLetter.charCodeAt(0) - mostCommonEnglishLetter.charCodeAt(0);
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
    displayResults(decryptedText, mostCommonCipherLetter, mostCommonEnglishLetter, key);
}

function displayResults(decryptedText, mostCommonCipherLetter, mostCommonEnglishLetter, key) {
    let resultDiv = document.getElementById('hasil');
    resultDiv.innerHTML = "<strong>Hasil Dekripsi:</strong><br>" + decryptedText + "<br><br>";
    resultDiv.innerHTML += `<strong>Huruf Paling Umum dalam Cipher Text:</strong> ${mostCommonCipherLetter}<br>`;
    resultDiv.innerHTML += `<strong>Huruf Paling Umum dalam Bahasa Inggris:</strong> ${mostCommonEnglishLetter}<br>`;
    resultDiv.innerHTML += `<strong>Kunci yang Digunakan:</strong> ${key}<br>`;
    resultDiv.innerHTML += `<br>`;
}


function listeglishletter() {
    const englishLetterFrequency = {
        'E': 12.70, 'T': 9.06, 'A': 8.17, 'O': 7.51, 'I': 6.97, 'N': 6.75,
        'S': 6.33, 'H': 6.09, 'R': 5.99, 'D': 4.25, 'L': 4.03, 'C': 2.78,
        'U': 2.76, 'M': 2.41, 'W': 2.36, 'F': 2.23, 'G': 2.02, 'Y': 1.97,
        'P': 1.93, 'B': 1.29, 'V': 0.98, 'K': 0.77, 'X': 0.15, 'J': 0.15,
        'Q': 0.10, 'Z': 0.07
    };
    let chipertext = document.getElementById("chiper").value.trim().toUpperCase();
    if (chipertext === "") {
        document.getElementById('hasil').innerHTML = "Input tidak boleh kosong";
        return;
    }
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
        document.getElementById('cipher-freq').innerHTML = "Input tidak boleh kosong";
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

    document.getElementById('cipher-freq').innerHTML = result;

    // Tampilkan chart
        displayChart1(letterFrequencies);
}

function displayChart1(letterFrequencies) {
    
    const ctx1 = document.getElementById('Chartchiper').getContext('2d');
    // Daftar lengkap huruf alfabet (A-Z)
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
    // Buat array objek berisi huruf dan frekuensi
    let frequencyArray = alphabet.map(letter => {
        return {
            letter: letter,
            frequency: letterFrequencies[letter] || 0  // Jika tidak ada, setel ke 0
        };
    });

    // Urutkan array objek berdasarkan frekuensi dari yang terbesar ke terkecil
    frequencyArray.sort((a, b) => b.frequency - a.frequency);

    // Ekstrak huruf dan frekuensi yang sudah diurutkan
    const sortedLetters = frequencyArray.map(item => item.letter);
    const sortedFrequencies = frequencyArray.map(item => item.frequency);

    const Chartchiper = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: sortedLetters,  // Tampilkan huruf yang sudah diurutkan
            datasets: [{
                label: 'Frekuensi Huruf Cipher Text (%)',
                data: sortedFrequencies,  // Data frekuensi yang sudah diurutkan
                backgroundColor: 'rgba(58,90,121,0.8)',
                borderColor: 'rgba(5, 5, 66, 1)',
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                // Plugin untuk mengubah warna background
                backgroundColor: 'rgba(220, 220, 220, 0.5)'  // Warna background chart
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
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
                backgroundColor: 'rgba(58,90,121,0.8)',
                borderColor: 'rgba(5, 5, 66, 1)',
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                // Plugin untuk mengubah warna background
                backgroundColor: 'rgba(220, 220, 220, 0.5)'  // Warna background chart
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max : 100,
                }
            }
        }
    });
}

// Fungsi untuk memanggil dua analisis sekaligus
function decryption() {
    let chipertext = document.getElementById("chiper").value.trim().toUpperCase();
    if (chipertext === "") {
        document.getElementById('hasil').innerHTML = "Input tidak boleh kosong";
        document.getElementById('english-freq').innerHTML = "";
        document.getElementById('cipher-freq').innerHTML = "";
        toggleStyle();
        return;
    }else{
        Listchiperletter(); // Analisis huruf cipher text
        listeglishletter(); // Frekuensi huruf bahasa Inggris
        decryptUsingFrequencyAnalysis();
    }
}

const buttonElement = document.getElementById("tombol");

function buttonclick(){
    buttonElement.classList.add("clicked")
    setTimeout(()=>{
        buttonElement.classList.remove("clicked");
    },300);
}
buttonElement.addEventListener('click',buttonclick);

const chartElement = document.getElementsByClassName("output");
function toggleStyle() {
    if(chartElement !== "") {
        chartElement.classList.add("clicked");
    } else {
        // Jika input kosong, hapus class .clicked
        chartElement.classList.remove("clicked");
    }
    // Tambahkan atau hapus kelas "clicked"
}