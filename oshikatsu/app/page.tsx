"use client";

import React, { useState } from 'react';
import ThreeCube from '../components/ThreeCube';
import Icon from './icon'
import Test from './Test';

interface Streamer{
  jumpUrl: string;
  texture: string;
}

export default function Home() {
  const streamers: Streamer[] = [
    { jumpUrl: "/hikakin", texture: "/hika.jpg" },
    { jumpUrl: "/evimarabo", texture: "/evim.jpg" },
    { jumpUrl: "/hito", texture: "/hito.jpg" },
    { jumpUrl: "/kumagoro", texture: "/kuma.jpg" },
    { jumpUrl: "/noneuser", texture: "https://yt3.googleusercontent.com/emNJUpccv67FT828Z1g0mfSB0hdLBPfIf_4IMxOfpcMCepnt7ABvk3bAZXBQZJ6fZwNcl0KCNQ=s160-c-k-c0x00ffffff-no-rj" },
    { jumpUrl: "/reis", texture: "https://yt3.googleusercontent.com/eZxbjM77Nkzxg8MLTKr1gzreBkYZpZ2ITBiXx04W_6V7s0taEmMgGW1LQRU7kbaLHDmKSmk5ZQ=s160-c-k-c0x00ffffff-no-rj" },
  ];
	const [flag, setFlag] = useState(false);
  const [lookAt, setLookAt] = useState(-1);
  return (
      <div>
					<ThreeCube
            streamers={streamers}
            width="40vw"
            height="40vw"
            lookAt={lookAt}
          />
					<Test onclick={setFlag} />
          <br></br>
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
      </div>
  );
}
