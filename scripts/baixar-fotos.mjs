// Baixa fotos PROVISÓRIAS de banco livre (Unsplash) para public/fotos/,
// só para os arquivos que ainda não existem. Foto de vocês já salva com o
// mesmo nome nunca é sobrescrita.
//
// Também grava o crédito de cada foto baixada em src/data/creditos-fotos.json
// (o site mostra esses créditos no rodapé).
//
// Uso: npm run fotos   (o GitHub Actions roda isso sozinho a cada publicação)

import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const pastaFotos = join(raiz, 'public', 'fotos');
const arquivoCreditos = join(raiz, 'src', 'data', 'creditos-fotos.json');

// arquivo → busca no Unsplash + orientação desejada
const vagas = [
  { arquivo: 'abertura.jpg', busca: 'caribbean beach turquoise', orientacao: 'portrait', largura: 1200 },
  { arquivo: 'historia-1.jpg', busca: 'palm trees beach', orientacao: 'portrait', largura: 900 },
  { arquivo: 'historia-2.jpg', busca: 'caribbean sea aerial', orientacao: 'portrait', largura: 900 },
  { arquivo: 'historia-3.jpg', busca: 'beach sunset couple', orientacao: 'portrait', largura: 900 },
  { arquivo: 'hospedagem.jpg', busca: 'tropical resort beach', orientacao: 'landscape', largura: 1600 },
];

mkdirSync(pastaFotos, { recursive: true });
const creditos = existsSync(arquivoCreditos) ? JSON.parse(readFileSync(arquivoCreditos, 'utf8')) : {};
const usados = new Set(Object.values(creditos).map((c) => c.id));
const cabecalhos = { 'User-Agent': 'site-casamento (GitHub Actions)', Accept: 'application/json' };

let baixadas = 0;
for (const vaga of vagas) {
  const destino = join(pastaFotos, vaga.arquivo);
  if (existsSync(destino)) continue;
  try {
    const url = `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(vaga.busca)}&per_page=20&orientation=${vaga.orientacao}`;
    const resp = await fetch(url, { headers: cabecalhos });
    if (!resp.ok) throw new Error(`busca ${resp.status}`);
    const { results = [] } = await resp.json();
    // Só fotos de licença Unsplash comum (sem Unsplash+ pago).
    const foto = results.find((r) => !r.premium && !r.plus && r.urls?.raw && !usados.has(r.id));
    if (!foto) throw new Error('nenhuma foto livre encontrada');
    const img = await fetch(`${foto.urls.raw}&w=${vaga.largura}&q=80&fm=jpg&fit=crop`);
    if (!img.ok) throw new Error(`download ${img.status}`);
    writeFileSync(destino, Buffer.from(await img.arrayBuffer()));
    usados.add(foto.id);
    creditos[vaga.arquivo] = {
      id: foto.id,
      autor: foto.user?.name ?? 'Unsplash',
      perfil: `${foto.user?.links?.html ?? 'https://unsplash.com'}?utm_source=site-casamento&utm_medium=referral`,
      foto: foto.links?.html ?? 'https://unsplash.com',
    };
    baixadas++;
    console.log(`✓ ${vaga.arquivo} — ${creditos[vaga.arquivo].autor}`);
  } catch (erro) {
    console.warn(`✗ ${vaga.arquivo}: ${erro.message} (o site usa um fundo no lugar)`);
  }
}

// Remove créditos de fotos que foram apagadas.
for (const nome of Object.keys(creditos)) {
  if (!existsSync(join(pastaFotos, nome))) delete creditos[nome];
}
writeFileSync(arquivoCreditos, JSON.stringify(creditos, null, 2) + '\n');
console.log(`${baixadas} foto(s) nova(s).`);
