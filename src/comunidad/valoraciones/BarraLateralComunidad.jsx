import { useState } from 'react'

const CELULAS = [
  {
    id: 'dashboard',
    texto: 'Dashboard Principal',
    icono: 'bi-speedometer2',
    submodulos: [{ texto: 'Resumen de módulos', href: '/' }],
  },
  {
    id: 'perfil',
    texto: 'Mi Perfil',
    icono: 'bi-person-circle',
    submodulos: [{ texto: 'Datos personales', href: '/src/auth-usuarios/perfil.html' }],
  },
  {
    id: 'catalogo',
    texto: 'Catálogo Nutresa',
    icono: 'bi-grid',
    submodulos: [
      { texto: 'Productos y marcas', href: '/src/catalogo-productos/landing.html' },
      { texto: 'Información nutricional', href: '/src/catalogo-productos/landing.html' },
    ],
  },
  {
    id: 'recetario',
    texto: 'Recetario y Contenido',
    icono: 'bi-book',
    submodulos: [
      { texto: 'Explorar recetas', href: '/src/recetario-contenido/landing.html' },
      { texto: 'Técnicas y contenido', href: '/src/recetario-contenido/landing.html' },
    ],
  },
  {
    id: 'despensa',
    texto: 'Despensa Virtual',
    icono: 'bi-box-seam',
    submodulos: [
      { texto: 'Mi inventario', href: '/src/despensa-virtual/landing.html' },
      { texto: 'Alertas de vencimiento', href: '/src/despensa-virtual/landing.html' },
    ],
  },
  {
    id: 'nutricion',
    texto: 'Nutrición y Perfiles',
    icono: 'bi-heart-pulse',
    submodulos: [
      { texto: 'Planes nutricionales', href: '/src/nutricion-perfiles/landing.html' },
      { texto: 'Perfiles y metas', href: '/src/nutricion-perfiles/landing.html' },
    ],
  },
  {
    id: 'planificador',
    texto: 'Planificador y Lista',
    icono: 'bi-calendar-week',
    submodulos: [
      { texto: 'Plan semanal', href: '/src/planificador-mercado/landing.html' },
      { texto: 'Lista de mercado', href: '/src/planificador-mercado/landing.html' },
    ],
  },
  {
    id: 'comunidad',
    texto: 'Comunidad y Reseñas',
    icono: 'bi-chat-heart',
    submodulos: [
      { texto: '1. Valoraciones (HU-02)', actual: true },
      { texto: '2. Comentarios y Fotos', href: '#resenas' },
      { texto: '3. Mis Colecciones (HU-03)', href: '#resenas' },
      { texto: '4. Mis Favoritos', href: '#resenas' },
      { texto: '5. Moderación Admin (HU-01)', href: '#comunidad-reporte' },
    ],
  },
  {
    id: 'campanas',
    texto: 'Campañas y Puntos',
    icono: 'bi-megaphone',
    submodulos: [
      { texto: 'Campañas activas', href: '/src/mercadeo-campanas/landing.html' },
      { texto: 'Mis puntos Sa·zón', href: '/src/mercadeo-campanas/landing.html' },
    ],
  },
]

function BarraLateralComunidad({ idReceta, isOpen, onClose }) {
  const [celulaExpandida, setCelulaExpandida] = useState('comunidad')
  const rutaValoraciones = `/recetas/${idReceta}/comentarios`

  return (
    <>
      <aside
        className={`comunidad-sidebar ${isOpen ? 'menu-abierto' : ''}`}
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <header className="comunidad-sidebar-header">
          <div className="comunidad-sidebar-marca">
            <a className="alogo comunidad-marca" href="/" aria-label="Sa-zón Gourmet, inicio">
              <h1 className="logo">
                Sa<span className="punto"></span>zón
              </h1>
            </a>
            <span className="comunidad-marca-subtitulo">ECOSISTEMA NUTRESA</span>
          </div>
          <button
            type="button"
            className="comunidad-cerrar-menu-icono"
            aria-label="Cerrar menú"
            onClick={onClose}
          >
            <i className="bi bi-x-lg" aria-hidden="true"></i>
          </button>
        </header>


        <p className="comunidad-sidebar-label">MÓDULOS DEL SISTEMA</p>
        <nav className="comunidad-nav-lateral" aria-label="Módulos del sistema">
          {CELULAS.map((celula) => {
            const expandida = celulaExpandida === celula.id
            return (
              <section className="comunidad-modulo" key={celula.id}>


                <button
                  type="button"
                  className={`comunidad-modulo-btn ${celula.id === 'comunidad' ? 'seleccionado' : ''}`}
                  aria-expanded={expandida}
                  aria-controls={`submenu-${celula.id}`}
                  onClick={() => setCelulaExpandida(expandida ? null : celula.id)}
                >
                  <i className={`bi ${celula.icono}`} aria-hidden="true"></i>
                  <span>{celula.texto}</span>
                  <i
                    className={`bi ${expandida ? 'bi-chevron-up' : 'bi-chevron-down'} comunidad-modulo-chevron`}
                    aria-hidden="true"
                  ></i>
                </button>



                <div
                  className="comunidad-submodulos"
                  id={`submenu-${celula.id}`}
                  hidden={!expandida}
                >
                  {celula.submodulos.map((submodulo) => {
                    const href = celula.id === 'comunidad' && submodulo.actual
                      ? rutaValoraciones
                      : submodulo.href
                    return (
                      <a
                        key={submodulo.texto}
                        href={href}
                        className={submodulo.actual ? 'actual' : ''}
                        aria-current={submodulo.actual ? 'page' : undefined}
                        onClick={onClose}
                      >
                        {submodulo.texto}
                      </a>
                    )
                  })}
                </div>
              </section>
            )
          })}
        </nav>



        <footer className="comunidad-sidebar-footer">
          <button type="button" onClick={onClose}>
            <i className="bi bi-x-circle" aria-hidden="true"></i>
            Cerrar Menú
          </button>
        </footer>
      </aside>



      {isOpen && (
        <button
          className="comunidad-overlay"
          type="button"
          aria-label="Cerrar menú"
          onClick={onClose}
        />
      )}
    </>
  )
}

export default BarraLateralComunidad