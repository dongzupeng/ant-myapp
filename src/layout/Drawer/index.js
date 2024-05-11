import { Drawer } from 'antd';
import React from 'react';
import MusicPlayer from '@/pages/MusicPlayer';
const DrawerMusic = ({ open, setOpen }) => {
  const closeDrawer = () => {
    setOpen(false);
  };
  return (
    <>
      <Drawer
        title='Music Player'
        placement='right'
        size='large'
        open={open}
        onClose={closeDrawer}
        getContainer={() => document.getElementById('root')}
        style={{
          minWidth: '100%',
          height: '100%',
          overflowY: 'auto',
        }}
      >
        <MusicPlayer></MusicPlayer>
      </Drawer>
    </>
  );
};
export default DrawerMusic;
