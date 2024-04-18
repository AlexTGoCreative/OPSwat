const express = require('express');
const fs = require('fs');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Definiți datele necesare pentru cererea către MetaDefender Cloud API
const apiKey = "4gg5f4123eg4gg7a58d502dfc3f2898g";
const filename = "1234.txt";
const rule = "sanitize";
const sandbox = "windows10";
const callbackurl = "https://webhook.site/ef078c05-d6f4-49ac-9d92-28b89aba6917";
const filePath = "C:/Users/tlbal/Desktop/OPSwat_1/1234.txt";

app.post('/scan', async (req, res) => {
    try {
        // Construiește configurația pentru cererea către MetaDefender Cloud API
        const formData = new FormData();
        formData.append('file', fs.createReadStream(filePath));

        const config = {
            headers: {
                'apikey': apiKey,
                'filename': filename,
                'Content-Type': 'multipart/form-data',
                'rule': rule,
                'sandbox': sandbox,
                'callbackurl': callbackurl
            }
        };

        // Trimite cererea către MetaDefender Cloud API
        const response = await axios.post('https://api.metadefender.com/v4/file', formData, config);

        // Returnează răspunsul de la MetaDefender Cloud API
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Eroare:', error.response.data);
        res.status(error.response.status || 500).json({ error: 'Eroare internă a serverului' });
    }
});

app.listen(PORT, () => {
    console.log('Serverul rulează pe portul ${PORT}');
});