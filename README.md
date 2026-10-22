# Ilma & Ruy · Punta Cana 2027

Site do casamento: **https://rfneto.github.io/site-casamento/**

Site estático (Astro), uma página só, com menu fixo. Fica fora dos buscadores
(`noindex, nofollow` + `robots.txt`), mas qualquer pessoa com o link abre.

> **O repositório é público.** Tudo o que estiver nos arquivos fica visível no
> GitHub. Não escreva nome de hotel ainda não fechado, nomes de convidados,
> quartos, valores, contratos ou documentos.

## Onde mexer

Quase tudo está em **um arquivo só**: [`src/data/casamento.ts`](src/data/casamento.ts).
Ele é todo comentado em português. Dá para editar direto no site do GitHub:
abra o arquivo → ícone de lápis → edite → **Commit changes**. Em 1–2 minutos o
site se atualiza sozinho.

Regras para não quebrar: troque só o texto entre aspas `'assim'` e mantenha
vírgulas e chaves. Se der erro, o site antigo continua no ar e a aba **Actions**
mostra um ❌ — é só desfazer a última mudança.

## Como trocar as fotos

As fotos ficam em `public/fotos/`. Hoje são fotos provisórias do Unsplash.

| Arquivo | Onde aparece | Formato ideal |
|---|---|---|
| `abertura.jpg` | arco do topo | vertical (4:5), ~1200 px de largura |
| `historia-1.jpg`, `historia-2.jpg`, `historia-3.jpg` | polaroides de "Nossa história" | vertical (4:5), ~900 px |
| `hospedagem.jpg` | Hospedagem | horizontal, ~1600 px |

1. Salve a foto de vocês **com o mesmo nome** em `public/fotos/` (no GitHub:
   entre na pasta → **Add file → Upload files**). Use JPG de até ~500 KB.
2. Em `src/data/creditos-fotos.json`, apague o bloco daquela foto (o crédito do
   Unsplash só vale para foto de banco).
3. Em `src/data/casamento.ts`, atualize o `alt` (descrição para leitor de tela)
   e a `legenda` das polaroides.

Se um arquivo de foto não existir, o site mostra um fundo de praia no lugar e o
GitHub tenta baixar uma foto provisória na próxima publicação.

A imagem da prévia do WhatsApp (`public/og.jpg`) e os ícones são gerados por
`node scripts/gerar-imagens.mjs` (precisa do Playwright; veja o topo do script).
Rode de novo se trocar a foto da abertura e quiser a nova foto na prévia.

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

## Como republicar

Todo push no branch publicado dispara o workflow
[`.github/workflows/publicar.yml`](.github/workflows/publicar.yml), que monta o
site e publica no GitHub Pages. Para republicar sem mudar nada: aba **Actions →
Publicar site → Run workflow**.

## Rodar no computador (opcional)

```bash
npm install
npm run dev        # http://localhost:4321/site-casamento/
npm run build      # gera a pasta dist/
```

## Regras de entrada

O checklist de "Para entrar em Punta Cana" foi conferido em 21–22/10/2026 (as
fontes estão comentadas em `casamento.ts`). **Reconfiram antes de maio de 2027**,
principalmente passaporte (a exceção atual acaba em 31/12/2026) e febre amarela.
