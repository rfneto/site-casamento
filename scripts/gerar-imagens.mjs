// Gera a imagem de prévia do link (public/og.jpg, 1200×630, no formato da
// canga) e os ícones (favicon-32.png, apple-touch-icon.png) com Playwright.
// Rode de novo se mudar os nomes, a data ou as ilustrações:
//   npx -y playwright@1.56.1 install chromium   (uma vez)
//   node scripts/gerar-imagens.mjs
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
let playwright;
try { playwright = require('playwright'); } catch { playwright = require('/opt/node22/lib/node_modules/playwright'); }

const img = (nome) => `data:image/png;base64,${readFileSync(join(raiz, 'public', 'cangas', `${nome}.png`)).toString('base64')}`;
const fontes = '<link href="https://fonts.googleapis.com/css2?family=Damion&display=swap" rel="stylesheet">';

// Mesma composição da canga: listras, nome no centro, coqueiro saindo pela
// borda de cima e da direita, duas espreguiçadeiras e estrela + data vertical.
const og = `<!doctype html><html><head>${fontes}<style>
  body{margin:0;width:1200px;height:630px;overflow:hidden;position:relative;background:#fff url(${img('listras-aquarela')}) 0 0/1000px auto repeat}
  h1{position:absolute;left:0;right:270px;top:170px;margin:0;text-align:center;font:400 168px/1 Damion;color:#5460A7}
  h1 span{font-size:.7em}
  .coq{position:absolute;right:-30px;bottom:-6px;width:400px}
  .cad{position:absolute;bottom:4px;width:150px}
  .d{position:absolute;left:30px;bottom:24px;display:flex;flex-direction:column-reverse;align-items:center;gap:6px}
  .d span{writing-mode:vertical-rl;transform:rotate(180deg);font:400 46px/1 Damion;color:#5460A7}
  .d img{width:70px}
</style></head><body>
  <img class="coq" src="${img('coqueiro')}">
  <img class="cad" style="right:300px" src="${img('espreguicadeira')}">
  <img class="cad" style="right:205px" src="${img('espreguicadeira')}">
  <h1>Ilma <span>&amp;</span> Ruy</h1>
  <div class="d"><img src="${img('estrela-do-mar')}"><span>Maio 2027</span></div>
</body></html>`;

const icone = (px) => `<!doctype html><html><head>${fontes}<style>
  body{margin:0;width:${px}px;height:${px}px}
  div{width:${px}px;height:${px}px;border-radius:${px >= 180 ? 0 : '50%'};background:#fff url(${img('listras-aquarela')}) center/${px * 3}px auto;
      display:grid;place-items:center;font:400 ${Math.round(px * 0.5)}px/1 Damion;color:#5460A7;padding-top:${Math.round(px * 0.06)}px;box-sizing:border-box}
  b{font-weight:400;background:rgba(255,255,255,.85);border-radius:${px * 0.2}px;padding:0 ${px * 0.06}px}
</style></head><body><div><b>I&amp;R</b></div></body></html>`;

const navegador = await playwright.chromium.launch();
const pagina = await navegador.newPage();
const foto = async (html, w, h, arquivo, tipo = 'png') => {
  await pagina.setViewportSize({ width: w, height: h });
  await pagina.setContent(html, { waitUntil: 'networkidle' });
  await pagina.evaluate(() => document.fonts.ready);
  await pagina.screenshot({ path: join(raiz, 'public', arquivo), type: tipo, omitBackground: tipo === 'png', ...(tipo === 'jpeg' ? { quality: 86 } : {}) });
  console.log('✓', arquivo);
};
await foto(og, 1200, 630, 'og.jpg', 'jpeg');
await foto(icone(32), 32, 32, 'favicon-32.png');
await foto(icone(180), 180, 180, 'apple-touch-icon.png');
await navegador.close();
