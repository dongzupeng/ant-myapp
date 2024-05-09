import React, { useEffect, useState } from 'react';
import { Image } from 'antd';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import { styled } from '@mui/material/styles';
import { getImageList } from '@/api/getImages';

const Label = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
}));

export default function ImageMasonry() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  // 随机图片type
  //   const typeList = [
  //     'animal',
  //     'beauty',
  //     'car',
  //     'comic',
  //     'food',
  //     'game',
  //     'movie',
  //     'person',
  //     'phone',
  //     'scenery',
  //   ];
  //   const type = typeList[Math.floor(Math.random() * 10)];

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
  // 初始加载数据
  useEffect(() => {
    loadMore();
  }, []);
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
  return (
    <Box sx={{ width: '100%', minHeight: 300 }}>
      <Masonry columns={3} spacing={2}>
        {items.map((item, index) => (
          <div key={index}>
            <Image
              srcSet={`${item.url}?w=162&auto=format&dpr=2 2x`}
              src={`${item.url}?w=162&auto=format`}
              alt={item.title}
              loading='lazy'
              placeholder={true}
              style={{
                borderRadius: 4,
                display: 'block',
                width: '100%',
              }}
            />
            <Label>{item.title}</Label>
          </div>
        ))}
      </Masonry>
    </Box>
  );
}
