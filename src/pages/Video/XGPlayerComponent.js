import React, { useEffect, useRef } from 'react';
import 'xgplayer/dist/index.min.css'; // 引入XGPlayer的样式文件
import Player from 'xgplayer'; // 导入XGPlayer库

const XGPlayerComponent = ({ src }) => {
  const playerRef = useRef(null);

  useEffect(() => {
    // 初始化XGPlayer实例
    playerRef.current = new Player({
      el: playerRef, // 绑定到指定的DOM元素
      url: src, // 视频链接
      width: '100%', // 播放器宽度
      height: '400px', // 播放器高度
      playbackRate: [0.5, 0.75, 1, 1.5, 2], // 播放速率选项
      defaultPlaybackRate: 1, // 默认播放速率
      playsinline: true, // 在iPhone Safari中直接播放，不全屏
    });

    // 返回cleanup函数，用于卸载XGPlayer实例
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [src]);

  return <div id='xgplayer'></div>;
};

export default XGPlayerComponent;
