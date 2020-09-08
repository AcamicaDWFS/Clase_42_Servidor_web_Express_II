// Ejecuta primero el archivo bigFile.js
// Jueguen con tamaños mayores del archivo big.file

const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
    fs.readFile('./big.file', (err, data) => {
        if (err) throw err;

        res.end(data);
    });
});

server.listen(8000);