import { readFile } from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
    // JSON फाईल वाचा
    const jsonPath = path.join(process.cwd(), 'channels.json');
    const jsonData = await readFile(jsonPath, 'utf-8');
    const channels = JSON.parse(jsonData);

    // M3U Header तयार करा
    let m3uPlaylist = "#EXTM3U\n\n";

    // प्रत्येक चॅनेलसाठी Vercel URL तयार करा
    channels.forEach(channel => {
        const name = channel.channel_name || 'Unknown';
        const logo = channel.channel_logo || '';
        const group = channel.channel_genre || 'General';
        const url = `https://pflix9999.vercel.app/api/stream?channel=${channel.channel_id}`;

        m3uPlaylist += `#EXTINF:-1 tvg-id="${channel.channel_id}" tvg-name="${name}" tvg-logo="${logo}" group-title="${group}", ${name}\n`;
        m3uPlaylist += `${url}\n\n`;
    });

    // M3U फाईल रिस्पॉन्स करा
    res.setHeader('Content-Type', 'text/plain');
    res.send(m3uPlaylist);
}
