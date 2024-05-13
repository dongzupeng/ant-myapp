// 创建video组件
import React, { useEffect, useState } from 'react';
import { getVideoList } from '@/api/getVideo';
import VideoItem from './videoItem';
const VideoList = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(Math.ceil(Math.random() * 200));

  // 加载更多数据
  const loadMore = () => {
    const params = {
      page,
      size: 20,
    };
    if (isLoading) return;
    setIsLoading(true);
    getVideoList(params)
      .then((newData) => {
        setItems((prevItems) => [...prevItems, ...newData.result.list]);
        setPage((prevPage) => prevPage + 1);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  };
  // 监听滚动事件，加载更多
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollHeight - scrollTop - clientHeight < 300) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading, items]);
  // 初始加载数据
  useEffect(() => {
    loadMore();
  }, []);
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}
    >
      <VideoItem items={items} />
    </div>
  );
};
export default VideoList;
