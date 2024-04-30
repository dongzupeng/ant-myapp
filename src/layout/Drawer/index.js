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
      >
        <MusicPlayer></MusicPlayer>
      </Drawer>
    </>
  );
};
export default DrawerMusic;
