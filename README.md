# Ilma & Ruy · Punta Cana 2027

Site do casamento: **https://casamento-ilma-ruy.vercel.app** (projeto na Vercel: `fract-ia-s-projects/site-casamento`)

Site estático (Astro), uma página só, com menu fixo. O visual é o das cangas
que a Ilma fez para os convidados: listras de aquarela azul, nomes em letra de
pincel índigo, coqueiro, espreguiçadeiras e estrela-do-mar. Fica fora dos buscadores
(`noindex, nofollow` na página, no cabeçalho `X-Robots-Tag` da Vercel e no `robots.txt`), mas qualquer pessoa com o link abre.

> **O repositório é público.** Tudo o que estiver nos arquivos fica visível no
> GitHub. Não escreva nome de hotel ainda não fechado, nomes de convidados,
> quartos, valores, contratos ou documentos.

## Onde mexer

Quase tudo está em **um arquivo só**: [`src/data/casamento.ts`](src/data/casamento.ts).
Ele é todo comentado em português. Dá para editar direto no site do GitHub:
abra o arquivo → ícone de lápis → edite → **Commit changes**. Em 1–2 minutos a
Vercel republica o site sozinha.

Regras para não quebrar: troque só o texto entre aspas `'assim'` e mantenha
vírgulas e chaves. Se der erro, o site antigo continua no ar e o commit
ganha um ❌ da Vercel no GitHub — é só desfazer a última mudança.

## Ilustrações (as cangas)

| Onde | O quê |
|---|---|
| `public/cangas/` | arquivos originais enviados pela Ilma (coqueiro, espreguiçadeira, estrela-do-mar, listras e a foto de referência da canga) |
| `public/ilustracoes/` | versões leves usadas no site (WebP + PNG de reserva, com transparência) |

Se a Ilma mandar um arquivo novo (por exemplo, o coqueiro em alta resolução),
salve com o mesmo nome em `public/cangas/` e rode
`python3 scripts/otimizar-ilustracoes.py` para gerar as versões leves.

Paleta (tirada das cangas): branco `#FFFFFF`, azul das listras `#D3EBF4`,
índigo do nome `#5460A7` (títulos e botões), índigo escuro `#3D4785` (texto),
azul da espreguiçadeira `#1188C3`, verde do coqueiro `#748B3E`, areia
`#DFC77A`, lavanda da estrela `#A0B0E0`. Fontes: **Damion** (nomes, títulos e
"Maio 2027") e **Nunito Sans** (texto), do Google Fonts. A fonte original da
canga (Playlist Script) não é usada porque a licença é só para uso pessoal.

## Como colocar as fotos

As fotos ficam em `public/fotos/`. Por enquanto não há nenhuma: as molduras
mostram as listras de aquarela no lugar.

| Arquivo | Onde aparece | Formato ideal |
|---|---|---|
| `historia-1.jpg`, `historia-2.jpg`, `historia-3.jpg` | polaroides de "Nossa história" | vertical (4:5), ~900 px |
| `hospedagem.jpg` | Hospedagem | horizontal, ~1600 px |

1. Salve a foto **com o nome da tabela** em `public/fotos/` (no GitHub: entre
   na pasta → **Add file → Upload files**). Use JPG de até ~500 KB.
2. Em `src/data/casamento.ts`, atualize o `alt` (descrição para leitor de tela)
   e a `legenda` das polaroides.

A abertura não tem foto: ela reproduz a canga.

A imagem da prévia do WhatsApp (`public/og.jpg`, no formato da canga) e os
ícones são gerados por `node scripts/gerar-imagens.mjs` (precisa do Playwright;
veja o topo do script). Rode de novo se mudar nomes, data ou ilustrações.

Prints de referência (site ao lado da canga) ficam em `docs/prints/`.

## Como preencher a programação

Em `casamento.ts`, procure `programacao`. Há um modelo comentado: copie para
dentro de `dias: [ ]` e tire as barras `//`. Cada dia vira uma aba; cada item
tem `horario`, `atividade`, `local` e `observacao`. Enquanto a lista estiver
vazia, aparece "Programação em breve".

## Como confirmar a data e o hotel

- **Data:** em `data`, ajuste `cerimonia` (formato `2027-05-11T17:00:00-04:00`,
  horário de Punta Cana) e `textoConfirmado`, e troque `confirmada` para `true`.
  A contagem regressiva e o "Salvar na agenda" seguem sozinhos.
- **Hotel:** em `local.hotel`, preencha `nome` (e, se quiser, `regiao` e `site`)
  e troque `hotelConfirmado` para `true`. Só então o nome aparece no topo, na
  hospedagem e no evento da agenda.
- **Lista de presentes:** em `presentes`, adicione os links e troque `ligada`
  para `true`. Aparece a seção e o item no menu.

## Como publicar e republicar (Vercel)

O site é publicado pela Vercel, ligada a este repositório do GitHub.

- **Primeira vez:** em vercel.com/new, entre com o GitHub, escolha
  `rfneto/site-casamento` → **Import** → **Deploy** (a Vercel reconhece o Astro
  sozinha; as configurações estão em `vercel.json`).
- **Depois:** todo commit no branch de produção republica o site sozinho.
- **Republicar sem mudar nada:** na Vercel, projeto → **Deployments** → no
  último → **⋯ → Redeploy**.
- **Mudou o endereço** (outro nome ou domínio próprio)? Troque `site` em
  `astro.config.mjs` e `seo.url` em `src/data/casamento.ts`, para a prévia do
  WhatsApp e o "Salvar na agenda" apontarem certo.

## Rodar no computador (opcional)

```bash
npm install
npm run dev        # http://localhost:4321/
npm run build      # gera a pasta dist/
```

## Regras de entrada

O checklist de "Para entrar em Punta Cana" foi conferido em 21, 22 e 24/10/2026 (as
fontes estão comentadas em `casamento.ts`). **Reconfiram antes de maio de 2027**,
principalmente passaporte (a exceção atual acaba em 31/12/2026) e febre amarela.
