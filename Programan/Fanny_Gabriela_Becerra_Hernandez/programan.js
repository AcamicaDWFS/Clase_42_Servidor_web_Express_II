const express = require('express'),
    app = express(),
    port = 3000,
    bodyParser = require('body-parser'),
    autorArray = [];

class Autor {
    constructor(id, nombre, apellido, fechaDeNacimiento, libros) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.fechaDeNacimiento = fechaDeNacimiento;
        this.libros = libros;
    }
}

class Book {
    constructor(id, titulo, descripcion, anioPublicacion) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.anioPublicacion = anioPublicacion;
    }
}

let book1 = new Book(1, 'Ficciones', 'Se trata uno de sus más...', 1944),
    book2 = new Book(1, 'Ficciones', 'Se trata uno de sus más...', 1944),
    autor1 = new Autor(1, 'Jorge Luis', 'Borges', '24/08/1899', { book1, book2 });

console.log('book1: ', book1);
console.log('book2: ', book2);
console.log('autor1: ', autor1);

//GET
app.get('/autores', (req, res) => {
    res.send('Get autors')
})

app.get('/autores/:id', (req, res) => {
    res.send('Get autor by id')
})

app.get('/autores/:id/libros', (req, res) => {
    res.send('Get books')
})

app.get('/autores/:id/libros/:idLibros', (req, res) => {
    res.send('Get book by id')
})

//POST
app.post('/autores', (req, res) => {
    //id, nombre, apellido, fechaDeNacimiento, libros
    if (!req.body.id || !req.body.nombre || !req.body.apellido || !req.body.fechaDeNacimiento || !req.body.libros) {
        respuesta = {
            error: true,
            codigo: 502,
            mensaje: 'Los campos id, nombre, apellido, fechaDeNacimiento y libros son requeridos. :('
        };
    } else {
        if (autor.id !== '' || autor.nombre !== '' || autor.apellido !== '' || autor.fechaDeNacimiento !== '' || autor.libros !== []) {
            respuesta = {
                error: true,
                codigo: 503,
                mensaje: '¡El autor ya fue creado anteriormente! :O'
            };
        } else {
            autor = {
                id: req.body.id,
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                fechaDeNacimiento: req.body.fechaDeNacimiento,
                libros: req.body.libros
            };
            respuesta = {
                error: false,
                codigo: 200,
                mensaje: '¡Autor creado!',
                respuesta: autor
            };
        }
    }
    res.send(respuesta);
})

app.post('/autores/:id/libros', (req, res) => {
    //id, titulo, descripcion, anioPublicacion
    if (!req.body.id || !req.body.titulo || !req.body.descripcion || !req.body.anioPublicacion) {
        respuesta = {
            error: true,
            codigo: 502,
            mensaje: 'Los campos id, titulo, descripcion y anioPublicacion son requeridos. :('
        };
    } else {
        if (libro.id !== '' || libro.titulo !== '' || libro.descripcion !== '' || libro.anioPublicacion !== '') {
            respuesta = {
                error: true,
                codigo: 503,
                mensaje: 'El libro ya fue creado anteriormente. D:'
            };
        } else {
            libro = {
                id: req.body.id,
                titulo: req.body.titulo,
                descripcion: req.body.descripcion,
                anioPublicacion: req.body.anioPublicacion
            };
            respuesta = {
                error: false,
                codigo: 200,
                mensaje: '¡Libro creado!',
                respuesta: libro
            };
        }
    }
    res.send(respuesta);
})

//PUT
app.put('/autores/:id', (req, res) => {
    res.send('Modify autor by id')
})

app.put('/autores/:id/libros/:idLibros', (req, res) => {
    res.send('Modify book by id')
})

//DELETE
app.delete('/autores/:id', (req, res) => {
    res.send('Delete autor by id')
})

app.delete('/autores/:id/libros/:idLibros', (req, res) => {
    res.send('Delete book by id')
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Escuchando en el puerto http://localhost:${port}`)
})