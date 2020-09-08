/** 
 * Actividad: PROGRAMO
 * Ejemplos de Interceptores */
const express = require('express');
const bodyParser = require('body-parser');

//Puerto del servidor
const port = 3001;

//server
const server = express();

//array contactos
let contactos = [

];

// Agregamos el middleware para todas las rutas definidas
server.use(bodyParser.json());

/**
 * Se define un middleware que realiza la función de log
 * @param {Object} req solicitud de cliente
 * @param {Object} res respuesta para el cliente
 * @param {function next() {}} next envía la solicitud a la siguiente función que tiene resuelve la solicitud
 */
function log(req, res, next) {
    const { method, path, query, body } = req;
    console.log(`${method} - ${path} - ${JSON.stringify(query)} - ${JSON.stringify(body)}`);
    next();
}

// Agregamos el middleware para todas la rutas definidas
server.use(log);

//Agregamos el middleware solo a la ruta indicada
//server.use('/contacto', log);

//validar los datos del contacto
function validarContacto(req, res, next){
    const {nombre, apellido, email} = req.body;

    if(!nombre || !apellido || !email){
        return res.status(400).json('Datos del contacto invalido');
    }

    next();
}

//Valida si existe el contacto
function validarSiExiste(req, res, next) {
    const { email } = req.body;
    const i = contactos.findIndex(c => {
        return c.email == email;
    });

    if (i >= 0) {
        return res.status(409)
            .json('El contacto ya existe!!!');
    }

    return next();
}
// validar version del request
function validarVersion(req, res, next) {
    const { version } = req.query;
    const versionNumeric = Number(version);

    if (!version || !versionNumeric || versionNumeric < 5) {
        return res.status(422).json('Versión invalida!!!');
    }

    return next();
}

/**
 * Se recibe un objeto en el BODY del request.
 */
server.post('/contacto', validarContacto, validarSiExiste,(req, res)=>{
    contactos.push(req.body);
    res.json("Contacto agregado");
});

/**
 * Se recibe un query param del request.
 */
server.get('/demo', validarVersion, (req, res) => {
    res.json("Hola mundo!!!");
});

// Al acceder al homepage nos arroja un error
server.get('/', function (req, res) {
    throw new Error('BROKEN');
  })

//Manejo de errores
/**
 * Las funciones middleware de manejo de errores se definen misma manera las funciones middleware, 
 * excepto que las funciones de manejo de errores tienen CUATRO argumentos en lugar de tres.
 */
server.use((err, req, res, next) => {
    if (!err) {
        return next();
    }

    console.log(JSON.stringify(err));

    return res.status(500)
        .json("Se ha producido un error inesperado.");
});

/**
 * Inicialización del servidor
 */
server.listen(port, ()=>{
    console.log('Servidor iniciado');
})