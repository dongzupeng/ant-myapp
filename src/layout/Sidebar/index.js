import React, { useEffect, useState } from 'react';
import styles from './index.module.less';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = ({ links, setOpen }) => {
  const [activeItem, setActiveItem] = useState('Home');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    // 解决刷新页面后，activeItem不显示的问题
    toggleSidebar(links.find((link) => link.url === path));
  }, []);
  //   切换侧边栏
  const toggleSidebar = (link) => {
    if (link) {
      setActiveItem(link.text);
      if (link.url === '/music') {
        setOpen(true);
        return;
      }
      navigate(link.url);
    }
  };
  return (
    <div className={styles.container}>
      <nav className={styles.menu}>
        {links.map((link) => (
          <div
            key={link.text}
            onClick={() => toggleSidebar(link)}
            className={`${styles.menu_item} ${activeItem === link.text ? `${styles.menu_item_active}` : ''}`}
          >
            <span className={styles.material_icons}>{link.icon}</span>
            <span className={styles.menu_item_label}>{link.text}</span>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
