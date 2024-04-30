import React, { useEffect, useState } from 'react';
import { getImageList } from '@/api/getImages';
import './index.less';

const ImageSlider = () => {
  const [imageList, setImageList] = useState([]);
  const [page] = useState(Math.ceil(Math.random() * 10));
  useEffect(() => {
    const params = {
      type: 'beauty',
      page,
      size: 15,
    };
    getImageList(params).then((res) => {
      setImageList(res.result.list);
    });
  }, [page]);
  useEffect(() => {
    // 随机旋转
    var polaroids = document.querySelectorAll('.polaroid');
    polaroids.forEach((item) => {
      const randomRotation = Math.ceil(Math.random() * 10) - 5;
      item.style.transform = `rotate(${randomRotation}deg)`;
    });
  });
  return (
    <div className='container'>
      {imageList.map((item) => (
        <div className='container__items' key={item.id}>
          <div className='polaroid one'>
            <div className='polaroid__content'>
              <div className='polaroid__content-image'>
                <img src={item.url} alt={item.title} />
              </div>
              <div className='polaroid__content-caption'>
                <p>{item.title}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageSlider;
