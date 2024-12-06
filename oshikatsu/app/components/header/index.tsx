// 'use client'; // ここで明示的にクライアントサイドで実行することを示します

// import { useEffect, useRef } from 'react';
// import lottie from 'lottie-web';

// export default function Header() {
//     const animationContainer = useRef<HTMLDivElement>(null); // 型を明示的に指定

//     useEffect(() => {
//         if (animationContainer.current) {
//             lottie.loadAnimation({
//                 container: animationContainer.current,
//                 renderer: 'svg',
//                 loop: true,
//                 autoplay: true,
//                 path: "" // publicディレクトリに配置した場合のパス
//             });
//         }
//     }, []);

//     return <div ref={animationContainer}></div>;
// }

// export default function (){
//     return (
//         <div>
//             ヘッダー
//         </div>
//     );
// }

import Image from 'next/image'
import myImage from '@/public/oshikatsu.png'

export default function () {
    return (
        <Image 
            src={myImage} 
            alt="説明テキスト"
            width={250} 
            height={70} 
            layout="fixed"  // 画像のレイアウト
            quality={75}         // 画質の調整
            priority             // 重要な画像の優先読み込み
            placeholder="blur"
        />
    )
}