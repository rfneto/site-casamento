// Mural "Histórias com a gente" — conversa direto com a API do Supabase usando
// só a URL do projeto e a chave pública (anon). As regras de segurança (RLS)
// ficam no banco: o público só envia histórias não aprovadas e só lê as
// aprovadas. Ver supabase/migrations/001_historias.sql.

const secao = document.querySelector<HTMLElement>('[data-mural]');

if (secao) {
  const url = secao.dataset.url!;
  const chave = secao.dataset.chave!;
  const cabecalhos = { apikey: chave, Authorization: `Bearer ${chave}` };
  const lista = secao.querySelector<HTMLUListElement>('[data-mural-lista]')!;
  const vazio = secao.querySelector<HTMLElement>('[data-mural-vazio]')!;
  const form = secao.querySelector<HTMLFormElement>('[data-mural-form]')!;
  const status = secao.querySelector<HTMLElement>('[data-status]')!;
  const botao = secao.querySelector<HTMLButtonElement>('[data-enviar]')!;
  const texto = form.elements.namedItem('texto') as HTMLTextAreaElement;
  const restam = secao.querySelector<HTMLElement>('[data-restam]')!;
  const campoFoto = form.elements.namedItem('foto') as HTMLInputElement;
  const limite = Number(texto.dataset.limite);

  type Historia = { id: string; criado_em: string; nome: string; texto: string; foto_path: string | null };

  // ---------- Mural (só histórias aprovadas, mais recentes primeiro) ----------
  const carrega = async () => {
    try {
      const r = await fetch(`${url}/rest/v1/historias?select=id,criado_em,nome,texto,foto_path&aprovada=eq.true&order=criado_em.desc&limit=200`, { headers: cabecalhos });
      if (!r.ok) throw new Error(String(r.status));
      const historias: Historia[] = await r.json();
      lista.replaceChildren(...historias.map((h) => {
        const li = document.createElement('li');
        if (h.foto_path) {
          const img = document.createElement('img');
          img.src = `${url}/storage/v1/object/public/historias/${encodeURIComponent(h.foto_path)}`;
          img.alt = `Foto enviada por ${h.nome}`;
          img.loading = 'lazy';
          li.append(img);
        }
        const corpo = document.createElement('div');
        corpo.className = 'mural-corpo';
        const p = document.createElement('p');
        p.className = 'mural-texto';
        p.textContent = h.texto;
        const nome = document.createElement('p');
        nome.className = 'mural-nome';
        nome.textContent = h.nome;
        corpo.append(p, nome);
        li.append(corpo);
        return li;
      }));
      vazio.hidden = historias.length > 0;
    } catch {
      vazio.hidden = false;
    }
  };
  carrega();

  // ---------- Formulário ----------
  texto.addEventListener('input', () => { restam.textContent = String(limite - texto.value.length); });

  // Reduz a foto no navegador (lado maior até `data-largura` px) antes de enviar.
  const reduz = async (arquivo: File, max: number): Promise<Blob> => {
    const bitmap = await createImageBitmap(arquivo);
    const escala = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bitmap.width * escala);
    canvas.height = Math.round(bitmap.height * escala);
    canvas.getContext('2d')!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    return new Promise((ok, falha) => canvas.toBlob((b) => (b ? ok(b) : falha(new Error('foto'))), 'image/jpeg', 0.85));
  };

  const avisa = (msg: string, tipo: 'ok' | 'erro') => {
    status.textContent = msg;
    status.className = `mural-status ${tipo}`;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const dados = new FormData(form);
    const nome = String(dados.get('nome') || '').trim();
    const historia = String(dados.get('texto') || '').trim();

    // isca: robôs preenchem o campo invisível; fingimos sucesso e não enviamos
    if (String(dados.get('site') || '')) { avisa(status.dataset.sucesso!, 'ok'); form.reset(); return; }

    if (!nome || !historia) { avisa('Preencha seu nome e a história.', 'erro'); return; }
    if (historia.length > limite) { avisa(`A história pode ter até ${limite} caracteres.`, 'erro'); return; }

    const arquivo = campoFoto.files?.[0];
    if (arquivo) {
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(arquivo.type)) { avisa('A foto precisa ser jpg, png ou webp.', 'erro'); return; }
      if (arquivo.size > Number(campoFoto.dataset.limiteMb) * 1024 * 1024) { avisa(`A foto pode ter até ${campoFoto.dataset.limiteMb} MB.`, 'erro'); return; }
    }

    botao.disabled = true;
    avisa('Enviando…', 'ok');
    try {
      let fotoPath: string | null = null;
      if (arquivo) {
        const blob = await reduz(arquivo, Number(campoFoto.dataset.largura));
        fotoPath = `${crypto.randomUUID()}.jpg`;
        const up = await fetch(`${url}/storage/v1/object/historias/${fotoPath}`, {
          method: 'POST',
          headers: { ...cabecalhos, 'Content-Type': 'image/jpeg', 'x-upsert': 'false' },
          body: blob,
        });
        if (!up.ok) throw new Error(`foto ${up.status}`);
      }
      const r = await fetch(`${url}/rest/v1/historias`, {
        method: 'POST',
        headers: { ...cabecalhos, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
        body: JSON.stringify({ nome, texto: historia, foto_path: fotoPath }),
      });
      if (!r.ok) throw new Error(`historia ${r.status}`);
      form.reset();
      restam.textContent = String(limite);
      avisa(status.dataset.sucesso!, 'ok');
    } catch {
      avisa(status.dataset.erro!, 'erro');
    } finally {
      botao.disabled = false;
    }
  });
}
export {};
