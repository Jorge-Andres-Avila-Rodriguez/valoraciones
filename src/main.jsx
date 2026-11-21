import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './comunidad/valoraciones/styles/comunidad.css'
import Header from './components/Header'
import DashboardView from './components/DashboardView'
import CommunityRatingsView from "./comunidad/valoraciones/VistaValoracionesComunidad.jsx";

const comentariosRuta = window.location.pathname.match(/^\/recetas\/(\d+)\/comentarios\/?$/)
const idReceta = comentariosRuta ? Number(comentariosRuta[1]) : null

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {idReceta ? (
      <CommunityRatingsView idReceta={idReceta} />
    ) : (
      <Header>
        <DashboardView />
      </Header>
    )}
  </StrictMode>,
)
