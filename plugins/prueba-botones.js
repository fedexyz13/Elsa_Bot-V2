import { proto, generateWAMessage, areJidsSameUser} from '@whiskeysockets/baileys';

export async function all(m, chatUpdate) {
  try {
    if (m.isBaileys ||!m.message) return;

    // Detectar tipo de respuesta interactiva
    const msg = m.message;
    const id =
      msg.buttonsResponseMessage?.selectedButtonId ||
      msg.templateButtonReplyMessage?.selectedId ||
      msg.listResponseMessage?.singleSelectReply?.selectedRowId ||
      JSON.parse(msg.interactiveResponseMessage?.nativeFlowResponseMessage?.paramsJson || '{}')?.id;

    const text =
      msg.buttonsResponseMessage?.selectedDisplayText ||
      msg.templateButtonReplyMessage?.selectedDisplayText ||
      msg.listResponseMessage?.title ||
      msg.interactiveResponseMessage?.body?.text;

    if (!id) return;

    let isIdMessage = false;
    let usedPrefix;

    for (const name in global.plugins) {
      const plugin = global.plugins[name];
      if (!plugin || plugin.disabled || typeof plugin!== 'function' ||!plugin.command) continue;
      if (!opts['restrict'] && plugin.tags?.includes('admin')) continue;

      const str2Regex = str => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
      const _prefix = plugin.customPrefix || this.prefix || global.prefix;

      const match = (_prefix instanceof RegExp
? [[_prefix.exec(id), _prefix]]
: Array.isArray(_prefix)
? _prefix.map(p => {
            const re = p instanceof RegExp? p: new RegExp(str2Regex(p));
            return [re.exec(id), re];
})
: typeof _prefix === 'string'
? [[new RegExp(str2Regex(_prefix)).exec(id), new RegExp(str2Regex(_prefix))]]
: [[[], new RegExp]]
).find(p => p[1]);

      if ((usedPrefix = (match?.[0] || '')[0])) {
        const noPrefix = id.replace(usedPrefix, '');
        let [command] = noPrefix.trim().split(/\s+/);
        command = (command || '').toLowerCase();

        const isId =
          plugin.command instanceof RegExp
? plugin.command.test(command)
: Array.isArray(plugin.command)
? plugin.command.some(cmd =>
                cmd instanceof RegExp? cmd.test(command): cmd === command
)
: typeof plugin.command === 'string'
? plugin.command === command
: false;

        if (isId) isIdMessage = true;
}
}

    const generated = await generateWAMessage(
      m.chat,
      { text: isIdMessage? id: text, mentions: m.mentionedJid},
      {
        userJid: this.user.id,
        quoted: m.quoted?.fakeObj,
}
);

    generated.key.fromMe = areJidsSameUser(m.sender, this.user.id);
    generated.key.id = m.key.id;
    generated.pushName = m.name;
    if (m.isGroup) generated.key.participant = generated.participant = m.sender;

    const msgUpsert = {
...chatUpdate,
      messages: [proto.WebMessageInfo.fromObject(generated)].map(v => ((v.conn = this), v)),
      type: 'append',
};

    this.ev.emit('messages.upsert', msgUpsert);
} catch (error) {
    console.error('❌ Error en all.js:', error);
}
  }
