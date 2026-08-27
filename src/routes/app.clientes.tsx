import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import {
  DataTable,
  FilterBar,
  GhostButton,
  PageHeader,
  PrimaryButton,
  StatusBadge,
  type Column,
} from "@/components/crm/primitives";
import { brl, clientes } from "@/lib/crm-data";

const title = "Clientes e contas — NivionTech CRM";
const description = "Base de clientes com responsável, status de relacionamento, receita e última interação registrada.";

export const Route = createFileRoute("/app/clientes")({
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
  component: ClientesPage,
});

type Cliente = (typeof clientes)[number];

const statusTone = (status: string) =>
  status === "Em risco" ? "danger" : status === "Renovação" ? "gold" : status === "Prospect" ? "blue" : "green";

const columns: Column<Cliente>[] = [
  {
    key: "nome",
    header: "Cliente",
    render: (row) => (
      <div className="min-w-0">
        <p className="truncate font-semibold text-navy">{row.nome}</p>
        <p className="truncate text-label text-muted-foreground md:hidden">{row.segmento}</p>
      </div>
    ),
  },
  { key: "segmento", header: "Segmento", secondary: true, render: (row) => row.segmento },
  { key: "responsavel", header: "Responsável", secondary: true, render: (row) => row.responsavel },
  {
    key: "status",
    header: "Status",
    render: (row) => <StatusBadge tone={statusTone(row.status)}>{row.status}</StatusBadge>,
  },
  {
    key: "receita",
    header: "Receita",
    align: "right",
    render: (row) => <span className="font-semibold text-navy">{brl(row.receita)}</span>,
  },
  { key: "ultima", header: "Última interação", align: "right", secondary: true, render: (row) => row.ultima },
];

function ClientesPage() {
  const [query, setQuery] = useState("");
  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return clientes;
    return clientes.filter((c) =>
      [c.nome, c.segmento, c.responsavel, c.status].join(" ").toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Relacionamento"
        title="Clientes e contas"
        description="Quem está ativo, quem precisa de atenção e quanto cada conta representa."
        actions={
          <>
            <GhostButton>Importar</GhostButton>
            <PrimaryButton>
              <Plus className="size-4" aria-hidden="true" />
              Novo cliente
            </PrimaryButton>
          </>
        }
      />

      <FilterBar
        query={query}
        onQuery={setQuery}
        placeholder="Buscar cliente, segmento ou responsável"
        filters={[
          { label: "Todos", value: "todos" },
          { label: "Em risco", value: "risco" },
          { label: "Renovação", value: "renovação" },
        ]}
      />

      <DataTable caption="Lista de clientes" columns={columns} rows={rows} />
    </div>
  );
}
