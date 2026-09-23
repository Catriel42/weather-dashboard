import { Routes, Route } from 'react-router-dom'

import './App.css'
import { Navbar } from './components/Navbar'
import { WeatherDashboard } from './components/WeatherDashboard'
import { EmptyState } from './components/EmptyState'
import { NotFound } from './components/NotFound'

export const App = () => {

  return (
    <section>
      <Navbar />
      <Routes>
        <Route path="/" element={<WeatherDashboard />} />
        <Route path="/about" element={<EmptyState />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  )
}
