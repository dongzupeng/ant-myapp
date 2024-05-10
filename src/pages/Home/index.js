import React from 'react';
// import WaterfallFlow from '@/pages/Home/components/WaterfallFlow';
import ImageMasonryMemo from '@/pages/Home/components/Wallpaper';

const Home = () => {
  return (
    <div>
      <h1 style={{ marginBottom: '10px' }}>Beautiful wallpaper</h1>
      {/* <WaterfallFlow /> */}
      <ImageMasonryMemo />
    </div>
  );
};

export default Home;
