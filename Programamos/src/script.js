const express = require('express');
const bodyParser = require('body-parser');
//const helmet = require("helmet");

var moment = require('moment'); // require
moment().format(); 

//Puerto del servidor
const port = 3000;

//server
const server = express();

//array contactos
let contactos = [
    {"id":1, "nombre": "Pepe", "email": "pepe@nada.com" },
    {"id":2, "nombre": "Jose", "email": "pepe2@nada.com" },
    {"id":3, "nombre": "Jose Luis", "email": "pepe@nada.com" },
    {"id":4, "nombre": "Gerardo", "email": "pepe@nada.com" },
    {"id":5, "nombre": "Pepe2", "email": "pepe@nada.com" }
];

// Agregamos el middleware para todas las rutas definidas
server.use(bodyParser.json());
//server.use(helmet());

/**
 * Se define un middleware que realiza la función de log
 * @param {Object} req solicitud de cliente
 * @param {Object} res respuesta para el cliente
 * @param {function next() {}} next envía la solicitud a la siguiente función que tiene resuelve la solicitud
 */
function log(req, res, next) {
    const { method, path, query, body, params } = req;
    //const {status, json} = res;
    console.log(`${moment(Date.now()).format('MMMM Do YYYY, h:mm:ss a')} Method: ${method} - Path: ${path} - Query: ${JSON.stringify(query)}  ${Object.keys(req.query).length} - Body: ${JSON.stringify(body)} - Params: ${JSON.stringify(params)}`);
    //console.log(`Status ${status} Respuesta ${json}`)
    next();
}

// Agregamos el middleware para todas la rutas definidas
server.use(log);


function sendByName(req, res, next){
    const {name} = req.query;
    
    let iCont;
    let ids = [];
    console.log(`name ${name}`)
    if(!name){
        next();
    }
    if (name.length == 0){
        next();
    }
    for(iCont = 0; iCont < contactos.length; iCont++){
        if(contactos[iCont].nombre.toUpperCase().includes(name.toUpperCase())) {
            ids.push(iCont);
        }
    }
    //Replace all the positions of the contacts by the contact´s info
    for(iCont= 0; iCont < ids.length; iCont++){
        ids[iCont] = contactos[ids[iCont]];
    }
    if(ids.length > 0){
        res.status(200).json(ids);
    }
    res.status(400).json("Not found");

}


server.get('/v1/contactos/', sendByName, (req, res) => {
    console.log(`Sending all the available records`);
    res.status(200).json(contactos);
});

function validateId(req, res, next) {
    const { userid } = req.params;  
    const idNumeric = Number(userid);  

    if (!idNumeric || idNumeric <= 0) {
        res.status(400).json('Incorrect format for Id');
    }    
    next();
}

server.get('/v1/contactos/:userid', validateId, (req, res) => {
    //if(Object.keys(req.query).length === 0)
    const { userid } = req.params;  
    const idNumeric = Number(userid);  

    const i = contactos.findIndex(c => {
        return c.id == userid;
    });
    if (i >= 0) {
        console.log(contactos[userid - 1]);
        return res.status(200).json(contactos[userid - 1]);
    }
    
    res.status(404).json(`Not found`);
});

/**
 * Inicialización del servidor
 */
server.listen(port, ()=>{
    console.log(`Servidor iniciado ${moment(Date.now()).format('MMMM Do YYYY, h:mm:ss a')} `);
})