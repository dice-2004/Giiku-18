import { NextResponse } from 'next/server';

const TWITCH_API_BASE = 'https://api.twitch.tv/helix';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username'); // クエリパラメータ "username" を取得

  if (!username) {
    // ユーザー名が指定されていない場合のエラーハンドリング
    return NextResponse.json({ error: 'Username is required' }, { status: 400 });
  }

  try {
    // 環境変数の確認
    const clientId = process.env.TWITCH_CLIENT_ID;
    const accessToken = process.env.TWITCH_ACCESS_TOKEN;

    if (!clientId || !accessToken) {
      throw new Error('Twitch client ID or access token is not set');
    }

    // 環境変数のログ出力（開発環境でのみ使用）
    console.log('TWITCH_CLIENT_ID:', clientId);
    console.log('TWITCH_ACCESS_TOKEN:', accessToken);

    // ユーザー名のエンコーディング
    const encodedUsername = encodeURIComponent(username);

    // Twitch API にリクエストを送信してユーザー情報を取得
    const userResponse = await fetch(`${TWITCH_API_BASE}/users?login=${encodedUsername}`, {
      headers: {
        'Client-ID': clientId,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!userResponse.ok) {
      // API エラー時の処理
      console.error(`Failed to fetch user data: ${userResponse.statusText}`);
      console.error(`Response status: ${userResponse.status}`);
      console.error(`Response body: ${await userResponse.text()}`);
      throw new Error(`Failed to fetch user data: ${userResponse.statusText}`);
    }

    const userData = await userResponse.json();
    console.log('User Data:', userData); // ユーザーデータをログに出力
    const userId = userData.data?.[0]?.id; // ユーザーの ID を取得

    if (!userId) {
      // 指定されたユーザー名が見つからない場合
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // 配信情報を取得
    const streamResponse = await fetch(`${TWITCH_API_BASE}/streams?user_id=${userId}`, {
      headers: {
        'Client-ID': clientId,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const streamVideo = await fetch(`${TWITCH_API_BASE}/videos?user_id=${userId}`, {
      headers: {
        'Client-ID': clientId,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!streamResponse.ok) {
      console.error(`Failed to fetch stream data: ${streamResponse.statusText}`);
      console.error(`Response status: ${streamResponse.status}`);
      console.error(`Response body: ${await streamResponse.text()}`);
      throw new Error(`Failed to fetch stream data: ${streamResponse.statusText}`);
    }

    const streamData = await streamResponse.json();
    const streamLog = await streamVideo.json();
    console.log('Stream Data:', streamData); // 配信データをログに出力
    console.log('Stream Video:', streamLog); // 配信データをログに出力

    // 後はここで必要なデータのみ抽出して返却

    // 配信情報がない場合
    if (streamData.data.length === 0) {
      return NextResponse.json({ message: 'No live stream found' }, { status: 200 });
    }

    return NextResponse.json(streamData.data[0], { status: 200 });

  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
