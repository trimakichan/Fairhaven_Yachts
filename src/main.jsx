import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ContextsProvider } from './contexts/contexts.jsx';
import { Auth0Provider } from '@auth0/auth0-react';

const domain = import.meta.env.VITE_REACT_APP_DOMAIN
const clientId = import.meta.env.VITE_REACT_APP_AUTH0_ID


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <ContextsProvider>
        <App />
      </ContextsProvider>
    </Auth0Provider>
  </React.StrictMode>,
)
