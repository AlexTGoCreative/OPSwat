const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');

const filePath = "C:/Users/tlbal/Desktop/OPSwat_1/1234.txt";

// Funcția de pornire a programului
async function start() {
    try {
        // Verificăm dacă fișierul există
        await fs.promises.access(filePath, fs.constants.F_OK);
    } catch (error) {
        console.error("Fișierul nu există la calea specificată:", error.message);
        return; // Oprim execuția programului dacă fișierul lipsește
    }

    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath));

    const config = {
        headers: {
            'apikey': 'ba7f6fcac646f0f73971ecb95e54b33f',
            'multiscan': 'true', // Adăugăm headerele suplimentare pentru cererea POST
            'dlp': 'true',
            'cdr': 'true',
            'sandbox': 'windows10'
        }
    };

    try {
        const response = await axios.post('https://api.metadefender.com/v4/file', formData, config);
        console.log(response.data);
    } catch (error) {
        if (error.response) {
            // Dacă există un răspuns HTTP, afișează mesajul de eroare
            console.error("Eroare la efectuarea cererii HTTP:", error.response.data);
        } else {
            // Dacă nu există un răspuns HTTP, afișează eroarea generată de biblioteca Axios
            console.error("Eroare la efectuarea cererii HTTP:", error.message);
        }
    }
}

// Apelăm funcția de pornire a programului
start();