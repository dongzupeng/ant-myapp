import React, { useState } from 'react';
import './Sidebar.less';

const Sidebar = ({ links }) => {
  const [activeItem, setActiveItem] = useState('About');

  const toggleSidebar = (options) => {
    const activeItemText = options.target.innerText;
    setActiveItem(activeItemText);
  };
  return (
    <div className='sidebar'>
      <div className='toggle-btn'>
        <ul className='links'>
          {links.map((link) => (
            <li
              key={link.text}
              className={`${activeItem === link.text ? 'open' : ''}`}
              onClick={toggleSidebar}
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
