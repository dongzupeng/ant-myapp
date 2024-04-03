import React, { Suspense } from 'react';
import { Skeleton } from 'antd';
import App from '../App.js';
import { Navigate } from 'react-router-dom';

const Login = React.lazy(() => import('@/pages/Login'));
const Home = React.lazy(() => import('@/pages/Home'));
const NotFoundPage = React.lazy(() => import('@/components/NotFound/index.js'));

const routes = [
  {
    path: '/',
    /** 重定向 */
    element: <Navigate replace to='/home' />,
  },
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/home',
        element: (
          <Suspense fallback={<Skeleton />}>
            <Home />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: (
      <Suspense fallback={<Skeleton />}>
        <Login />
      </Suspense>
    ),
  },
  { path: '*', element: <NotFoundPage /> },
];

export default routes;
