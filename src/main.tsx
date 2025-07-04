import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if ('serviceWorker' in navigator && 'PushManager' in window) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js');
      console.log('Service Worker registrado:', registration);
      // Solicita permissão para notificações
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        // Inscreve no PushManager
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: '<SUA_PUBLIC_VAPID_KEY_AQUI>' // Troque pela sua chave pública VAPID
        });
        console.log('Push Subscription:', JSON.stringify(subscription));
        // Aqui você deve enviar a subscription para o backend
      } else {
        console.log('Permissão de notificação não concedida.');
      }
    } catch (err) {
      console.error('Erro ao registrar Service Worker ou Push:', err);
    }
  });
}
