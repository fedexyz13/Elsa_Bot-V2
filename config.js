// ❄️ Código creado por fedexyz13
// No quites créditos, por respeto al hielo mágico 🧊

import { watchFile, unwatchFile} from 'fs';
import chalk from 'chalk';
import { fileURLToPath} from 'url';
import fs from 'fs';
import cheerio from 'cheerio';
import fetch from 'node-fetch';
import axios from 'axios';
import moment from 'moment-timezone';

// ─── ❄️ Información del equipo ───
global.owner = [
  ['5491156178758', 'Fᴇᴅᴇxʏᴢ ❄️', true],
  ['5491176429275', 'fede 🦇', true],
  ['35855125204999@lid', 'Mᴀʀᴄᴋ ʟɪᴅ', true],
];

global.mods = ['5491156178758', '5491176429275'];
global.suittag = ['5491156178758'];
global.prems = ['5491156178758', '5491176429275'];

// ─── ❄️ Información del bot ───
global.namebot = 'Elsa_Bot-MD';
global.botname = '𝖤𝗅𝗌𝖺_𝖡𝗈𝗍-MD';
global.packname = '❄️ Elsa_Bot-MD';
global.wm = '© fedexyz13';
global.wm3 = '⫹⫺ ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ';
global.dev = '© Powered by fedexyz13';
global.textbot = '𝖤𝗅𝗌𝖺_𝖡𝗈𝗍-MD ❄️ powered by fedexyz13';
global.etiqueta = '@fedexyz13';
global.titulowm = 'Whatsapp Multi Device';
global.titulowm2 = 'Elsa_Bot-MD by fedexyz13';
global.igfg = 'fedexyz13 - Multi-Device';

// ─── ❄️ Sesión y librerías ───
global.libreria = 'Baileys';
global.baileys = 'v6.7.9';
global.languaje = 'Español';
global.vs = '2.2.0';
global.vsJB = '5.0';
global.nameqr = 'ElsaQR';
global.sessions = 'ElsaSessions';
global.jadi = 'jadibts';
global.NakanoJadibts = true;

// ─── ❄️ Estética del menú ───
global.dmenut = '✦ ───『';
global.dmenub = '│➭';
global.dmenub2 = '│乂';
global.dmenuf = '╰━━━━━━━━┈─◂';
global.cmenut = '⫹⫺ ───『';
global.cmenuh = '』─── ⬟';
global.cmenub = '│〆';
global.cmenuf = '╰━━━━━━━━┈─◂';
global.cmenua = '\n⌕ ❙❘❙❙❘❙❚❙❘❙❙❚❙❘❙❘❙❚❙❘❙❙❚❙❘❙❙❘❙❚❙❘ ⌕\n     ';
global.dashmenu = '✧────···[ *Dashboard* ]···────✧';
global.htki = '––––––『';
global.htka = '』––––––';
global.htjava = '⫹⫺';
global.comienzo = '• • ◕◕════';
global.fin = ' • •';

// ─── ❄️ Branding y multimedia ───
global.banner = 'https://files.cloudkuimages.guru/images/qM6BRh2g.jpg';
global.avatar = 'https://files.cloudkuimages.guru/images/PbmZRkdU.jpg';
global.imagen0 = fs.readFileSync('./Brayan-Creador.png');
global.catalogo = fs.readFileSync('./Private.png');

let catalogo2;
try {
  catalogo2 = fs.readFileSync('./src/catalogo.jpg');
} catch {
  console.log('⚠️./src/catalogo.jpg no encontrado, usando imagen por defecto');
  catalogo2 = global.catalogo;
}
global.photoSity = [catalogo2];

// ─── ❄️ Enlaces y contacto ───
global.gp1 = 'https://chat.whatsapp.com/HACwRMduEef1DKXPWQoJ9j';
global.md = 'https://chat.whatsapp.com/GDUv1z6UG0k2xe8zAEUnFf';
global.channel = 'https://whatsapp.com/channel/0029Vb6BDQc0lwgsDN1GJ31i';
global.correo = 'fedexyz13@gmail.com';

// ─── ❄️ Documentos y tipos ───
global.pdoc = [
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/msword",
  "application/pdf",
  "text/rtf"
];

// ─── ❄️ APIs y claves ───
global.BASE_API_DELIRIUS = "https://delirius-apiofc.vercel.app";
global.BASE_API_SKYNEX = "https://skynex.boxmine.xyz";
global.MyApiRestBaseUrl = 'https://api.cafirexos.com';
global.MyApiRestApikey = 'BrunoSobrino';

global.keysZens = ['LuOlangNgentot', 'c2459db922', '37CC845916'];
global.keysxxx = keysZens[Math.floor(Math.random() * keysZens.length)];

global.keysxteammm = ['29d4b59a4aa687ca', 'cb15ed422c71a2fb'];
global.keysxteam = keysxteammm[Math.floor(Math.random() * keysxteammm.length)];

global.keysneoxrrr = ['5VC9rvNx', 'cfALv5'];
global.keysneoxr = keysneoxrrr[Math.floor(Math.random() * keysneoxrrr.length)];

global.APIs = {
  xteam: 'https://api.xteam.xyz',
  lol: 'https://api.lolhuman.xyz',
  neoxr: 'https://api.neoxr.my.id',
  delirius: 'https://delirius-apiofc.vercel.app',
  fgmods: 'https://api-fgmods.ddns.net',
  botcahx: 'https://api.botcahx.biz.id',
  rose: 'https://api.itsrose.site',
  popcat: 'https://api.popcat.xyz'
};

global.APIKeys = {
  'https://api.xteam.xyz': keysxteam,
  'https://api.lolhuman.xyz': 'GataDios',
  'https://api.neoxr.my.id': keysneoxr,
  'https://api.zahwazein.xyz': keysxxx,
  'https://api-fgmods.ddns.net': 'fg-dylux',
  'https://api.botcahx.biz.id': 'Admin',
  'https://api.itsrose.site': 'Rs-Zeltoria'
};

// ─── ❄️ Librerías mágicas ───
global.cheerio = cheerio;
global.fs = fs;
global.fetch = fetch;
global.axios = axios;
global.moment = moment;

// ─── ❄️ Configuración general ───
global.moneda = 'Snow Crystals';
global.multiplier = 69;
global.maxwarn = '3';

// ─── ❄️ Recarga automática ───
let file = fileURLToPath(import.meta.url);
watchFile(file, () => {
  unwatchFile(file);
  console.log(chalk.redBright("❄️ Configuración actualizada: 'config.js'"));
  import(`${file}?update=${Date.now()}`);
});
