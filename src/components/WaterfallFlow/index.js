import React, { useState, useEffect, useRef } from 'react';
import { getImageList } from '@/api/getImages';
import './WaterfallFlow.less';

// const COLUMNS = 3;
const PAGE_SIZE = 20;

const WaterfallFlow = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const wallRef = useRef(null);

  const loadMorePhotos = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const params = {
        type: 'beauty',
        page,
        size: PAGE_SIZE,
      };
      setPage(page + 1);
      const newPhotos = await getImageList(params);
      let { list } = newPhotos.result;
      list = [...photos, ...list];
      list = Array.from(new Set(list.map((item) => item.id))).map((id) => {
        return list.find((i) => i.id === id);
      });
      setPhotos(list);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }

    setIsLoading(false);
  };

  // 监听滚动事件
  useEffect(() => {
    const handleScroll = () => {
      if (
        wallRef.current &&
        wallRef.current.scrollHeight -
          (wallRef.current.scrollTop + wallRef.current.clientHeight) <
          10
      ) {
        loadMorePhotos();
      }
    };

    if (wallRef.current) {
      wallRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (wallRef.current) {
        wallRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [loadMorePhotos]);

  // 模拟API请求
  useEffect(() => {
    (async () => {
      const params = {
        type: 'beauty',
        page,
        size: PAGE_SIZE,
      };
      const initialPhotos = await getImageList(params);
      let { list } = initialPhotos.result;
      list = Array.from(new Set(list.map((item) => item.id))).map((id) => {
        return list.find((i) => i.id === id);
      });
      setPhotos(list);
    })();
  }, []);

  // 生成随机高度
  const generateRandomHeight = () => {
    return Math.floor(Math.random() * 100) + 200; // 随机生成 200 到 500 之间的高度
  };

  // 获取高度最小的列索引
  const getMinHeightColumnIndex = () => {
    const columns = document.querySelectorAll('.column-item');
    console.log(columns, '###');
    const columnHeights = Array.from(columns).map(
      (column) => column.offsetHeight,
    );
    return columnHeights.indexOf(Math.min(...columnHeights));
  };

  // 添加图片到高度最小的列
  const addImageToMinHeightColumn = (image) => {
    const columnIndex = getMinHeightColumnIndex();
    console.log(columnIndex, '最小高度==>');
    const column = document.querySelectorAll('.column-item')[columnIndex];
    const img = document.createElement('img');
    img.src = image.url;
    img.alt = image.title;
    img.style.width = '30%';
    img.style.height = generateRandomHeight() + 'px';
    // img.style.marginBottom = '20px'; // 图片之间留有一定的间距
    column.appendChild(img);
    // updateAllColumnsHeight();
  };
  return (
    <div ref={wallRef} style={{ height: '600px', overflowY: 'auto' }}>
      <div
        className='column'
        style={{
          width: `100%`,
        }}
      >
        <div className='column-item'></div>
      </div>
      {photos.map((item) => {
        addImageToMinHeightColumn(item);
      })}
      {isLoading && <div>Loading...</div>}
    </div>
  );
};

export default WaterfallFlow;
