import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  DataTable,
  Disclosure,
  FilterBar,
  MetricCard,
  Module,
  PageHeader,
  StatusBadge,
  type Column,
} from "@/components/crm/primitives";
import { brl } from "@/lib/crm-data";

const title = "Relatórios comerciais — NivionTech CRM";
const description = "Desempenho por responsável, conversão por etapa e histórico de fechamentos com densidade controlada.";

export const Route = createFileRoute("/app/relatorios")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: RelatoriosPage,
});

type Linha = {
  id: string;
  responsavel: string;
  equipe: string;
  abertos: number;
  ganhos: number;
  perdidos: number;
  receita: number;
  conversao: number;
};

const linhas: Linha[] = [
  { id: "l1", responsavel: "Ana Ferraz", equipe: "Comercial", abertos: 4, ganhos: 3, perdidos: 0, receita: 182700, conversao: 42 },
  { id: "l2", responsavel: "Lucas Prado", equipe: "Expansão", abertos: 3, ganhos: 1, perdidos: 1, receita: 76500, conversao: 31 },
  { id: "l3", responsavel: "Marina Cordeiro", equipe: "Comercial", abertos: 5, ganhos: 2, perdidos: 1, receita: 73900, conversao: 28 },
  { id: "l4", responsavel: "Rafael Souza", equipe: "Comercial", abertos: 2, ganhos: 0, perdidos: 1, receita: 18400, conversao: 12 },
];

const columns: Column<Linha>[] = [
  {
    key: "responsavel",
    header: "Responsável",
    render: (r) => (
      <div className="min-w-0">
        <p className="truncate font-semibold text-navy">{r.responsavel}</p>
        <p className="truncate text-label text-muted-foreground md:hidden">{r.equipe}</p>
      </div>
    ),
  },
  { key: "equipe", header: "Equipe", secondary: true, render: (r) => r.equipe },
  { key: "abertos", header: "Abertos", align: "right", secondary: true, render: (r) => r.abertos },
  { key: "ganhos", header: "Ganhos", align: "right", render: (r) => r.ganhos },
  { key: "perdidos", header: "Perdidos", align: "right", secondary: true, render: (r) => r.perdidos },
  {
    key: "receita",
    header: "Receita",
    align: "right",
    render: (r) => <span className="font-semibold text-navy">{brl(r.receita)}</span>,
  },
  {
    key: "conversao",
    header: "Conversão",
    align: "right",
    render: (r) => (
      <StatusBadge tone={r.conversao >= 35 ? "green" : r.conversao >= 25 ? "gold" : "danger"}>
        {r.conversao}%
      </StatusBadge>
    ),
  },
];

function RelatoriosPage() {
  const [query, setQuery] = useState("");
  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return linhas;
    return linhas.filter((l) => `${l.responsavel} ${l.equipe}`.toLowerCase().includes(q));
  }, [query]);

  const etapas = [
    { nome: "Qualificação → Proposta", pct: 62 },
    { nome: "Proposta → Negociação", pct: 48 },
    { nome: "Negociação → Fechamento", pct: 71 },
  ];

  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Inteligência"
        title="Relatórios comerciais"
        description="O essencial primeiro; o detalhamento técnico fica em áreas expansíveis."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Receita fechada" value={brl(351500)} delta="+22,1%" footnote="vs. trimestre anterior" />
        <MetricCard label="Ticket médio" value={brl(58583)} delta="+6,4%" footnote="6 contratos" />
        <MetricCard label="Ciclo médio" value="21 dias" delta="-3 dias" footnote="qualificação a fechamento" />
        <MetricCard label="Taxa de perda" value="14%" delta="+2 p.p." deltaTone="danger" footnote="atenção a preço" />
      </div>

      <Module title="Conversão por etapa" hint="Onde as oportunidades param">
        <ul className="grid gap-3">
          {etapas.map((e) => (
            <li key={e.nome}>
              <div className="flex items-center justify-between gap-3">
                <span className="min-w-0 truncate text-support text-navy">{e.nome}</span>
                <span className="shrink-0 font-display text-support font-semibold text-navy">{e.pct}%</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
                <span className="block h-full rounded-full bg-blue" style={{ width: `${e.pct}%` }} />
              </div>
            </li>
          ))}
        </ul>
      </Module>

      <FilterBar query={query} onQuery={setQuery} placeholder="Buscar responsável ou equipe" />

      <DataTable caption="Desempenho por responsável" columns={columns} rows={rows} />

      <Disclosure title="Metodologia e detalhes técnicos">
        <p>
          A previsão ponderada aplica a probabilidade média histórica de cada etapa ao valor em aberto. O ciclo médio
          considera apenas oportunidades ganhas nos últimos 90 dias. Dados deste ambiente são demonstrativos.
        </p>
      </Disclosure>
    </div>
  );
}
