import React from 'react';
import Image from 'next/image';
import styles from './styles.module.css';
import { useDatabase } from '@/utils/indexedDB'; // サーバーコンポーネントでは使用不可

interface YouTubeVideo {
    id: string;
    snippet: {
        title: string;
        thumbnails: {
            medium: {
                url: string;
            };
        };
        publishedAt: string;
    };
}

async function fetchYouTubeVideos(channelId: string): Promise<YouTubeVideo[]> {
    try {
        const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
        
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=1&order=date&type=video&key=${API_KEY}`,
            { 
                next: { revalidate: 3600 } // 1時間ごとにキャッシュを再検証
            }
        );

        if (!response.ok) {
            throw new Error('YouTube APIからのレスポンスが失敗しました');
        }

        const data = await response.json();
        return data.items;
    } catch (err) {
        console.error('ビデオの取得中にエラーが発生しました:', err);
        return [];
    }
}

export default async function YouTubeVideoList() {
    const channelId = "UCPkKpOHxEDcwmUAnRpIu-Ng";

    if (!channelId) {
        return <div className={styles.errorMessage}>チャンネルIDが見つかりませんでした</div>;
    }

    const videos = await fetchYouTubeVideos(channelId);

    if (videos.length === 0) {
        return <div className={styles.errorMessage}>ビデオを取得できませんでした</div>;
    }

    return (
        <div className={styles.videoListContainer}>
            <h2 className={styles.sectionTitle}>最新の動画</h2>
            <div className={styles.videoGrid}>
                {videos.map((video) => (
                    <div 
                        key={video.id} 
                        className={styles.videoItem}
                    >
                        <div className={styles.thumbnailWrapper}>
                            <Image 
                                src={video.snippet.thumbnails.medium.url} 
                                alt={video.snippet.title} 
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                quality={75}
                                className={styles.thumbnailImage}
                            />
                        </div>
                        <div className={styles.videoDetails}>
                            <h3 className={styles.videoTitle}>
                                {video.snippet.title}
                            </h3>
                            <p className={styles.videoDate}>
                                公開日: {new Date(video.snippet.publishedAt).toLocaleDateString()}
                            </p>
                            <a 
                                href={`https://www.youtube.com/watch?v=${video.id}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className={styles.videoLink}
                            >
                                動画を見る
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}