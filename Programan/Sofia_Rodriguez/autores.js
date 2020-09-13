const express = require("express");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Server en el puerto 3000
app.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000");
});


//Authors and books classes
class Autor {
    constructor(id, nombre, apellido, fechaDeNacimiento) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.fechaDeNacimiento = fechaDeNacimiento;
        this.libros = new Array ();
    }
}

class Libro {
    constructor(id, titulo, descripcion, anioPublicacion) {
        this.id = id;
        this.titulo = titulo,
        this.descripcion = descripcion;
        this.anioPublicacion = anioPublicacion;
    }
}

//Array de autores
let autores = new Array();

//POST para crear autores (sin libros)
app.post( '/autores', validarExistencia, (req, res) => {
    const autor = new Autor(req.body.id, req.body.nombre, req.body.apellido, req.body.fechaDeNacimiento);
    autores.push(autor);
    res.json(autores);
});

//Middleware para autores
function validarExistencia(req, res, next){
    const { id } = req.body;
    const i = autores.findIndex(c => {
        return c.id == id;
    });

    if(i >= 0) {
        return res.status(400)
        .json("El autor ya existe");
    }

    return next();
}

//GET para todos los autores
app.get('/autores/',(req,res) => {
    res.json(autores);
});

//GET autor con id
app.get('/autores/:id', validarPorId, (req, res) => {
    const id = req.params.id;
    const i = autores.findIndex(c => {
        return c.id == id;
    });
    res.json(autores[i]);
});

//DELETE autor con id
app.delete('/autores/:id', validarPorId, (req, res) => {
    const id = req.params.id;
    const i = autores.findIndex(c => {
        return c.id == id;
    });
    res.json(`El autor ${autores[i].nombre} ${autores[i].apellido} ha sido eliminado`);
    autores.splice([i],1);
});

//PUT autor con id
app.put('/autores/:id', validarPorId, (req, res) => {
    const id = req.params.id;
    const i = autores.findIndex(c => {
        return c.id == id;
    });
    res.json(`El autor ${autores[i].nombre} ${autores[i].apellido} ha sido modificado`);
    autores[i] = new Autor(req.params.id, req.body.nombre, req.body.apellido, req.body.fechaDeNacimiento);
});


//POST de libros para autor por ID
app.post('/autores/:id/libros', validarPorId, validarLibroPorId, (req, res) => {
    const id = req.params.id;
    const i = autores.findIndex(c => {
        return c.id == id;
    });

    const libro = new Libro(req.body.id, req.body.titulo, req.body.descripcion, req.body.anioPublicacion);
    autores[i].libros.push(libro);
    res.json(autores[i]);
});

//Middleware para validar ID de libro
function validarLibroPorId(req, res, next){
    const idAutor = req.params.id;
    const i = autores.findIndex(c => {
        return c.id == idAutor;
    });

    if(i >= 0) {
        const { id } = req.body;
        const x = autores[i].libros.findIndex(c => {
            return c.id == id;
    }); 
    if(x >= 0){
        return res.status(400)
        .json("El libro ya existe");
    } 
    }

    return next();
}

//GET de todos los libros
app.get('/autores/:id/libros', validarPorId, (req, res) =>{
    const id = req.params.id;
    const i = autores.findIndex(c => {
        return c.id == id;
    });
    res.json(autores[i].libros);
});

//GET de libros por ID de libro y autor
app.get('/autores/:id/libros/:idLibro', validarPorId, validaLibro, (req, res) => {
    const id = req.params.id;
    const i = autores.findIndex(c => {
        return c.id == id;
    });
    const idLibro = req.params.idLibro;
    const x = autores[i].libros.findIndex(d => {
        return d.id == idLibro;
    });
    res.json(autores[i].libros[x]);
});

//PUT de libros por ID de libro y autor
app.put('/autores/:id/libros/:idLibro', validarPorId, validaLibro, (req, res) => {
    const id = req.params.id;
    const i = autores.findIndex(c => {
        return c.id == id;
    });
    const idLibro = req.params.idLibro;
    const x = autores[i].libros.findIndex(d => {
        return d.id == idLibro;
    });
    
    res.json(`El libro ${autores[i].libros[x].titulo} ha sido modificado`);
    autores[i].libros[x] = new Libro(req.params.idLibro, req.body.titulo, req.body.descripcion, req.body.anioPublicacion);
});

//DELETE de libros por ID de libro y autor
app.delete('/autores/:id/libros/:idLibro', validarPorId, validaLibro, (req, res) => {
    const id = req.params.id;
    const i = autores.findIndex(c => {
        return c.id == id;
    });
    const idLibro = req.params.idLibro;
    const x = autores[i].libros.findIndex(d => {
        return d.id == idLibro;
    });
    
    res.json(`El libro ${autores[i].libros[x].titulo} ha sido eliminado`);
    autores[i].libros.splice([x],1);
});

//Middleware para autores y libros po ID
function validaLibro(req, res, next){
    const idAutor = req.params.id;
    const i = autores.findIndex(c => {
        return c.id == idAutor;
    });

    if(i >= 0) {
        const idLibro = req.params.idLibro;
        const x = autores[i].libros.findIndex(c => {
            return c.id == idLibro;
    }); 
    if(x < 0){
        return res.status(400)
        .json("El libro no existe");
    } 
    }
    return next();
}

//Middleware para autores por ID
function validarPorId(req, res, next){
    const id = req.params.id;
    const i = autores.findIndex(c => {
        return c.id == id;
    });

    if(i < 0) {
        return res.status(400)
        .json("El autor no existe");
    }

    return next();
}


