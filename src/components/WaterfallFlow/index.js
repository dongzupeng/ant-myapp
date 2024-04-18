import React, { useState, useEffect, useRef } from 'react';
import { getImageList } from '@/api/getImages';
import './WaterfallFlow.less';

const COLUMNS = 3;
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

  return (
    <div ref={wallRef} style={{ height: '600px', overflowY: 'auto' }}>
      {photos.length > 0 &&
        photos.map((item) => (
          <div
            key={item.id}
            style={{
              width: `calc(100% / ${COLUMNS})`,
              float: 'left',
            }}
          >
            <img src={item.url} alt='photo' style={{ width: '100%' }} />
          </div>
        ))}
      {isLoading && <div>Loading...</div>}
    </div>
  );
};

export default WaterfallFlow;
