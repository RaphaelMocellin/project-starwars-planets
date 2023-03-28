import React from 'react';
import ReactDOM from 'react-dom/client';
import StarWarsProvider from './context/StarWarsProvider';
import App from './App';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <StarWarsProvider>
      <App />
    </StarWarsProvider>,
  );
