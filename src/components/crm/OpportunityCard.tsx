import { CalendarDays, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { brl, type Health, type Opportunity, type StageKey, stages } from "@/lib/crm-data";
import { StatusBadge } from "./primitives";

const healthMap: Record<Health, { tone: "green" | "gold" | "danger"; label: string }> = {
  saudavel: { tone: "green", label: "Saudável" },
  atencao: { tone: "gold", label: "Atenção" },
  risco: { tone: "danger", label: "Em risco" },
};

export function OpportunityCard({
  deal,
  stage,
  dragging,
  onDragStart,
  onDragEnd,
  onMove,
}: {
  deal: Opportunity;
  stage: StageKey;
  dragging?: boolean;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  onMove?: (to: StageKey) => void;
}) {
  const health = healthMap[deal.saude];
  const index = stages.findIndex((s) => s.key === stage);
  const prev = stages[index - 1];
  const next = stages[index + 1];

  return (
    <article
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      aria-label={`${deal.titulo} — ${deal.empresa}, ${brl(deal.valor)}, ${health.label}`}
      className={cn(
        "group relative cursor-grab overflow-hidden rounded-xl surface-1 p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-titanium hover:shadow-[var(--shadow-raised)] active:cursor-grabbing",
        dragging && "rotate-[1.2deg] scale-[1.02] shadow-[var(--shadow-drag)]",
      )}
    >
      <span className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-[var(--gradient-sheen)] opacity-0 transition-opacity duration-300 group-hover:opacity-40" />

      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-support font-semibold text-navy">{deal.titulo}</p>
          <p className="mt-0.5 truncate text-label text-muted-foreground">{deal.empresa}</p>
        </div>
        <GripVertical className="mt-0.5 size-4 shrink-0 text-titanium-light" aria-hidden="true" />
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <p className="font-display text-cardtitle font-semibold text-navy">{brl(deal.valor)}</p>
        <StatusBadge tone={health.tone}>{health.label}</StatusBadge>
      </div>

      <p className="mt-3 truncate text-label text-foreground">
        <span className="text-titanium">Próximo passo: </span>
        {deal.proximoPasso}
      </p>

      <div className="mt-3 flex items-center justify-between gap-2 border-t border-line pt-3">
        <span className="inline-flex items-center gap-1.5 text-label text-muted-foreground">
          <CalendarDays className="size-3.5 shrink-0" aria-hidden="true" />
          {deal.data}
        </span>
        <span className="inline-flex items-center gap-1.5 text-label font-medium text-navy">
          <span
            className="grid size-5 shrink-0 place-items-center rounded-full bg-navy text-[0.6rem] font-bold text-onnavy"
            aria-hidden="true"
          >
            {deal.responsavel
              .split(" ")
              .map((p) => p[0])
              .join("")
              .slice(0, 2)}
          </span>
          {deal.responsavel}
        </span>
      </div>

      {/* Alternativa acessível ao arrastar (toque / teclado) */}
      {onMove && (
        <div className="mt-3 flex gap-2 lg:hidden">
          {prev && (
            <button
              type="button"
              onClick={() => onMove(prev.key)}
              className="min-h-11 flex-1 rounded-lg hairline bg-surface px-2 text-label font-semibold text-navy"
            >
              ← {prev.nome}
            </button>
          )}
          {next && (
            <button
              type="button"
              onClick={() => onMove(next.key)}
              className="min-h-11 flex-1 rounded-lg bg-navy px-2 text-label font-semibold text-onnavy"
            >
              {next.nome} →
            </button>
          )}
        </div>
      )}
    </article>
  );
}
