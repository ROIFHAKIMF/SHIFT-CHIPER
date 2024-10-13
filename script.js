// Fungsi untuk mengenkripsi teks menggunakan Caesar Cipher
document.getElementById("plain").addEventListener("input", function(event) {
    let input = event.target.value;
    event.target.value = input.replace(/[^a-zA-Z\s]/g, '');
});
document.getElementById("kunci").addEventListener("input", function(event) {
    let input = event.target.value;
    event.target.value = input.replace(/[^0-9]/g, '');
});

let clearResultTimeout;

function shiftCipherEncrypt() {
    // Mengambil nilai dari input dengan id="plain" (teks yang akan dienkripsi)
    let plaintext = document.getElementById("plain").value;
    
    // Mengambil nilai dari input dengan id="kunci" (nilai shift untuk enkripsi)
    let key = parseInt(document.getElementById("kunci").value);

    // Validasi jika key bukan angka
    if (key == "" && plaintext == ""){
        document.getElementById("hasil").innerHTML = "Input tidak boleh kosong.";
        return;
    }

    if (isNaN(key)) {
        document.getElementById("hasil").innerHTML = "Kunci harus berupa angka.";
        return;
    }

    if(key <= 0){
        document.getElementById('hasil').innerHTML = "kunci harus berupa bilangan bulat positif";
        return;
    }


    let encryptedText = '';

    // Looping untuk setiap karakter pada plaintext
    for (let i = 0; i < plaintext.length; i++) {
        let char = plaintext[i]; // Mengambil karakter ke-i pada plaintext

        // Enkripsi huruf besar (A-Z)
        if (char >= 'A' && char <= 'Z') {
            let newChar = String.fromCharCode(((char.charCodeAt(0) - 65 + key) % 26) + 65);
            encryptedText += newChar;
        }
        // Enkripsi huruf kecil (a-z)
        else if (char >= 'a' && char <= 'z') {
            let newChar = String.fromCharCode(((char.charCodeAt(0) - 97 + key) % 26) + 97);
            encryptedText += newChar;
        }
        else {
            encryptedText += char;
        }
    }

    document.getElementById("hasil").innerHTML = "Hasil : " + encryptedText;

    clearTimeout(clearResultTimeout);

    clearResultTimeout = setTimeout(function() {
        let plaininput =  document.getElementById("plain");
        let kunciinput =  document.getElementById("kunci");
        let hasilDiv = document.getElementById("hasil");
        if (hasilDiv.innerHTML.trim() !== "") {
            hasilDiv.innerHTML = "";
            kunciinput.value = "";
            plaininput.value = "";
        }
    }, 30000);
}

const inputElement = document.getElementById("plain");
const kunciElement = document.getElementById("kunci");
const buttonElement = document.getElementById("tombol")
// Fungsi untuk menangani klik pada input
function toggleInputStyle() {
    inputElement.classList.add("clicked")
    setTimeout(()=>{
        inputElement.classList.remove("clicked");
    },1000); // Tambahkan atau hapus kelas "clicked"
}
function togglekunciStyle() {
    kunciElement.classList.add("clicked")
    setTimeout(()=>{
        kunciElement.classList.remove("clicked");
    },1000); // Tambahkan atau hapus kelas "clicked"
}
// Tambahkan event listener unuk menangani klik
inputElement.addEventListener("click", toggleInputStyle);
kunciElement.addEventListener("click", togglekunciStyle);

function buttonclick(){
    buttonElement.classList.add("clicked")
    setTimeout(()=>{
        buttonElement.classList.remove("clicked");
    },800);
}
buttonElement.addEventListener('click',buttonclick);
