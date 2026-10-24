// =============================================================================
//  ARQUIVO DE DADOS DO SITE — Ilma & Ruy · Punta Cana 2027
// =============================================================================
//  Tudo o que aparece no site sai daqui: textos, datas, fotos, flags,
//  programação, checklist e perguntas frequentes.
//
//  Como editar sem quebrar nada:
//   • Troque só o texto entre aspas ('assim'). Mantenha vírgulas e chaves.
//   • Para apóstrofo dentro do texto, use aspas tipográficas (’) ou \'.
//   • Salve, faça commit e push: o site se republica sozinho (veja o README).
//
//  ATENÇÃO: este repositório é PÚBLICO no GitHub. Não escreva aqui nada que
//  não possa ficar público: nome do hotel ainda não fechado, nomes de
//  convidados, quartos, valores, contratos, documentos.
// =============================================================================

export const casamento = {
  // ---------------------------------------------------------------------------
  // NOIVOS — a Ilma vem sempre primeiro (títulos, monograma, rodapé, Open Graph)
  // ---------------------------------------------------------------------------
  noivos: {
    primeiro: 'Ilma',
    segundo: 'Ruy',
    monograma: 'I&R',
  },

  // ---------------------------------------------------------------------------
  // DATA E HORA
  // ---------------------------------------------------------------------------
  data: {
    // Data/hora da cerimônia NO HORÁRIO DE PUNTA CANA (UTC-4, sem horário de
    // verão). A contagem regressiva e o "Salvar na agenda" usam este valor.
    // PROVISÓRIA: 11/05/2027 às 17h. Troque quando o hotel confirmar.
    cerimonia: '2027-05-11T17:00:00-04:00',

    // Duração do evento na agenda (cerimônia + coquetel + jantar), em horas.
    duracaoHoras: 6,

    // Enquanto for false, o site mostra só o texto abaixo (mês e ano) e o
    // evento da agenda sai marcado como "data a confirmar".
    confirmada: false,

    // Texto exibido enquanto a data não estiver confirmada.
    textoProvisorio: 'maio de 2027',

    // Texto exibido quando `confirmada: true` (ex.: 'terça, 11 de maio de 2027').
    textoConfirmado: 'terça-feira, 11 de maio de 2027',
  },

  // ---------------------------------------------------------------------------
  // LOCAL
  // ---------------------------------------------------------------------------
  local: {
    cidade: 'Punta Cana',
    pais: 'República Dominicana',

    // Deixe false até o contrato com o hotel estar fechado. Com false, o nome
    // do hotel NÃO aparece em lugar nenhum do site.
    hotelConfirmado: false,

    // Preencha só quando confirmar (pode deixar em branco até lá).
    hotel: {
      nome: '',
      regiao: '', // ex.: 'Cap Cana' ou 'Uvero Alto'
      site: '', // link oficial do hotel, opcional
    },
  },

  // ---------------------------------------------------------------------------
  // ABERTURA (topo do site)
  // ---------------------------------------------------------------------------
  // A abertura reproduz a canga: nomes, listras, coqueiro, espreguiçadeiras e
  // "Maio 2027" (mês e ano saem de `data.cerimonia`). Abaixo dos nomes aparece:
  // chamada · cidade, país · data · horário da cerimônia.
  abertura: {
    chamada: 'Vamos casar',
  },

  // ---------------------------------------------------------------------------
  // FOTOS
  // ---------------------------------------------------------------------------
  // Os arquivos ficam em public/fotos/. Enquanto um arquivo não existir, o site
  // mostra as listras de aquarela da canga no lugar. Para colocar a foto,
  // salve a imagem com o nome indicado (ex.: public/fotos/historia-1.jpg).
  // `alt` = descrição da foto para quem usa leitor de tela. Atualize junto.
  fotos: {
    historia: [
      { arquivo: 'fotos/historia-1.jpg', alt: '[Descrever a foto 1]', legenda: '[Como nos conhecemos]' },
      { arquivo: 'fotos/historia-2.jpg', alt: '[Descrever a foto 2]', legenda: '[Uma viagem marcante]' },
      { arquivo: 'fotos/historia-3.jpg', alt: '[Descrever a foto 3]', legenda: '[O pedido]' },
    ],
    hospedagem: { arquivo: 'fotos/hospedagem.jpg', alt: 'Resort à beira-mar' },
  },

  // ---------------------------------------------------------------------------
  // NOSSA HISTÓRIA
  // ---------------------------------------------------------------------------
  historia: {
    titulo: 'Nossa história',
    // Cada item vira um parágrafo.
    paragrafos: [
      '[Escrevam aqui como vocês se conheceram — duas ou três frases.]',
      '[E aqui o caminho até o pedido, e por que escolheram casar na praia, só com a família.]',
    ],
  },

  // ---------------------------------------------------------------------------
  // O CASAMENTO
  // ---------------------------------------------------------------------------
  evento: {
    cerimonia: {
      horario: '17h',
      titulo: 'Cerimônia na praia',
      texto: 'Pé na areia, com o pôr do sol do Caribe.',
    },
    depois: {
      titulo: 'Coquetel e jantar',
      texto: 'Logo depois da cerimônia, à beira-mar. Detalhes em breve.',
    },
    dressCode: {
      titulo: 'Traje de praia elegante',
      texto: 'Detalhes em breve.',
    },
  },

  // ---------------------------------------------------------------------------
  // PROGRAMAÇÃO (itinerário dia a dia)
  // ---------------------------------------------------------------------------
  // Enquanto a lista `dias` estiver vazia, o site mostra "Programação em breve".
  // Para preencher, copie o modelo comentado abaixo para dentro de `dias: [ ]`
  // e tire as barras //. Cada dia vira uma aba; cada item, uma linha.
  //
  //   dias: [
  //     {
  //       aba: 'Seg 10/05',             // texto curto da aba
  //       titulo: 'Chegada',            // nome do dia
  //       itens: [
  //         { horario: '15h', atividade: 'Check-in no hotel', local: 'Recepção', observacao: 'Pulseira all-inclusive' },
  //         { horario: '19h', atividade: 'Jantar de boas-vindas', local: 'A definir', observacao: '' },
  //       ],
  //     },
  //     {
  //       aba: 'Ter 11/05',
  //       titulo: 'O grande dia',
  //       itens: [
  //         { horario: '17h', atividade: 'Cerimônia', local: 'Praia', observacao: 'Chegar 16h40' },
  //       ],
  //     },
  //   ],
  programacao: {
    dias: [] as Dia[],
    textoVazio: 'Programação em breve. Assim que fecharmos o roteiro, ele aparece aqui, dia a dia.',
  },

  // ---------------------------------------------------------------------------
  // PARA ENTRAR EM PUNTA CANA
  // ---------------------------------------------------------------------------
  // Conferido em 21/10/2026; reconferido em 22/10/2026 e em 24/10/2026 (sem
  // mudanças: exceção do passaporte continua terminando em 31/12/2026).
  // RECONFERIR ANTES DE MAIO/2027 — regras de entrada mudam.
  // Fontes:
  //  • Turismo da República Dominicana (requisitos de entrada, febre amarela):
  //    https://www.godominicanrepublic.com/en/travel/entry-requirements
  //  • Direção Geral de Migração — E-Ticket: https://eticket.migracion.gob.do/
  //  • DGM — exceção de validade do passaporte (01/12/2025 a 31/12/2026):
  //    https://migracion.gob.do/  (comunicado "DGM announces extension…")
  //  • Acordo de isenção de visto Brasil–República Dominicana, Decreto 10.796/2021:
  //    https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/decreto/d10796.htm
  //  • Viagem de menores: Resolução CNJ 131/2011.
  //  • Febre amarela: o site oficial de turismo isenta menores de 10 meses; o CDC
  //    fala em "a partir de 1 ano". Mantivemos a regra do site oficial dominicano.
  viagem: {
    titulo: 'Para entrar em Punta Cana',
    intro: 'O checklist de cada viajante. Toque em cada item para marcar o que já está pronto — fica salvo só neste aparelho.',
    dataChecagem: '24/10/2026',
    aviso: 'Regras de entrada podem mudar. Vamos reconferir tudo antes da viagem e avisar a família.',

    // `id` não pode repetir e não deve mudar depois de publicado (é o que
    // guarda a marcação de cada pessoa no navegador).
    checklist: [
      {
        id: 'passaporte',
        rotulo: 'Passaporte',
        titulo: 'Válido por 6 meses na chegada',
        texto: 'Para maio de 2027, ele precisa valer até pelo menos novembro de 2027. A exceção de hoje (válido só durante a estadia) acaba em 31/12/2026. RG não é aceito. Se for renovar, comece já: a Polícia Federal pode demorar.',
      },
      {
        id: 'visto',
        rotulo: 'Visto',
        titulo: 'Não precisa para turismo',
        texto: 'Brasileiros entram sem visto, pelo acordo entre Brasil e República Dominicana (Decreto 10.796/2021).',
      },
      {
        id: 'febre-amarela',
        rotulo: 'Febre amarela',
        titulo: 'Certificado Internacional de Vacinação (CIVP)',
        texto: 'Exigido de quem chega de SP, RJ, MG ou ES. Tome a vacina pelo menos 10 dias antes e emita o CIVP pelo gov.br (app ou site). Isentos: bebês com menos de 10 meses, gestantes, quem passa menos de 12h em trânsito nesses estados e quem tem contraindicação médica (com atestado).',
      },
      {
        id: 'eticket',
        rotulo: 'E-Ticket',
        titulo: 'Formulário eletrônico de ida e de volta',
        texto: 'Gratuito, no site oficial da Migração. Um formulário cobre até 7 pessoas da mesma família. Faça antes de ir ao balcão da companhia aérea — e desconfie de sites que cobram.',
        link: { texto: 'eticket.migracion.gob.do', url: 'https://eticket.migracion.gob.do/' },
      },
      {
        id: 'volta',
        rotulo: 'Passagem',
        titulo: 'Passagem de volta comprada',
        texto: 'É obrigatória. A companhia aérea confere antes do embarque.',
      },
      {
        id: 'criancas',
        rotulo: 'Crianças',
        titulo: 'Passaporte próprio e autorização',
        texto: 'Toda criança e bebê precisa de passaporte próprio. Viajando com só um dos pais: autorização do outro com firma reconhecida (ou já anotada no passaporte). Com avós, tios ou terceiros: autorização dos dois pais (Resolução CNJ 131/2011).',
      },
      {
        id: 'conexao-eua',
        rotulo: 'Conexão',
        titulo: 'Escala nos EUA exige visto americano',
        texto: 'Mesmo sem sair do aeroporto. Se não tiver visto americano, escolha conexão fora dos EUA.',
      },
    ],

    // Cartões de informação prática (abaixo do checklist).
    infos: [
      { rotulo: 'Voo', texto: 'São Paulo (GRU) → Punta Cana (PUJ). Vamos sugerir voos e conexões em breve.' },
      { rotulo: 'Fuso', texto: '1 hora a menos que Brasília (17h lá = 18h em Brasília).' },
      { rotulo: 'Moeda', texto: 'Peso dominicano (DOP). Dólar e cartão são bem aceitos nos resorts.' },
      { rotulo: 'Clima em maio', texto: 'Quente, perto de 30 °C, com pancadas rápidas de chuva no fim da tarde.' },
      { rotulo: 'Tomada', texto: 'Padrão americano (pinos chatos), 110 V. Leve adaptador.' },
      { rotulo: 'O que levar', texto: 'Roupa leve, banho, chapéu, óculos de sol, protetor solar e repelente, remédios de uso contínuo e o traje do casamento.' },
    ],

    fontes: [
      { texto: 'Requisitos de entrada (Turismo da República Dominicana)', url: 'https://www.godominicanrepublic.com/en/travel/entry-requirements' },
      { texto: 'E-Ticket (Migração dominicana)', url: 'https://eticket.migracion.gob.do/' },
      { texto: 'Acordo de isenção de visto (Decreto 10.796/2021)', url: 'https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/decreto/d10796.htm' },
    ],
  },

  // ---------------------------------------------------------------------------
  // HOSPEDAGEM
  // ---------------------------------------------------------------------------
  // Sem preço e sem nome de hotel enquanto `local.hotelConfirmado` for false.
  hospedagem: {
    titulo: 'Hospedagem',
    texto: 'Os quartos serão reservados para vocês, num resort all-inclusive à beira-mar. Não precisam reservar nada por enquanto: enviaremos os detalhes para cada família.',
    // Só aparece quando o hotel estiver confirmado:
    textoConfirmado: 'Vamos ficar todos juntos no mesmo resort, all-inclusive, à beira-mar.',
  },

  // ---------------------------------------------------------------------------
  // PERGUNTAS FREQUENTES
  // ---------------------------------------------------------------------------
  faq: [
    {
      pergunta: 'Crianças e bebês são bem-vindos?',
      resposta: 'Muito! É um casamento de família e os pequenos fazem parte da festa. Se precisarem de berço no quarto, avisem a gente.',
    },
    {
      pergunta: 'Preciso de visto?',
      resposta: 'Não. Brasileiros entram sem visto para turismo, só com passaporte. RG não vale. Atenção apenas se a conexão for nos EUA: aí precisa de visto americano.',
    },
    {
      pergunta: 'Meu passaporte vence em 2027. Posso ir?',
      resposta: 'Só se ele ainda valer pelo menos 6 meses no dia da chegada — para maio de 2027, até pelo menos novembro de 2027. Se não, renove já.',
    },
    {
      pergunta: 'Como funciona a viagem das crianças?',
      resposta: 'Cada criança precisa do próprio passaporte. Se viajar com só um dos pais, leve a autorização do outro com firma reconhecida (ou anotada no passaporte). Com avós, tios ou outros adultos, autorização dos dois pais (Resolução CNJ 131/2011).',
    },
    {
      pergunta: 'Precisa de vacina?',
      resposta: 'Quem embarca de SP, RJ, MG ou ES precisa do certificado internacional de febre amarela (CIVP), com a vacina tomada pelo menos 10 dias antes. Bebês com menos de 10 meses e gestantes são isentos.',
    },
    {
      pergunta: 'Vale a pena fazer seguro viagem?',
      resposta: 'Sim, recomendamos para todos, inclusive crianças e o bebê, com boa cobertura médica. Atendimento particular no exterior é caro.',
    },
    {
      pergunta: 'E o sol?',
      resposta: 'O sol do Caribe é forte, principalmente para os pequenos. Levem protetor solar (de preferência resistente à água), chapéu, camiseta com proteção UV para as crianças e muita água.',
    },
    {
      pergunta: 'O que é all-inclusive?',
      resposta: 'Hospedagem com comida e bebida incluídas durante a estadia. Detalhes do que está incluído vão junto com as informações do quarto.',
    },
  ],

  // ---------------------------------------------------------------------------
  // LISTA DE PRESENTES — desligada por padrão
  // ---------------------------------------------------------------------------
  presentes: {
    ligada: false, // troque para true para mostrar a seção e o item no menu
    titulo: 'Lista de presentes',
    texto: 'A presença de vocês já é o nosso maior presente. Para quem quiser nos mimar mesmo assim:',
    links: [
      // { texto: 'Lista na loja X', url: 'https://...' },
    ] as { texto: string; url: string }[],
  },

  // ---------------------------------------------------------------------------
  // ENCERRAMENTO E RODAPÉ
  // ---------------------------------------------------------------------------
  encerramento: {
    titulo: 'Nos vemos na areia',
    texto: 'Qualquer dúvida, é só chamar a gente no WhatsApp.',
  },

  // Título que aparece no link do WhatsApp e na aba do navegador.
  seo: {
    titulo: 'Ilma & Ruy · Punta Cana 2027',
    descricao: 'Vamos casar pé na areia em Punta Cana, em maio de 2027. Data, programação e o checklist da viagem.',
    // Endereço público do site (usado no link da agenda e no Open Graph).
    url: 'https://casamento-ilma-ruy.vercel.app/',
  },
};

// Tipos usados pela programação (não precisa mexer).
export type ItemProgramacao = { horario: string; atividade: string; local?: string; observacao?: string };
export type Dia = { aba: string; titulo: string; itens: ItemProgramacao[] };
