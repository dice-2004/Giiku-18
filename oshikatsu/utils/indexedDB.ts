import Dexie, { Table } from 'dexie';

// データモデルの定義
export interface Channel {
    channelID: string;
    name: string;
}

class MyDatabase extends Dexie {
    channels!: Table<Channel>; // Channelテーブル

    constructor() {
        super('myDatabaseV3'); // データベース名
        this.version(3).stores({
            // テーブル定義：主キーとインデックス
            channels: 'name, channelID', // 主キー: channelID, インデックス: name
        });
    }
}

// データベースインスタンスをエクスポート
export const db = new MyDatabase();

export const saveChannel = async (channel: Channel) => {
    try {
        await db.channels.add(channel); // テーブルにデータを追加
        console.log('Channel added:', channel);
    } catch (error) {
        console.error('Failed to add channel:', error);
    }
};

export const getChannel = async (channelID: string) => {
    try {
        const channel = await db.channels.get(channelID); // 主キーで検索
        console.log('Fetched channel:', channel);
        return channel;
    } catch (error) {
        console.error('Failed to fetch channel:', error);
    }
};

export const getAllChannels = async () => {
    try {
        const channels = await db.channels.toArray(); // 全データを配列として取得
        console.log('All channels:', channels);
        return channels;
    } catch (error) {
        console.error('Failed to fetch all channels:', error);
    }
};

export const updateChannel = async (channelID: string, updatedData: Partial<Channel>) => {
    try {
        await db.channels.update(channelID, updatedData); // 指定した主キーのデータを更新
        console.log(`Channel ${channelID} updated with:`, updatedData);
    } catch (error) {
        console.error('Failed to update channel:', error);
    }
};

export const deleteChannel = async (channelID: string) => {
    try {
        await db.channels.delete(channelID); // 主キーで削除
        console.log(`Channel ${channelID} deleted`);
    } catch (error) {
        console.error('Failed to delete channel:', error);
    }
};