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