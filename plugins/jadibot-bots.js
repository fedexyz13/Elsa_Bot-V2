
// 🧠 Código adaptado por @fedexyz13 🍁 
// No quites créditos ⚔️

import {
  readdirSync, statSync, unlinkSync, existsSync, readFileSync, watch, rmSync,
  promises as fsPromises
} from 'fs';
const fs = {...fsPromises, existsSync};
import path from 'path';
import ws from 'ws';

let handler = async (m, { conn, command, usedPrefix}) => {
  const isDeleteSession = /^(deletesesion|deletebot|deletesession|deletesesaion)$/i.test(command);
  const isPauseBot = /^(stop|pausarbot|detenersuki)$/i.test(command);
  const isListBots = /^(bots|listjadibots|subbots|sukibots)$/i.test(command);

  const reportError = async (e) => {
    await m.reply('❌ Ups... algo falló en el sistema de 𝖲ᴜᴋ𝗂Bot_MD 🌸');
    console.error(e);
};

  switch (true) {
    case isDeleteSession: {
      const mentionedJid = m.mentionedJid?.[0] || (m.fromMe? conn.user.jid: m.sender);
      const uniqid = mentionedJid.split('@')[0];
      const sessionPath = `./${jadi}/${uniqid}`;

      if (!fs.existsSync(sessionPath)) {
        await conn.sendMessage(m.chat, {
          text: `📦 No se encontró ninguna sesión activa.\n\n🧋 Usa: *${usedPrefix}${command}*\n🆔 Si tienes ID, puedes ejecutar:\n${usedPrefix + command} \`\`\`(ID)\`\`\``
}, { quoted: m});
        return;
}

      if (global.conn.user.jid!== conn.user.jid) {
        await conn.sendMessage(m.chat, {
          text: `🔐 Este comando solo está disponible desde el bot principal.\n🌸 Pulsa aquí para ir al core:\nhttps://wa.me/${global.conn.user.jid.split('@')[0]}?text=${usedPrefix}${command}`
}, { quoted: m});
        return;
}

      await conn.sendMessage(m.chat, {
        text: `💫 Sesión *ElsaBot_MD* finalizada.\n📚 El vínculo escolar fue cerrado correctamente.`
}, { quoted: m});

      try {
        fs.rmdir(`./${jadi}/${uniqid}`, { recursive: true, force: true});
        await conn.sendMessage(m.chat, {
          text: `✅ SubBot eliminado.\n🧋 La unidad ha sido desconectada del grupo de estudio.`
}, { quoted: m});
} catch (e) {
        reportError(e);
}
      break;
}

    case isPauseBot: {
      if (global.conn.user.jid === conn.user.jid) {
        conn.reply(m.chat, '👑 Eres el bot principal, y no puedes ser pausado por ti mismo 💅', m);
} else {
        await conn.reply(m.chat, '💤 SubBot detenido.\n🧃 ElsaBot_MD ha pausado este nodo temporalmente.', m);
        conn.ws.close();
}
      break;
}

    case isListBots: {
      const botsActivos = global.conns.filter(conn =>
        conn.user && conn.ws.socket && conn.ws.socket.readyState!== ws.CLOSED
);

      const formatUptime = (ms) => {
        const seg = Math.floor(ms / 1000),
              min = Math.floor(seg / 60),
              hr = Math.floor(min / 60),
              day = Math.floor(hr / 24);
        return `${day? `${day}d `: ''}${hr % 24}h ${min % 60}m ${seg % 60}s`;
};

      const listado = botsActivos.map((bot, i) => {
        const jid = bot.user.jid.replace(/[^0-9]/g, '');
        return `📖 「 ${i + 1} 」\n👤 Nombre: ${bot.user.name || 'SubBot'}\n⏱️ Activo: ${bot.uptime? formatUptime(Date.now() - bot.uptime): 'Desconocido'}\n📎 Enlace: https://wa.me/${jid}?text=${usedPrefix}code`;
}).join('\n\n🍓──────────────────🍓\n\n');

      const mensajeFinal = `🌸 *ElssBot_MD | SubBots en línea*\n\n🧋 ¿Quieres conectarte como ayudante pastelcore?\nPulsa en alguno de los enlaces y únete a la clase 🍁\n\n📊 SubBots activos: *${botsActivos.length || '0'}*\n\n${listado || '🚫 Ningún SubBot está en línea en este momento.'}`;

      await conn.sendMessage(m.chat, {
        text: mensajeFinal,
        mentions: conn.parseMention(mensajeFinal)
}, { quoted: m});
      break;
}
}
};

handler.command = [
  'deletesesion', 'deletebot', 'deletesession', 'deletesesaion', 'stop', 'pausarbot', 'detenersuki',
  'bots', 'listjadibots', 'subbots', 'sukibots'
];

export default handler;
