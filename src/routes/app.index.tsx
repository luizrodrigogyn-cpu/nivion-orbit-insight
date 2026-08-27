import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, CalendarDays, Sparkles, TrendingUp } from "lucide-react";
import {
  AlertCard,
  Disclosure,
  GhostButton,
  MetricCard,
  Module,
  PageHeader,
  PrimaryButton,
  StatusBadge,
} from "@/components/crm/primitives";
import { agenda, alerts, brl, initialBoard, orbitRecommendations, stages } from "@/lib/crm-data";

const title = "Dashboard comercial — NivionTech CRM";
const description =
  "Meta e realizado, pipeline aberto, previsão ponderada e as ações que precisam acontecer agora, em um só painel.";

export const Route = createFileRoute("/app/")({
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
  component: DashboardPage,
});

function DashboardPage() {
  const pipelineTotal = Object.values(initialBoard)
    .flat()
    .reduce((s, d) => s + d.valor, 0);

  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Visão geral"
        title="Agosto de 2026"
        description="O essencial do mês: o que já foi vendido, o que está em aberto e o que exige ação hoje."
        actions={
          <>
            <GhostButton>
              <CalendarDays className="size-4" aria-hidden="true" />
              Este mês
            </GhostButton>
            <PrimaryButton>
              Nova oportunidade
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </PrimaryButton>
          </>
        }
      />

      {/* Módulo cinematográfico: meta e realizado */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          emphasis
          label="Meta e realizado"
          value={brl(128000)}
          progress={64}
          delta="64% da meta"
          footnote="Meta: R$ 200 mil"
        />
        <MetricCard label="Pipeline aberto" value={brl(pipelineTotal)} delta="+18,4%" footnote="vs. julho" />
        <MetricCard label="Previsão ponderada" value={brl(186400)} delta="Confiança alta" deltaTone="neutral" footnote="6 negócios" />
        <MetricCard label="Ganhos e perdas" value="4 / 1" delta="80% de aproveitamento" footnote="no mês" />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.35fr_1fr]">
        <Module title="Pipeline por etapa" hint="Valor total e volume de oportunidades">
          <ul className="grid gap-3">
            {stages.map((stage) => {
              const deals = initialBoard[stage.key];
              const total = deals.reduce((s, d) => s + d.valor, 0);
              const pct = pipelineTotal ? (total / pipelineTotal) * 100 : 0;
              return (
                <li key={stage.key}>
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex min-w-0 items-center gap-2">
                      <span className={`size-2 shrink-0 rounded-full ${stage.tom}`} aria-hidden="true" />
                      <span className="truncate text-support font-medium text-navy">{stage.nome}</span>
                      <span className="shrink-0 text-label text-titanium">({deals.length})</span>
                    </span>
                    <span className="shrink-0 font-display text-support font-semibold text-navy">{brl(total)}</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
                    <span className="block h-full rounded-full bg-navy" style={{ width: `${pct}%` }} />
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="mt-4">
            <Disclosure title="Detalhes por responsável">
              <ul className="grid gap-2">
                {[
                  { nome: "Ana F.", valor: 182700 },
                  { nome: "Lucas P.", valor: 76500 },
                  { nome: "Marina C.", valor: 73900 },
                  { nome: "Rafael S.", valor: 18400 },
                ].map((r) => (
                  <li key={r.nome} className="flex items-center justify-between">
                    <span className="text-navy">{r.nome}</span>
                    <span className="font-semibold text-navy">{brl(r.valor)}</span>
                  </li>
                ))}
              </ul>
            </Disclosure>
          </div>
        </Module>

        <Module title="Precisa de ação" hint="Risco e atrasos primeiro">
          <div className="grid gap-3">
            {alerts.map((a) => (
              <AlertCard key={a.id} tone={a.tone} titulo={a.titulo} texto={a.texto} valor={a.valor} onAction={() => {}} />
            ))}
            <AlertCard
              tone="green"
              titulo="1 contrato pronto para assinatura"
              texto="Studio Havre aguarda envio do documento final."
              valor={brl(54700)}
            />
          </div>
        </Module>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <Module
          title="Recomendações do Orbit"
          hint="Por que agir e o que fazer agora"
          tone="glass"
          actions={<StatusBadge tone="gold">{orbitRecommendations.length} pendentes</StatusBadge>}
        >
          <ul className="grid gap-3">
            {orbitRecommendations.map((r) => (
              <li key={r.id} className="rounded-xl surface-1 p-4">
                <div className="flex items-start gap-2">
                  <Sparkles className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                  <p className="min-w-0 text-support font-semibold text-navy">{r.titulo}</p>
                </div>
                <p className="mt-2 text-label text-muted-foreground">{r.porque}</p>
                <p className="mt-2 text-label font-medium text-navy">→ {r.acao}</p>
              </li>
            ))}
          </ul>
        </Module>

        <Module title="Agenda de hoje" hint="4 compromissos comerciais">
          <ul className="grid gap-2.5">
            {agenda.map((a) => (
              <li key={a.hora} className="flex items-center gap-3 rounded-xl surface-1 px-4 py-3">
                <span className="shrink-0 font-display text-support font-semibold text-navy">{a.hora}</span>
                <span className="min-w-0 flex-1 truncate text-support text-foreground">{a.titulo}</span>
                <span className="shrink-0 text-label text-titanium">{a.quem}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 inline-flex items-center gap-1.5 text-label font-semibold text-blue">
            <TrendingUp className="size-3.5" aria-hidden="true" />
            Taxa de conversão do mês: 34%
          </p>
        </Module>
      </div>
    </div>
  );
}
