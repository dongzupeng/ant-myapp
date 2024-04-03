import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/style/reset.css';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import App from './App';
import './assets/style/theme.less';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>,
);
