const axios = require('axios');

const options = {
    method: 'GET',
    url: 'https://api.metadefender.com/v4/file/bzI0MDQxOHNtTUdZVXEtZ1VIcEtNQzRldklo_mdaas',
    headers: {
        apikey: 'ba7f6fcac646f0f73971ecb95e54b33f',
        'x-file-metadata': 1
    }
};

axios(options)
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.error(error);
    });