import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Loader from './components/Loader.tsx'
// import App from './App.tsx'
const App = React.lazy(() => import('./App.tsx'))

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <React.Suspense fallback={<Loader/>}>
    <App />
    </React.Suspense>
  </StrictMode>,
)
