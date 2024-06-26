import React, { useState, Suspense } from 'react';
import { Dropdown, Modal } from 'antd';
import Loading from '@/components/Loading';
import {
  ExclamationCircleOutlined,
  HomeFilled,
  PictureFilled,
  CustomerServiceOutlined,
  YoutubeFilled,
  UserOutlined,
  RedditOutlined,
} from '@ant-design/icons';
import { useNavigate, Outlet } from 'react-router-dom';
import { removeCache } from '@/utils/tokenStorage';
import './index.less';
import Sidebar from '@/layout/Sidebar';
import MusicPlayer from '@/layout/Drawer';
// import Test from '@/components/test.js';

const items = [
  { label: '退出登录', key: 'logout' }, // 菜单项务必填写 key
  { label: '设置', key: 'setting' },
  { label: '音乐吧', key: 'music' },
  { label: '个人中心', key: 'user' },
];

function Layout() {
  const navigate = useNavigate();
  // 父组件中定义状态
  const [open, setOpen] = useState(false);
  const onClick = ({ key }) => {
    if (key === 'logout') {
      confirm();
    }
    if (key === 'music') {
      setOpen(true);
    }
  };
  const links = [
    { url: '/home', text: 'Home', icon: <HomeFilled /> },
    { url: '/home/imageslider', text: 'ImageSlider', icon: <PictureFilled /> },
    { url: '/home/video', text: 'Video', icon: <YoutubeFilled /> },
    { url: '/music', text: 'Music', icon: <CustomerServiceOutlined /> },
    { url: '/home/user', text: 'User', icon: <UserOutlined /> },
    { url: '/home/chatAI', text: 'ChatAI', icon: <RedditOutlined /> },
  ];
  // 退出登录
  const confirm = () => {
    Modal.confirm({
      title: '确认退出吗？',
      icon: <ExclamationCircleOutlined />,
      content: '确认将离开系统！',
      okText: '确认',
      cancelText: '取消',
      getContainer: () => document.getElementById('root'),
      onOk() {
        console.log('确认');
        navigate('/login');
        removeCache('token');
      },
      onCancel() {
        console.log('取消');
      },
    });
  };
  return (
    <div className='App-container'>
      <header className='header'>
        <div className='text'>头文字D的秘密花园</div>
        <Dropdown menu={{ items, onClick }} placement='bottom' arrow>
          <img
            className='avatar'
            src='https://pic.netbian.com/uploads/allimg/220104/234553-1641311153631c.jpg?w=162&auto=format'
            alt=''
          />
        </Dropdown>
        {/* 导航 */}
        <Sidebar links={links} setOpen={setOpen}></Sidebar>
      </header>
      <nav>
        <MusicPlayer open={open} setOpen={setOpen}></MusicPlayer>
      </nav>
      <div className='content'>
        <main className='main-content'>
          <Suspense fallback={<Loading />}>
            <Outlet></Outlet>
          </Suspense>
        </main>
      </div>
      <footer className='footer'>
        头文字D的秘密花园 ©{new Date().getFullYear()} Created by 头文字D
        {/* <Test></Test> */}
      </footer>
    </div>
  );
}

export default Layout;
