import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { DarkModeProvider } from './contexts/DarkModeContext.tsx'
import './styles/index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <DarkModeProvider>
        <BrowserRouter basename="/RiseTogether">
          <App />
        </BrowserRouter>
      </DarkModeProvider>
    </AuthProvider>
  </StrictMode>,
);
