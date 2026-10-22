// Gera a imagem de prévia do link (public/og.jpg, 1200×630) e os ícones
// (favicon-32.png, apple-touch-icon.png) a partir de HTML, com Playwright.
// Só precisa rodar de novo se quiser mudar o visual da prévia ou trocar a
// foto da abertura:  npx -y playwright@1.56.1 install chromium  (uma vez)
//                    node scripts/gerar-imagens.mjs
import { existsSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
let playwright;
try { playwright = require('playwright'); } catch { playwright = require('/opt/node22/lib/node_modules/playwright'); }

const fontes = '<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,500&family=Jost:wght@400;500;600&family=Pinyon+Script&display=swap" rel="stylesheet">';
const fotoAbertura = join(raiz, 'public', 'fotos', 'abertura.jpg');
const fundoFoto = existsSync(fotoAbertura)
  ? `url(data:image/jpeg;base64,${readFileSync(fotoAbertura).toString('base64')}) center/cover`
  : 'linear-gradient(180deg,#CFE6E4 0 50%,#6FB7B6 50% 72%,#D9C9AE 72%)';

const og = `<!doctype html><html><head>${fontes}<style>
  body{margin:0;width:1200px;height:630px;background:#F6F1E7;font-family:Jost,sans-serif;color:#1F3A44;display:flex;overflow:hidden}
  .txt{flex:1;padding:70px 0 0 80px;display:flex;flex-direction:column;gap:6px}
  .eb{font-size:20px;letter-spacing:7px;text-transform:uppercase;color:#1C6E76;font-weight:600}
  h1{font-family:'Pinyon Script';font-weight:400;font-size:150px;line-height:1.05;margin:6px 0 0}
  h1 span{color:#B5523A;font-size:.75em}
  .q{font-family:'Cormorant Garamond';font-style:italic;font-size:40px;margin-top:4px}
  .arco{width:400px;height:540px;margin:45px 70px 0 0;border-radius:999px 999px 24px 24px;background:${fundoFoto};position:relative;flex-shrink:0;box-shadow:0 30px 60px -30px rgba(31,58,68,.5)}
  .ce{position:absolute;left:-110px;bottom:40px;width:330px;background:#fff;border-radius:14px;box-shadow:0 18px 40px rgba(31,58,68,.25);overflow:hidden;transform:rotate(-4deg)}
  .ce .t{background:#1F3A44;color:#F6F1E7;padding:10px 18px;display:flex;justify-content:space-between;font-size:12px;letter-spacing:2px;text-transform:uppercase}
  .ce .r{display:flex;justify-content:space-between;align-items:center;padding:16px 18px}
  .ce b{font-family:'Cormorant Garamond';font-size:46px;line-height:1;display:block}
  .ce small{font-size:13px;color:#546a71}
</style></head><body>
  <div class="txt"><div class="eb">Vamos casar</div><h1>Ilma <span>&amp;</span> Ruy</h1><div class="q">Punta Cana · maio de 2027</div></div>
  <div class="arco"><div class="ce"><div class="t"><span>Cartão de embarque</span><span>I&amp;R 2027</span></div>
  <div class="r"><div><b>GRU</b><small>São Paulo</small></div><svg width="70" height="20"><line x1="2" y1="10" x2="50" y2="10" stroke="#B5523A" stroke-width="1.5" stroke-dasharray="4 4"/><path d="M54 10 L68 10 M61 4 L68 10 L61 16" stroke="#B5523A" stroke-width="1.8" fill="none" stroke-linecap="round"/></svg><div style="text-align:right"><b>PUJ</b><small>Punta Cana</small></div></div></div></div>
</body></html>`;

const icone = (px) => `<!doctype html><html><head>${fontes}<style>
  body{margin:0;width:${px}px;height:${px}px;background:transparent}
  div{width:${px}px;height:${px}px;border-radius:${px >= 180 ? 0 : '50%'};background:#1F3A44;color:#F6F1E7;display:grid;place-items:center;
      font-family:'Cormorant Garamond';font-weight:600;font-size:${Math.round(px * 0.42)}px;letter-spacing:${px / 64}px}
  em{color:#E6A68F;font-weight:500}
</style></head><body><div>I<em>&amp;</em>R</div></body></html>`;

const navegador = await playwright.chromium.launch();
const pagina = await navegador.newPage();
const foto = async (html, w, h, arquivo, tipo = 'png') => {
  await pagina.setViewportSize({ width: w, height: h });
  await pagina.setContent(html, { waitUntil: 'networkidle' });
  await pagina.evaluate(() => document.fonts.ready);
  await pagina.screenshot({ path: join(raiz, 'public', arquivo), type: tipo, omitBackground: tipo === 'png', ...(tipo === 'jpeg' ? { quality: 88 } : {}) });
  console.log('✓', arquivo);
};
await foto(og, 1200, 630, 'og.jpg', 'jpeg');
await foto(icone(32), 32, 32, 'favicon-32.png');
await foto(icone(180), 180, 180, 'apple-touch-icon.png');
await navegador.close();
