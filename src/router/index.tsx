import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '../components/AppLayout'
import { WeatherDashboard } from '../components/WeatherDashboard'
import { ForecastDetails } from '../components/ForecastDetails'
import { EmptyState } from '../components/EmptyState'
import { NotFound } from '../components/NotFound'

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <WeatherDashboard />,
      },
      {
        path: '/forecast/:city',
        element: <ForecastDetails />,
      },
      {
        path: '/about',
        element: <EmptyState />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
])
