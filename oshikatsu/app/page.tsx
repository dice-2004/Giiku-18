"use client";

import React, { useState } from 'react';
import ThreeCube from '../components/ThreeCube';
import Icon from './icon'
import Image from 'next/image'

interface Streamer{
  jumpUrl: string;
  texture: string;
}

export default function Home() {
  const streamers: Streamer[] = [
    { jumpUrl: "streamers/shaka", texture: "/icon/shaka.jpg" },
    { jumpUrl: "streamers/Zerost", texture: "/icon/zerost.jpg" },
    { jumpUrl: "streamers/k4sen", texture: "/icon/k4sen.png" },
    { jumpUrl: "streamers/kumagoro", texture: "/kuma.jpg" },
    { jumpUrl: "streamers/noneuser", texture: "none.png" },
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

        <div style={{
          backgroundColor: 'rgb(247, 247, 245)',
          position: 'fixed',
          left: '10%',
          top: '75%',
          width: '80%',
          height: '25%',
          padding: '3%',
          borderRadius: '30px 30px 0px 0px ',
          zIndex: '5'
        }}>
          <Icon
            streamer={streamers[0]}
            setIndex={setLookAt}
            index={0}
            width='10vw'
            height='10vw'
          />
          <Icon
            streamer={streamers[1]}
            setIndex={setLookAt}
            index={1}
            width='10vw'
            height='10vw'
          />
          <Icon
            streamer={streamers[2]}
            setIndex={setLookAt}
            index={2}
            width='10vw'
            height='10vw'
          />
          <Icon
            streamer={streamers[3]}
            setIndex={setLookAt}
            index={3}
            width='10vw'
            height='10vw'
          />
          <Icon
            streamer={streamers[4]}
            setIndex={setLookAt}
            index={4}
            width='10vw'
            height='10vw'
          />
          <Icon
            streamer={streamers[5]}
            setIndex={setLookAt}
            index={5}
            width='10vw'
            height='10vw'
          />
        </div>
					
      </div>
  );
}
