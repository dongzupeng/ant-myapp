import React, { Suspense} from 'react';
import { Skeleton } from "antd";

const Login = React.lazy(() => import('../pages/Login'));
const Layout = React.lazy(() => import('../pages/Layout'));

const routes = [
  {
    path: "/",
    element: (
      <Suspense fallback={<Skeleton />}>
        <Layout />
      </Suspense>
    ),
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<Skeleton />}>
        <Login />
      </Suspense>
    ),
  },
];

export default routes;
