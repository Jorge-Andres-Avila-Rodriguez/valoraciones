export const RECETAS_COMUNIDAD = [
  {
    id: 128,
    nombre: 'Pasta Penne Doria con Rodajas Ranchera Zenú',
    descripcion:
      'Sopa hogareña con el toque especial de hierbas de huerta, tomates asados y reducción suave en mantequilla.',
    tiempo: '25 min',
    porciones: 4,
    ahorro: '45% despensa',
  },
]

export const USUARIOS_COMUNIDAD = [
  { id: 1, nombre: 'Carlos Restrepo', ubicacion: 'Medellín · Chef Nivel 3', iniciales: 'CR' },
  { id: 2, nombre: 'Lucía Cárdenas', ubicacion: 'Cali · Hogar Chef', iniciales: 'LC' },
  { id: 3, nombre: 'Mariana Morales', ubicacion: 'Bogotá · Creadora', iniciales: 'MM' },
  { id: 4, nombre: 'Felipe Arias', ubicacion: 'Ibagué · Asesor Culinario', iniciales: 'FA' },
  { id: 5, nombre: 'Ana Gómez', ubicacion: 'Bucaramanga · Chef Nivel 2', iniciales: 'AG' },
]

export const VALORACIONES_COMUNIDAD = [
  { id: 1, idReceta: 128, idUsuario: 1, calificacion: 5 },
  { id: 2, idReceta: 128, idUsuario: 2, calificacion: 5 },
  { id: 3, idReceta: 128, idUsuario: 3, calificacion: 5 },
  { id: 4, idReceta: 128, idUsuario: 4, calificacion: 4 },
  { id: 5, idReceta: 128, idUsuario: 5, calificacion: 4 },
]

// 1.4 Reseñas completas
export const RESENAS_COMUNIDAD = [
  {
    id: 1,
    idReceta: 128,
    idUsuario: 1,
    calificacion: 5,
    sabor: 5,
    facilidad: 5,
    ahorro: 5,
    fecha: 'Hace 2 h',
    comentario:
      '¡Excelente combinación! Recomiendo dorar bien las rodajas de Ranchera con sartén de hierro antes de mezclar con la pasta. Doria le aporta ese sabor que todos aman.',
    conFoto: true,
    meGusta: 28,
    respuestas: 4,
  },
  {
    id: 2,
    idReceta: 128,
    idUsuario: 2,
    calificacion: 5,
    sabor: 5,
    facilidad: 4,
    ahorro: 5,
    fecha: 'Ayer',
    comentario:
      'Súper rápida para la cena de los niños. Solo necesité 1 paquete de pasta y 1 de Ranchera. Recomiendo agregar una cucharada de crema de leche o queso blanco costeño rallado encima.',
    conFoto: false,
    consejo: 'Truco: añade una cucharada de crema para una textura más suave.',
    meGusta: 15,
    respuestas: 2,
  },
  {
    id: 3,
    idReceta: 128,
    idUsuario: 4,
    calificacion: 4,
    sabor: 5,
    facilidad: 4,
    ahorro: 4,
    fecha: 'Hace 1 d',
    comentario:
      'El balance graso de la Ranchera Zenú liga perfecto con la textura cremosa de Doria Penne. Para un maridaje completo en casa, el aroma de una taza de Café Sello Rojo juega de maravilla la experiencia redonda.',
    conFoto: true,
    meGusta: 12,
    respuestas: 7,
  },
]