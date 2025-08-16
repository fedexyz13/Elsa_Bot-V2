
import { xpRange} from '../lib/levelling.js';
import fetch from 'node-fetch';
import moment from 'moment-timezone';

const toSerifBold = (text) => {
  const map = Object.fromEntries(
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((c, i) => [
      c,
      '𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭'[i]
    ])
);
  return text.split('').map(c => map[c] || c).join('');
};

const tags = {
  main: toSerifBold('🌸 Menú Principal'),
  group: toSerifBold('👥 Magia Grupal'),
  serbot: toSerifBold('🪄 SubBots & Clones'),
  tools: toSerifBold('🔧 Hechizos Útiles'),
  kawaii: toSerifBold('🎀 Anime & Kawaii'),
  descargas: toSerifBold('📥 Descargas Mágicas'),
  juegos: toSerifBold('🎮 Juegos Encantados'),
  premium: toSerifBold('💎 Comandos Premium')
};

const defaultMenu = {
  before: `
╭─❄️ Bienvenida mágica ❄️─╮
│ ¡Hola, *%name*~! ${ucapan()}
│
│ 👤 Nivel: *%level* | ✨ Exp: *%exp/%maxexp*
│ 🔓 Modo: *%mode*
│ 📈 Usuarios registrados: *%totalreg*
│ 🕐 Tiempo activo: *%muptime*
╰───────────────────────╯
%readmore`.trim(),

  header: '\n╭─ %category ─╮\n',
  body: '│ ❄️ %cmd %iscorazones %isPremium',
  footer: '╰──────────────╯\n',
  after: ''
};

let handler = async (m, { conn, usedPrefix: _p}) => {
  try {
    const { exp = 0, level = 0} = global.db.data.users[m.sender];
    const { min, xp} = xpRange(level, global.multiplier);
    const name = await conn.getName(m.sender);
    const muptime = clockString(process.uptime() * 1000);
    const totalreg = Object.keys(global.db.data.users).length;
    const mode = global.opts.self? 'Privado 🔒': 'Público 🌐';

    const help = Object.values(global.plugins)
.filter(p =>!p.disabled)
.map(p => ({
        help: Array.isArray(p.help)? p.help: [p.help],
        tags: Array.isArray(p.tags)? p.tags: [p.tags],
        prefix: 'customPrefix' in p,
        limit: p.limit,
        premium: p.premium,
        enabled:!p.disabled
}));

    for (const plugin of help) {
      if (plugin.tags) {
        for (const t of plugin.tags) {
          if (!(t in tags) && t) tags[t] = toSerifBold(t);
}
}
}

    const { before, header, body, footer, after} = defaultMenu;

    let menuText = [
      before,
...Object.keys(tags).map(tag => {
        const cmds = help
.filter(menu => menu.tags.includes(tag))
.map(menu =>
            menu.help.map(cmd => body.replace(/%cmd/g, menu.prefix? cmd: _p + cmd)).join('\n')
).join('\n');
        return `${header.replace(/%category/g, tags[tag])}${cmds}${footer}`;
}),
      after
    ].join('\n');

    const replace = {
      '%': '%',
      name,
      level,
      exp: exp - min,
      maxexp: xp,
      totalreg,
      mode,
      muptime,
      readmore: String.fromCharCode(8206).repeat(4001)
};

    const finalText = menuText.replace(/%(\w+)/g, (_, key) => replace[key] || '');

    const imageURL = 'https://files.cloudkuimages.guru/images/Nd5Zfsvu.jpg';
    const imgBuffer = await fetch(imageURL).then(res => res.buffer());

    await conn.sendMessage(m.chat, {
      image: imgBuffer,
      caption: finalText,
      footer: '╰─❄️ ElsaBot_MD 𝑉𝟤 ❄️─╯',
      headerType: 4,
      contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: true,
        forwardingScore: 888
}
}, { quoted: m});

    await conn.sendMessage(m.chat, {
      react: { text: '❄️', key: m.key}
});

    await conn.sendFile(
      m.chat,
      'https://files.cloudkuimages.guru/audios/LEDz5ntF.mp3',
      'elsabot_theme.mp3',
      '🎧 ElsaBot_MD te da la bienvenida con estilo ❄️',
      m
);

} catch (e) {
    console.error('[❌] Error en menú decorado:', e);
    conn.reply(m.chat, '❎ Elsa se tropezó entre copos de nieve. Inténtalo otra vez, porfa.', m);
}
};

handler.help = ['menu'];
handler.tags = ['menu'];
handler.command = ['menu'];
handler.register = false;

export default handler;

// Funciones auxiliares
function ucapan() {
  const time = moment.tz('America/Lima').format('HH');
  if (time < 4) return '🌙 Dulces sueños';
  if (time < 6) return '🌄 Amanece con magia';
  if (time < 9) return '🏞️ Buenos días, encanto';
  if (time < 12) return '🌤️ Mañana radiante';
  if (time < 14) return '🌞 Mediodía mágico';
  if (time < 17) return '🌺 Tarde de pétalos';
  if (time < 19) return '🌇 Crepúsculo dorado';
  if (time < 21) return '🌃 Noche de estrellas';
  return '🌌 Silencio nocturno';
}

function clockString(ms) {
  const h = isNaN(ms)? '--': Math.floor(ms / 3600000);
  const m = isNaN(ms)? '--': Math.floor(ms / 60000) % 60;
  const s = isNaN(ms)? '--': Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}
