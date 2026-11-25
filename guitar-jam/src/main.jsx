import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { initializeStage90Storage } from './utils/stage90';
import { pullOnStartup, retryPendingPush } from './utils/syncClient';

// If cloud sync is configured, pull the latest blob before first render so
// every page mounts against fresh state. Hard-capped at 2.5s — a dead worker
// must never block practice.
initializeStage90Storage().then(() => pullOnStartup()).then((result) => {
  if (['local-newer', 'local-changed', 'empty', 'timeout', 'error'].includes(result)) {
    retryPendingPush().catch(() => {});
  }
}).finally(() => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});

window.addEventListener('online', () => { retryPendingPush().catch(() => {}); });
