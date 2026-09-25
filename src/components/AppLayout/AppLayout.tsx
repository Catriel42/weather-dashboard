import { Suspense } from 'react'
import { Outlet, useNavigation } from 'react-router-dom'
import { Navbar } from '../Navbar'
import { Loader2 } from 'lucide-react'
import './AppLayout.css'

export const AppLayout = () => {
  const navigation = useNavigation()
  const isNavigating = navigation.state === 'loading'

  return (
    <div className="app-layout">
      <Navbar />
      <main className="app-main">
        {isNavigating ? (
          <div className="app-loader">
            <Loader2 className="app-loader-spinner" size={36} />
            <p>Loading page...</p>
          </div>
        ) : (
          <Suspense
            fallback={
              <div className="app-loader">
                <Loader2 className="app-loader-spinner" size={36} />
                <p>Loading page...</p>
              </div>
            }
          >
            <Outlet />
          </Suspense>
        )}
      </main>
    </div>
  )
}
