import React, { useState, useRef } from 'react';
import { Button, List } from 'antd';
import './index.less';
import {
  PlayCircleOutlined,
  PauseCircleOutlined,
  StepForwardOutlined,
  StepBackwardOutlined,
} from '@ant-design/icons';

const MusicPlayer = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const songs = [
    {
      title: '安静',
      url: 'music/安静-周杰伦-范特西.mp3',
    },
    {
      title: '爸我回来了',
      url: 'music/爸我回来了-周杰伦.mp3',
    },
    {
      title: '爱在西元前',
      url: 'music/爱在西元前-周杰伦.mp3',
    },
    {
      title: '暗号',
      url: 'music/暗号-周杰伦.mp3',
    },
    {
      title: '白兰花',
      url: 'music/白兰花-林俊杰.mp3',
    },
    // Add more songs as needed
  ];

  const playSong = () => {
    setIsPlaying(true);
    audioRef.current.play();
  };

  const pauseSong = () => {
    setIsPlaying(false);
    audioRef.current.pause();
  };

  const playNextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
  };

  const playPreviousSong = () => {
    setCurrentSongIndex(
      (prevIndex) => (prevIndex - 1 + songs.length) % songs.length,
    );
  };

  const handleListItemClick = (index) => {
    setCurrentSongIndex(index);
    playSong();
  };

  return (
    <div className='music-container'>
      <h1 className='music-title'>bro,放轻松</h1>
      <audio ref={audioRef} src={songs[currentSongIndex].url}></audio>
      <List
        dataSource={songs}
        renderItem={(song, index) => (
          <List.Item
            onClick={() => handleListItemClick(index)}
            className={index === currentSongIndex ? 'active' : ''}
          >
            {song.title}
          </List.Item>
        )}
      />
      <h2 style={{ textAlign: 'center' }}>{songs[currentSongIndex].title}</h2>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <Button
          shape='circle'
          icon={<StepBackwardOutlined />}
          onClick={playPreviousSong}
        />
        {isPlaying ? (
          <Button
            shape='circle'
            icon={<PauseCircleOutlined />}
            onClick={pauseSong}
          />
        ) : (
          <Button
            shape='circle'
            icon={<PlayCircleOutlined />}
            onClick={playSong}
          />
        )}
        <Button
          shape='circle'
          icon={<StepForwardOutlined />}
          onClick={playNextSong}
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
