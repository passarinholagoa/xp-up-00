
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

console.log('Starting application...');

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js', {
        scope: '/'
      });
      
      console.log('✅ Service Worker registrado com sucesso:', registration.scope);

      // Update available
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('📱 Nova versão disponível! Recarregue a página para atualizar.');
            }
          });
        }
      });

      // PWA Install Prompt
      let deferredPrompt: any;
      window.addEventListener('beforeinstallprompt', (e) => {
        console.log('📱 PWA pode ser instalado');
        e.preventDefault();
        deferredPrompt = e;
      });

      // PWA Install Success
      window.addEventListener('appinstalled', () => {
        console.log('🎉 PWA instalado com sucesso!');
        deferredPrompt = null;
      });

      // Push Notifications (se necessário)
      if ('PushManager' in window && 'Notification' in window) {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          console.log('🔔 Permissão de notificação concedida');
        } else {
          console.log('❌ Permissão de notificação negada');
        }
      }

    } catch (error) {
      console.error('❌ Erro ao registrar Service Worker:', error);
    }
  });

  // Handle service worker messages
  navigator.serviceWorker.addEventListener('message', event => {
    console.log('Mensagem do Service Worker:', event.data);
  });
}

// PWA Display Mode Detection
function getPWADisplayMode() {
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
  if (document.referrer.startsWith('android-app://')) {
    return 'twa';
  } else if ((navigator as any).standalone || isStandalone) {
    return 'standalone';
  }
  return 'browser';
}

// Add PWA class to body for styling
document.body.classList.add(`pwa-${getPWADisplayMode()}`);

// Prevent zoom on iOS PWA
document.addEventListener('gesturestart', function (e) {
  e.preventDefault();
});
