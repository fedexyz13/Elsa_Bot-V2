import fetch from "node-fetch";
import yts from "yt-search";
import axios from "axios";

const youtubeRegexID = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/;

const handler = async (m, { conn, text, usedPrefix, command}) => {
  try {
    if (!text.trim()) {
      return conn.reply(m.chat, `⚠️ Ingresa el nombre o enlace del video que deseas descargar.`, m);
}

    const videoMatch = text.match(youtubeRegexID);
    const searchQuery = videoMatch? `https://youtu.be/${videoMatch[1]}`: text;
    const ytResults = await yts(searchQuery);

    let video = videoMatch
? ytResults.all.find(v => v.videoId === videoMatch[1]) || ytResults.videos.find(v => v.videoId === videoMatch[1])
: ytResults.videos?.[0];

    if (!video) return m.reply('🔍 No se encontraron resultados para tu búsqueda.');

    const { title, thumbnail, timestamp, views, ago, url, author} = video;
    const formattedViews = formatViews(views);
    const channel = author?.name || 'Desconocido';

    const infoMessage = `╭─❍ *Descarga de YouTube* ❍─╮
│
│ 🎵 *Título:* ${title}
│ 📺 *Canal:* ${channel}
│ 👁️ *Vistas:* ${formattedViews}
│ ⏱️ *Duración:* ${timestamp}
│ 📅 *Publicado:* ${ago}
│ 🔗 *Enlace:* ${url}
│
╰───────────────╯`;

    const preview = {
      contextInfo: {
        externalAdReply: {
          title: 'ElsaBot-MD',
          body: 'Descarga en curso...',
          mediaType: 1,
          previewType: 0,
          mediaUrl: url,
          sourceUrl: url,
          thumbnailUrl: thumbnail,
          renderLargerThumbnail: true
}
}
};

    await conn.reply(m.chat, infoMessage, m, preview);

    if (['play', 'yta', 'ytmp3', 'playaudio'].includes(command)) {
      try {
        const res = await fetch(`https://api.vreden.my.id/api/ytmp3?url=${url}`);
        const json = await res.json();
        const audioUrl = json.result?.download?.url;

        if (!audioUrl) throw new Error('No se generó el enlace de audio.');

        await conn.sendMessage(
          m.chat,
          {
            audio: { url: audioUrl},
            fileName: `${json.result.title}.mp3`,
            mimetype: 'audio/mpeg'
},
          { quoted: m}
);
} catch (e) {
        return conn.reply(m.chat, '❌ No se pudo enviar el audio. Intenta más tarde.', m);
}

} else if (['play2', 'ytv', 'ytmp4', 'mp4'].includes(command)) {
      try {
        const res = await fetch(`https://api.neoxr.eu/api/youtube?url=${url}&type=video&quality=480p&apikey=GataDios`);
        const json = await res.json();

        await conn.sendFile(m.chat, json.data.url, `${json.title}.mp4`, title, m);
} catch (e) {
        return conn.reply(m.chat, '❌ No se pudo enviar el video. Intenta más tarde.', m);
}

} else {
      return conn.reply(m.chat, '↩️ Comando no reconocido.', m);
}

} catch (error) {
    console.error(error);
    return m.reply(`🚫 Error: ${error.message}`);
}
};

handler.command = handler.help = ['play', 'ytmp3', 'play2', 'ytmp4', 'playaudio'];
handler.tags = ['descargas'];
handler.group = true;

export default handler;

function formatViews(views) {
  if (!views) return "No disponible";
  if (views>= 1_000_000_000) return `${(views / 1_000_000_000).toFixed(1)}B (${views.toLocaleString()})`;
  if (views>= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M (${views.toLocaleString()})`;
  if (views>= 1_000) return `${(views / 1_000).toFixed(1)}k (${views.toLocaleString()})`;
  return views.toString();
}
