# Instrucciones

- (Opcional) Crear un archivo .env y dentro de él crear una variable de entorno llamada PORT, asignar el puerto deseado.

- Se puede ejecutar el servidor con el comando "npm start" o simplemente "node myApp.js".

## Endpoints.

- /autores GET: Devuelve todos los autores dentro del array.
- /autores POST: Permite crear un autor y añadirlo al array. Dentro del body enviar:
  .._ nombre
  .._ apellido
  ..\_ fechaNacimiento

- /autores/:id GET: Devuelve el autor con el ID indicado.
- /autores/:id DELETE: Elimina el autor con el ID indicado.
- /autores/:id PUT: Modifica el autor con el ID indicado. Dentro del body se puede enviar:
  .._ nombre
  .._ apellido
  ..\_ fechaNacimiento

- /autores/:id/libros GET: Devuelve todos los libros de un autor.
- /autores/:id/libros POST: Agrega un nuevo libro al autor. Dentro del body enviar:
  .._ titulo
  .._ descripcion
  ..\_ anioPublicacion

- /autores/:id/libros/:idLibro GET: Devuelve el libro con el id indicado del autor.
- /autores/:id/libros/:idLibro DELETE: Elimina el libro con el id indicado del autor.
- /autores/:id/libros/:idLibro PUT: Modifica el libro con el id indicado del autor. Dentro del body se pueden enviar:
  .._ titulo
  .._ descripcion
  ..\_ anioPublicacion
