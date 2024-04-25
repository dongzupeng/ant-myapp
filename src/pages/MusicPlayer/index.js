import React, { useState, useRef, useEffect } from 'react';
import { Button, List } from 'antd';
// import { useLocation } from 'react-router-dom';
import './index.less';
import {
  PlayCircleOutlined,
  PauseCircleOutlined,
  StepForwardOutlined,
  StepBackwardOutlined,
  CustomerServiceFilled,
} from '@ant-design/icons';

const MusicPlayer = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [allTime, setAllTime] = useState('00:00');
  const [progress, setProgress] = useState(0);
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
  ];

  const playSong = () => {
    setIsPlaying(true);
    audioRef.current.play();
    // 保存播放状态到 localStorage
    localStorage.setItem('isPlaying', 'true');
  };
  // 暂停歌曲
  const pauseSong = () => {
    setIsPlaying(false);
    audioRef.current.pause();
  };
  // 播放下一首
  const playNextSong = () => {
    const nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIndex);
    audioRef.current.src = songs[nextIndex].url;
    audioRef.current.load();
    audioRef.current.addEventListener('canplay', () => {
      // 当资源可以播放时，开始播放
      playSong();
    });
  };
  // 播放上一首
  const playPreviousSong = () => {
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    setCurrentSongIndex(prevIndex);
    audioRef.current.src = songs[prevIndex].url;
    audioRef.current.load();
    audioRef.current.addEventListener('canplay', () => {
      // 当资源可以播放时，开始播放
      playSong();
    });
  };
  // 点击列表项播放歌曲
  const handleListItemClick = (index) => {
    setCurrentSongIndex(index);
    audioRef.current.src = songs[index].url;
    audioRef.current.load();
    audioRef.current.addEventListener('canplay', () => {
      // 当资源可以播放时，开始播放
      playSong();
    });
  };
  const handleSongEnded = () => {
    playNextSong();
  };
  const formatTime = (seconds) => {
    const date = new Date(seconds * 1000);
    const minutes = date.getUTCMinutes();
    const secondsDisplay = Math.floor(date.getUTCSeconds());

    return `${minutes.toString().padStart(2, '0')}:${secondsDisplay.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    // 当组件加载时，检查 localStorage 中的播放状态
    const savedIsPlaying = localStorage.getItem('isPlaying');
    if (savedIsPlaying === 'true') {
      // 如果音乐正在播放，恢复播放
      setIsPlaying(true);
      audioRef.current.play();
    }
  }, []); // 注意：这是一个只在组件加载时运行一次的 effect

  // 当当前歌曲播放完毕时，切换到下一首
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('ended', () => {
        audioRef.current.src = songs[currentSongIndex].url;
        handleSongEnded();
      });
    }
  }, [audioRef, currentSongIndex, songs]);
  // 更新播放进度和时间显示
  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      const update = () => {
        setProgress((audioElement.currentTime / audioElement.duration) * 100);
        setCurrentTime(formatTime(audioElement.currentTime));
        setAllTime(formatTime(audioElement.duration));
      };

      audioElement.addEventListener('timeupdate', update);

      // 在组件卸载时清除事件监听器
      return () => {
        audioElement.removeEventListener('timeupdate', update);
      };
    }
  }, [audioRef]);

  return (
    <div className='music-container'>
      <div className='music-title'>
        bro,放轻松{' '}
        <CustomerServiceFilled style={{ fontSize: '30px', color: '#6f91ee' }} />
      </div>
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
      <div style={{ width: '100%', backgroundColor: '#ddd', height: '10px' }}>
        <div
          id='progress-bar'
          style={{
            width: `${progress}% `,
            backgroundColor: '#bcc9ef',
            height: '10px',
          }}
        ></div>
      </div>

      <div id='current-time'>
        {currentTime}/{allTime}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <Button icon={<StepBackwardOutlined />} onClick={playPreviousSong} />
        {isPlaying ? (
          <Button icon={<PauseCircleOutlined />} onClick={pauseSong} />
        ) : (
          <Button icon={<PlayCircleOutlined />} onClick={playSong} />
        )}
        <Button icon={<StepForwardOutlined />} onClick={playNextSong} />
      </div>
    </div>
  );
};

export default MusicPlayer;
