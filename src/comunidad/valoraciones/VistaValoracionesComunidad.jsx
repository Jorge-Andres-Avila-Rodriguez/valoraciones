import { useEffect, useMemo, useState } from 'react'
import {
  RECETAS_COMUNIDAD,
} from './data/comunidad'
import { comunidadService } from './services/comunidadService'
import ThemeToggle from '../../components/ThemeToggle'
import TopBar from '../../components/TopBar'
import PieComunidad from './PieComunidad'
import FormularioValoracionComunidad from './FormularioValoracionComunidad'
import ResumenValoracionComunidad from './ResumenValoracionesComunidad'
import ResenasComunidad from './ResenasComunidad'
import BarraLateralComunidad from './BarraLateralComunidad'

function VistaValoracionesComunidad({ idReceta = 128 }) {
  const receta = RECETAS_COMUNIDAD.find((item) => item.id === Number(idReceta))
  const [resumen, setResumen] = useState(null)
  const [resenas, setResenas] = useState([])
  const [calificacion, setCalificacion] = useState(0)
  const [calificacionTemporal, setCalificacionTemporal] = useState(0)
  const [cargando, setCargando] = useState(true)
  const [enviando, setEnviando] = useState(false)
  const [eliminando, setEliminando] = useState(false)
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState('')
  const [comentario, setComentario] = useState('')
  const [foto, setFoto] = useState('')
  const [filtro, setFiltro] = useState('recientes')
  const [menuAbierto, setMenuAbierto] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuAbierto ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuAbierto])

  useEffect(() => {
    let activa = true

    async function cargarPromedio() {
      setCargando(true)
      setError('')
      try {
        const [resultado, resenasGuardadas] = await Promise.all([
          comunidadService.obtenerPromedioReceta(idReceta),
          comunidadService.obtenerResenasReceta(idReceta),
        ])
        if (activa) {
          setResumen(resultado)
          setResenas(resenasGuardadas)
        }
      } catch (errorCarga) {
        if (activa) setError(errorCarga.message || 'No fue posible cargar las valoraciones.')
      } finally {
        if (activa) setCargando(false)
      }
    }

    cargarPromedio()
    return () => {
      activa = false
    }
  }, [idReceta])

  const resenasVisibles = useMemo(() => {
    if (filtro === 'calificadas') {
      return [...resenas].sort((a, b) => b.calificacion - a.calificacion)
    }
    if (filtro === 'fotos') {
      return resenas.filter((resena) => resena.conFoto)
    }
    return resenas
  }, [filtro, resenas])

  async function publicarValoracion(evento) {
    evento.preventDefault()
    if (!calificacion || enviando) return

    const calificacionAnterior = calificacion
    const comentarioAnterior = comentario
    setMensaje('')
    setError('')
    setEnviando(true)

    try {
      await comunidadService.enviarCalificacion(idReceta, calificacion, 3, { comentario })
      const [nuevoResumen, resenasActualizadas] = await Promise.all([
        comunidadService.obtenerPromedioReceta(idReceta),
        comunidadService.obtenerResenasReceta(idReceta),
      ])
      setResumen(nuevoResumen)
      setResenas(resenasActualizadas)
      setMensaje('¡Gracias! Tu valoración se publicó correctamente.')
      setComentario('')
      setFoto('')
    } catch (errorEnvio) {
      setCalificacion(calificacionAnterior)
      setComentario(comentarioAnterior)
      setError(errorEnvio.message || 'No fue posible publicar tu valoración.')
    } finally {
      setEnviando(false)
    }
  }

  async function eliminarResena(resena) {
    if (!window.confirm('¿Quieres eliminar tu reseña publicada?')) return

    setEliminando(true)
    setMensaje('')
    setError('')

    try {
      await comunidadService.eliminarResena(idReceta, resena.id, 3)
      const [nuevoResumen, resenasActualizadas] = await Promise.all([
        comunidadService.obtenerPromedioReceta(idReceta),
        comunidadService.obtenerResenasReceta(idReceta),
      ])
      setResumen(nuevoResumen)
      setResenas(resenasActualizadas)
      setCalificacion(0)
      setCalificacionTemporal(0)
      setComentario('')
      setFoto('')
      setMensaje('Tu reseña fue eliminada correctamente.')
    } catch (errorEliminacion) {
      setError(errorEliminacion.message || 'No fue posible eliminar la reseña.')
    } finally {
      setEliminando(false)
    }
  }

  if (!receta) {
    return (
      <main className="comunidad-pagina">
        <p className="comunidad-alerta" role="alert">
          No encontramos la receta solicitada.
        </p>
        <a href="/">Volver al inicio</a>
      </main>
    )
  }

  const totalValoraciones = resumen?.totalValoraciones ?? 0
  const distribucion = resumen?.distribucion ?? []
  const navigationItems = [
    { label: 'Recetario', href: '/src/recetario-contenido/landing.html' },
    { label: 'Comunidad', href: `/recetas/${idReceta}/comentarios`, active: true },
    { label: 'Mis Colecciones', href: '#resenas' },
    { label: 'Favoritos', href: '#resenas' },
  ]

  return (
    <div className="comunidad-app">
      <BarraLateralComunidad
        idReceta={idReceta}
        isOpen={menuAbierto}
        onClose={() => setMenuAbierto(false)}
      />

      <div className="comunidad-contenido">
        <TopBar
          onToggleSidebar={() => setMenuAbierto((abierto) => !abierto)}
          navigationItems={navigationItems}
          searchPlaceholder="Buscar recetas, cocineros o temas..."
          menuOpen={menuAbierto}
        />

        <main className="comunidad-main">
          <nav className="comunidad-miga" aria-label="Miga de pan">
            <span>MÓDULO:</span>
            <strong>Célula 06 · Comunidad &amp; Co-Creación</strong>
          </nav>
          <nav className="comunidad-nav-interna" aria-label="Secciones de Comunidad">
            <a className="activa" href="#comunidad-calificar-titulo">Valoraciones</a>
            <a href="#resenas">Comentarios y fotos</a>
            <a href="#resenas">Colecciones</a>
            <a href="#resenas">Favoritos</a>
            <a href="#comunidad-reporte">Moderación</a>
          </nav>

          <ResumenValoracionComunidad
            receta={receta}
            cargando={cargando}
            resumen={resumen}
            totalValoraciones={totalValoraciones}
            distribucion={distribucion}
          >
            <FormularioValoracionComunidad
              calificacion={calificacion}
              setCalificacion={setCalificacion}
              calificacionTemporal={calificacionTemporal}
              setCalificacionTemporal={setCalificacionTemporal}
              comentario={comentario}
              setComentario={setComentario}
              foto={foto}
              setFoto={setFoto}
              enviando={enviando}
              mensaje={mensaje}
              error={error}
              setMensaje={setMensaje}
              setError={setError}
              onSubmit={publicarValoracion}
            />
          </ResumenValoracionComunidad>

          <ResenasComunidad
            filtro={filtro}
            setFiltro={setFiltro}
            resenasVisibles={resenasVisibles}
            totalResenas={resenas.length}
            onDelete={eliminarResena}
            eliminando={eliminando}
          />

          <aside className="comunidad-reporte" id="comunidad-reporte">
            <i className="bi bi-shield-check" aria-hidden="true"></i>
            <span>
              ¿Encontraste una valoración inapropiada? Repórtala al equipo de moderación comunitaria.
            </span>
            <button type="button">Crear tip</button>
            <button type="button">Panel de Moderación (HU-01)</button>
          </aside>
        </main>

        <PieComunidad />
      </div>
      <ThemeToggle />
    </div>
  )
}

export default VistaValoracionesComunidad
