const useSongs = () => {
  const songs = [];
  // 获取public文件夹下的music文件中的文件名称添加到songs数组中
  const musicFiles = require.context('/public/music', false, /\.mp3$/);
  console.log(musicFiles);
  musicFiles.keys().forEach((key) => {
    const title = key.split('/')[1].replace('.mp3', '');
    songs.push({
      title,
      url: `music/${key}`,
    });
  });
  return songs;
};
export default useSongs;
