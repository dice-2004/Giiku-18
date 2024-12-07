// 'use client'

// import React, { useEffect, useState } from 'react';

// interface Video {
//     id: string;
//     title: string;
//     thumbnail: string;
// }

// const YouTubeVideoList: React.FC = () => {
//     const [videos, setVideos] = useState<Video[]>([]);
//     const [error, setError] = useState<string | null>(null);

//     const fetchVideos = async (channelId: string) => {
//         const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
//         const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=1&order=date&type=video&key=${apiKey}`;

//         try {
//             const response = await fetch(apiUrl, { next: { revalidate: 3600 } });
//             if (!response.ok) {
//                 throw new Error(`YouTube API request failed with status ${response.status}`);
//             }

//             const data = await response.json();
//             const fetchedVideos: Video[] = data.items.map((item: any) => ({
//                 id: item.id.videoId,
//                 title: item.snippet.title,
//                 thumbnail: item.snippet.thumbnails.high.url,
//             }));

//             setVideos(fetchedVideos);
//         } catch (err) {
//             console.error('Error fetching videos:', err);
//             setError('動画の取得に失敗しました。もう一度お試しください。');
//         }
//     };

//     useEffect(() => {
//         const channelId = 'UCPkKpOHxEDcwmUAnRpIu-Ng'; // 手動で設定するチャンネルID
//         fetchVideos(channelId);
//     }, []);

//     if (error) {
//         return <div>{error}</div>;
//     }

//     return (
//         <div>
//             <h2>YouTube Videos</h2>
//             <ul>
//                 {videos.map((video) => (
//                     <li key={video.id}>
//                         <img src={video.thumbnail} alt={video.title} />
//                         <p>{video.title}</p>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export async function getStaticProps({ params }: { params: { channelId: string } }) {
//     const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
//     const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${params.channelId}&maxResults=1&order=date&type=video&key=${apiKey}`;

//     try {
//         const response = await fetch(apiUrl, { next: { revalidate: 3600 } });
//         if (!response.ok) {
//             throw new Error(`YouTube API request failed with status ${response.status}`);
//         }

//         const data = await response.json();
//         const videos = data.items.map((item: any) => ({
//             id: item.id.videoId,
//             title: item.snippet.title,
//             thumbnail: item.snippet.thumbnails.high.url,
//         }));

//         return {
//             props: {
//                 initialVideos: videos,
//             },
//         };
//     } catch (error) {
//         console.error('Error fetching videos in getStaticProps:', error);
//         return {
//             props: {
//                 initialVideos: [],
//                 error: '動画の取得に失敗しました。',
//             },
//         };
//     }
// }

// export default YouTubeVideoList;


// 'use client'

// import React, { useEffect, useState } from 'react';

// interface Video {
//     id: string;
//     title: string;
//     thumbnail: string;
// }

// const YouTubeVideoList: React.FC = () => {
//     const [videos, setVideos] = useState<Video[]>([]);
//     const [error, setError] = useState<string | null>(null);

//     // チャンネルIDを設定（ここでは手動で指定）
//     const channelId = 'UCPkKpOHxEDcwmUAnRpIu-Ng'; 

//     // キャッシュの有効期限を設定（ここでは1時間）
//     const CACHE_EXPIRY_TIME = 3600 * 1000; // 1時間

//     // ローカルストレージからデータを取得する関数（キャッシュの有効期限チェックも含む）
//     const getCachedVideos = () => {
//         const cachedVideos = localStorage.getItem('videos');
//         const cachedTime = localStorage.getItem('videos_time');

//         if (cachedVideos && cachedTime) {
//             const elapsedTime = Date.now() - parseInt(cachedTime);
//             // キャッシュが期限内であればキャッシュからデータを返す
//             if (elapsedTime < CACHE_EXPIRY_TIME) {
//                 return JSON.parse(cachedVideos);
//             }
//         }
//         return null; // 期限切れまたはキャッシュが存在しない場合
//     };

