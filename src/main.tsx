import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ReactQueryClientProvider } from './providers/ReactQueryClientProvider.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ReactQueryClientProvider>
            <App />
        </ReactQueryClientProvider>
    </StrictMode>,
);
