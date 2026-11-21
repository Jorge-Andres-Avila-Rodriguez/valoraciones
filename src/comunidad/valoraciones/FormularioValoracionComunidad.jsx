const METRICAS = [
  { titulo: 'Sabor Nutresa', valor: 5, minimo: 'Insípido o distante', maximo: 'Intenso y delicioso' },
  { titulo: 'Facilidad', valor: 5, minimo: 'Pasos complejos', maximo: 'Fácil de preparar' },
  { titulo: 'Ahorro Alcanzado', valor: 4, minimo: 'Cero desperdicio', maximo: 'Alto ahorro' },
]


function FormularioValoracionComunidad({
  calificacion,
  setCalificacion,
  calificacionTemporal,
  setCalificacionTemporal,
  comentario,
  setComentario,
  foto,
  setFoto,
  enviando,
  mensaje,
  error,
  setMensaje,
  setError,
  onSubmit,
}) {
  const estrellasActivas = calificacionTemporal || calificacion

  return (
    <section className="comunidad-formulario-seccion" aria-labelledby="comunidad-calificar-titulo">
      {/* 8.2 Encabezado del formulario */}
      <div className="comunidad-seccion-cabecera comunidad-formulario-cabecera">
        <h2 id="comunidad-calificar-titulo">
          <i className="bi bi-circle-fill" aria-hidden="true"></i> Calificar esta Creación
        </h2>
        <small>PASO 1 DE 1 · CRITERIO OBLIGATORIO</small>
      </div>

      <form className="comunidad-formulario" onSubmit={onSubmit}>
  


        <section className="comunidad-selector-calificacion">
          <strong>¿Qué puntuación general otorgas? <span>*</span></strong>
          <p>Haz clic o arrastra sobre las estrellas para registrar tu nota</p>
          <div
            className="comunidad-estrellas-interactivas"
            role="radiogroup"
            aria-label="Calificación general de la receta"
            onMouseLeave={() => setCalificacionTemporal(0)}
          >
            {[1, 2, 3, 4, 5].map((estrella) => (
              <button
                key={estrella}
                className={`comunidad-estrella-btn ${estrella <= estrellasActivas ? 'comunidad-estrella-activa' : ''}`}
                type="button"
                role="radio"
                aria-checked={calificacion === estrella}
                aria-label={`${estrella} ${estrella === 1 ? 'estrella' : 'estrellas'}`}
                onMouseEnter={() => setCalificacionTemporal(estrella)}
                onFocus={() => setCalificacionTemporal(estrella)}
                onBlur={() => setCalificacionTemporal(0)}
                onClick={() => {
                  setCalificacion(estrella)
                  setMensaje('')
                  setError('')
                }}
              >
                ★
              </button>
            ))}
          </div>
          <span className="comunidad-sello-calificacion">
            {calificacion
              ? `${calificacion}.0 ★ · ${calificacion === 5 ? 'Excelente experiencia' : 'Gracias por tu opinión'}`
              : 'Selecciona una puntuación'}
          </span>
        </section>

       
        <section className="comunidad-subcalificaciones" aria-label="Detalles de la valoración">
          {METRICAS.map((metrica) => (
            <label className="comunidad-subcalificacion" key={metrica.titulo}>
              <span><strong>{metrica.titulo}</strong><b>{metrica.valor}/5</b></span>
              <input type="range" min="1" max="5" defaultValue={metrica.valor} aria-label={metrica.titulo} />
              <small><span>{metrica.minimo}</span><span>{metrica.maximo}</span></small>
            </label>
          ))}
        </section>

        
        <label className="comunidad-campo-comentario">
          <span>Cuéntale a la comunidad tus trucos o sensaciones:</span>
          <textarea
            value={comentario}
            maxLength={400}
            placeholder="¿Te gustó? ¿Le diste un toque de Sello Rojo a la salsa o agregaste queso? Cuéntanos..."
            onChange={(evento) => setComentario(evento.target.value)}
          />
          <small>{comentario.length} / 400</small>
        </label>

        
        <div className="comunidad-carga-foto">
          <label htmlFor="comunidad-foto">
            <i className="bi bi-image" aria-hidden="true"></i> Sube la foto de tu plato (Opcional)
          </label>
          <span>+50 Pts Comunidad</span>
          <div className="comunidad-foto-drop">
            <label htmlFor="comunidad-foto">
              <i className="bi bi-camera" aria-hidden="true"></i>
              <span>Tomar foto</span>
            </label>
            <input
              id="comunidad-foto"
              type="file"
              accept="image/*"
              onChange={(evento) => setFoto(evento.target.files?.[0]?.name ?? '')}
            />
            <span className="comunidad-nombre-foto">{foto || 'Sin foto seleccionada'}</span>
          </div>
        </div>

        
        
        <div className="comunidad-publicar">
          <label>
            <input type="checkbox" required /> Acepto la Política de Comunidad y Datos
          </label>
          <button type="submit" disabled={!calificacion || enviando}>
            <i className="bi bi-send" aria-hidden="true"></i>
            {enviando ? 'Publicando…' : 'Publicar Valoración'}
          </button>
        </div>
        <p
          className={`comunidad-mensaje ${error ? 'error' : ''}`}
          role={error ? 'alert' : 'status'}
          aria-live="polite"
        >
          {error || mensaje}
        </p>
      </form>
    </section>
  )
}

export default FormularioValoracionComunidad
