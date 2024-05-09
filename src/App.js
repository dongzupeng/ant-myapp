import React from 'react';
import { BackTop } from 'antd';
import { UpCircleFilled } from '@ant-design/icons';
import { Outlet } from 'react-router-dom';

function App() {
  const style = {
    position: 'relative',
    lineHeight: '40px',
    textAlign: 'center',
    fontSize: 40,
    bottom: 40,
    right: -50,
  };
  return (
    <div className='App'>
      <BackTop>
        <div style={style}>
          <UpCircleFilled />
        </div>
      </BackTop>
      <Outlet></Outlet>
    </div>
  );
}

export default App;
