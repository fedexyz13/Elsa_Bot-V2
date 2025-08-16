const handler = async (m, { conn, usedPrefix}) => {
  const start = Date.now();
  const ping = Date.now() - start;

  const infoMessage = {
    image: { url: 'https://files.cloudkuimages.guru/images/HCb3D6xy.jpg'},
    caption: `╭─❍ *ElsaBot-MD - Ping Info* ❍─╮
│
│ 📡 *Velocidad:* ${ping} ms
│ 🧠 *Memoria:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
│ 📦 *Plataforma:* ${process.platform}
│ 🕒 *Tiempo activo:* ${formatUptime(process.uptime())}
│
╰───────────────╯`,
    contextInfo: {
      externalAdReply: {
        title: 'ElsaBot-MD',
        body: 'Sistema activo y estable',
        thumbnailUrl: 'https://files.cloudkuimages.guru/images/HCb3D6xy.jpg',
        sourceUrl: 'https://www.instagram.com/elsabot_md/',
        mediaType: 1,
        renderLargerThumbnail: true
}
}
};

  await conn.sendMessage(m.chat, infoMessage, { quoted: m});
};

function formatUptime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${h}h ${m}m ${s}s`;
}

handler.command = ['ping', 'info', 'estado'];
handler.tags = ['info'];
handler.help = ['ping', 'info', 'estado'];

export default handler;
