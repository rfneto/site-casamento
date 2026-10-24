// "Nossa história": abre cada capítulo num painel (<dialog>) com a foto grande.
// Setas e teclas ← → trocam de capítulo; X, Esc e clique fora fecham.
// No celular o painel ocupa a tela toda e dá para arrastar a foto para o lado.

type Capitulo = { foto: string; alt: string; legenda: string; titulo: string; data?: string; texto: string };

const dialogo = document.querySelector<HTMLDialogElement>('[data-modal-historia]');
const dadosEl = document.getElementById('capitulos-dados');

if (dialogo && dadosEl && typeof dialogo.showModal === 'function') {
  const capitulos: Capitulo[] = JSON.parse(dadosEl.textContent || '[]');
  const foto = dialogo.querySelector<HTMLImageElement>('[data-modal-foto]')!;
  const titulo = dialogo.querySelector<HTMLElement>('[data-modal-titulo]')!;
  const dataEl = dialogo.querySelector<HTMLElement>('[data-modal-data]')!;
  const corpo = dialogo.querySelector<HTMLElement>('[data-modal-corpo]')!;
  const contador = dialogo.querySelector<HTMLElement>('[data-modal-contador]')!;
  let atual = 0;
  let origem: HTMLElement | null = null;

  const mostra = (i: number) => {
    atual = (i + capitulos.length) % capitulos.length;
    const cap = capitulos[atual];
    foto.src = cap.foto;
    foto.alt = cap.alt;
    titulo.textContent = cap.titulo;
    dataEl.textContent = cap.data || '';
    corpo.textContent = cap.texto;
    contador.textContent = `Capítulo ${atual + 1} de ${capitulos.length}`;
  };

  const abre = (i: number, botao: HTMLElement) => {
    origem = botao;
    mostra(i);
    dialogo.showModal();
    dialogo.querySelector<HTMLElement>('[data-proximo]')?.focus();
  };

  document.querySelectorAll<HTMLButtonElement>('[data-capitulo]').forEach((b) =>
    b.addEventListener('click', () => abre(Number(b.dataset.capitulo), b)),
  );
  dialogo.querySelector('[data-fechar]')!.addEventListener('click', () => dialogo.close());
  dialogo.querySelector('[data-proximo]')!.addEventListener('click', () => mostra(atual + 1));
  dialogo.querySelector('[data-anterior]')!.addEventListener('click', () => mostra(atual - 1));

  // clique no fundo escuro (fora da caixa) fecha
  dialogo.addEventListener('click', (e) => { if (e.target === dialogo) dialogo.close(); });
  dialogo.addEventListener('close', () => origem?.focus());

  dialogo.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); mostra(atual + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); mostra(atual - 1); }
    // mantém o foco dentro do painel (Tab e Shift+Tab dão a volta)
    if (e.key === 'Tab') {
      const focaveis = [...dialogo.querySelectorAll<HTMLElement>('button, a[href]')].filter((el) => el.offsetParent !== null);
      const primeiro = focaveis[0];
      const ultimo = focaveis[focaveis.length - 1];
      if (e.shiftKey && document.activeElement === primeiro) { e.preventDefault(); ultimo.focus(); }
      else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primeiro.focus(); }
    }
  });

  // arrastar para o lado (celular)
  let inicioX = 0;
  let inicioY = 0;
  const figura = dialogo.querySelector<HTMLElement>('.modal-figura')!;
  figura.addEventListener('pointerdown', (e) => { inicioX = e.clientX; inicioY = e.clientY; });
  figura.addEventListener('pointerup', (e) => {
    const dx = e.clientX - inicioX;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(e.clientY - inicioY)) mostra(atual + (dx < 0 ? 1 : -1));
  });
}
export {};
