import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { RoleContextProvider } from './components/Auth/Auth'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RoleContextProvider>
      <App />
    </RoleContextProvider>
  </StrictMode>,
)
