// Interações do site: contagem regressiva, abas da programação, checklist
// salvo no navegador, entrada suave ao rolar, menu ativo e menu da agenda.

// ---------- Contagem regressiva ----------
const contagem = document.querySelector<HTMLElement>('[data-contagem]');
if (contagem) {
  const alvo = new Date(contagem.dataset.alvo!).getTime();
  const campos = (k: string) => document.querySelectorAll<HTMLElement>(`[data-cd="${k}"]`);
  const pad = (n: number) => String(n).padStart(2, '0');
  const atualiza = () => {
    let r = Math.max(0, alvo - Date.now());
    const d = Math.floor(r / 86400000); r -= d * 86400000;
    const h = Math.floor(r / 3600000); r -= h * 3600000;
    const m = Math.floor(r / 60000); r -= m * 60000;
    const s = Math.floor(r / 1000);
    campos('d').forEach((el) => (el.textContent = String(d)));
    campos('h').forEach((el) => (el.textContent = pad(h)));
    campos('m').forEach((el) => (el.textContent = pad(m)));
    campos('s').forEach((el) => (el.textContent = pad(s)));
  };
  atualiza();
  setInterval(atualiza, 1000);
}

// ---------- Abas da programação ----------
const abas = document.querySelector<HTMLElement>('[data-abas]');
if (abas) {
  const botoes = [...abas.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
  const seleciona = (i: number, foco = false) => {
    botoes.forEach((b, j) => {
      const ativo = i === j;
      b.setAttribute('aria-selected', String(ativo));
      b.tabIndex = ativo ? 0 : -1;
      document.getElementById(b.getAttribute('aria-controls')!)!.hidden = !ativo;
    });
    if (foco) botoes[i].focus();
  };
  botoes.forEach((b, i) => {
    b.addEventListener('click', () => seleciona(i));
    b.addEventListener('keydown', (e) => {
      const passo = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (passo) { e.preventDefault(); seleciona((i + passo + botoes.length) % botoes.length, true); }
      if (e.key === 'Home') { e.preventDefault(); seleciona(0, true); }
      if (e.key === 'End') { e.preventDefault(); seleciona(botoes.length - 1, true); }
    });
  });
}

// ---------- Checklist (salvo só neste navegador) ----------
const CHAVE = 'ilma-ruy-2027:checklist';
const lerMarcados = (): Record<string, boolean> => {
  try { return JSON.parse(localStorage.getItem(CHAVE) || '{}'); } catch { return {}; }
};
const salvarMarcados = (v: Record<string, boolean>) => {
  try { localStorage.setItem(CHAVE, JSON.stringify(v)); } catch { /* modo anônimo: segue sem salvar */ }
};
const lista = document.querySelector<HTMLElement>('[data-checklist]');
if (lista) {
  const marcados = lerMarcados();
  const botoes = [...lista.querySelectorAll<HTMLButtonElement>('.check')];
  const prontos = document.querySelector('[data-prontos]');
  const barra = document.querySelector<HTMLElement>('[data-progresso]');
  const pinta = () => {
    let n = 0;
    botoes.forEach((b) => {
      const feito = !!marcados[b.dataset.id!];
      if (feito) n++;
      b.setAttribute('aria-pressed', String(feito));
      b.closest('li')!.classList.toggle('feito', feito);
    });
    if (prontos) prontos.textContent = String(n);
    if (barra) barra.style.width = `${(n / botoes.length) * 100}%`;
  };
  botoes.forEach((b) => b.addEventListener('click', () => {
    marcados[b.dataset.id!] = !marcados[b.dataset.id!];
    salvarMarcados(marcados);
    pinta();
  }));
  document.querySelector('[data-desmarcar]')?.addEventListener('click', () => {
    Object.keys(marcados).forEach((k) => delete marcados[k]);
    salvarMarcados(marcados);
    pinta();
  });
  pinta();
}

// ---------- Entrada suave ao rolar ----------
const revelar = document.querySelectorAll('.revela');
if ('IntersectionObserver' in window) {
  const obs = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('visivel'); obs.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
  revelar.forEach((el) => obs.observe(el));
} else {
  revelar.forEach((el) => el.classList.add('visivel'));
}

// ---------- Menu: marca a seção visível ----------
const links = [...document.querySelectorAll<HTMLAnchorElement>('.menu a')];
const secoes = links.map((a) => document.querySelector<HTMLElement>(a.hash));
let ativoAtual = -2;
const marcaMenu = () => {
  const linha = window.innerHeight * 0.35;
  let ativo = -1;
  secoes.forEach((s, i) => { if (s && s.getBoundingClientRect().top <= linha) ativo = i; });
  if (ativo === ativoAtual) return;
  ativoAtual = ativo;
  links.forEach((a, i) => a.setAttribute('aria-current', String(i === ativo)));
  const ul = links[0]?.closest('ul');
  if (ul && ul.scrollWidth > ul.clientWidth) {
    // no celular o menu rola de lado: centraliza o item ativo
    const a = links[Math.max(0, ativo)];
    ul.scrollTo({ left: ativo < 0 ? 0 : a.offsetLeft - ul.clientWidth / 2 + a.clientWidth / 2 });
  }
};
let agendado = false;
window.addEventListener('scroll', () => {
  if (agendado) return;
  agendado = true;
  requestAnimationFrame(() => { agendado = false; marcaMenu(); });
}, { passive: true });
marcaMenu();

// ---------- "Salvar na agenda": fecha ao clicar fora ou com Esc ----------
const agenda = document.querySelector<HTMLDetailsElement>('.agenda');
if (agenda) {
  document.addEventListener('click', (e) => {
    if (agenda.open && !agenda.contains(e.target as Node)) agenda.open = false;
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && agenda.open) { agenda.open = false; agenda.querySelector('summary')!.focus(); }
  });
}
