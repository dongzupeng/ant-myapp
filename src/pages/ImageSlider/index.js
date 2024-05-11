import React, { useEffect, useState } from 'react';
import { Image } from 'antd';
import { getImageList } from '@/api/getImages';
import styles from './index.module.less';

const ImageSlider = () => {
  const [imageList, setImageList] = useState([]);
  const [page] = useState(Math.ceil(Math.random() * 10));
  // 用于存储每个图片的旋转角度
  const [rotations, setRotations] = useState([]);
  // 随机图片type
  const typeList = [
    'animal',
    'beauty',
    'car',
    'comic',
    'food',
    'game',
    'movie',
    'person',
    'phone',
    'scenery',
  ];
  const type = typeList[Math.floor(Math.random() * 10)];
  useEffect(() => {
    const params = {
      type,
      page,
      size: 15,
    };
    getImageList(params).then((res) => {
      setImageList(res.result.list);
      // 为每个图片生成一个随机旋转角度，并更新 rotations 状态
      const newRotations = res.result.list.map(
        () => Math.ceil(Math.random() * 10) - 5,
      );
      setRotations(newRotations);
    });
  }, []);
  return (
    <div className={styles.container}>
      <Image.PreviewGroup
        preview={{
          getContainer: () => document.getElementById('root'),
        }}
      >
        {imageList.map((item, index) => (
          <div className={styles.container__items} key={item.id}>
            <div
              className={`${styles.polaroid} ${styles.one}`}
              style={{ transform: `rotate(${rotations[index]}deg)` }} // 应用旋转角度
            >
              <div className={styles.polaroid__content}>
                <div className={styles.polaroid__content_image}>
                  <Image src={item.url} alt={item.title} loading='lazy' />
                </div>
                <div className={styles.polaroid__content_caption}>
                  <p>{item.title}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Image.PreviewGroup>
    </div>
  );
};

export default ImageSlider;
