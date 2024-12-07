'use client';

import React from 'react';
import Image from 'next/image';
import styles from './styles.module.css';

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

interface YouTubeVideoListClientProps {
    initialVideos: YouTubeVideo[];
}

export default function YouTubeVideoListClient({ 
    initialVideos 
}: YouTubeVideoListClientProps) {
    if (initialVideos.length === 0) {
        return <div className={styles.errorMessage}>ビデオを取得できませんでした</div>;
    }

    return (
        <div className={styles.videoListContainer}>
            <h2 className={styles.sectionTitle}>最新の動画</h2>
            <div className={styles.videoGrid}>
                {initialVideos.map((video) => (
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