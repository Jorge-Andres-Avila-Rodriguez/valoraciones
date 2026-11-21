import {
  RECETAS_COMUNIDAD,
  RESENAS_COMUNIDAD,
  USUARIOS_COMUNIDAD,
  VALORACIONES_COMUNIDAD,
} from '../data/comunidad'

const STORAGE_KEY = 'sazon_comunidad_valoraciones'

function validarReceta(idReceta) {
  if (!RECETAS_COMUNIDAD.some((receta) => receta.id === Number(idReceta))) {
    throw new Error(`No existe la receta con ID ${idReceta}.`)
  }
}

function obtenerValoraciones() {
  if (typeof localStorage === 'undefined') {
    return VALORACIONES_COMUNIDAD.map((valoracion) => ({ ...valoracion }))
  }

  const guardadas = localStorage.getItem(STORAGE_KEY)
  if (!guardadas) {
    return VALORACIONES_COMUNIDAD.map((valoracion) => ({ ...valoracion }))
  }

  const valoraciones = JSON.parse(guardadas)
  if (!Array.isArray(valoraciones)) {
    throw new Error('Los datos guardados de valoraciones no tienen un formato válido.')
  }

  return valoraciones
}

function guardarValoraciones(valoraciones) {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(valoraciones))
  }
}

function calcularPromedio(idReceta, valoraciones) {
  const deReceta = valoraciones.filter((valoracion) => valoracion.idReceta === Number(idReceta))
  const suma = deReceta.reduce((total, valoracion) => total + valoracion.calificacion, 0)
  const distribucion = [5, 4, 3, 2, 1].map((estrellas) => ({
    estrellas,
    cantidad: deReceta.filter((valoracion) => valoracion.calificacion === estrellas).length,
  }))

  return {
    idReceta: Number(idReceta),
    promedio: deReceta.length === 0 ? 0 : suma / deReceta.length,
    totalValoraciones: deReceta.length,
    distribucion,
  }
}

export const comunidadService = {
  async obtenerPromedioReceta(idReceta) {
    validarReceta(idReceta)
    return calcularPromedio(idReceta, obtenerValoraciones())
  },

  async obtenerResenasReceta(idReceta) {
    validarReceta(idReceta)

    const resenasGuardadas = obtenerValoraciones()
      .filter(
        (valoracion) =>
          valoracion.idReceta === Number(idReceta) && valoracion.resenaPublicada === true,
      )
      .map((valoracion) => ({
        id: `valoracion-${valoracion.id}`,
        idReceta: Number(idReceta),
        idUsuario: valoracion.idUsuario,
        calificacion: valoracion.calificacion,
        sabor: valoracion.calificacion,
        facilidad: valoracion.calificacion,
        ahorro: valoracion.calificacion,
        fecha: valoracion.fecha || 'Ahora',
        comentario:
          valoracion.comentario?.trim() ||
          `Mi valoración para esta receta: ${valoracion.calificacion} estrellas.`,
        conFoto: false,
        meGusta: 0,
        respuestas: 0,
      }))

    return [
      ...resenasGuardadas,
      ...RESENAS_COMUNIDAD.filter((resena) => resena.idReceta === Number(idReceta)),
    ]
  },

  async enviarCalificacion(idReceta, calificacion, idUsuario = 3, detalles = {}) {
    validarReceta(idReceta)

    if (!Number.isInteger(calificacion) || calificacion < 1 || calificacion > 5) {
      throw new Error('La calificación debe ser un número entero entre 1 y 5.')
    }

    if (!USUARIOS_COMUNIDAD.some((usuario) => usuario.id === Number(idUsuario))) {
      throw new Error(`No existe el usuario con ID ${idUsuario}.`)
    }

    if (typeof detalles.comentario !== 'undefined' && typeof detalles.comentario !== 'string') {
      throw new Error('El comentario de la valoración debe ser texto.')
    }

    const valoraciones = obtenerValoraciones()
    const existente = valoraciones.find(
      (valoracion) =>
        valoracion.idReceta === Number(idReceta) && valoracion.idUsuario === Number(idUsuario),
    )
    const datosResena = {
      comentario: detalles.comentario?.trim() ?? '',
      fecha: 'Ahora',
      resenaPublicada: true,
    }

    if (existente) {
      existente.calificacion = calificacion
      Object.assign(existente, datosResena)
    } else {
      const siguienteId =
        valoraciones.reduce((mayorId, valoracion) => Math.max(mayorId, valoracion.id), 0) + 1
      valoraciones.push({
        id: siguienteId,
        idReceta: Number(idReceta),
        idUsuario: Number(idUsuario),
        calificacion,
        ...datosResena,
      })
    }

    guardarValoraciones(valoraciones)
    return {
      idReceta: Number(idReceta),
      idUsuario: Number(idUsuario),
      calificacion,
      ...datosResena,
    }
  },

  async eliminarResena(idReceta, idResena, idUsuario = 3) {
    validarReceta(idReceta)

    const coincidencia = /^valoracion-(\d+)$/u.exec(String(idResena))
    if (!coincidencia) {
      throw new Error('Solo puedes eliminar reseñas publicadas desde esta cuenta.')
    }

    const idValoracion = Number(coincidencia[1])
    const valoraciones = obtenerValoraciones()
    const indice = valoraciones.findIndex(
      (valoracion) =>
        valoracion.id === idValoracion &&
        valoracion.idReceta === Number(idReceta) &&
        valoracion.idUsuario === Number(idUsuario),
    )

    if (indice === -1) {
      throw new Error('No existe una reseña editable para eliminar.')
    }

    valoraciones.splice(indice, 1)
    guardarValoraciones(valoraciones)
  },
}