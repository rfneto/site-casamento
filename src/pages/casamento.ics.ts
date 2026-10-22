// Arquivo de agenda gerado na publicação: /site-casamento/casamento.ics
import { conteudoIcs } from '../data/agenda';

export const GET = () =>
  new Response(conteudoIcs, { headers: { 'Content-Type': 'text/calendar; charset=utf-8' } });
