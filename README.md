# Ilma & Ruy · Punta Cana 2027

Site do casamento: **https://casamento-ilma-ruy.vercel.app** (projeto na Vercel: `fract-ia-s-projects/site-casamento`)

Site estático (Astro), uma página só, com menu fixo. O visual é o das cangas
que a Ilma fez para os convidados: listras de aquarela azul, nomes em letra de
pincel índigo, coqueiro, espreguiçadeiras e estrela-do-mar.

Seções: abertura (canga com data, resort e contagem regressiva) · Nossa
história (capítulos) · O casamento · O resort · Programação · Como chegar
(voos) · Para entrar em Punta Cana (checklist, fusos e gorjetas) · Histórias
com a gente (mural) · Perguntas frequentes · Presentes (desligada).

Fica fora dos buscadores
(`noindex, nofollow` na página, no cabeçalho `X-Robots-Tag` da Vercel e no `robots.txt`), mas qualquer pessoa com o link abre.

> **O repositório é público.** Tudo o que estiver nos arquivos fica visível no
> GitHub. Não escreva nomes de convidados, distribuição de quartos, valores,
> contratos, contatos do hotel ou documentos.

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
títulos de seção) e **Nunito Sans** (texto), do Google Fonts. A fonte original da
canga (Playlist Script) não é usada porque a licença é só para uso pessoal.

## Como colocar as fotos

| Arquivo | Onde aparece | Formato ideal |
|---|---|---|
| `public/fotos/historia/capitulo-1.jpg` … `capitulo-4.jpg` | capítulos de "Nossa história" (hoje são fotos de exemplo) | vertical (4:5), ~1200 px |
| `public/fotos/resort.jpg` | O resort (enquanto não existir, aparecem as listras) | horizontal, ~1600 px |

1. Salve a foto **com o nome da tabela** (no GitHub: entre na pasta →
   **Add file → Upload files**; o arquivo com o mesmo nome é substituído).
   Use JPG de até ~500 KB.
2. Em `src/data/casamento.ts`, atualize o `alt` (descrição para leitor de tela).

### Capítulos de "Nossa história"

Em `casamento.ts`, procure `historia.capitulos`. Cada capítulo tem `foto`,
`alt`, `legenda` (texto curto do cartão), `titulo`, `data` (opcional; deixe
`''` para esconder) e `texto`. Para ter mais capítulos, copie um bloco
`{ ... },` inteiro e aponte para uma foto nova (ex.: `capitulo-5.jpg`).

A imagem da prévia do WhatsApp (`public/og.jpg`, no formato da canga) e os
ícones são gerados por `node scripts/gerar-imagens.mjs` (precisa do Playwright;
veja o topo do script). Rode de novo se mudar nomes, data ou ilustrações.

Prints de referência (site ao lado da canga) ficam em `docs/prints/`.

## Como preencher a programação

Em `casamento.ts`, procure `programacao`. Cada dia (`aba`, `titulo`, `aviso`
opcional) vira uma aba; cada item tem `horario`, `atividade`, `local` e
`observacao`. Dois interruptores por item:

- `aConfirmar: true` → mostra a etiqueta "a confirmar";
- `oculto: true` → o item não aparece no site.

O **jantar de boas-vindas** já está lá com `oculto: true`. Quando definirem dia
e hora, ajuste o item e troque para `oculto: false`.

## Voos, fusos e gorjetas

Tudo em `casamento.ts`: `comoChegar` (um cartão por cidade de saída, com
opções, horários, preço e avisos), `viagem.fusos` (o exemplo de horário é
calculado sozinho a partir da data da cerimônia) e `viagem.gorjetas` (texto e
tabela). As fontes e a data da pesquisa estão nos comentários.

## Como confirmar a data e o hotel

- **Data:** em `data`, ajuste `cerimonia` (formato `2027-05-11T17:00:00-04:00`,
  horário de Punta Cana) e `textoConfirmado`, e troque `confirmada` para `true`.
  A contagem regressiva e o "Salvar na agenda" seguem sozinhos.
- **Hotel:** já confirmado (`hotelConfirmado: true`). Os dados do resort ficam
  em `local.hotel`. Se voltar para `false`, o nome some do site inteiro e a
  seção vira "Hospedagem" genérica.
- **Lista de presentes:** em `presentes`, adicione os links e troque `ligada`
  para `true`. Aparece a seção e o item no menu.

## Mural "Histórias com a gente" (Supabase)

Convidados enviam uma história (e, se quiserem, uma foto). Ela só aparece no
site depois que vocês aprovarem. Enquanto o Supabase não estiver configurado,
o mural mostra "Em breve" e o formulário fica escondido.

**Configurar (uma vez):**

1. Crie uma conta grátis em [supabase.com](https://supabase.com) → **New
   project** (escolha uma senha forte para o banco e a região *São Paulo*).
2. No projeto, abra **SQL Editor → New query**, cole todo o conteúdo de
   [`supabase/migrations/001_historias.sql`](supabase/migrations/001_historias.sql)
   e clique em **Run**. Isso cria a tabela, as regras de segurança e o local
   das fotos.
3. Em **Project Settings → API** (ou **Data API** / **API Keys**), copie a
   **Project URL** e a chave **anon public**. **Nunca** use a chave
   `service_role` no site.
4. Na Vercel: projeto → **Settings → Environment Variables** → adicione
   `PUBLIC_SUPABASE_URL` (a URL) e `PUBLIC_SUPABASE_ANON_KEY` (a chave anon),
   marcando *Production*.
5. Em **Deployments**, no último → **⋯ → Redeploy**. O formulário aparece.

**Aprovar uma história (3 passos):**

1. No Supabase, abra **Table Editor → historias**.
2. Encontre a história (as novas têm `aprovada` = `false`); a foto, se houver,
   está em **Storage → historias** com o nome indicado em `foto_path`.
3. Clique na célula `aprovada`, marque `true` e salve. Ela aparece no mural na
   hora. Para tirar do mural, volte para `false`; para apagar, use o menu da
   linha → **Delete row**.

O que o público consegue fazer (testado num banco local): enviar história
(sempre como não aprovada, texto até 1.000 caracteres) e foto (só jpg/png/webp,
até 5 MB); ler só as aprovadas. Editar, apagar, aprovar ou listar fotos: não.

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
