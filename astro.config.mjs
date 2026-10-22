// Configuração do Astro.
// `site` = endereço final na Vercel. Se mudar o domínio (ex.: domínio próprio),
// troque aqui e em `seo.url` no arquivo de dados.
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://casamento-ilma-ruy.vercel.app',
  trailingSlash: 'ignore',
  devToolbar: { enabled: false },
});
