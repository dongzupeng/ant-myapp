import React from 'react';
import { useNavigate } from 'react-router-dom';
// import XGPlayerComponent from './XGPlayerComponent.js';
import './index.less';
const VideoItem = ({ items }) => {
  const navigate = useNavigate();
  const handelClick = (id) => {
    navigate(`/home/video/desc/${id}`);
  };
  return items.map((item) => {
    return (
      <div className='card' key={item.id}>
        {/* 显示封面 */}
        <div
          className='card__view'
          style={{
            backgroundImage: `url(${item.coverUrl})`,
            backgroundSize: 'cover',
          }}
          onClick={() => handelClick(item.id)}
        >
          <div className='card__view__data'>
            <p className='card__view__preview'>Preview</p>
            <p className='card__play__icon'>
              <svg width='8px' height='8px' viewBox='-0.5 0 7 7' version='1.1'>
                <g
                  id='Page-1'
                  stroke='none'
                  strokeWidth='1'
                  fill='none'
                  fillRule='evenodd'
                >
                  <g
                    id='Dribbble-Light-Preview'
                    transform='translate(-347.000000, -3766.000000)'
                    fill='#000000'
                  >
                    <g id='icons' transform='translate(56.000000, 160.000000)'>
                      <path
                        fill='#EAECEE'
                        d='M296.494737,3608.57322 L292.500752,3606.14219 C291.83208,3605.73542 291,3606.25002 291,3607.06891 L291,3611.93095 C291,3612.7509 291.83208,3613.26444 292.500752,3612.85767 L296.494737,3610.42771 C297.168421,3610.01774 297.168421,3608.98319 296.494737,3608.57322'
                        id='play-[#1003]'
                      ></path>
                    </g>
                  </g>
                </g>
              </svg>
            </p>
            <p className='card__lenght'>{item.duration}</p>
          </div>
        </div>
        <div className='card__content'>
          <p className='channel__video__name'>{item.title}</p>
          <div className='channel__data'>
            <div
              className='channel__img'
              style={{
                backgroundImage: `url(${item.userPic})`,
                backgroundSize: 'cover',
              }}
            ></div>
            <div className='channel__data__text'>
              <p className='channel__name'>{item.userName}</p>
              <div className='channel__subdata'>
                <p className='channel__views'>
                  {Math.ceil(Math.random() * 1000)} Views
                </p>
                <p className='channel__date'>
                  {Math.ceil(Math.random() * 12)}months ago
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });
};
export default VideoItem;
