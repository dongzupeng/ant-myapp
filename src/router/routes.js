import React, { Suspense } from 'react';
import { Skeleton, message } from 'antd';
import { getCache } from '@/utils/tokenStorage.js';
import App from '../App.js';
import { Navigate } from 'react-router-dom';
// 判断系统是否登录
const isAuthenticated = () => {
  // 假设这里是检查用户认证 token 的函数，返回 true 表示用户已登录，否则返回 false
  const token = getCache('token');
  !token && message.warning('请重新登录系统');
  return !!token; // 如果 token 存在，则返回 true，否则返回 false
};
// 添加私有路由配置 拦截页面显示 重定向到登录页面
const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? (
    element
  ) : (
    <Navigate replace to='/login' /> // 如果未登录，则重定向到登录页面
  );
};

const Login = React.lazy(() => import('@/pages/Login'));
const Home = React.lazy(() => import('@/pages/Home'));
const About = React.lazy(() => import('@/pages/About'));
const MusicPlayer = React.lazy(() => import('@/pages/MusicPlayer'));
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
            {<PrivateRoute element={<Home />} />}
          </Suspense>
        ),
        children: [
          {
            path: '/home',
            element: (
              <Suspense fallback={<Skeleton />}>
                {<PrivateRoute element={<About />} />}
              </Suspense>
            ),
          },
          {
            path: '/home/music',
            element: (
              <Suspense fallback={<Skeleton />}>
                {<PrivateRoute element={<MusicPlayer />} />}
              </Suspense>
            ),
          },
        ],
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
