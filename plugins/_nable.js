import { createHash} from 'crypto';
import fetch from 'node-fetch';

const handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner}) => {
  const chat = global.db.data.chats[m.chat];
  const user = global.db.data.users[m.sender];
  const bot = global.db.data.settings[conn.user.jid] || {};
  const type = command.toLowerCase();

  const isAll = ['antiprivado', 'antiprivate', 'restrict', 'restringir', 'jadibotmd', 'modejadibot'].includes(type);
  const isUser = false;
  let isEnable = chat[type] || false;

  // Activar o desactivar
  if (args[0] === 'on' || args[0] === 'enable') {
    isEnable = true;
} else if (args[0] === 'off' || args[0] === 'disable') {
    isEnable = false;
} else {
    const estado = isEnable? '✅ Activado': '❌ Desactivado';
    return conn.reply(m.chat,
      `「✦」Un administrador puede cambiar el estado de *${command}* usando:\n\n` +
      `🔹 *${usedPrefix}${command} on* → Activar\n` +
      `🔹 *${usedPrefix}${command} off* → Desactivar\n\n` +
      `📌 Estado actual: *${estado}*`,
      m
);
}

  // Validaciones según tipo
  const requireAdmin = [
    'welcome', 'bienvenida', 'antibot', 'antibots', 'autoaceptar', 'aceptarauto',
    'autorechazar', 'rechazarauto', 'autoresponder', 'autorespond', 'antisubbots',
    'antibot2', 'modoadmin', 'soloadmin', 'reaction', 'reaccion', 'nsfw',
    'modohorny', 'detect', 'avisos', 'antilink', 'antifake'
  ];

  if (requireAdmin.includes(type)) {
    if (!m.isGroup) {
      if (!isOwner) return global.dfail('group', m, conn);
} else if (!(isAdmin || isOwner)) {
      return global.dfail('admin', m, conn);
}
}

  if (isAll &&!isOwner) return global.dfail('rowner', m, conn);

  // Aplicar configuración
  switch (type) {
    case 'welcome':
    case 'bienvenida':
      chat.welcome = isEnable;
      break;

    case 'antiprivado':
    case 'antiprivate':
      bot.antiPrivate = isEnable;
      break;

    case 'restrict':
    case 'restringir':
      bot.restrict = isEnable;
      break;

    case 'antibot':
    case 'antibots':
      chat.antiBot = isEnable;
      break;

    case 'autoaceptar':
    case 'aceptarauto':
      chat.autoAceptar = isEnable;
      break;

    case 'autorechazar':
    case 'rechazarauto':
      chat.autoRechazar = isEnable;
      break;

    case 'autoresponder':
    case 'autorespond':
      chat.autoresponder = isEnable;
      break;

    case 'antisubbots':
    case 'antibot2':
      chat.antiBot2 = isEnable;
      break;

    case 'modoadmin':
    case 'soloadmin':
      chat.modoadmin = isEnable;
      break;

    case 'reaction':
    case 'reaccion':
      chat.reaction = isEnable;
      break;

    case 'nsfw':
    case 'modohorny':
      chat.nsfw = isEnable;
      break;

    case 'jadibotmd':
    case 'modejadibot':
      bot.jadibotmd = isEnable;
      break;

    case 'detect':
    case 'avisos':
      chat.detect = isEnable;
      break;

    case 'antilink':
      chat.antiLink = isEnable;
      break;

    case 'antifake':
      chat.antifake = isEnable;
      break;
}

  chat[type] = isEnable;

  conn.reply(
    m.chat,
    `《✦》La función *${type}* fue *${isEnable? 'activada': 'desactivada'}* ${isAll? 'para ElsaBot-MD': 'en este chat'}.`,
    m
);
};

handler.help = [
  'welcome', 'bienvenida', 'antiprivado', 'antiprivate', 'restrict', 'restringir',
  'autolevelup', 'autonivel', 'antibot', 'antibots', 'autoaceptar', 'aceptarauto',
  'autorechazar', 'rechazarauto', 'autoresponder', 'autorespond', 'antisubbots',
  'antibot2', 'modoadmin', 'soloadmin', 'reaction', 'reaccion', 'nsfw', 'modohorny', 'antispam', 'jadibotmd', 'modejadibot', 'subbots', 'detect', 'avisos', 'antilink', 'antifake'
];

handler.tags = ['config'];
handler.command = handler.help;

export default handler;