//     // ローカルストレージに動画データを保存する関数
//     const setCache = (videos: Video[]) => {
//         localStorage.setItem('videos', JSON.stringify(videos)); // 動画データをキャッシュ
//         localStorage.setItem('videos_time', Date.now().toString()); // キャッシュ保存時刻
//     };

//     // YouTube APIから動画を取得する関数
//     const fetchVideos = async () => {
//         const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
//         const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=1&order=date&type=video&key=${apiKey}`;

//         try {
//             const response = await fetch(apiUrl, { next: { revalidate: 3600 } });
//             if (!response.ok) {
//                 throw new Error(`YouTube API request failed with status ${response.status}`);
//             }

//             const data = await response.json();
//             const fetchedVideos: Video[] = data.items.map((item: any) => ({
//                 id: item.id.videoId,
//                 title: item.snippet.title,
//                 thumbnail: item.snippet.thumbnails.high.url,
//             }));

//             // データをステートにセットし、localStorageにキャッシュ
//             setVideos(fetchedVideos);
//             setCache(fetchedVideos); // キャッシュ保存
//         } catch (err) {
//             console.error('Error fetching videos:', err);
//             setError('動画の取得に失敗しました。もう一度お試しください。');
//         }
//     };

//     useEffect(() => {
//         const cachedVideos = getCachedVideos();
//         if (cachedVideos) {
//             setVideos(cachedVideos); // キャッシュがあれば、それをセット
//         } else {
//             fetchVideos(); // キャッシュがなければAPIを呼び出して取得
//         }
//     }, []);

//     // エラーハンドリング
//     if (error) {
//         return <div>{error}</div>;
//     }

//     return (
//         <div>
//             <h2>YouTube Videos</h2>
//             <ul>
//                 {videos.map((video) => (
//                     <li key={video.id}>
//                         <img src={video.thumbnail} alt={video.title} />
//                         <p>{video.title}</p>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default YouTubeVideoList;















































// 'use client'

// import React, { useEffect, useState } from 'react';

// interface Video {
//     id: string;
//     title: string;
//     thumbnail: string;
// }

// // PropsにchannelIdを受け取る型を定義
// interface YouTubeVideoListProps {
//     channelId: string; // channelIdを引数として受け取る
// }

// const YouTubeVideoList: React.FC<YouTubeVideoListProps> = ({ channelId }) => {
//     const [videos, setVideos] = useState<Video[]>([]);
//     const [error, setError] = useState<string | null>(null);

//     // キャッシュの有効期限を設定（1時間）
//     const CACHE_EXPIRY_TIME = 3600 * 1000; // 1時間

//     // ローカルストレージからデータを取得する関数（キャッシュの有効期限チェックも含む）
//     const getCachedVideos = (channelId: string) => {
//         const cachedVideos = localStorage.getItem(`videos_${channelId}`);
//         const cachedTime = localStorage.getItem(`videos_time_${channelId}`);

//         if (cachedVideos && cachedTime) {
//             const elapsedTime = Date.now() - parseInt(cachedTime);
//             if (elapsedTime < CACHE_EXPIRY_TIME) {
//                 return JSON.parse(cachedVideos);
//             }
//         }
//         return null;
//     };

//     // ローカルストレージに動画データを保存する関数
//     const setCache = (videos: Video[], channelId: string) => {
//         localStorage.setItem(`videos_${channelId}`, JSON.stringify(videos));
//         localStorage.setItem(`videos_time_${channelId}`, Date.now().toString());
//     };

//     // YouTube APIから動画を取得する関数
//     const fetchVideos = async () => {
//         const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
//         const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=1&order=date&type=video&key=${apiKey}`;

//         try {
//             const response = await fetch(apiUrl);
//             if (!response.ok) {
//                 throw new Error(`YouTube API request failed with status ${response.status}`);
//             }

//             const data = await response.json();
//             const fetchedVideos: Video[] = data.items.map((item: any) => ({
//                 id: item.id.videoId,
//                 title: item.snippet.title,
//                 thumbnail: item.snippet.thumbnails.high.url,
//             }));

