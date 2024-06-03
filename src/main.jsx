import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ContextsProvider } from './contexts/contexts.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query';

const queryClient = new QueryClient({});

// import { Auth0Provider } from '@auth0/auth0-react';
// const domain = import.meta.env.VITE_REACT_APP_DOMAIN;
// const clientId = import.meta.env.VITE_REACT_APP_AUTH0_ID;
// const redirectUri = `${window.location.origin}/fy-admin/dashboard`;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri
      }}
    > */}
   
      <ContextsProvider>
      <QueryClientProvider client={queryClient}>
        <App />
        {/* <ReactQueryDevtools initialIsOpen /> */}
      </QueryClientProvider>
      </ContextsProvider>

    {/* </Auth0Provider> */}
 </React.StrictMode>,
)
