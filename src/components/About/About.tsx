import { Info, Code2, CloudSun, Layers, Sparkles } from 'lucide-react'
import './About.css'

export const About = () => {
  return (
    <main className="about-container">
      <div className="about-card">
        <header className="about-header">
          <div className="about-icon-badge">
            <Info size={28} />
          </div>
          <div>
            <h1 className="about-title">About Weather Dashboard</h1>
            <p className="about-subtitle">
              Interactive Single Page Application developed for Jala
              University's Web Development course.
            </p>
          </div>
        </header>

        <section className="about-section">
          <h2>
            <CloudSun size={20} />
            <span>Academic Objective</span>
          </h2>
          <p>
            The goal of this project is to build an end-to-end, responsive, and
            strictly-typed weather application that consumes the{' '}
            <strong>OpenWeatherMap API</strong>. It allows users to search any
            city worldwide to inspect real-time weather metrics, sun times, and
            5-day daily forecasts.
          </p>
        </section>

        <section className="about-section">
          <h2>
            <Layers size={20} />
            <span>Architecture Overview</span>
          </h2>
          <ul className="about-features-list">
            <li>
              <strong>Modern Data Router:</strong> Built using React Router v7{' '}
              <code>createBrowserRouter</code> and <code>RouterProvider</code>{' '}
              with nested layouts via <code>&lt;Outlet /&gt;</code>.
            </li>
            <li>
              <strong>Dynamic Routing:</strong> Parametric route at{' '}
              <code>/forecast/:city</code> extracting coordinates and city data
              with <code>useParams</code> and <code>useSearchParams</code>.
            </li>
            <li>
              <strong>API Integration:</strong> Direct consumption of
              OpenWeatherMap's Geocoding, Current Weather, and 5-Day / 3-Hour
              Forecast endpoints with automated 18:00 daily filtering.
            </li>
            <li>
              <strong>Strict Typing:</strong> Comprehensive TypeScript models
              covering all API responses, components, and service layers.
            </li>
            <li>
              <strong>Cloud Infrastructure as Code (IaC):</strong> Automated AWS
              CDK deployment provisioning a private <strong>Amazon S3</strong>{' '}
              bucket and an <strong>Amazon CloudFront</strong> CDN distribution
              with SPA routing fallbacks.
            </li>
          </ul>
        </section>

        <section className="about-section">
          <h2>
            <Code2 size={20} />
            <span>Tech Stack</span>
          </h2>
          <div className="about-tech-tags">
            <span className="tech-tag">React 19</span>
            <span className="tech-tag">TypeScript</span>
            <span className="tech-tag">React Router v7</span>
            <span className="tech-tag">Vite</span>
            <span className="tech-tag">OpenWeatherMap API</span>
            <span className="tech-tag">AWS CDK</span>
            <span className="tech-tag">Amazon S3</span>
            <span className="tech-tag">Amazon CloudFront</span>
            <span className="tech-tag">Lucide Icons</span>
          </div>
        </section>

        <footer className="about-footer">
          <Sparkles size={16} />
          <span>Catriel Pereira Torrez - catodev_</span>
        </footer>
      </div>
    </main>
  )
}
