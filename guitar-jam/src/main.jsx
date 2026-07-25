import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { pullOnStartup } from './utils/syncClient';

// If cloud sync is configured, pull the latest blob before first render so
// every page mounts against fresh state. Hard-capped at 2.5s — a dead worker
// must never block practice.
pullOnStartup().finally(() => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
