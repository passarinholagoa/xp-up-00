
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

console.log('Starting application...');

// Registrar service worker para PWA com auto-update
if ('serviceWorker' in navigator) {
  const { registerSW } = await import('virtual:pwa-register');
  
  registerSW({
    immediate: true,
    onNeedRefresh() {
      console.log('Nova versão disponível, atualizando...');
      // Recarrega automaticamente quando há uma nova versão
      window.location.reload();
    },
    onOfflineReady() {
      console.log('App pronto para uso offline');
    },
    onRegistered(r) {
      console.log('SW Registrado:', r);
      // Verifica por atualizações a cada 30 minutos
      if (r) {
        setInterval(() => {
          r.update();
        }, 30 * 60 * 1000); // 30 minutos
      }
    },
    onRegisterError(error) {
      console.log('SW registration error', error);
    },
  });
}

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
