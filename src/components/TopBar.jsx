function TopBar({
  onToggleSidebar,
  onSearch,
  navigationItems = [],
  searchPlaceholder = 'Buscar recetas, productos Nutresa, módulos...',
  menuOpen = false,
}) {
  const handleToggle = (e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    if (onToggleSidebar) {
      onToggleSidebar()
    } else if (typeof window !== 'undefined' && typeof window.toggleSidebar === 'function') {
      window.toggleSidebar()
    }
  }

  const handleSearchInput = (e) => {
    if (onSearch) {
      onSearch(e)
    } else if (typeof window !== 'undefined' && typeof window.handleGlobalSearch === 'function') {
      window.handleGlobalSearch(e)
    }
  }

  // 3. Barra superior compartida
  // 3.1 Encabezado principal
  return (
    <header
      className="sticky top-0 z-30 bg-white dark:bg-sazon-verdeNutresaCard/95 backdrop-blur-md border-b border-slate-200/80 dark:border-emerald-900/60 px-4 sm:px-6 lg:px-8 py-2.5 transition-colors"
      id="top-header"
    >
      <section className="max-w-[1600px] mx-auto flex items-center justify-between gap-3 w-full">
        {/* 3.2 Controles del menú y marca */}
        <section className="flex items-center gap-3 shrink-0">
          <button
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/60 text-sazon-verdeHoja dark:text-sazon-verdeNeon hover:bg-sazon-verdeHoja hover:text-white dark:hover:bg-sazon-verdeHoja dark:hover:text-white border border-emerald-200/70 dark:border-emerald-800/50 text-xs font-poppins font-bold transition-all cursor-pointer shadow-xs"
            id="btn-toggle-menu"
            type="button"
            onClick={handleToggle}
          >
            <i className="bi bi-list text-lg leading-none"></i>
            <span className="font-poppins">Menú</span>
          </button>

          <a
            className="flex items-center gap-2 m-0 text-inherit hover:opacity-90 transition-opacity"
            href="/"
            aria-label="Sa-zón Nutresa Gourmet, inicio"
          >
            <span className="w-8 h-8 text-sazon-verdeHoja flex items-center justify-center text-xl">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 2a1 1 0 0 1 1 1v6h1V3a1 1 0 1 1 2 0v6h1V3a1 1 0 1 1 2 0v7a4 4 0 0 1-3 3.87V21a1 1 0 1 1-2 0v-7.13A4 4 0 0 1 4 10V3a1 1 0 0 1 1-1Zm12.2.2a1 1 0 0 1 1.15.8l1.5 8.3a3 3 0 0 1-2.35 3.45V21a1 1 0 1 1-2 0v-6.25a3 3 0 0 1-2.35-3.45l1.5-8.3a1 1 0 0 1 1.15-.8c.48.09.8.56.7 1.04L15.3 10h3.4l-.8-6.76a.9.9 0 0 1 .7-1.04Z"></path>
              </svg>
            </span>
            <span className="block leading-none">
              <strong className="font-poppins font-black text-lg text-slate-900 dark:text-white tracking-tight whitespace-nowrap">
                Sa<span className="text-sazon-hoja">·</span>zón
              </strong>
              <small className="hidden sm:block mt-1 font-mono-tag text-[8px] tracking-[0.12em] text-sazon-verdeHondo dark:text-sazon-verdeNeon whitespace-nowrap">
                NUTRESA GOURMET
              </small>
            </span>
          </a>
        </section>

        {/* 3.3 Buscador global */}
        <form
          className="flex-1 max-w-[27rem] mx-2"
          id="search-form"
          role="search"
          onSubmit={(e) => e.preventDefault()}
        >
          <label className="relative w-full block">
            <span className="sr-only">{searchPlaceholder}</span>
            <i className="bi bi-search absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-emerald-500 text-xs"></i>
            <input
              className="w-full pl-9 pr-4 py-2 text-xs rounded-full bg-slate-100/80 dark:bg-sazon-verdeNutresa border border-slate-200/80 dark:border-emerald-800/80 focus:outline-none focus:ring-2 focus:ring-sazon-verdeHoja dark:text-white placeholder:text-slate-400 dark:placeholder:text-emerald-500/70 font-inter transition-all"
              id="global-search"
              placeholder={searchPlaceholder}
              type="search"
              onInput={handleSearchInput}
            />
          </label>
        </form>

        {/* 3.4 Navegación principal */}
        {navigationItems.length > 0 && (
          <nav
            aria-label="Navegación principal"
            className="hidden xl:flex items-center gap-3 lg:gap-5 shrink-0"
          >
            {navigationItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                aria-current={item.active ? 'page' : undefined}
                className={`border-b-2 py-2 font-inter text-[11px] lg:text-xs whitespace-nowrap transition-colors ${
                  item.active
                    ? 'border-sazon-verdeHoja text-sazon-verdeHondo dark:text-sazon-verdeNeon font-bold'
                    : 'border-transparent text-slate-600 dark:text-slate-300 hover:text-sazon-verdeHondo dark:hover:text-sazon-verdeNeon'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}

        {/* 3.5 Notificaciones y perfil */}
        <section className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            aria-label="Notificaciones"
            className="relative p-2 rounded-full hover:bg-slate-100 dark:hover:bg-sazon-verdeNutresa text-slate-500 dark:text-slate-300 transition-colors cursor-pointer"
            id="btn-notifications"
            type="button"
            onClick={() => {
              if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
                window.showToast('Tienes recetas recomendadas en tu despensa')
              }
            }}
          >
            <i className="bi bi-bell text-lg"></i>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-sazon-verdeNutresaCard"></span>
          </button>

          <aside
            className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-emerald-800/60 cursor-pointer hover:opacity-85 transition-opacity group select-none"
            id="user-profile"
            onClick={() => {
              if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
                window.showToast('Sesión activa: Mariana Morales (Creador De Contenido)')
              }
            }}
          >
            <img
              alt="Mariana Morales"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-sazon-verdeHoja shadow-xs"
              id="header-avatar"
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80"
            />
            <span className="hidden md:block text-left leading-tight">
              <span
                className="font-poppins font-bold text-xs block text-slate-900 dark:text-white"
                id="header-name"
              >
                Mariana Morales
              </span>
              <span
                className="font-mono-tag text-[10px] text-slate-500 dark:text-sazon-verdeNeon block capitalize"
                id="header-role"
              >
                Creador De Contenido
              </span>
            </span>
            <i className="bi bi-chevron-down text-[10px] text-slate-400 group-hover:text-slate-600 dark:group-hover:text-white transition-colors hidden sm:block"></i>
          </aside>
        </section>
      </section>
    </header>
  )
}

export default TopBar
