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
    { jumpUrl: "/noneuser", texture: "/none.png" },
    { jumpUrl: "/reis", texture: "/reis.jpg" },
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
