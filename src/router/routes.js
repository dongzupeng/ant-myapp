import React from 'react';
import { message } from 'antd';
// import Loading from '@/components/Loading';
import { getCache } from '@/utils/tokenStorage.js';
import App from '../App.js';
import { Navigate } from 'react-router-dom';
import Login from '@/pages/Login';
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
// login 页面不使用懒加载
// const Login = import('@/pages/Login');

const Layout = React.lazy(() => import('@/layout/container'));
const Home = React.lazy(() => import('@/pages/Home'));
const Video = React.lazy(() => import('@/pages/Video'));
const User = React.lazy(() => import('@/pages/User'));

const VideoDesc = React.lazy(
  () => import('@/pages/Video/components/XGPlayerComponent.js'),
);
const ImageSlider = React.lazy(() => import('@/pages/ImageSlider'));
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
        element: <PrivateRoute element={<Layout />} />,
        children: [
          {
            path: '/home',
            element: <PrivateRoute element={<Home />} />,
          },
          {
            path: '/home/video',
            element: <PrivateRoute element={<Video />} />,
          },
          {
            path: '/home/video/desc',
            element: <PrivateRoute element={<VideoDesc />} />,
          },
          {
            path: '/home/imageslider',
            element: <PrivateRoute element={<ImageSlider />} />,
          },
          {
            path: '/home/user',
            element: <PrivateRoute element={<User />} />,
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  { path: '*', element: <NotFoundPage /> },
];

export default routes;
