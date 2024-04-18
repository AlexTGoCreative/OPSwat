const express = require('express');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Endpoint POST pentru a trimite un fișier la MetaDefender Cloud API
app.post('/scan', async (req, res) => {
    const filePath = "C:/Users/tlbal/Desktop/OPSwat_1/1234.txt"; //Calea Absoluta
    const apiKey = 'ba7f6fcac646f0f73971ecb95e54b33f'; // Cheia API

    if (!fs.existsSync(filePath)) {
        return res.status(400).json({ error: 'File not found' });
    }

    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath));//Cream un obiect nou care contine continutul fisierului 

    try {
        const response = await axios.post('https://api.metadefender.com/v4/file', formData, { //Face cererea POST catre URL si asteptam un raspuns 
            headers: {
                'apikey': apiKey,
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                'rule': req.header('rule') || 'sanitize',
                'multiscan': req.header('multiscan') || 'false',
                'dip': req.header('dip') || 'false',
                'cdr': req.header('cdr') || 'false',
                'sandbox': 'windows10',
            }
        });

        return res.status(200).json(response.data); //Trimitem catre client 
    } catch (error) {
        return res.status(500).json({ error: error.message }); //Verificam erorile
    }
});

// Endpoint GET pentru a obține datele ID primite la POST
app.get('/scan/:id', (req, res) => {
    const dataId = req.params.id; //Extrag id-ul

    // Înlocuiește acest console.log cu codul pentru a obține datele ID din MetaDefender Cloud API
    console.log(`GET request received for data ID: ${dataId}`);

    return res.status(200).json({ id: dataId }); //Returnez ID catre client 
});

app.listen(PORT, () => {
    console.log(`Serverul rulează pe portul ${PORT}`);
}).on('error', (err) => {
    console.error('Eroare la pornirea serverului:', err.message);
});