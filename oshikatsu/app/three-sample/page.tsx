import React from 'react';
import ThreeComponent from '../../components/ThreeCube';

interface Face {
  jumpUrl: string;
  texture: string;
}

const Page: React.FC = () => {
  const face: Face[] = [
    { jumpUrl: "/hikakin", texture: "/hika.jpg" },
    { jumpUrl: "/evimarabo", texture: "/evim.jpg" },
    { jumpUrl: "/hito", texture: "/hito.jpg" },
    { jumpUrl: "/kumagoro", texture: "/kuma.jpg" },
    { jumpUrl: "/noneuser", texture: "https://yt3.googleusercontent.com/emNJUpccv67FT828Z1g0mfSB0hdLBPfIf_4IMxOfpcMCepnt7ABvk3bAZXBQZJ6fZwNcl0KCNQ=s160-c-k-c0x00ffffff-no-rj" },
    { jumpUrl: "/reis", texture: "https://yt3.googleusercontent.com/eZxbjM77Nkzxg8MLTKr1gzreBkYZpZ2ITBiXx04W_6V7s0taEmMgGW1LQRU7kbaLHDmKSmk5ZQ=s160-c-k-c0x00ffffff-no-rj" },
  ];

  return (
    <div style={{ backgroundColor: '#AFAFB0' }}>
      <h1>Three.js with React Three Fiber</h1>
      <ThreeComponent face={face} />
      <ThreeComponent face={face} />
    </div>
  );
};

export default Page;
