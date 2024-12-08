"use client";

import React, { useState } from 'react';
import ThreeCube from '../components/ThreeCube';
import Icon from './icon'
import Image from 'next/image'
import styles from './styles.module.css';

interface Streamer{
  jumpUrl: string;
  texture: string;
}

export default function Home() {
  const streamers: Streamer[] = [
    { jumpUrl: "streamers/shaka", texture: "/icon/shaka.jpg" },
    { jumpUrl: "streamers/Zerost", texture: "/icon/zerost.jpg" },
    { jumpUrl: "streamers/k4sen", texture: "/icon/k4sen.png" },
    { jumpUrl: "streamers/kumagoro", texture: "/icon/kuzuha.jpg" },
    { jumpUrl: "streamers/noneuser", texture: "/icon/kanae.jpg" },
    { jumpUrl: "streamers/reis", texture: "/reis.jpg" },
  ];
	const [flag, setFlag] = useState(false);
  const [lookAt, setLookAt] = useState(-1);
  return (
      <div>
        <Image 
          src='/back.png'
          alt='BackGround'
          layout='fill'
          objectFit='cover'
          style={{
            zIndex: '1'
          }}
        />
        <div style={{
          position: 'relative',
          zIndex: '5'
        }}>
          <ThreeCube
            streamers={streamers}
            width="40vw"
            height="40vw"
            lookAt={lookAt}
          />  
        </div>

        <div className={styles.iconList}>
          <Icon
            streamer={streamers[0]}
            setIndex={setLookAt}
            index={0}
          />
          <Icon
            streamer={streamers[1]}
            setIndex={setLookAt}
            index={1}
          />
          <Icon
            streamer={streamers[2]}
            setIndex={setLookAt}
            index={2}
          />
          <Icon
            streamer={streamers[3]}
            setIndex={setLookAt}
            index={3}
          />
          <Icon
            streamer={streamers[4]}
            setIndex={setLookAt}
            index={4}
          />
          <Icon
            streamer={streamers[5]}
            setIndex={setLookAt}
            index={5}
          />
        </div>
					
      </div>
  );
}
