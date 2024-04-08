import React, { useState, useEffect } from 'react';
import { getImageList } from '@/api/getImages';
import WaterfallFlow from '@/components/WaterfallFlow';
const About = () => {
  const [imgList, setImgList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const params = {
        type: 'beauty',
        page: 1,
        size: 20,
      };
      try {
        // 使用async/await调用API
        const res = await getImageList(params);
        if (!res.code == 200) {
          throw new Error('Network response was not ok');
        }
        setImgList(res.result.list);
        console.log(res, 'data==>');
        console.log(imgList, 'imgList==>');
      } catch (error) {
        console.error('There was a problem fetching the data: ', error);
      }
    };
    fetchData(); // 调用fetchData函数
  }, []);
  const items = Array.from({ length: 20 }, (_, index) => (
    <div
      key={index}
      style={{
        height: `${Math.floor(Math.random() * 200) + 100}px`,
        backgroundColor: 'lightblue',
      }}
    >
      Item {index + 1}
    </div>
  ));
  return (
    <div className='img-box'>
      <h1>Waterfall Flow Example</h1>
      <WaterfallFlow items={items} columnCount={3} />
    </div>
  );
};

export default About;
