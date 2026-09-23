import { Outlet } from 'react-router-dom'
import { Navbar } from '../Navbar'

export const AppLayout = () => {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  )
}
