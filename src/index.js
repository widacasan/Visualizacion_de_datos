import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

/**
 * Renderiza la aplicación en el elemento con el id 'root'.
 * Utiliza el modo estricto de React.
 */
const renderApp = () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

// Renderiza la aplicación
renderApp();

/**
 * Registra las métricas de rendimiento en la aplicación.
 * Puedes proporcionar una función para registrar los resultados
 * o enviarlos a un punto final de análisis.
 * Aprende más en: https://bit.ly/CRA-vitals
 */
reportWebVitals();
