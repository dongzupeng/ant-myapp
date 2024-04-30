import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/style/theme.less';
import './assets/style/reset.css';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import App from './App';

//引入redux
import { Provider } from 'react-redux';
import { store, persistor } from '@/redux/store';
// 导入redux-persist提供PersistGate组件
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </RouterProvider>
  </Provider>,
);
