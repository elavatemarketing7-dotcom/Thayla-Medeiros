export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    label: string;
    value: string;
  }[];
}

export const EXPERT_INFO = {
  name: "Dra. Thayla Medeiros",
  title: "Dra. Thayla Medeiros",
  profession: "Harmonização Facial",
  location: "Bairro Camargos, Belo Horizonte - BH",
  whatsappUrl: "https://api.whatsapp.com/message/K6BNEPZEDRWAC1?autoload=1&app_absent=0&utm_source=ig",
  instagramUrl: "https://www.instagram.com/dra.thaylamedeiros/reels/",
};

export const EXPERT_IMAGES = {
  hero: "https://i.imgur.com/ni4gwch.png",
  secondary: "https://i.imgur.com/ZEfECpF.png",
  tertiary: "https://i.imgur.com/qYoYWkU.png",
};

// Video representation on imgur
export const VIDEO_DATA = {
  embedUrl: "https://imgur.com/vzOaOih",
  mp4Url: "https://i.imgur.com/vzOaOih.mp4",
  poster: "https://i.imgur.com/ZEfECpF.png",
  quote: "descubra como a beleza pode ser realçada com técnica, sensibilidade e propósito. resultado naturais e transformadores. Aperte o play e sinta a diferença de ser cuidada por quem entende que sua beleza é única, e merece atenção especial."
};

// Galeria de antes e depois
export const BEFORE_AFTER_GALLERY = [
  "https://i.imgur.com/dYqKfwE.png",
  "https://i.imgur.com/oxqczST.png",
  "https://i.imgur.com/2y4KjGO.png",
  "https://i.imgur.com/LmfIxOC.png",
  "https://i.imgur.com/eaZ2hcQ.png",
  // Espaço reservado para o cliente adicionar mais depois
];

// Harmonização de coração (provas de 💚)
export const CORACAO_GALLERY = [
  "https://i.imgur.com/dUf21jg.png",
  "https://i.imgur.com/V6qz9ZZ.png",
  "https://i.imgur.com/ZA0ibHo.png",
  "https://i.imgur.com/ChZLsW1.png",
];

// Área de comentários de pacientes
export const COMMENTS_GALLERY = [
  "https://i.imgur.com/Ub0gUPS.png",
  "https://i.imgur.com/eM2j3Os.png",
  "https://i.imgur.com/oPGOxW5.png",
  "https://i.imgur.com/oPGOxW5.png",
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Qual é o seu principal objetivo hoje com a Harmonização Facial?",
    options: [
      { label: "Realçar minha beleza de forma sutil e natural", value: "Realçar beleza com sutileza" },
      { label: "Suavizar linhas de expressão e rejuvenescer", value: "Rejuvenescimento e suavização" },
      { label: "Corrigir assimetrias (lábios, queixo, olheiras)", value: "Correção de assimetrias" },
      { label: "Definir contornos e realçar traços marcantes", value: "Definição de contornos" }
    ]
  },
  {
    id: 2,
    question: "O que mais te preocupa ao pensar em procedimentos estéticos?",
    options: [
      { label: "Ficar artificial ou perder minha identidade", value: "Medo de artificialidade" },
      { label: "Sentir dor ou desconforto na aplicação", value: "Sensibilidade à dor" },
      { label: "A segurança e qualidade dos materiais", value: "Segurança de materiais" },
      { label: "Falta de suporte após o procedimento", value: "Suporte pós-procedimento" }
    ]
  },
  {
    id: 3,
    question: "Qual é a sua área de atuação ou profissão?",
    options: [
      { label: "Empresária, Executiva ou Profissional Liberal", value: "Empresária/Executiva" },
      { label: "Comércio, Atendimento ou Autônoma", value: "Comercial/Autônoma" },
      { label: "Saúde, Educação ou Serviço Público", value: "Saúde/Educação" },
      { label: "Outro / Foco no cuidado pessoal diário", value: "Cuidado Pessoal" }
    ]
  },
  {
    id: 4,
    question: "Você já realizou algum procedimento injetável antes?",
    options: [
      { label: "Sim, e quero manter ou melhorar os resultados", value: "Já realizou procedimentos" },
      { label: "Não, seria a minha primeira experiência", value: "Iniciante em estética" },
      { label: "Apenas procedimentos básicos de pele (limpeza, peelings)", value: "Apenas estética básica" }
    ]
  },
  {
    id: 5,
    question: "Você reside em Belo Horizonte (BH) ou região próxima?",
    options: [
      { label: "Sim, moro em BH (próximo ao Bairro Camargos ou região)", value: "Mora em BH / Camargos" },
      { label: "Moro em outra cidade de MG e viajo para me cuidar", value: "Cidade vizinha de MG" },
      { label: "Outro estado / Buscando agendar em viagem", value: "Outra localidade" }
    ]
  }
];

export const TRUST_CARDS = [
  {
    title: "Avaliação Sincera",
    description: "Indico apenas o que você realmente precisa para se sentir harmônica, sem exageros ou empurrar tratamentos desnecessários."
  },
  {
    title: "Atendimento Exclusivo",
    description: "Todas as etapas da sua jornada, desde o planejamento detalhado até a aplicação final, são realizadas diretamente por mim."
  },
  {
    title: "Clareza Absoluta",
    description: "Você entende exatamente o que está sendo aplicado, as marcas utilizadas e o objetivo de cada etapa do seu tratamento."
  },
  {
    title: "Ambiente Reservado",
    description: "Atendimento focado em privacidade e conforto no Bairro Camargos-BH, com horário reservado só para você."
  }
];

export const STEP_BY_STEP = [
  {
    step: "01",
    title: "Contato e Alinhamento",
    description: "Clicando no WhatsApp, você nos conta seus desejos e agendamos um horário personalizado."
  },
  {
    step: "02",
    title: "Análise Facial 3D",
    description: "Avaliamos suas proporções, simetria e mímica facial para traçar um mapa de beleza exclusivo."
  },
  {
    step: "03",
    title: "Aplicação Segura",
    description: "Utilizamos as melhores técnicas e anestésicos modernos para garantir um procedimento confortável e natural."
  }
];
