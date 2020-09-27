const express = require("express");
const compression = require("compression");
const bodyParser = require('body-parser');
let app = express();
const port = 4000;
app.use(compression());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Aperturando el puerto... http://localhost:${port}`);
});

let books = [
    {
        id: 1,
        nombre: "Jorge Luis",
        apellido: "Borges",
        fechaDeNacimiento: "24/08/1899",
        libros: [
            {
                id: 1,
                titulo: "Ficciones",
                descripcion: "Se trata de uno más de sus...",
                anioPublicacion: 1944
            },
            {
                id: 2,
                titulo: "El Aleph",
                descripcion: "Otra recocpilacion de cuentos...",
                anioPublicacion: 1949
            }
        ]
    },
    {
        id: 2,
        nombre: "Mario",
        apellido: "Benedetti",
        fechaDeNacimiento: "14/09/1920",
        libros: [
            {
                id: 1,
                titulo: "La tregua",
                descripcion: "Un hombre mayor se enamora...",
                anioPublicacion: 1960
            },
            {
                id: 2,
                titulo: "Buzón de tiempo",
                descripcion: "Recopilación de cuentos de diversos temas..",
                anioPublicacion: 1999
            }
        ]
    },
    {
        id: 3,
        nombre: "Julio",
        apellido: "Cortázar",
        fechaDeNacimiento: "26/08/1914",
        libros: [
            {
                id: 1,
                titulo: "Rayuela",
                descripcion: "Su obra más conocida...",
                anioPublicacion: 1963
            },
            {
                id: 2,
                titulo: "Historias de cronopios y de famas",
                descripcion: "Cuentos surrealistas acerca de...",
                anioPublicacion: 1962
            }
        ]
    }
];


//LLAMADO DEL MIDDLEWARE CON UNA URL ESPECÍFICA NO IMPORTANDO EL MÉTODO
app.use("/autores/:id", validar_autor);

//GET DEVUELVE TODOS LOS AUTORES
app.get("/autores", function (req, res) {
    let autores = [];

    books.forEach(element => {
        let autor = {
            id: element.id,
            nombre: element.nombre,
            apellido: element.apellido,
            fechaDeNacimiento: element.fechaDeNacimiento
        }
        autores.push(autor);
    });

    let respuesta = {
        error: false,
        codigo: 200,
        mensaje: "Los autores encontrados son los siguientes...",
        autores: autores
    };

    res.send(respuesta);
});

//POST CREAR UN NUEVO AUTOR
app.post("/autores", function (req, res) {
    let new_autor = req.body;
    let new_id = books.length + 1;
    new_autor.id = new_id;
    books.push(new_autor);

    if (validarData(new_autor.nombre) && validarData(new_autor.apellido)
        && validarData(new_autor.fechaDeNacimiento)) {
        let respuesta = {
            error: false,
            codigo: 200,
            mensaje: "El autor se ha registrado con éxito"
        };
        res.send(respuesta);
    } else {
        let respuesta = {
            error: true,
            codigo: 400,
            mensaje: "Revisa nuevamente los datos ingresados."
        }
        res.status(400).send(respuesta);
    }

});

//FUNCION PARA VALIDAR LOS DATOS INGRESADOS DE UN NUEVO AUTOR
function validarData(input) {

    if (input == "" || input == undefined || input == null) {
        return false;
    }
    return true;
}

//GET PARA ENCONTRAR EL AUTOR CON SU ID
app.get("/autores/:id", function (req, res) {
    //PARAMS VA SOBRE LA URL
    let id_autor = req.params.id;
    
    let findId = books.filter((autor) => autor.id == id_autor);

    let respuesta;

    if (findId.length == 0) {
        respuesta = {
            error : true,
            codigo : 404,
            mensaje : "Ese identificador de autor no existe"
        }
        res.status(404).send(respuesta);
    } else {
        respuesta = {
            error : false,
            codigo : 200,
            mensaje : "La información del id del autor es la siguiente...",
            autor: findId
        }
        res.send(respuesta);
    }
});

//DELETE PARA ELIMINAR EL AUTOR CON SU ID
app.delete("/autores/:id", function (req, res) {
    //PARAMS VA SOBRE LA URL
    let id_autor = req.params.id;
    
    let findId = books.findIndex((autor) => autor.id == id_autor);

    let respuesta;

    if (findId == -1) {
        respuesta = {
            error : true,
            codigo : 404,
            mensaje : "Ese identificador de autor no existe"
        }
        res.status(404).send(respuesta);
    } else {
        //Si hay un id creado, lo eliminamos
        if (findId > -1) {
            books.splice(findId, 1)
        }

        respuesta = {
            error : false,
            codigo : 200,
            mensaje : "La información del id del autor ha sido eliminada...",
            autor: findId
        }
        res.send(respuesta);
    }
});


//PUT PARA MODIFICAR CON EL ID LA INFOR DEL AUTOR
app.put("/autores/:id", function (req, res) {
    //PARAMS VA SOBRE LA URL
    let id_autor = req.params.id;
    
    let findId = books.filter((autor) => autor.id == id_autor);

    let respuesta;

    if (findId.length == 0) {
        respuesta = {
            error : true,
            codigo : 404,
            mensaje : "Ese identificador del autor no existe"
        }
        res.status(404).send(respuesta);

    } else if (!req.body.nombre || !req.body.apellido) {
        respuesta = {
            error : true,
            codigo : 502,
            mensaje : "La información de nombre y apellido es requerida..."
        }
        res.status(502).send(respuesta);
    } else {
        let new_info = findId[0];
        new_info.nombre = req.body.nombre;
        new_info.apellido = req.body.apellido;

        respuesta = {
            error : false,
            codigo : 200,
            mensaje : "La información ha sido actualizada..."
        }
        res.send(respuesta);
    }
});

//MIDDLEWARE PARA VALIDAR QUE EL ESCRITOR EXISTA EN EL ARRAY
function validar_autor (req, res, next) {
    //PARAMS VA SOBRE LA URL
    let id_autor = req.params.id;
    console.log(id_autor);
    let findId = books.filter((autor) => autor.id == id_autor);
    console.log(findId);
    let respuesta;

    if (findId.length != 0) {
        next();        
    } else {
        //Si hay un id que no existe entonces..
        respuesta = {
            error : true,
            codigo : 404,
            mensaje : "La información del id del autor no existe..."
        }
        res.status(404).send(respuesta);
    }  
}