import { IlustracionPlato, CalificacionEstrellas } from './VisualesComunidad'

function ResumenValoracionComunidad({
  receta,
  cargando,
  resumen,
  totalValoraciones,
  distribucion,
  children,
}) {
  return (
    <>
      <section className="comunidad-receta-card" aria-labelledby="comunidad-receta-titulo">
        <div className="comunidad-foto-receta">
          <IlustracionPlato />
          <span>Zenú + Doria</span>
        </div>
        <div className="comunidad-receta-copy">
          <div className="comunidad-tags">
            <span>RECETA DESTACADA</span>
            <small>ID #RC-2849</small>
          </div>
          <h1 id="comunidad-receta-titulo">{receta.nombre}</h1>
          <p>{receta.descripcion}</p>
          <ul className="comunidad-receta-meta">
            <li><i className="bi bi-clock" aria-hidden="true"></i>{receta.tiempo}</li>
            <li><i className="bi bi-people" aria-hidden="true"></i>{receta.porciones} porciones</li>
            <li><i className="bi bi-basket" aria-hidden="true"></i>Ahorro: {receta.ahorro}</li>
          </ul>
        </div>
        <section
          className="comunidad-estrellas-resumen"
          aria-label="Promedio general de estrellas y total de valoraciones"
          aria-live="polite"
        >
          <div>
            <strong>{cargando ? '…' : (resumen?.promedio ?? 0).toFixed(1)}</strong>
            <span>/ 5.0</span>
          </div>
          <CalificacionEstrellas value={Math.round(resumen?.promedio ?? 0)} size="compacta" />
          <small>{cargando ? 'Cargando…' : `${totalValoraciones} valoraciones`}</small>
        </section>
      </section>

      <div className="comunidad-columnas">
        <section className="comunidad-columna-izquierda">
          <section className="comunidad-distribucion" aria-labelledby="comunidad-distribucion-titulo">
            <div className="comunidad-seccion-cabecera">
              <div>
                <h2 id="comunidad-distribucion-titulo">Distribución de Puntuación</h2>
                <p>Auditoría comunitaria en tiempo real</p>
              </div>
              <span className="comunidad-recomendacion">
                <strong>98.2%</strong>
                Recomendado
              </span>
            </div>
            <div className="comunidad-barras">
              {distribucion.map(({ estrellas, cantidad }) => (
                <div className="comunidad-fila-barra" key={estrellas}>
                  <span>{estrellas} <i className="bi bi-star-fill" aria-hidden="true"></i></span>
                  <div className="comunidad-barra-fondo">
                    <span
                      style={{
                        width: `${totalValoraciones ? (cantidad / totalValoraciones) * 100 : 0}%`,
                      }}
                    />
                  </div>
                  <small>
                    {totalValoraciones
                      ? `${Math.round((cantidad / totalValoraciones) * 100)}% (${cantidad})`
                      : '0% (0)'}
                  </small>
                </div>
              ))}
            </div>
          </section>

          <section className="comunidad-metricas" aria-label="Promedio de métricas de la receta">
            <div><strong>4.9</strong><span>SABOR NUTRESA</span></div>
            <div><strong>4.7</strong><span>FACILIDAD</span></div>
            <div><strong>4.8</strong><span>AHORRO</span></div>
          </section>

          <aside className="comunidad-garantia">
            <span className="comunidad-garantia-icono">
              <i className="bi bi-patch-check" aria-hidden="true"></i>
            </span>
            <div>
              <strong>GARANTÍA COMUNITARIA DE SABOR</strong>
              <p>
                Cada receta se valida contra el estándar gastronómico Nutresa Gourmet,
                garantizando combinaciones nutritivas y con desperdicio cero.
              </p>
            </div>
          </aside>
        </section>
        {children}
      </div>
    </>
  )
}

export default ResumenValoracionComunidad