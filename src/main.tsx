
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

// Simplified PWA Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js');
      console.log('✅ Service Worker registrado com sucesso:', registration.scope);
    } catch (error) {
      console.log('Service Worker não pôde ser registrado:', error);
    }
  });
}

// Simple PWA Display Mode Detection
function getPWADisplayMode() {
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
  if ((navigator as any).standalone || isStandalone) {
    return 'standalone';
  }
  return 'browser';
}

// Add PWA class to body for styling
document.body.classList.add(`pwa-${getPWADisplayMode()}`);
