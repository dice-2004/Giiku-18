// 子コンポーネント ChannelPageClient.tsx
'use client'

// import Youtube from '@/app/components/youtube';
import React, { useState } from 'react';
import { Youtube, Twitch, Twitter, Instagram, Facebook } from 'lucide-react';
import styles from './style.module.css';


interface ChannelPageClientProps {
    name: string;  // 親から渡される props の型
}

const ChannelPageClient: React.FC<ChannelPageClientProps> = ({ name }) => {
    const [activeState, setActiveState] = useState('');

    const selectContent = () => {
        switch (activeState) {
            case 'youtube':
                return (
                    <div>Youtube</div>
                );
    
            case 'twitch':
                return (
                    <div>Twitch</div>
                );

            case 'twitter':
                return (
                    <div>Twitter</div>
                );

            case 'instagram':
                return (
                    <div>Instagram</div>
                );

            case 'facebook':
                return (
                    <div>Facebook</div>
                );
    
            default:
                return <div>No content available</div>;
        }
    };

    return (
        <div>
            <h2>{decodeURIComponent(name)}</h2>
            <div className={styles.container}>
                <div className={styles.mainNavigation}>
                    <div className={styles.navContainer}>
                        <button
                            onClick={() => setActiveState('youtube')}
                            className={`
                                ${styles.navButton} 
                                ${activeState === 'youtube' ? `${styles.navButtonActive} ${styles.activeYoutube}` : styles.navButtonNonActive}
                            `}
                        >
                            <Youtube className={styles.icon} />
                            YouTube
                        </button>
                            
                        <button
                            onClick={() => setActiveState('twitch')}
                            className={
                                `${styles.navButton}
                                ${activeState === 'twitch' ? `${styles.navButtonActive} ${styles.activeTwitch}` : styles.navButtonNonActive}
                            `}
                        >
                            <Twitch className={styles.icon} />
                            Twitch
                        </button>

                        <button
                            onClick={() => setActiveState('twitter')}
                            className={
                                `${styles.navButton}
                                ${activeState === 'twitter' ? `${styles.navButtonActive} ${styles.activeTwitter}` : styles.navButtonNonActive}
                            `}
                        >
                            <Twitter className={styles.icon} />
                            Twitter
                        </button>

                        <button
                            onClick={() => setActiveState('instagram')}
                            className={
                                `${styles.navButton}
                                ${activeState === 'instagram' ? `${styles.navButtonActive} ${styles.activeInstagram}` : styles.navButtonNonActive}
                            `}
                        >
                            <Instagram className={styles.icon} />
                            Instagram
                        </button>

                        <button
                            onClick={() => setActiveState('facebook')}
                            className={
                                `${styles.navButton}
                                ${activeState === 'facebook' ? `${styles.navButtonActive} ${styles.activeFacebook}` : styles.navButtonNonActive}
                            `}
                        >
                            <Facebook className={styles.icon} />
                            Facebook
                        </button>
                    </div>
                </div>
                <div className={styles.contentArea}>
                    {selectContent()}
                </div>
            </div>
        </div>
    );
}

export default ChannelPageClient;
