'use client'; // Client-side rendering を明示

import { useState } from 'react';

export default function Home() {
  const [username, setUsername] = useState(''); // 入力されたユーザー名
  const [streamInfo, setStreamInfo] = useState<any>(null); // 取得した配信情報
  const [error, setError] = useState<string | null>(null); // エラー情報

  // **********************　この下の関数が主要な処理　********************** //

  const fetchStreamInfo = async () => {
    setError(null);
    setStreamInfo(null);

    try {
      // API エンドポイントを呼び出し
      const response = await fetch(`/api/get-stream?username=${username}`);
      const data = await response.json();

      if (response.ok) {
        setStreamInfo(data.stream || data.message); // 成功時は配信情報を保存
      } else {
        setError(data.error); // エラー時はエラー内容を保存
      }
    } catch (err) {
      setError('An error occurred while fetching stream info');
    }
  };

  // **********************　この上の関数が主要な処理　********************** //

  return (
    <main style={{ padding: '20px' }}>
      <h1>Twitch Stream Info</h1>

      <input
        type="text"
        placeholder="Enter Twitch username"
        value={username}
        onChange={(e) => setUsername(e.target.value)} // ユーザー名を更新
        style={{ marginRight: '10px' }}
      />
      <button onClick={fetchStreamInfo}>Get Stream Info</button>

      {error && <p style={{ color: 'red' }}>{error}</p>} {/* エラー表示 */}
      {streamInfo && (
        <pre style={{ marginTop: '20px', background: '#f4f4f4', padding: '10px' }}>
          {JSON.stringify(streamInfo, null, 2)} {/* 配信情報を JSON 表示 */}
        </pre>
      )}
    </main>
  );
}
