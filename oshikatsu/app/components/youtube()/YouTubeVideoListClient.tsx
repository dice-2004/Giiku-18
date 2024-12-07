// import React from 'react';
// import YouTubeVideoListClient from './YouTubeVideoListClient';

// async function fetchYouTubeVideos(channelId: string) {
//     try {
//         const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
        
//         const response = await fetch(
//             `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=10&order=date&type=video&key=${API_KEY}`,
//             { 
//                 next: { revalidate: 3600 } // 1時間キャッシュ
//             }
//         );

//         if (!response.ok) {
//             throw new Error('YouTube APIからのレスポンスが失敗しました');
//         }

//         const data = await response.json();
//         return data.items;
//     } catch (err) {
//         console.error('ビデオの取得中にエラーが発生しました:', err);
//         return [];
//     }
// }

// export default async function YouTubeVideoList({ channelId }: { channelId: string }) {
//     const videos = await fetchYouTubeVideos(channelId);

//     return <YouTubeVideoListClient initialVideos={videos} />;
// }