import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Lock, ShieldCheck, UserPlus } from "lucide-react";
import {
  DataTable,
  Disclosure,
  FilterBar,
  Module,
  PageHeader,
  PrimaryButton,
  StatusBadge,
  type Column,
} from "@/components/crm/primitives";
import { usuarios } from "@/lib/crm-data";

const title = "Administração da empresa — NivionTech CRM";
const description = "Usuários, papéis, permissões e integrações do ambiente, com detalhes técnicos em áreas expansíveis.";

export const Route = createFileRoute("/app/administracao")({
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
  component: AdminPage,
});

type Usuario = (typeof usuarios)[number];

const columns: Column<Usuario>[] = [
  {
    key: "nome",
    header: "Usuário",
    render: (u) => (
      <div className="min-w-0">
        <p className="truncate font-semibold text-navy">{u.nome}</p>
        <p className="truncate text-label text-muted-foreground">{u.email}</p>
      </div>
    ),
  },
  { key: "papel", header: "Papel", render: (u) => u.papel },
  { key: "equipe", header: "Equipe", secondary: true, render: (u) => u.equipe },
  {
    key: "status",
    header: "Status",
    align: "right",
    render: (u) => (
      <StatusBadge tone={u.status === "Ativo" ? "green" : "gold"}>{u.status}</StatusBadge>
    ),
  },
];

function AdminPage() {
  const [query, setQuery] = useState("");
  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return usuarios;
    return usuarios.filter((u) => `${u.nome} ${u.email} ${u.papel} ${u.equipe}`.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Administração"
        title="Empresa e acessos"
        description="Gestão de usuários, permissões e integrações do ambiente NivionTech."
        actions={
          <PrimaryButton>
            <UserPlus className="size-4" aria-hidden="true" />
            Convidar usuário
          </PrimaryButton>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
        <Module title="Usuários" hint={`${usuarios.length} contas no ambiente`}>
          <div className="grid gap-4">
            <FilterBar query={query} onQuery={setQuery} placeholder="Buscar usuário, papel ou equipe" />
            <DataTable caption="Usuários do ambiente" columns={columns} rows={rows} />
          </div>
        </Module>

        <div className="grid gap-4">
          <Module title="Segurança do ambiente" tone="glass">
            <ul className="grid gap-2.5">
              {[
                { icon: ShieldCheck, texto: "Dados isolados por empresa" },
                { icon: Lock, texto: "Acesso por papel e permissão" },
                { icon: ShieldCheck, texto: "Registro de auditoria de alterações" },
              ].map((i) => (
                <li key={i.texto} className="flex items-start gap-2.5 rounded-xl surface-1 px-4 py-3">
                  <i.icon className="mt-0.5 size-4 shrink-0 text-green" aria-hidden="true" />
                  <span className="text-support text-foreground">{i.texto}</span>
                </li>
              ))}
            </ul>
          </Module>

          <Module title="Integrações">
            <div className="grid gap-2.5">
              {[
                { nome: "E-mail corporativo", status: "Conectado", tone: "green" as const },
                { nome: "Agenda", status: "Conectado", tone: "green" as const },
                { nome: "WhatsApp Business", status: "Indisponível", tone: "neutral" as const },
              ].map((i) => (
                <div key={i.nome} className="flex items-center justify-between gap-3 rounded-xl surface-1 px-4 py-3">
                  <span className="min-w-0 truncate text-support text-navy">{i.nome}</span>
                  <StatusBadge tone={i.tone}>{i.status}</StatusBadge>
                </div>
              ))}
            </div>
          </Module>

          <Disclosure title="Histórico e auditoria">
            <ul className="grid gap-2">
              <li>26 ago · Ana Ferraz alterou o valor de Grupo Meridian</li>
              <li>25 ago · Lucas Prado moveu Nortek para Proposta</li>
              <li>24 ago · Convite enviado para Rafael Souza</li>
            </ul>
          </Disclosure>
        </div>
      </div>
    </div>
  );
}
