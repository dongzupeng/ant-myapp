import React, { Suspense } from 'react';
import { BackTop } from 'antd';
import { UpCircleFilled } from '@ant-design/icons';
import { Outlet } from 'react-router-dom';
import Loading from './components/Loading';

function App() {
  const style = {
    position: 'absolute',
    lineHeight: '40px',
    textAlign: 'center',
    fontSize: 40,
    bottom: 40,
    right: -50,
    zIndex: 2,
  };
  return (
    <div className='App'>
      <BackTop>
        <div style={style}>
          <UpCircleFilled />
        </div>
      </BackTop>
      <Suspense fallback={<Loading />}>
        <Outlet></Outlet>
      </Suspense>
    </div>
  );
}

export default App;
