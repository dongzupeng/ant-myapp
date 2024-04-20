import React, { useState } from 'react';
import './Sidebar.less';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ links }) => {
  const [activeItem, setActiveItem] = useState('About');
  const navigate = useNavigate();

  const toggleSidebar = (link) => {
    setActiveItem(link.text);
    if (link.url === '/home') {
      navigate(link.url);
    } else {
      navigate('/home' + link.url);
    }
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
