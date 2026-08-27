import { useState } from "react";
import { Inbox } from "lucide-react";
import { cn } from "@/lib/utils";
import { brl, initialBoard, stages, type Opportunity, type StageKey } from "@/lib/crm-data";
import { EmptyState } from "./primitives";
import { OpportunityCard } from "./OpportunityCard";

export function PipelineBoard() {
  const [board, setBoard] = useState<Record<StageKey, Opportunity[]>>(initialBoard);
  const [dragging, setDragging] = useState<{ deal: Opportunity; from: StageKey } | null>(null);
  const [hover, setHover] = useState<StageKey | null>(null);

  const move = (deal: Opportunity, from: StageKey, to: StageKey) => {
    if (from === to) return;
    setBoard((prev) => ({
      ...prev,
      [from]: prev[from].filter((d) => d.id !== deal.id),
      [to]: [...prev[to], deal],
    }));
  };

  const drop = (to: StageKey) => {
    if (dragging) move(dragging.deal, dragging.from, to);
    setDragging(null);
    setHover(null);
  };

  return (
    <div className="grid gap-4 lg:grid-cols-4">
      {stages.map((stage) => {
        const deals = board[stage.key];
        const total = deals.reduce((sum, d) => sum + d.valor, 0);
        return (
          <section
            key={stage.key}
            aria-label={`Etapa ${stage.nome}`}
            onDragOver={(e) => {
              e.preventDefault();
              setHover(stage.key);
            }}
            onDragLeave={() => setHover((h) => (h === stage.key ? null : h))}
            onDrop={() => drop(stage.key)}
            className={cn(
              "rounded-2xl border p-3 transition-colors duration-200",
              hover === stage.key ? "border-blue bg-accent/60" : "border-line bg-secondary/35",
            )}
          >
            <header className="px-1 pb-3">
              <div className="flex items-center gap-2">
                <span className={cn("size-2 rounded-full", stage.tom)} aria-hidden="true" />
                <h3 className="min-w-0 truncate font-display text-support font-semibold text-navy">{stage.nome}</h3>
                <span className="ml-auto shrink-0 rounded-md bg-surface px-1.5 py-0.5 text-label font-semibold text-titanium">
                  {deals.length}
                </span>
              </div>
              <p className="mt-1 font-display text-cardtitle font-semibold text-navy">{brl(total)}</p>
            </header>

            <div className="grid gap-2.5">
              {deals.map((deal) => (
                <OpportunityCard
                  key={deal.id}
                  deal={deal}
                  stage={stage.key}
                  dragging={dragging?.deal.id === deal.id}
                  onDragStart={() => setDragging({ deal, from: stage.key })}
                  onDragEnd={() => setDragging(null)}
                  onMove={(to) => move(deal, stage.key, to)}
                />
              ))}
              {deals.length === 0 && (
                <EmptyState
                  compact
                  icon={<Inbox className="size-4" />}
                  title="Nenhuma oportunidade"
                  description="Arraste um card para esta etapa."
                />
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}
