# Instrucciones

- (Opcional) Crear un archivo .env y dentro de él crear una variable de entorno llamada PORT, asignar el puerto deseado.

- Se puede ejecutar el servidor con el comando "npm start" o simplemente "node myApp.js".

## Endpoints.

### /autores

- GET: Devuelve todos los autores dentro del array.
- POST: Permite crear un autor y añadirlo al array. Dentro del body enviar: nombre, apellido, fechaNacimiento; todos de tipo String.

### /autores/:id

- GET: Devuelve el autor con el ID indicado.
- DELETE: Elimina el autor con el ID indicado.
- PUT: Modifica el autor con el ID indicado. Dentro del body se puede enviar: nombre, apellido, fechaNacimiento; todos de tipo String y cada uno es opcional.

### /autores/:id/libros

- GET: Devuelve todos los libros de un autor.
- POST: Agrega un nuevo libro al autor. Dentro del body enviar: titulo, descripcion, anioPublicacion; todos de tipo String.

### /autores/:id/libros/:idLibro

- GET: Devuelve el libro con el id indicado del autor.
- DELETE: Elimina el libro con el id indicado del autor.
- PUT: Modifica el libro con el id indicado del autor. Dentro del body se pueden enviar: titulo, descripcion, anioPublicacion; todos de tipo String.
