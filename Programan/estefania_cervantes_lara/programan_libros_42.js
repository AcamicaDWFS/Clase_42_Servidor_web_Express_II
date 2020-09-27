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
app.use("/autores/:id/libros", validar_autor);

//LLAMADO DEL MIDDLEWARE PARA VALIDAR EL ID EXISTENTE DE UN LIBRO DE UN AUTOR
app.use("/autores/:id/libros/:idLibro", validar_libro_autor);

//GET DEVUELVE TODOS LOS LIBROS DE UN AUTOR CON SU ID
app.get("/autores/:id/libros", function (req, res) {
    //PARAMS VA SOBRE LA URL
    let id_autor = req.params.id;
    let findId = books.filter((autor) => autor.id == id_autor);
    let respuesta;
    let libros = [];

    findId.forEach(element => {
        let libro = element.libros;
        libros = libros.concat(libro);
    });

    if (findId.length == 0) {
        respuesta = {
            error: true,
            codigo: 404,
            mensaje: "Ese identificador de autor no existe"
        }
        res.status(404).send(respuesta);
    } else {
        respuesta = {
            error: false,
            codigo: 200,
            mensaje: "Los libros de dicho autor son los siguientes...",
            libros: libros
        }
        res.send(respuesta);
    }
});

//POST CREAR UN NUEVO LIBRO DE UN AUTOR
app.post("/autores/:id/libros", function (req, res) {
    //PARAMS VA SOBRE LA URL
    let id_autor = req.params.id;
    let new_libro = req.body;
    let findId = books.findIndex((autor) => autor.id == id_autor);
    let respuesta;
    let new_id = books[findId].libros.length + 1;
    new_libro.id = new_id;
    books[findId].libros.push(new_libro);

    if (validarData(new_libro.titulo) && validarData(new_libro.descripcion)
        && validarData(new_libro.anioPublicacion)) {
        respuesta = {
            error: false,
            codigo: 200,
            mensaje: "El libro se ha registrado con éxito"
        };
        res.send(respuesta);
    } else {
        respuesta = {
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

//MIDDLEWARE PARA VALIDAR QUE EL ESCRITOR EXISTA EN EL ARRAY
function validar_autor(req, res, next) {
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
            error: true,
            codigo: 404,
            mensaje: "La información del id del autor no existe..."
        }
        res.status(404).send(respuesta);
    }
}


//GET DEVUELVE UN LIBRO CON EL ID DEL AUTOR
app.get("/autores/:id/libros/:idLibro", function (req, res) {
    //PARAMS VA SOBRE LA URL
    let id_autor = req.params.id;
    let id_libro = req.params.idLibro;
    let respuesta;
    let findId_autor = books.findIndex((autor) => autor.id == id_autor);
    let info_libro = books[findId_autor].libros.findIndex((libro) => libro.id == id_libro);
    let findId_libro = books[findId_autor].libros[info_libro];

    if (findId_libro == undefined) {
        respuesta = {
            error: true,
            codigo: 404,
            mensaje: "Ese identificador de libro no existe"
        }
        res.status(404).send(respuesta);
    } else {
        //Si hay un id creado, lo mostramos
        respuesta = {
            error: false,
            codigo: 200,
            mensaje: "La información de dicho libro es la siguiente...",
            libro: findId_libro
        }
        res.send(respuesta);
    }
});


//PUT DEVUELVE UN LIBRO CON EL ID DEL AUTOR PARA MODIFICARLO
app.put("/autores/:id/libros/:idLibro", function (req, res) {
    //PARAMS VA SOBRE LA URL
    let id_autor = req.params.id;
    let id_libro = req.params.idLibro;
    let respuesta;
    let findId_autor = books.findIndex((autor) => autor.id == id_autor);
    let info_libro = books[findId_autor].libros.findIndex((libro) => libro.id == id_libro);
    let findId_libro = books[findId_autor].libros[info_libro];

    if (findId_libro == undefined) {
        respuesta = {
            error: true,
            codigo: 404,
            mensaje: "Ese identificador de libro no existe"
        }
        res.status(404).send(respuesta);
    } else if (validarData(findId_libro.titulo) || validarData(findId_libro.descripcion)
        || validarData(findId_libro.anioPublicacion)) {
        //Si hay un id creado, lo mostramos        

        if (validarData(req.body.titulo)) {
            findId_libro.titulo = req.body.titulo;
        }

        if (validarData(req.body.descripcion)) {
            findId_libro.descripcion = req.body.descripcion;
        }

        if (validarData(req.body.anioPublicacion)) {
            findId_libro.anioPublicacion = req.body.anioPublicacion;
        }

        respuesta = {
            error: false,
            codigo: 200,
            mensaje: "La información de libro ha sido actualizada...",
            libro: findId_libro
        }
        res.send(respuesta);
    }
});


//DELETE DEVUELVE UN LIBRO CON EL ID DEL AUTOR PARA ELIMINARLO
app.delete("/autores/:id/libros/:idLibro", function (req, res) {
    //PARAMS VA SOBRE LA URL
    let id_autor = req.params.id;
    let id_libro = req.params.idLibro;
    let respuesta;
    let findId_autor = books.findIndex((autor) => autor.id == id_autor);
    let info_libro = books[findId_autor].libros.findIndex((libro) => libro.id == id_libro);
    let findId_libro = books[findId_autor].libros[info_libro];
    let arrayLibros = books[findId_autor].libros;

    if (findId_libro == undefined) {
        respuesta = {
            error: true,
            codigo: 404,
            mensaje: "Ese identificador de libro no existe"
        }
        res.status(404).send(respuesta);
    } else {
        //Si hay un id creado, lo mostramos
        if (arrayLibros.length > -1) {
            arrayLibros.splice(findId_libro, 1);
        }

        respuesta = {
            error: false,
            codigo: 200,
            mensaje: "El libro ha sifo eliminado...",
            libro: findId_libro
        }
        res.send(respuesta);
    }
});

//MIDDLEWARE PARA VALIDAR QUE EL LIBRO CORRESPONDA AL AUTOR
function validar_libro_autor (req,res,next) {
//PARAMS VA SOBRE LA URL
let id_autor = req.params.id;
let id_libro = req.params.idLibro;
let respuesta;
let findId_autor = books.findIndex((autor) => autor.id == id_autor);
let info_libro = books[findId_autor].libros.findIndex((libro) => libro.id == id_libro);

if (info_libro == -1) {
    respuesta = {
        error: true,
        codigo: 404,
        mensaje: "Ese identificador de libro no existe en este autor"
    }
    res.status(404).send(respuesta);
} else {
    next();
}
};