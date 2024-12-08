'use client'; // Client-side rendering を明示

import { useEffect,useState } from 'react';
import styles from './styles.module.css';

interface Video {
    id: string;
    url: string;
    thumbnail: string;
    title: string;
    viewCount: number;
    publishedAt: string;
    duration: string;
}

interface TwitchVideoListProps{
    username: string;
}

const TwitchVideoList: React.FC<TwitchVideoListProps> = ({ username }) => {
//   const [username, setUsername] = useState(''); // 入力されたユーザー名
  const [videos, setStreamInfo] = useState<Video[]>([]); // 取得した配信情報
  const [error, setError] = useState<string | null>(null); // エラー情報

  // **********************　この下の関数が主要な処理　********************** //

//   const fetchStreamInfo = async () => {
//     setError(null);
//     setStreamInfo(null);

//     try {
//       // API エンドポイントを呼び出し
//       const response = await fetch(`/api/get-stream?username=${username}`);
//       const data = await response.json();

//       if (response.ok) {
//         setStreamInfo(data.stream || data.message); // 成功時は配信情報を保存
//       } else {
//         setError(data.error); // エラー時はエラー内容を保存
//       }
//     } catch (err) {
//       setError('An error occurred while fetching stream info');
//     }
//   };

  // **********************　この上の関数が主要な処理　********************** //
  const CACHE_EXPIRY_TIME = 3600 * 1000;

//   const getCachedVideos = (channelId: string) => {
//       const cachedVideos = localStorage.getItem(`videos_${channelId}`);
//       const cachedTime = localStorage.getItem(`videos_time_${channelId}`);

//       if (cachedVideos && cachedTime) {
//           const elapsedTime = Date.now() - parseInt(cachedTime);
//           if (elapsedTime < CACHE_EXPIRY_TIME) {
//               return JSON.parse(cachedVideos);
//           }
//       }
//       return null;
//   };

//   const setCache = (videos: Video[], channelId: string) => {
//       localStorage.setItem(`videos_${channelId}`, JSON.stringify(videos));
//       localStorage.setItem(`videos_time_${channelId}`, Date.now().toString());
//   };


const fetchStreamInfo = async (username:string) => {
    setError(null);
    setStreamInfo([]);

    try {
      // API エンドポイントを呼び出し
      const response = await fetch(`/api/get-stream?username=${username}`);
      const data = await response.json();

      if (response.ok) {
        setStreamInfo(data.stream || data.message); // 成功時は配信情報を保存
      } else {
        setError(data.error); // エラー時はエラー内容を保存
      }
    } catch (err) {
      setError('An error occurred while fetching stream info');
    }
  };
  const formatDate = (isoString: string): string => {
      const date = new Date(isoString);
      return date.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const formatDuration = (duration: string): string => {
      const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
      const hours = match && match[1] ? parseInt(match[1].replace('H', '')) : 0;
      const minutes = match && match[2] ? parseInt(match[2].replace('M', '')) : 0;
      const seconds = match && match[3] ? parseInt(match[3].replace('S', '')) : 0;
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
      const fetchVideos = fetchStreamInfo(username);
          console.log('Fetching new videos');
  }, [username]);

  if (error) {
      return <div>{error}</div>;
  }
  return (
    <div className={styles.container}>
    <ul className={styles.videoList}>
        {videos.map((video) => (
            <li key={video.id} className={styles.videoItem}>
                <a href={video.url} className={styles.videoLink} target="_blank" rel="noopener noreferrer">
                    <img src={video.thumbnail} alt={video.title} className={styles.thumbnail} />
                    <div className={styles.videoInfo}>
                        <h3 className={styles.videoTitle}>{video.title}</h3>
                        <p className={styles.videoMeta}>再生回数: {video.viewCount}</p>
                        <p className={styles.videoMeta}>アップロード日: {video.publishedAt}</p>
                        <p className={styles.videoMeta}>動画の長さ: {video.duration}</p>
                    </div>
                </a>
            </li>
        ))}
    </ul>
</div>
  );
}


export default TwitchVideoList;
