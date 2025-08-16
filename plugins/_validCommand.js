import { createHash} from 'crypto';
import fetch from 'node-fetch';

export async function before(m, { conn}) {
  try {
    if (!m.text ||!global.prefix ||!global.prefix.test(m.text)) return;

    const Buffer = global.Buffer || ((...args) => new Uint8Array(...args));

    const channelRD = global.channelRD || {
      id: '120363417186717632@newsletter',
      name: 'ElsaBot-MD'
};
    const metanombre = global.metanombre || 'ElsaBot-MD';

    if (!Array.prototype.getRandom) {
      Array.prototype.getRandom = function () {
        return this[Math.floor(Math.random() * this.length)];
};
}

    global.fkontak = {
      key: {
        participant: `0@s.whatsapp.net`,
...(m.chat? { remoteJid: `status@broadcast`}: {})
},
      message: {
        contactMessage: {
          displayName: metanombre,
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:XL;${metanombre},;;;\nFN:${metanombre}\nitem1.TEL;waid=00000000000:00000000000\nitem1.X-ABLabel:Bot Oficial\nitem2.TEL;waid=${m.sender?.split('@')[0] || '0'}:${m.sender?.split('@')[0] || '0'}\nitem2.X-ABLabel:Usuario\nEND:VCARD`,
          jpegThumbnail: null,
          thumbnail: null,
          sendEphemeral: true
}
}
};

    global.fakeMetaMsg = {
      key: {
        remoteJid: '0@s.whatsapp.net',
        fromMe: false,
        id: 'FFAC1BC46FF49C35',
        participant: '0@s.whatsapp.net'
},
      message: {
        contactMessage: {
          displayName: metanombre,
          vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:${metanombre}\nORG:${metanombre}\nTEL;type=CELL;type=VOICE;waid=00000000000:+000 0000 0000\nEND:VCARD`,
          jpegThumbnail: Buffer.from([]),
          contextInfo: {
            forwardingScore: 999,
            isForwarded: true
}
}
}
};

    global.rcanal = {
      quoted: global.fakeMetaMsg,
      contextInfo: {
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: channelRD.id,
          serverMessageId: 100,
          newsletterName: channelRD.name
},
        externalAdReply: {
          title: metanombre,
          body: 'ElsaBot-MD',
          mediaUrl: null,
          description: null,
          previewType: "PHOTO",
          thumbnailUrl: 'https://files.catbox.moe/woeor8.jpg',
          sourceUrl: 'https://www.instagram.com/elsabot_md/',
          mediaType: 1,
          renderLargerThumbnail: true
}
}
};

    const usedPrefix = global.prefix.exec(m.text)[0];
    const command = m.text.slice(usedPrefix.length).trim().split(' ')[0].toLowerCase();
    if (!command || command === "bot") return;

    const validCommand = (cmd, plugins) =>
      Object.values(plugins || {}).some(plugin =>
        plugin?.command && (Array.isArray(plugin.command)? plugin.command: [plugin.command]).includes(cmd)
);

    if (validCommand(command, global.plugins)) {
      const chat = global.db.data.chats[m.chat];
      const user = global.db.data.users[m.sender];

      if (chat?.isBanned) {
        const msg = {
          text: `《✦》ElsaBot-MD está *desactivado* en este grupo.\n\n🔐 Un *administrador* puede activarlo con:\n» *${usedPrefix}bot on*`,
          contextInfo: {
            mentionedJid: [m.sender],
            externalAdReply: {
              title: metanombre,
              body: 'ElsaBot-MD',
              thumbnailUrl: 'https://files.catbox.moe/woeor8.jpg',
              sourceUrl: 'https://www.instagram.com/elsabot_md/',
              mediaType: 1,
              renderLargerThumbnail: true
}
}
};
        await conn.sendMessage(m.chat, msg, { quoted: global.fakeMetaMsg});
        return;
        }

      if (user) user.commands = (user.commands || 0) + 1;

} else {
      const comando = m.text.trim().split(' ')[0];
      const msg = {
        text: `《✦》El comando *${comando}* no existe.\n📖 Usa *${usedPrefix}help* para ver la lista de comandos.`,
        contextInfo: {
          mentionedJid: [m.sender],
          externalAdReply: {
            title: metanombre,
            body: 'ElsaBot-MD',
            thumbnailUrl: 'https://files.catbox.moe/woeor8.jpg',
            sourceUrl: 'https://www.instagram.com/elsabot_md/',
            mediaType: 1,
            renderLargerThumbnail: true
}
}
};
      await conn.sendMessage(m.chat, msg, { quoted: global.fakeMetaMsg});
}

} catch (error) {
    console.error(`❌ Error en ElsaBot-MD _validCommand.js: ${error}`);
}
}
