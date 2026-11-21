import { USUARIOS_COMUNIDAD } from './data/comunidad'
import { IlustracionPlato, CalificacionEstrellas } from './VisualesComunidad'

const FILTROS = [
  { id: 'recientes', texto: 'Más recientes' },
  { id: 'calificadas', texto: 'Mejor calificadas (2+)' },
  { id: 'fotos', texto: 'Con fotos (18)' },
]

function ResenasComunidad({
  filtro,
  setFiltro,
  resenasVisibles,
  totalResenas,
  onDelete,
  eliminando,
}) {
  return (
    <section className="comunidad-resenas" id="resenas" aria-labelledby="comunidad-resenas-titulo">
      <div className="comunidad-resenas-cabecera">
        <div className="comunidad-resenas-titulo">
          <h2 id="comunidad-resenas-titulo">Reseñas de la Comunidad</h2>
          <span>{totalResenas} reseñas</span>
        </div>
        <div className="comunidad-filtros" role="group" aria-label="Filtrar reseñas">
          {FILTROS.map((opcion) => (
            <button
              key={opcion.id}
              type="button"
              className={filtro === opcion.id ? 'activo' : ''}
              aria-pressed={filtro === opcion.id}
              onClick={() => setFiltro(opcion.id)}
            >
              {opcion.texto}
            </button>
          ))}
        </div>
      </div>

      <div className="comunidad-resenas-grid">
        {resenasVisibles.map((resena) => {
          const usuario = USUARIOS_COMUNIDAD.find((item) => item.id === resena.idUsuario)
          return (
            <article className="comunidad-resena-card" key={resena.id}>
              <header className="comunidad-resena-autor">
                <span className={`comunidad-avatar avatar-${resena.idUsuario}`}>{usuario?.iniciales}</span>
                <div><strong>{usuario?.nombre}</strong><small>{usuario?.ubicacion}</small></div>
                <i
                  className="bi bi-patch-check-fill comunidad-verificado"
                  title="Perfil verificado"
                  aria-label="Perfil verificado"
                ></i>
                <time>{resena.fecha}</time>
              </header>
              <div className="comunidad-resena-puntaje">
                <CalificacionEstrellas value={resena.calificacion} size="mini" />
                <small>{resena.sabor}.0 · Sabor</small>
              </div>
              <p className="comunidad-resena-texto">“{resena.comentario}”</p>
              {resena.conFoto ? (
                <div className="comunidad-resena-foto">
                  <IlustracionPlato />
                </div>
              ) : resena.consejo ? (
                <aside className="comunidad-consejo">
                  <i className="bi bi-lightbulb" aria-hidden="true"></i>
                  <span>{resena.consejo}</span>
                </aside>
              ) : null}
              <footer className="comunidad-resena-acciones">
                <button type="button" aria-label={`Me gusta, ${resena.meGusta} reacciones`}>
                  <i className="bi bi-heart-fill" aria-hidden="true"></i> {resena.meGusta} me gusta
                </button>
                <button type="button" aria-label={`${resena.respuestas} respuestas`}>
                  <i className="bi bi-chat-square" aria-hidden="true"></i> {resena.respuestas} respuestas
                </button>
                {typeof resena.id === 'string' && resena.id.startsWith('valoracion-') ? (
                  <button
                    className="comunidad-resena-eliminar"
                    type="button"
                    disabled={eliminando}
                    aria-label="Eliminar mi reseña"
                    onClick={() => onDelete?.(resena)}
                  >
                    <i className="bi bi-trash3" aria-hidden="true"></i>
                    {eliminando ? ' Eliminando…' : ' Eliminar'}
                  </button>
                ) : null}
              </footer>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default ResenasComunidad