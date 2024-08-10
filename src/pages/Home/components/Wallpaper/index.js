import React, { useEffect, useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { getImageList } from '@/api/getImages';
import { Image } from 'antd';

function ImageMasonry() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  // 加载更多数据
  const loadMore = () => {
    const params = {
      type: 'comic',
      page,
      size: 20,
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
    <div style={{ textAlign: 'center', width: '100%' }}>
      <ImageList variant='masonry' cols={3} gap={8}>
        <Image.PreviewGroup
          preview={{
            getContainer: () => document.getElementById('root'),
          }}
        >
          {items.map((item, index) => (
            <ImageListItem key={index}>
              <Image
                srcSet={`${item.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.url}?w=248&fit=crop&auto=format`}
                alt={item.title}
                loading='lazy'
              />
              <ImageListItemBar position='top' title={item.title} />
            </ImageListItem>
          ))}
        </Image.PreviewGroup>
      </ImageList>
    </div>
  );
}

const ImageMasonryMemo = React.memo(ImageMasonry);
export default ImageMasonryMemo;
