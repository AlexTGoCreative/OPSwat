const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.get('/:filename', async (req, res) => {
    try {
        const filename = req.params.filename;
        const options = {
            method: 'GET',
            url: 'https://api.metadefender.com/v4/file/${filename}',
            headers: {
                apikey: '4gg5f4123eg4gg7a58d502dfc3f2898g',
                'x-file-metadata': 1
            }
        };

        const response = await axios(options);
        const fileData = response.data;

        // Poți face ce dorești cu datele despre fișier aici
        console.log(fileData);

        res.send(fileData); // Trimite datele despre fișier ca răspuns către client
    } catch (error) {
        console.error(error);
        res.status(500).send('Eroare internă a serverului');
    }
});

app.listen(port, () => {
    console.log('Serverul ascultă pe portul ${port}');
});