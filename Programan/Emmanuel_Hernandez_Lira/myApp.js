require('dotenv/config');

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');

const writers = require('./writers'); // Arreglo de autores.

// Body-parser middleware.
app.use(bodyParser.json());

// ------------------------------- MIDDLEWARES --------------------------------
// Middleware utilizado para corroborar que el autor exista en el array.
function checkAuthorID(req, res, next) {
  const authorsIDs = writers.map((author) => author.id);
  const idx = authorsIDs.indexOf(parseInt(req.params.id));

  if (idx !== -1) {
    req.idx = idx;
    next();
    return;
  }

  res.json({ status: 404, message: 'El autor no se ha encontrado.' });
}

app.use('/autores/:id', checkAuthorID);

// Middleware utilizado para corroborar que un libro de un autor exista.
app.use('/autores/:id/libros/:idLibro', checkAuthorID, (req, res, next) => {
  const books = writers[req.idx].libros;
  const booksIDs = books.map((book) => book.id);
  const bookIdx = booksIDs.indexOf(parseInt(req.params.idLibro));

  if (bookIdx !== -1) {
    req.bookIdx = bookIdx;
    next();
    return;
  }

  res.json({ status: 404, message: 'El libro no se ha encontrado.' });
});

// -------------------------------- ENDPOINTS ---------------------------------
// Endpoint que devuelve todos los autores.
app.get('/autores', (req, res) => {
  res.json(writers);
});

// Endpoint para añadir un autor al array.
app.post('/autores', (req, res) => {
  const newAuthor = req.body;
  const lastID = writers[writers.length - 1].id;

  const { nombre, apellido, fechaDeNacimiento } = newAuthor;

  if (nombre && apellido && fechaDeNacimiento) {
    newAuthor.id = lastID + 1;
    newAuthor.libros = [];

    writers.push(newAuthor);

    res.json({ status: 200, message: 'Autor añadido.', result: newAuthor });
  } else {
    res.json({ status: 400, message: 'Debes enviar todos los campos.' });
  }
});

// Permite obtener un autor especifico en base al ID proporcionado.
app.get('/autores/:id', (req, res) => {
  res.send(writers[req.idx]);
});

// Permite eliminar un autor específico en base al ID proporcionado.
app.delete('/autores/:id', (req, res) => {
  writers.splice(req.idx, 1); // Elimina el elemento del arreglo.

  res.json({
    status: 200,
    message: `El autor con el ID: ${req.params.id}, se ha eliminado.`,
  });
});

app.put('/autores/:id', (req, res) => {
  const { nombre, apellido, fechaDeNacimiento } = req.body;
  const authorToModify = writers[req.idx];

  if (nombre) authorToModify.nombre = nombre;
  if (apellido) authorToModify.apellido = apellido;
  if (fechaDeNacimiento) authorToModify.fechaDeNacimiento = fechaDeNacimiento;

  res.json({
    status: 200,
    message: 'El autor se ha modificado.',
    result: writers[req.idx],
  });
});

// Endpoint para obtener todos los libros de un autor.
app.get('/autores/:id/libros', (req, res) => {
  const libros = writers[req.idx].libros;

  res.json(libros);
});

// Endpoint para añadir un libro y asociarlo con un autor.
app.post('/autores/:id/libros', (req, res) => {
  const libros = writers[req.idx].libros;
  const lastID = libros[libros.length - 1].id;
  const newBook = req.body;
  const { titulo, descripcion, anioPublicacion } = newBook;

  if (titulo && descripcion && anioPublicacion) {
    newBook.id = lastID + 1;

    libros.push(newBook);

    res.json({ status: 200, message: 'Libro añadido.', result: newBook });
  } else {
    res.json({ status: 400, message: 'Debes enviar todos los campos.' });
  }
});

// Endpoint que permite obtener un libro de un autor determinado.
app.get('/autores/:id/libros/:idLibro', (req, res) => {
  const author = writers[req.idx];
  const book = author.libros[req.bookIdx];

  res.json(book);
});

// Endpoint que permite modificar un libro de un autor determinado.
app.put('/autores/:id/libros/:idLibro', (req, res) => {
  const author = writers[req.idx];
  const book = author.libros[req.bookIdx];
  const { titulo, descripcion, anioPublicacion } = req.body;

  if (titulo) book.titulo = titulo;
  if (descripcion) book.descripcion = descripcion;
  if (anioPublicacion) book.anioPublicacion = anioPublicacion;

  res.json({
    status: 200,
    message: 'El libro se ha modificado.',
    result: book,
  });
});

app.delete('/autores/:id/libros/:idLibro', (req, res) => {
  const author = writers[req.idx];
  const books = author.libros;

  books.splice(req.bookIdx, 1);

  res.json({
    status: 200,
    message: `El libro con el ID: ${req.params.idLibro} del autor con el ID: ${req.params.id} se ha eliminado.`,
  });
});

//-----------------------------------------------------------------------------

// Inicia el servidor.
app.listen(port, () => {
  console.log(`Server is now listening at port: ${port}`);
});
