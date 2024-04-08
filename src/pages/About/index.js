import React, { useState, useEffect } from 'react';
import { getImageList } from '@/api/getImages';
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
  }, []); // 空数组作为第二个参数，表示effect仅在组件挂载时执行一次
  return (
    <div className='img-box'>
      {imgList.map((item) => (
        <img key={item.id} src={item.url} />
      ))}
    </div>
  );
};

export default About;
