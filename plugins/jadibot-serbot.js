let handler = async (m, { conn}) => {
  const mensaje = `
╭─❄️ 𝖤𝗅𝗌𝖺_𝖡𝗈𝗍-MD ❄️
│
│ Este bot es *privado* y no acepta conexiones externas.
│
│ 🧊 No está disponible como sub-bot ni para uso público.
│ 🧁 Si deseas tener tu propio bot, puedes crear uno desde cero.
│
│ 📮 Contacto del creador: @fedexyz13
╰───────────────╯
`.trim();

  await conn.sendMessage(m.chat, {
    text: mensaje,
    contextInfo: {
      externalAdReply: {
        title: '❄️ Elsa_Bot-MD',
        body: 'Bot privado creado por fedexyz13',
        thumbnailUrl: 'https://files.catbox.moe/98ov5s.png',
        mediaType: 1,
        renderLargerThumbnail: true,
        sourceUrl: 'https://whatsapp.com/channel/0029Vb6BDQc0lwgsDN1GJ31i'
}
}
}, { quoted: m});
};

handler.command = ['qr', 'code'];
handler.group = true;
handler.register = true;

export default handler;
