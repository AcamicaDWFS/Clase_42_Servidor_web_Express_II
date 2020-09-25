const express = require("express");
const compression = require("compression");
const bodyParser = require('body-parser');
const { parse } = require("path");
const { nextTick } = require("process");
let app = express();
const port = 4000;
app.use(compression());

app.listen(port, () => {
    console.log(`Aperturando el puerto... http://localhost:${port}`);
});

let users = [
    {id: 1, nombre: "Pepe", email: "pepe@nada.com"},
    {id: 2, nombre: "Hugo", email: "hugo@nada.com"},
    {id: 3, nombre: "Juan", email: "juan@nada.com"}
];

//Validar con un middleware el nombre
app.use(validar_nombre);

//Buscar a una persona con id
app.get("/get_person", function (req, res) {
    let id_person = req.query.id;
    
    let user_id = users.findIndex((user) => user.id == id_person );
    
    let respuesta;

    //Respuesta
    if (user_id.length == 0 || user_id == -1 ){
        respuesta = {
            error : true,
            codigo : 502,
            mensaje : "Ese usuario no existe",
            person : users[user_id]
        }
        res.status(502).send(respuesta);
    } else {
        respuesta = {
            error : false,
            codigo: 200,
            mensaje : "El usuario sí existe",
            person : users[user_id]
        }
        res.send(respuesta);
    }
} );

//Buscar a una persona con el nombre

app.get("/get_name", function (req, res){
    let id_nombre = req.query.nombre;

    let user_nombre = users.findIndex((user) => user.nombre == id_nombre );

    let respuesta;

    //Respuesta
    if (user_nombre == -1 ){
        respuesta = {
            error : true,
            codigo : 502,
            mensaje : "Ese nombre de usuario no existe",
            person : users[user_nombre]
        }
        res.status(502).send(respuesta);
    } else {
        respuesta = {
            error : false,
            codigo: 200,
            mensaje : "Ese nombre de usuario sí existe",
            person : users[user_nombre]
        }
        res.send(respuesta);
    }
} );

function validar_nombre (req, res, next) {
    let id_nombre = req.query.nombre;
    let id_person = req.query.id;
    let respuesta;
    let bandera_1 = true;
    let bandera_2 = true;
        
    if (id_nombre == null || id_nombre == undefined || id_nombre == "" ||  !isNaN(parseInt(id_nombre))) {
        bandera_1 = false;
    }        

    if (id_person == null || id_person == undefined || id_person == "" || isNaN(parseInt(id_person))) {
        bandera_2 = false;
    }

    if (bandera_1 == false && bandera_2 == false) {
        respuesta = {
         error : true,
         mensaje : "Verifica el nombre o id escrito, no puede estar vacío"
        }
        res.status(400).send(respuesta);
    }
    next();        
} 


