# Ilma & Ruy · Punta Cana 2027

Site do casamento: **https://site-casamento.vercel.app** (endereço confirmado na primeira publicação na Vercel)

Site estático (Astro), uma página só, com menu fixo. Fica fora dos buscadores
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

## Como colocar as fotos

As fotos ficam em `public/fotos/`. Por enquanto não há nenhuma: as molduras
mostram um fundo desenhado de céu, mar e areia.

| Arquivo | Onde aparece | Formato ideal |
|---|---|---|
| `abertura.jpg` | arco do topo | vertical (4:5), ~1200 px de largura |
| `historia-1.jpg`, `historia-2.jpg`, `historia-3.jpg` | polaroides de "Nossa história" | vertical (4:5), ~900 px |
| `hospedagem.jpg` | Hospedagem | horizontal, ~1600 px |

1. Salve a foto **com o nome da tabela** em `public/fotos/` (no GitHub: entre
   na pasta → **Add file → Upload files**). Use JPG de até ~500 KB.
2. Em `src/data/casamento.ts`, atualize o `alt` (descrição para leitor de tela)
   e a `legenda` das polaroides.

A imagem da prévia do WhatsApp (`public/og.jpg`) e os ícones são gerados por
`node scripts/gerar-imagens.mjs` (precisa do Playwright; veja o topo do script).
Se rodar de novo depois de subir `abertura.jpg`, a foto entra na prévia.

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

O checklist de "Para entrar em Punta Cana" foi conferido em 21–22/10/2026 (as
fontes estão comentadas em `casamento.ts`). **Reconfiram antes de maio de 2027**,
principalmente passaporte (a exceção atual acaba em 31/12/2026) e febre amarela.
