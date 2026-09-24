import { NavLink } from 'react-router-dom'
import { CloudSun, LayoutDashboard, Info } from 'lucide-react'
import { ThemeToggle } from '../ThemeToggle'
import './Navbar.css'

export const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <NavLink
          to="/"
          className="navbar-brand"
          >
          <CloudSun className="navbar-brand-icon" size={24} />
          <span className="navbar-brand-title">Weather Dashboard</span>
        </NavLink>

        <div className="navbar-right">
          <nav className="navbar-links" aria-label="Main Navigation">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `navbar-link ${isActive ? 'active' : ''}`
              }
            >
              <LayoutDashboard size={18} />
              <span>Home</span>
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `navbar-link ${isActive ? 'active' : ''}`
              }
            >
              <Info size={18} />
              <span>About</span>
            </NavLink>
          </nav>

          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
