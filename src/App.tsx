import { RouterProvider } from 'react-router'
import { router } from './router'
import { ThemeProvider } from './context'
import './App.css'

export const App = () => {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}
