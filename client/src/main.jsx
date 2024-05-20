

import React from 'react';
import { createRoot } from 'react-dom/client'; // Importa createRoot de 'react-dom/client'
import App from './App.jsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

