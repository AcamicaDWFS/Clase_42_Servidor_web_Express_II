const writers = [
  {
    id: 1,
    nombre: 'Jorge Luis',
    apellido: 'Borges',
    fechaDeNacimiento: '24/08/1899',
    libros: [
      {
        id: 1,
        titulo: 'Ficciones',
        descripcion: 'Se trata de uno de sus más...',
        anioPublicacion: 1944,
      },
      {
        id: 2,
        titulo: 'El Aleph',
        descripcion: 'Otra recopilación de cuentos.',
        anioPublicacion: 1949,
      },
    ],
  },
  {
    id: 2,
    nombre: 'Andrew',
    apellido: 'Tanenbaum',
    fechaDeNacimiento: '16/03/1944',
    libros: [
      {
        id: 1,
        titulo: 'Sistemas operativos modernos',
        descripcion:
          'Fundamentos de sistemas operativos con código en lenguaje C.',
        anioPublicacion: 1992,
      },
    ],
  },
];

module.exports = writers;
