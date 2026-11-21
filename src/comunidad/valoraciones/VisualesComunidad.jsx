export function IlustracionPlato({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      className={`comunidad-plato ${className}`}
      viewBox="0 0 240 160"
      role="img"
    >
      <ellipse cx="120" cy="142" rx="96" ry="12" fill="rgba(45, 54, 35, .13)" />
      <ellipse cx="120" cy="83" rx="105" ry="66" fill="#fffdf3" />
      <ellipse cx="120" cy="82" rx="88" ry="52" fill="#e2dfc9" />
      <ellipse cx="120" cy="80" rx="77" ry="43" fill="#cf7431" />
      <path d="M56 77c19-20 38 21 59 0s40-18 68 2M62 88c22-18 35 17 58-1s39-12 57 1M71 99c18-12 32 12 49 1s30-12 48-1" fill="none" stroke="#f6d078" strokeWidth="8" strokeLinecap="round" />
      <path d="M79 59c9 5 10 14 2 20-8-7-8-14-2-20m39-13c11 4 13 13 4 20-10-6-11-14-4-20m36 13c10 2 13 11 5 18-10-4-12-11-5-18" fill="#9a3e23" />
      <circle cx="92" cy="98" r="7" fill="#cf3527" />
      <circle cx="145" cy="68" r="7" fill="#df452d" />
      <circle cx="164" cy="98" r="6" fill="#c93425" />
      <path d="M103 61c-9-16 5-23 13-13 3-16 20-9 12 4 18-4 18 11 3 14-9 1-17-1-28-5" fill="#487c37" />
      <path d="M139 102c-8-13 3-21 11-12 3-13 17-8 10 4 14-3 15 9 2 12-8 1-15-1-23-4" fill="#568640" />
      <circle cx="120" cy="80" r="5" fill="#f3bd54" />
    </svg>
  )
}

export function CalificacionEstrellas({ value, size = 'normal' }) {
  return (
    <span
      className={`comunidad-estrellas comunidad-estrellas-${size}`}
      aria-label={`${value} de 5 estrellas`}
    >
      {[1, 2, 3, 4, 5].map((estrella) => (
        <span key={estrella} aria-hidden="true" className={estrella <= value ? 'activa' : ''}>
          ★
        </span>
      ))}
    </span>
  )
}