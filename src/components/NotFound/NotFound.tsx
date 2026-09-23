import { Link } from 'react-router-dom'
import { ShieldAlert, ArrowLeft } from 'lucide-react'
import './NotFound.css'

export const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-card">
        <ShieldAlert size={48} className="not-found-icon" />
        <h1 className="not-found-code">404</h1>
        <p className="not-found-message">No deberías estar aquí</p>
        <Link to="/" className="not-found-back-btn">
          <ArrowLeft size={16} />
          <span>Volver al inicio</span>
        </Link>
      </div>
    </div>
  )
}
