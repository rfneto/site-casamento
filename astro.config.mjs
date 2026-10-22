// Configuração do Astro.
// `site` + `base` = endereço final no GitHub Pages: https://rfneto.github.io/site-casamento/
// Se um dia usarem domínio próprio, troque `site` pelo domínio e apague `base`.
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://rfneto.github.io',
  base: '/site-casamento',
  trailingSlash: 'ignore',
  devToolbar: { enabled: false },
});
