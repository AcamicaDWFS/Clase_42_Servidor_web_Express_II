// Manejo del módulo http 
const http = require("http");
const fs = require("fs");

// Elimina los comentarios de bloque para ver el funcionamiento del código
// Creamos el servidor "Hola mundo"
/* let server = http.createServer(function (req, res) {
    console.log(req.url);
    console.log(req.headers);
    console.log(req.httpVersion);
    console.log(req.statusCode);
    console.log(req.url);
    res.writeHead(200, {
        "Content-Type": "text/html"
    });
    res.end("<h1>Hola mundo</h1>");
}); */


/* let server = http.createServer(function (req, res) {
    console.log(req.url);
    fs.readFile('./public/index.html', function (error, data) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
    });
}); */

/* let server = http.createServer(function (req, res) {
    console.log(req.url);
    if (req.url === "/") {
        fs.readFile('./public/index.html', function (error, data) {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
        });   
    } else if (req.url === "/image/logo.png") {
        fs.readFile('./public/image/logo.pngindex.html', function (error, data) {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
        });  
    }
}); */

/* let server = http.createServer(function (req, res) {
    console.log(req.url);
    if (req.url === "/") {
        fs.readFile('./public/index.html', function (error, data) {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
        });
    } else if (req.url === "/image/logo.png") {
        fs.readFile('./public/image/logo.pngindex.html', function (error, data) {
            res.writeHead(200, { "Content-Type": "image/png" });
            res.end(data);
        });
    } else {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("P&aacute;gina no encontrada");
    }
}); */


// Indicamos en que puerto queremos escuchar: 8300
server.listen(8300);

console.log("Esperando request en el puerto 8300");