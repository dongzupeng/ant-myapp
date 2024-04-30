import React, { useEffect, useState } from 'react';
import './Sidebar.less';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = ({ links }) => {
  const [activeItem, setActiveItem] = useState('Home');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    // 解决刷新页面后，activeItem不显示的问题
    toggleSidebar(links.find((link) => link.url === path));
  }, []);
  // 切换侧边栏
  const toggleSidebar = (link) => {
    setActiveItem(link.text);
    navigate(link.url);
  };
  return (
    <div className='sidebar'>
      <div className='toggle-btn'>
        <ul className='links'>
          {links.map((link) => (
            <li
              key={link.text}
              className={`${activeItem === link.text ? 'open' : ''}`}
              onClick={() => toggleSidebar(link)}
            >
              <span>{link.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
