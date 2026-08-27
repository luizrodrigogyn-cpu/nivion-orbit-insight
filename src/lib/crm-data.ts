export type Health = "saudavel" | "atencao" | "risco";

export type Opportunity = {
  id: string;
  titulo: string;
  empresa: string;
  valor: number;
  saude: Health;
  proximoPasso: string;
  data: string;
  responsavel: string;
};

export type StageKey = "qualificacao" | "proposta" | "negociacao" | "fechamento";

export const stages: { key: StageKey; nome: string; tom: string }[] = [
  { key: "qualificacao", nome: "Qualificação", tom: "bg-titanium" },
  { key: "proposta", nome: "Proposta", tom: "bg-blue" },
  { key: "negociacao", nome: "Negociação", tom: "bg-gold" },
  { key: "fechamento", nome: "Fechamento", tom: "bg-green" },
];

export const initialBoard: Record<StageKey, Opportunity[]> = {
  qualificacao: [
    {
      id: "op-1",
      titulo: "Implantação CRM comercial",
      empresa: "Atlas Log",
      valor: 32000,
      saude: "saudavel",
      proximoPasso: "Reunião de diagnóstico",
      data: "29 ago",
      responsavel: "Marina C.",
    },
    {
      id: "op-2",
      titulo: "Automação de follow-up",
      empresa: "Verdi Alimentos",
      valor: 18400,
      saude: "atencao",
      proximoPasso: "Retornar contato",
      data: "27 ago",
      responsavel: "Rafael S.",
    },
  ],
  proposta: [
    {
      id: "op-3",
      titulo: "Expansão para 3 filiais",
      empresa: "Nortek Serviços",
      valor: 76500,
      saude: "saudavel",
      proximoPasso: "Enviar escopo revisado",
      data: "28 ago",
      responsavel: "Lucas P.",
    },
    {
      id: "op-4",
      titulo: "Pacote inteligência comercial",
      empresa: "Clara Consultoria",
      valor: 41900,
      saude: "risco",
      proximoPasso: "Definir próximo passo",
      data: "19 ago",
      responsavel: "Marina C.",
    },
  ],
  negociacao: [
    {
      id: "op-5",
      titulo: "Contrato anual multiempresa",
      empresa: "Grupo Meridian",
      valor: 128000,
      saude: "saudavel",
      proximoPasso: "Ajuste de condições",
      data: "30 ago",
      responsavel: "Ana F.",
    },
  ],
  fechamento: [
    {
      id: "op-6",
      titulo: "Renovação + Orbit",
      empresa: "Studio Havre",
      valor: 54700,
      saude: "saudavel",
      proximoPasso: "Assinatura do contrato",
      data: "26 ago",
      responsavel: "Ana F.",
    },
  ],
};

export const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

export type OrbitRecommendation = {
  id: string;
  titulo: string;
  porque: string;
  acao: string;
  prioridade: "alta" | "media";
};

export const orbitRecommendations: OrbitRecommendation[] = [
  {
    id: "r1",
    titulo: "Grupo Meridian sem próximo passo há 6 dias",
    porque: "É a maior oportunidade em negociação e passou do tempo médio desta etapa.",
    acao: "Agendar call de fechamento com o decisor",
    prioridade: "alta",
  },
  {
    id: "r2",
    titulo: "Clara Consultoria em risco",
    porque: "Proposta enviada há 14 dias sem resposta e sem tarefa agendada.",
    acao: "Enviar resumo de valor e propor prazo",
    prioridade: "alta",
  },
  {
    id: "r3",
    titulo: "Verdi Alimentos esfriando",
    porque: "12 dias sem interação registrada após o primeiro contato.",
    acao: "Retomar contato por telefone hoje",
    prioridade: "media",
  },
];

export const alerts = [
  {
    id: "a1",
    tone: "danger" as const,
    titulo: "2 oportunidades em risco",
    texto: "Clara Consultoria e Verdi Alimentos sem próximo passo definido.",
    valor: "R$ 60,3 mil",
  },
  {
    id: "a2",
    tone: "gold" as const,
    titulo: "5 atividades atrasadas",
    texto: "Tarefas vencidas entre 22 e 26 de agosto.",
    valor: "3 responsáveis",
  },
];

export const agenda = [
  { hora: "09:30", titulo: "Diagnóstico — Atlas Log", quem: "Marina C." },
  { hora: "11:00", titulo: "Revisão de escopo — Nortek", quem: "Lucas P." },
  { hora: "14:30", titulo: "Fechamento — Grupo Meridian", quem: "Ana F." },
  { hora: "16:45", titulo: "Follow-up — Studio Havre", quem: "Ana F." },
];

export const clientes = [
  { id: "c1", nome: "Grupo Meridian", segmento: "Indústria", responsavel: "Ana F.", status: "Ativo", receita: 128000, ultima: "26 ago" },
  { id: "c2", nome: "Nortek Serviços", segmento: "Serviços", responsavel: "Lucas P.", status: "Ativo", receita: 76500, ultima: "25 ago" },
  { id: "c3", nome: "Studio Havre", segmento: "Criativo", responsavel: "Ana F.", status: "Renovação", receita: 54700, ultima: "24 ago" },
  { id: "c4", nome: "Clara Consultoria", segmento: "Consultoria", responsavel: "Marina C.", status: "Em risco", receita: 41900, ultima: "12 ago" },
  { id: "c5", nome: "Atlas Log", segmento: "Logística", responsavel: "Marina C.", status: "Prospect", receita: 32000, ultima: "27 ago" },
  { id: "c6", nome: "Verdi Alimentos", segmento: "Alimentos", responsavel: "Rafael S.", status: "Em risco", receita: 18400, ultima: "15 ago" },
];

export const usuarios = [
  { id: "u1", nome: "Ana Ferraz", email: "ana@niviontech.com", papel: "Administradora", equipe: "Comercial", status: "Ativo" },
  { id: "u2", nome: "Marina Cordeiro", email: "marina@niviontech.com", papel: "Vendas", equipe: "Comercial", status: "Ativo" },
  { id: "u3", nome: "Lucas Prado", email: "lucas@niviontech.com", papel: "Vendas", equipe: "Expansão", status: "Ativo" },
  { id: "u4", nome: "Rafael Souza", email: "rafael@niviontech.com", papel: "Pré-vendas", equipe: "Comercial", status: "Convite pendente" },
];
