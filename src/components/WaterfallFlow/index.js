import React, { useState, useEffect } from 'react';
import { Image } from 'antd';
import { getImageList } from '@/api/getImages';
import './WaterfallFlow.less';

const WaterfallFlow = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  // 加载更多数据
  const loadMore = (PAGE_SIZE) => {
    const params = {
      type: 'beauty',
      page,
      size: PAGE_SIZE,
    };
    if (isLoading) return;
    setIsLoading(true);
    getImageList(params)
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
      if (scrollHeight - scrollTop - clientHeight < 200) {
        loadMore(10);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading, items]); // 依赖项中包含isLoading和items以确保在它们改变时重新注册事件监听器

  // 渲染瀑布流布局
  const renderWaterfall = () => {
    return (
      <Image.PreviewGroup>
        {items.map((item) => (
          <div
            key={item.id}
            className='water-item'
            style={{ width: '100%', breakInside: 'avoid', marginBottom: '8px' }}
          >
            <Image
              placeholder
              key={item.id}
              src={item.url}
              style={{ width: '100%', borderRadius: '8px' }}
              onError={() => {}} // 忽略图片加载错误
              onLoad={() => {}} // 不需要特别处理图片加载完成事件，因为占位符会在图片加载时自动被替换
            />
          </div>
        ))}
      </Image.PreviewGroup>
    );
  };

  // 初始加载数据
  useEffect(() => {
    loadMore();
  }, []);

  return (
    <div
      className='water-fall'
      style={{ columnCount: 3, columnGap: '0.6em', columnFill: 'balance' }}
    >
      {renderWaterfall()}
      {isLoading && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>加载中...</div>
      )}
    </div>
  );
};

export default WaterfallFlow;
