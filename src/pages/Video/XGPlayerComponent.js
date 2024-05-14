import React, { useEffect, useRef } from 'react';
import Player from 'xgplayer'; // 确保正确导入XGPlayer库
import 'xgplayer/dist/index.min.css'; // 引入XGPlayer的样式文件
import { useLocation } from 'react-router-dom';

const XGPlayerComponent = ({ src }) => {
  const playerRef = useRef(null); // 创建一个ref来引用DOM元素
  const location = useLocation();
  console.log(location);
  const { id, url } = location.state || {};
  console.log(id, url);
  useEffect(() => {
    if (playerRef.current) {
      const height = '40vh';
      // 初始化XGPlayer实例，使用ref.current来引用DOM元素
      const player = new Player({
        el: playerRef.current, // 绑定到指定的DOM元素
        url: url, // 视频链接
        width: '100%', // 播放器宽度
        height: `calc(100vh - ${height})`, // 播放器高度
        playbackRate: [0.5, 0.75, 1, 1.5, 2], // 播放速率选项
        defaultPlaybackRate: 1, // 默认播放速率
        playsinline: true, // 在iPhone Safari中直接播放，不全屏
      });

      // 清理函数，用于销毁播放器实例
      return () => {
        player.destroy();
      };
    }
  }, [src]); // 监听src的变化

  // 渲染一个div元素，并将ref绑定到它上面
  return (
    <div
      ref={playerRef}
      id='xgplayer'
      style={{ width: '100%', height: '100%' }}
    ></div>
  );
};

export default XGPlayerComponent;
