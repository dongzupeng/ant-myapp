import React from 'react';
// import WaterfallFlow from '@/pages/Home/components/WaterfallFlow';
import ImageMasonry from '@/pages/Home/components/Wallpaper';

const Home = () => {
  return (
    <div>
      <h1 style={{ marginBottom: '10px' }}>Beautiful wallpaper</h1>
      {/* <WaterfallFlow /> */}
      <ImageMasonry />
    </div>
  );
};

export default Home;
