//Llamar a express

const express = require('express');
const app = express();

//Middleware
app.use((req, res, next) => {
    console.log('Hola Mundo!');
    next();
});

app.get('/mi_ruta', function(req, res){
    res.send('Hola mundo :D !');
});

app.listen(5500, function () {
    console.log('El servidor express corre en el puerto 5500');
});