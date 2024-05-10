import React from 'react';
import './musicCard.less';
const MusicCard = ({
  handleListItemClick,
  songs,
  currentSongIndex,
  isPlaying,
}) => {
  return (
    <div className='main'>
      {songs.map((item, index) => {
        return (
          <div
            className='loader'
            key={item.title}
            onClick={() => handleListItemClick(index)}
          >
            <div className='song'>
              <p className='name'>{item.title}</p>
              <p className='artist'>{item.name}</p>
            </div>
            <div className='albumcover'></div>
            {isPlaying && currentSongIndex === index ? (
              <div className='loading'>
                <div className='load'></div>
                <div className='load'></div>
                <div className='load'></div>
                <div className='load'></div>
              </div>
            ) : (
              <div className='play'></div>
            )}
          </div>
        );
      })}
    </div>
  );
};
export default MusicCard;
