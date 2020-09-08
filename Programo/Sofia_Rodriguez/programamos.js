const express = require("express");
const bodyParser = require('body-parser');
const { URLSearchParams } = require("url");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Server en el puerto 3000
app.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000");
});


//Persona class
class Persona {
    constructor(id, nombre, email) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
    }
}

//Array de personas
let personas = new Array();

//POST para crear a las personas
app.post( '/personas/', validarExistencia, (req, res) => {
    const persona = new Persona(req.body.id, req.body.nombre, req.body.email);
    personas.push(persona);
    res.json(personas);
});

//Middleware para validar que no existan ya esa persona
function validarExistencia(req, res, next){
    const { id } = req.body;
    const i = personas.findIndex(c => {
        return c.id == id;
    });

    if(i >= 0) {
        return res.status(400)
        .json("Esta persona ya existe");
    }

    return next();
}

//GET persona por ID
app.get('/personas/:id', validarPorId, (req, res) => {
    const id = req.params.id;
    const i = personas.findIndex(c => {
        return c.id == id;
    });
    res.json(personas[i]);
});

//Middleware para autores por ID
function validarPorId(req, res, next){
    const id = req.params.id;
    const i = personas.findIndex(c => {
        return c.id == id;
    });

    if(i < 0) {
        return res.status(400)
        .json("Esta persona no existe");
    }

    return next();
}

// GET persona por nombre ** AUN NO SIRVE **
app.get('/personas/', /*validarQueryParams,*/ (req, res) => {
    const params = new URLSearchParams(window.location.search);
    let nameParam = params.get('nombre');
    personas.forEach(e => {
        if (nameParam == e.nombre) {
            return res.status(200)
            .json(`Resultado ${e.nombre}`);
        }
    });
    
});