//             setVideos(fetchedVideos);
//             setCache(fetchedVideos, channelId); // キャッシュ保存
//         } catch (err) {
//             console.error('Error fetching videos:', err);
//             setError('動画の取得に失敗しました。もう一度お試しください。');
//         }
//     };

//     useEffect(() => {
//         const cachedVideos = getCachedVideos(channelId);
//         if (cachedVideos) {
//             setVideos(cachedVideos); // キャッシュがあれば、それをセット
//         } else {
//             fetchVideos(); // キャッシュがなければAPIを呼び出して取得
//         }
//     }, [channelId]); // channelIdが変わるたびに再実行

//     if (error) {
//         return <div>{error}</div>;
//     }

//     return (
//         <div>
//             <h2>YouTube Videos</h2>
//             <ul>
//                 {videos.map((video) => (
//                     <li key={video.id}>
//                         <img src={video.thumbnail} alt={video.title} />
//                         <p>{video.title}</p>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default YouTubeVideoList;














'use client'

import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';

interface Video {
    id: string;
    title: string;
    thumbnail: string;
    url: string;
    viewCount: string;
    publishedAt: string;
    duration: string;
}

interface YouTubeVideoListProps {
    channelId: string;
}

const YouTubeVideoList: React.FC<YouTubeVideoListProps> = ({ channelId }) => {
    const [videos, setVideos] = useState<Video[]>([]);
    const [error, setError] = useState<string | null>(null);

    const CACHE_EXPIRY_TIME = 3600 * 1000;

    const getCachedVideos = (channelId: string) => {
        const cachedVideos = localStorage.getItem(`videos_${channelId}`);
        const cachedTime = localStorage.getItem(`videos_time_${channelId}`);

        if (cachedVideos && cachedTime) {
            const elapsedTime = Date.now() - parseInt(cachedTime);
            if (elapsedTime < CACHE_EXPIRY_TIME) {
                return JSON.parse(cachedVideos);
            }
        }
        return null;
    };

    const setCache = (videos: Video[], channelId: string) => {
        localStorage.setItem(`videos_${channelId}`, JSON.stringify(videos));
        localStorage.setItem(`videos_time_${channelId}`, Date.now().toString());
    };

    const fetchVideos = async () => {
        const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
        const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=1&order=date&type=video&key=${apiKey}`;

        try {
            const searchResponse = await fetch(searchUrl);
            if (!searchResponse.ok) {
                throw new Error(`YouTube API request failed with status ${searchResponse.status}`);
            }

            const searchData = await searchResponse.json();
            const videoIds = searchData.items.map((item: any) => item.id.videoId).join(',');

            const videoUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${apiKey}`;
            const videoResponse = await fetch(videoUrl);
            if (!videoResponse.ok) {
                throw new Error(`YouTube API request failed with status ${videoResponse.status}`);
            }

            const videoData = await videoResponse.json();
            console.log('Fetched video data:', videoData);
            const fetchedVideos: Video[] = videoData.items.map((item: any) => ({
                id: item.id,
                title: item.snippet.title,
                thumbnail: item.snippet.thumbnails.high.url,
                url: `https://www.youtube.com/watch?v=${item.id}`,
                viewCount: item.statistics.viewCount.toLocaleString(),
                publishedAt: formatDate(item.snippet.publishedAt),
                duration: formatDuration(item.contentDetails.duration),
            }));
            console.log('Processed videos:', fetchedVideos);

            setVideos(fetchedVideos);
            setCache(fetchedVideos, channelId);
        } catch (err) {
            console.error('Error fetching videos:', err);
            setError('動画の取得に失敗しました。もう一度お試しください。');
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
        const cachedVideos = getCachedVideos(channelId);
        if (cachedVideos) {
            console.log('Using cached videos:', cachedVideos);
            setVideos(cachedVideos);
        } else {
            console.log('Fetching new videos');
            fetchVideos();
        }
    }, [channelId]);

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
};

export default YouTubeVideoList;







