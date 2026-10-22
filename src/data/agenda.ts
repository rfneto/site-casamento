// Gera o evento de agenda (.ics e link do Google Agenda) a partir do arquivo
// de dados. Não precisa mexer aqui: edite src/data/casamento.ts.
import { casamento } from './casamento';

const { noivos, data, local, evento, seo } = casamento;

const inicio = new Date(data.cerimonia);
const fim = new Date(inicio.getTime() + data.duracaoHoras * 3600_000);

// 20270511T210000Z
const utc = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

const lugar = local.hotelConfirmado && local.hotel.nome
  ? `${local.hotel.nome}, ${local.cidade}, ${local.pais}`
  : `${local.cidade}, ${local.pais}`;

const titulo = `Casamento ${noivos.primeiro} & ${noivos.segundo}` + (data.confirmada ? '' : ' (data a confirmar)');

const descricao = [
  `${evento.cerimonia.titulo} às ${evento.cerimonia.horario} (horário de Punta Cana), seguida de ${evento.depois.titulo.toLowerCase()}.`,
  data.confirmada ? '' : 'Data provisória: vamos confirmar o dia exato em breve.',
  `Tudo sobre a viagem: ${seo.url}`,
].filter(Boolean).join('\n');

export const urlGoogleAgenda = 'https://calendar.google.com/calendar/render?' + new URLSearchParams({
  action: 'TEMPLATE',
  text: titulo,
  dates: `${utc(inicio)}/${utc(fim)}`,
  details: descricao,
  location: lugar,
  ctz: 'America/Santo_Domingo',
}).toString();

const esc = (s: string) => s.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/([,;])/g, '\\$1');

export const conteudoIcs = [
  'BEGIN:VCALENDAR',
  'VERSION:2.0',
  'PRODID:-//Ilma e Ruy//Casamento 2027//PT-BR',
  'CALSCALE:GREGORIAN',
  'METHOD:PUBLISH',
  'BEGIN:VEVENT',
  'UID:casamento-ilma-ruy-2027@site-casamento.vercel.app',
  `DTSTAMP:${utc(new Date())}`,
  `DTSTART:${utc(inicio)}`,
  `DTEND:${utc(fim)}`,
  `SUMMARY:${esc(titulo)}`,
  `DESCRIPTION:${esc(descricao)}`,
  `LOCATION:${esc(lugar)}`,
  `URL:${seo.url}`,
  'BEGIN:VALARM',
  'TRIGGER:-P30D',
  'ACTION:DISPLAY',
  `DESCRIPTION:${esc('Falta um mês para o casamento! Confira o checklist da viagem.')}`,
  'END:VALARM',
  'END:VEVENT',
  'END:VCALENDAR',
  '',
].join('\r\n');
