import React, { useState } from 'react';
import { Dropdown, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate, Outlet } from 'react-router-dom';
import { removeCache } from '@/utils/tokenStorage';
import './index.less';
import imgUrl from '@/assets/images/avatar.jpg';
import Sidebar from '@/layout/Sidebar';
import MusicPlayer from '@/layout/Drawer';
// import Test from '@/components/test.js';

const items = [
  { label: '退出登录', key: 'logout' }, // 菜单项务必填写 key
  { label: '设置', key: 'setting' },
  { label: '听听音乐吧', key: 'music' },
  { label: '个人中心', key: 'center' },
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
    { url: '/home', text: 'Home' },
    { url: '/home/imageslider', text: 'ImageSlider' },
  ];
  // 退出登录
  const confirm = () => {
    Modal.confirm({
      title: '确认退出吗？',
      icon: <ExclamationCircleOutlined />,
      content: '确认将离开系统！',
      okText: '确认',
      cancelText: '取消',
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
          <img className='avatar' src={imgUrl} alt='' />
        </Dropdown>
      </header>
      <div className='content'>
        <nav className='sidebar'>
          {/* 侧边栏组件 */}
          <Sidebar links={links}></Sidebar>
          <MusicPlayer open={open} setOpen={setOpen}></MusicPlayer>
        </nav>
        <main className='main-content'>
          <Outlet></Outlet>
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
