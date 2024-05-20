import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ContextsProvider } from './contexts/contexts.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextsProvider>
    <App />
    </ContextsProvider>
  </React.StrictMode>,
)
