import React, { Suspense} from 'react';
import { Skeleton } from "antd";

const Login = React.lazy(() => import('@/pages/Login'));
const Home = React.lazy(() => import("@/pages/Home"));

const routes = [
  {
    path: "/home",
    element: (
      <Suspense fallback={<Skeleton />}>
        <Home />
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
