import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@/shared/lib/context/ThemeContext'
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/shared/lib/query/queryClient';
import './app/styles/index.css'
import App from './app/App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
