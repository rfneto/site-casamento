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
    // CONFIRMADA em 24/10/2026: terça, 11/05/2027, às 17h.
    cerimonia: '2027-05-11T17:00:00-04:00',

    // Duração do evento na agenda (cerimônia 17h → fim do jantar 22h), em horas.
    duracaoHoras: 5,

    // Enquanto for false, o site mostra só o texto abaixo (mês e ano) e o
    // evento da agenda sai marcado como "data a confirmar".
    confirmada: true,

    // Texto exibido enquanto a data não estiver confirmada.
    textoProvisorio: 'maio de 2027',

    // Texto exibido quando `confirmada: true`. Aparece grande logo abaixo dos
    // nomes, seguido de " · " e do horário da cerimônia (evento.cerimonia.horario).
    textoConfirmado: 'Terça-feira, 11 de maio de 2027',
  },

  // ---------------------------------------------------------------------------
  // LOCAL
  // ---------------------------------------------------------------------------
  local: {
    cidade: 'Punta Cana',
    pais: 'República Dominicana',

    // Com false, o nome do hotel NÃO aparece em lugar nenhum do site e a
    // seção "O resort" mostra só o texto genérico de hospedagem.
    // CONFIRMADO em 24/10/2026.
    hotelConfirmado: true,

    // Dados públicos do resort. Fonte: site oficial da Hyatt (links abaixo),
    // informações passadas pelo Ruy em 24/10/2026. NÃO colocar aqui preço,
    // contrato, contatos do hotel nem distribuição de quartos.
    hotel: {
      nome: 'Dreams Flora Resort & Spa',
      colecao: 'Hyatt Inclusive Collection',
      regime: 'All-inclusive',
      regiao: 'Bávaro',
      endereco: 'Praia de Cabeza de Toro, Bávaro, Punta Cana, República Dominicana',
      // Código Plus oficial do Google Maps (abre o ponto exato no mapa).
      plusCode: 'MG2M+VF Punta Cana',
      site: 'https://hyattinclusivecollection.com/pt/resorts-hotels/dreams/dominican-republic/flora-resort-spa',
      siteIngles: 'https://www.hyatt.com/dreams/en-US/drfpc-dreams-flora-resort-and-spa',
      // Horários do site da Hyatt; alguns sites dizem check-out às 12h.
      checkin: 'A partir das 15h',
      checkout: 'Até as 11h; confirme na recepção',
      criancas: [
        'Kids club para crianças de 3 a 12 anos',
        'Clube teens para adolescentes de 13 a 17 anos',
      ],
    },
  },

  // ---------------------------------------------------------------------------
  // ABERTURA (topo do site)
  // ---------------------------------------------------------------------------
  // A abertura reproduz a canga: nomes, listras, coqueiro, espreguiçadeiras e a
  // estrela-do-mar. Logo abaixo dos nomes, em destaque:
  //   linha 1: data (data.textoConfirmado) · horário (evento.cerimonia.horario)
  //   linha 2: nome do hotel (se confirmado) · cidade, país
  // Depois vêm a contagem regressiva e os botões.

  // ---------------------------------------------------------------------------
  // FOTOS
  // ---------------------------------------------------------------------------
  // Os arquivos ficam em public/fotos/. Enquanto um arquivo não existir, o site
  // mostra as listras de aquarela da canga no lugar. Para colocar a foto,
  // salve a imagem com o nome indicado (ex.: public/fotos/resort.jpg).
  // `alt` = descrição da foto para quem usa leitor de tela. Atualize junto.
  // (As fotos de "Nossa história" ficam nos capítulos, mais abaixo.)
  fotos: {
    resort: { arquivo: 'fotos/resort.jpg', alt: 'Praia do Dreams Flora Resort & Spa' },
  },

  // ---------------------------------------------------------------------------
  // NOSSA HISTÓRIA
  // ---------------------------------------------------------------------------
  // Cada capítulo vira um cartão clicável (foto + legenda curta). Ao clicar,
  // abre a foto grande com o título, a data (opcional) e o texto do capítulo.
  // Fotos em public/fotos/historia/ — troque os arquivos de exemplo pelas
  // fotos de vocês (mesmo nome) ou mude o caminho aqui. Vertical 4:5 fica melhor.
  // `alt` descreve a foto para quem usa leitor de tela.
  historia: {
    titulo: 'Nossa história',
    intro: 'Alguns capítulos até aqui. Toque em cada foto para ler.',
    capitulos: [
      {
        foto: 'fotos/historia/capitulo-1.jpg',
        alt: '[Descrever a foto]',
        legenda: '[Como nos conhecemos]',
        titulo: '[Como nos conhecemos]',
        data: '[ano]', // opcional: deixe '' para não mostrar
        texto: '[texto a escrever]',
      },
      {
        foto: 'fotos/historia/capitulo-2.jpg',
        alt: '[Descrever a foto]',
        legenda: '[Primeira viagem]',
        titulo: '[Primeira viagem]',
        data: '[ano]',
        texto: '[texto a escrever]',
      },
      {
        foto: 'fotos/historia/capitulo-3.jpg',
        alt: '[Descrever a foto]',
        legenda: '[A família]',
        titulo: '[A família]',
        data: '',
        texto: '[texto a escrever]',
      },
      {
        foto: 'fotos/historia/capitulo-4.jpg',
        alt: '[Descrever a foto]',
        legenda: '[O pedido]',
        titulo: '[O pedido]',
        data: '[ano]',
        texto: '[texto a escrever]',
      },
    ] as Capitulo[],
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
      texto: 'Coquetel na praia das 18h às 19h e jantar no Mix-Upper Deck das 19h às 22h.',
    },
    dressCode: {
      titulo: 'Traje de praia elegante',
      texto: 'Detalhes em breve.',
    },
  },

  // ---------------------------------------------------------------------------
  // PROGRAMAÇÃO (itinerário dia a dia)
  // ---------------------------------------------------------------------------
  // Cada dia vira uma aba; cada item, uma linha. Campos do item:
  //   horario, atividade, local (opcional), observacao (opcional),
  //   aConfirmar: true  → mostra a etiqueta "a confirmar",
  //   oculto: true      → NÃO aparece no site (deixe false para ligar).
  // Se a lista `dias` ficar vazia, o site mostra "Programação em breve".
  // Horários de check-in/out: site da Hyatt (ver `local.hotel`), 24/10/2026.
  programacao: {
    dias: [
      {
        aba: 'Seg 10/05',
        titulo: 'Chegada',
        aviso: 'Todos precisam estar em Punta Cana até este dia.',
        itens: [
          { horario: 'A partir das 15h', atividade: 'Check-in no resort', local: 'Dreams Flora Resort & Spa' },
          // Jantar de boas-vindas: data e hora a confirmar. Troque `oculto` para
          // false quando quiserem mostrar (e ajuste dia/horário/local).
          { horario: 'A confirmar', atividade: 'Jantar de boas-vindas', local: 'A confirmar', aConfirmar: true, oculto: true },
        ],
      },
      {
        aba: 'Ter 11/05',
        titulo: 'O grande dia',
        itens: [
          { horario: '17h', atividade: 'Cerimônia na praia', local: 'Praia do resort', observacao: 'Pé na areia' },
          { horario: '18h–19h', atividade: 'Coquetel', local: 'Na praia' },
          { horario: '19h–22h', atividade: 'Jantar', local: 'Mix-Upper Deck' },
        ],
      },
      {
        aba: 'Qui 13/05',
        titulo: 'Despedida',
        itens: [
          { horario: 'Até as 11h', atividade: 'Check-out', observacao: 'Confirme o horário na recepção' },
        ],
      },
    ] as Dia[],
    textoVazio: 'Programação em breve. Assim que fecharmos o roteiro, ele aparece aqui, dia a dia.',
    nota: 'Horários no fuso de Punta Cana.',
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
        texto: 'Exigido de quem chega do Brasil saindo de SP, RJ, MG ou ES (Vitória está nessa lista). Tome a vacina pelo menos 10 dias antes e emita o CIVP pelo gov.br (app ou site). Isentos: bebês com menos de 10 meses, gestantes, quem passa menos de 12h em trânsito nesses estados e quem tem contraindicação médica (com atestado).',
      },
      {
        id: 'eticket',
        rotulo: 'E-Ticket',
        titulo: 'Formulário eletrônico de ida e de volta',
        texto: 'Gratuito, no site oficial da Migração dominicana. Um formulário cobre até 7 pessoas da mesma família. Faça um na ida e outro na volta, antes de ir ao balcão da companhia aérea — e desconfie de sites que cobram.',
        // Link que abre direto em português (testado pelo Ruy em 24/10/2026).
        link: { texto: 'Preencher o E-Ticket (em português)', url: 'https://eticket.migracion.gob.do/?culture=pt-PT&ui-culture=pt-PT' },
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
      { rotulo: 'Moeda', texto: 'Peso dominicano (DOP). Dólar e cartão são bem aceitos nos resorts.' },
      { rotulo: 'Clima em maio', texto: 'Quente, perto de 30 °C, com pancadas rápidas de chuva no fim da tarde.' },
      { rotulo: 'Tomada', texto: 'Padrão americano (pinos chatos), 110 V. Leve adaptador.' },
      { rotulo: 'O que levar', texto: 'Roupa leve, banho, chapéu, óculos de sol, protetor solar e repelente, remédios de uso contínuo e o traje do casamento.' },
    ],

    fontes: [
      { texto: 'Requisitos de entrada (Turismo da República Dominicana)', url: 'https://www.godominicanrepublic.com/en/travel/entry-requirements' },
      { texto: 'E-Ticket (Migração dominicana, em português)', url: 'https://eticket.migracion.gob.do/?culture=pt-PT&ui-culture=pt-PT' },
      { texto: 'Acordo de isenção de visto (Decreto 10.796/2021)', url: 'https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/decreto/d10796.htm' },
    ],

    // Fusos horários. Os horários do exemplo são CALCULADOS a partir de
    // `data.cerimonia` com os fusos abaixo (banco de fusos oficial IANA):
    //  • Punta Cana: UTC−4 o ano todo, sem horário de verão.
    //  • Brasília: UTC−3 (sem horário de verão desde 2019) → Punta Cana tem 1h a menos.
    //  • Itália em maio: horário de verão, UTC+2 → Punta Cana tem 6h a menos.
    // Conferido em 24/10/2026.
    fusos: {
      titulo: 'Fuso horário',
      texto: 'Todos os horários do site estão no fuso de Punta Cana, inclusive a contagem regressiva.',
      lugares: [
        { nome: 'Punta Cana', zona: 'America/Santo_Domingo', descricao: 'UTC−4 o ano todo (sem horário de verão)' },
        { nome: 'Brasília', zona: 'America/Sao_Paulo', descricao: 'UTC−3 · Punta Cana tem 1h a menos' },
        { nome: 'Itália', zona: 'Europe/Rome', descricao: 'Em maio, horário de verão (UTC+2) · Punta Cana tem 6h a menos' },
      ],
    },

    // Gorjetas. Fontes (conferidas em 24/10/2026):
    //  • DR Listings, "Tipping etiquette in the Dominican Republic" (fev/2026):
    //    https://www.drlistings.com/blog/tipping-etiquette-dominican-republic/
    //  • Frommer's, "Tipping in the Dominican Republic" (dez/2025):
    //    https://www.frommers.com/tips/money-and-currency/tipping-in-the-dominican-republic/
    gorjetas: {
      titulo: 'Gorjetas',
      texto: 'Na República Dominicana gorjeta é costume, inclusive no all-inclusive, onde é opcional e muito bem-vinda. Leve notas pequenas de dólar (US$ 1 e 5) ou pesos. Restaurantes fora do hotel costumam já cobrar 10% de serviço na conta.',
      tabelaTitulo: 'Quanto dar',
      tabela: [
        { quem: 'Camareira', quanto: 'US$ 2 a 4 por dia', obs: 'Deixar no quarto, de preferência todo dia' },
        { quem: 'Bartender', quanto: 'US$ 1 a 2 por bebida', obs: 'Ou US$ 5 a 10 no começo da estadia' },
        { quem: 'Garçom no jantar à la carte', quanto: 'Cerca de US$ 5 por refeição', obs: '' },
        { quem: 'Garçom no café da manhã ou almoço', quanto: 'Cerca de US$ 2', obs: '' },
        { quem: 'Carregador de malas', quanto: 'US$ 1 a 2 por mala', obs: '' },
        { quem: 'Motorista do transfer', quanto: 'RD$ 200 a 500', obs: 'Cerca de US$ 3 a 8' },
        { quem: 'Guia de passeio', quanto: '10% a 15% do valor do passeio', obs: '' },
        { quem: 'Spa', quanto: '15% a 20% do serviço', obs: '' },
      ],
    },
  },

  // ---------------------------------------------------------------------------
  // COMO CHEGAR (voos)
  // ---------------------------------------------------------------------------
  // Pesquisa do Ruy em 24/10/2026, ida e volta por pessoa, tarifa básica sem
  // mala despachada. Horários sempre no fuso local de cada aeroporto. Sem
  // links de compra de terceiros: cada um confirma no site da companhia.
  comoChegar: {
    titulo: 'Como chegar',
    prazo: 'Todos precisam estar em Punta Cana (aeroporto PUJ) até segunda, 10/05/2027.',
    aviso: 'Pesquisa de 24/10/2026, ida e volta por pessoa, tarifa básica sem mala despachada. Preços e horários mudam; confirme no site da companhia.',
    cidades: [
      {
        cidade: 'São Paulo',
        aeroporto: 'GRU',
        opcoes: [
          {
            companhia: 'Arajet',
            rota: 'Voo direto Guarulhos → Punta Cana',
            duracao: 'cerca de 7h',
            horarios: [
              'Ida: dom 09/05, 04h10 → 10h15',
              'ou seg 10/05, 05h25 → 11h30 (horário de Punta Cana)',
              'Volta: qui 13/05, 19h00 → sex 14/05, 03h10 em Guarulhos',
            ],
            preco: 'A partir de cerca de R$ 2.050',
          },
          {
            companhia: 'Avianca',
            rota: 'Via Bogotá',
            duracao: 'cerca de 10h',
            horarios: ['Ida: 07h35 → 16h45, sáb 08, dom 09 ou seg 10/05'],
            preco: 'Cerca de R$ 2.600',
          },
        ],
        avisos: [] as string[],
      },
      {
        cidade: 'Vitória',
        aeroporto: 'VIX',
        opcoes: [
          {
            companhia: 'Doméstico + Arajet',
            rota: 'Vitória → Guarulhos → Punta Cana (não há voo direto)',
            duracao: 'noite em Guarulhos + cerca de 7h',
            horarios: [
              'Ida: voo doméstico até Guarulhos na noite de sáb 08/05 e Arajet direto dom 09/05, 04h10',
              'Volta: Arajet até Guarulhos (chega sex 14/05, 03h10) e voo para Vitória de manhã',
            ],
            preco: 'Cerca de R$ 2.800 a 3.300 no total',
          },
        ],
        avisos: [
          'Evite combinações que chegam em Campinas e saem de Guarulhos (troca de aeroporto de madrugada).',
          'Evite voos que só chegam no dia 11, o dia do casamento.',
        ],
      },
      {
        cidade: 'Milão',
        aeroporto: 'MXP',
        opcoes: [
          {
            companhia: 'Air Europa',
            rota: 'Via Madri',
            duracao: 'cerca de 14h35, com a conexão',
            horarios: [
              'Ida: seg 10/05, Milão 10h50 → Madri 13h15 → Punta Cana 19h25',
              'Volta: sex 14/05, 21h20 → Madri 11h25 de sábado → Milão',
            ],
            preco: 'Cerca de € 1.160 a 1.220',
          },
          {
            companhia: 'Iberia + Iberojet',
            rota: 'Via Madri',
            duracao: 'cerca de 14h20, com a conexão',
            horarios: ['Ida: seg 10/05, 10h25 → 18h45'],
            preco: 'Cerca de € 1.160 a 1.220',
          },
        ],
        avisos: [
          'Chegar no próprio dia 10 à noite deixa pouca folga; se der, chegue em 09/05.',
          'Prefira um bilhete único com a conexão em Madri, em vez de bilhetes separados.',
          'Com passaporte europeu também se entra sem visto e se faz o E-Ticket. A vacina de febre amarela só é exigida de quem chega do Brasil (SP, RJ, MG ou ES).',
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // O RESORT (hospedagem)
  // ---------------------------------------------------------------------------
  // Os dados do resort ficam em `local.hotel`. Sem preço, contrato, contatos
  // nem distribuição de quartos.
  hospedagem: {
    titulo: 'O resort',
    tituloGenerico: 'Hospedagem', // usado enquanto o hotel não estiver confirmado
    texto: 'Os quartos serão reservados para vocês, num resort all-inclusive à beira-mar. Não precisam reservar nada por enquanto: enviaremos os detalhes para cada família.',
    // Só aparece quando o hotel estiver confirmado:
    textoConfirmado: 'Vamos ficar todos juntos no mesmo resort, all-inclusive, à beira-mar. Os quartos serão reservados para vocês; enviaremos os detalhes para cada família.',
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
  // MURAL "HISTÓRIAS COM A GENTE" (Supabase)
  // ---------------------------------------------------------------------------
  // Convidados deixam uma história; ela só aparece depois que vocês marcarem
  // "aprovada" no Supabase (veja o README). Se as variáveis PUBLIC_SUPABASE_URL
  // e PUBLIC_SUPABASE_ANON_KEY não estiverem na Vercel, o mural mostra
  // `textoEmBreve` e o formulário fica escondido.
  mural: {
    titulo: 'Histórias com a gente',
    intro: 'Tem uma lembrança, uma foto ou uma história com a Ilma e o Ruy? Deixe aqui. Ela aparece no mural depois que a gente ler.',
    textoEmBreve: 'Em breve vocês vão poder deixar aqui uma história com a gente.',
    textoVazio: 'Ainda não há histórias no mural. Seja o primeiro!',
    sucesso: 'Recebemos! Sua história aparece aqui assim que a gente ler.',
    erro: 'Não conseguimos enviar agora. Tente de novo em alguns minutos.',
    limiteTexto: 1000, // caracteres (o banco também limita em 1000)
    limiteFotoMB: 5,
    larguraMaxFoto: 1600, // px: a foto é reduzida no navegador antes de enviar
  },

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
    descricao: 'Terça-feira, 11 de maio de 2027, às 17h, no Dreams Flora Resort & Spa, em Punta Cana. Programação, voos e o checklist da viagem.',
    // Endereço público do site (usado no link da agenda e no Open Graph).
    url: 'https://casamento-ilma-ruy.vercel.app/',
  },
};

// Tipos usados pelo site (não precisa mexer).
export type ItemProgramacao = {
  horario: string; atividade: string; local?: string; observacao?: string;
  aConfirmar?: boolean; oculto?: boolean;
};
export type Dia = { aba: string; titulo: string; aviso?: string; itens: ItemProgramacao[] };
export type Capitulo = { foto: string; alt: string; legenda: string; titulo: string; data?: string; texto: string };
