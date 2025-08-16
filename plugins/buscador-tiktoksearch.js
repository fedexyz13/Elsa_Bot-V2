import axios from 'axios';
const {
  proto,
  generateWAMessageFromContent,
  generateWAMessageContent
} = (await import("@whiskeysockets/baileys")).default;

const handler = async (m, { conn, text, usedPrefix, command}) => {
  if (!text) {
    return conn.reply(m.chat, '❀ Por favor, ingresa un término para buscar en TikTok.', m);
}

  const dev = 'ElsaBot-MD';
  const avatar = 'https://files.cloudkuimages.guru/images/HCb3D6xy.jpg';
  const redes = 'https://www.instagram.com/elsabot_md/';

  const shuffleArray = arr => arr.sort(() => Math.random() - 0.5);

  const createVideoMessage = async url => {
    const { videoMessage} = await generateWAMessageContent({ video: { url}}, {
      upload: conn.waUploadToServer
});
    return videoMessage;
};

  try {
    await conn.reply(m.chat, '✧ *Buscando en TikTok...*', m, {
      contextInfo: {
        externalAdReply: {
          title: 'ElsaBot-MD',
          body: 'Resultados en curso...',
          mediaType: 1,
          previewType: 0,
          thumbnailUrl: avatar,
          sourceUrl: redes,
          renderLargerThumbnail: true
}
}
});

    const { data} = await axios.get(`https://apis-starlights-team.koyeb.app/starlight/tiktoksearch?text=${encodeURIComponent(text)}`);
    const searchResults = shuffleArray(data.data).slice(0, 7);

    const cards = await Promise.all(searchResults.map(async result => ({
      body: proto.Message.InteractiveMessage.Body.fromObject({ text: null}),
      footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: dev}),
      header: proto.Message.InteractiveMessage.Header.fromObject({
        title: result.title,
        hasMediaAttachment: true,
        videoMessage: await createVideoMessage(result.nowm)
}),
      nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({ buttons: []})
})));

    const messageContent = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
},
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: proto.Message.InteractiveMessage.Body.create({
              text: `✧ Resultados para: *${text}*`
}),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: dev
}),
            header: proto.Message.InteractiveMessage.Header.create({
              hasMediaAttachment: false
}),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
              cards
})
})
}
}
}, { quoted: m});

    await conn.relayMessage(m.chat, messageContent.message, {
      messageId: messageContent.key.id
});

} catch (error) {
    console.error(error);
    conn.reply(m.chat, `⚠︎ Ocurrió un error al buscar en TikTok:\n${error.message}`, m);
}
};

handler.help = ['tiktoksearch <texto>'];
handler.tags = ['buscador'];
handler.command = ['tiktoksearch', 'ttss', 'tiktoks'];
handler.group = true;
handler.register = false;

export default handler;
