import { useState } from "react";
import { Check, Clock, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { orbitRecommendations, type OrbitRecommendation } from "@/lib/crm-data";

export function useOrbit() {
  const [items, setItems] = useState<OrbitRecommendation[]>(orbitRecommendations);
  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));
  return { items, remove };
}

export function OrbitTrigger({ count, onClick }: { count: number; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Abrir Orbit — ${count} recomendações pendentes`}
      className="relative inline-flex min-h-11 items-center gap-2 rounded-xl bg-navy px-3.5 text-support font-semibold text-onnavy transition-transform duration-200 hover:-translate-y-0.5"
    >
      <span className="relative grid size-6 place-items-center">
        <Sparkles className="size-4 text-gold" aria-hidden="true" />
        <span className="absolute inset-0 rounded-full border border-gold/60 animate-pulse-ring" aria-hidden="true" />
      </span>
      <span className="hidden sm:inline">Orbit</span>
      {count > 0 && (
        <span className="grid min-w-5 place-items-center rounded-full bg-gold px-1.5 text-[0.7rem] font-bold text-nblack">
          {count}
        </span>
      )}
    </button>
  );
}

export function OrbitPanel({
  open,
  onClose,
  items,
  onResolve,
}: {
  open: boolean;
  onClose: () => void;
  items: OrbitRecommendation[];
  onResolve: (id: string) => void;
}) {
  if (!open) return null;
  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-nblack/35 lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        aria-label="Painel do Orbit"
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col overflow-hidden cinematic animate-panel-in sm:max-w-md"
      >
        <div className="pointer-events-none absolute inset-0 opacity-[0.12] tech-grid" aria-hidden="true" />

        <header className="relative flex items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="relative grid size-9 shrink-0 place-items-center rounded-full bg-nblack">
              <Sparkles className="size-4 text-gold" aria-hidden="true" />
              <span className="absolute inset-0 rounded-full border border-gold/50 animate-pulse-ring" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="truncate font-display text-cardtitle font-semibold text-onnavy">Orbit</p>
              <p className="truncate text-label text-onnavy-muted">
                {items.length} recomendaç{items.length === 1 ? "ão" : "ões"} pendente
                {items.length === 1 ? "" : "s"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar painel do Orbit"
            className="grid size-11 place-items-center rounded-xl glass-dark text-onnavy"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </header>

        <div className="relative flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="grid place-items-center rounded-xl glass-dark px-5 py-12 text-center">
              <Check className="mb-2 size-5 text-green" aria-hidden="true" />
              <p className="text-support font-semibold text-onnavy">Tudo em ordem</p>
              <p className="mt-1 text-label text-onnavy-muted">Nenhuma ação pendente no momento.</p>
            </div>
          ) : (
            <ul className="grid gap-3">
              {items.map((item) => (
                <li key={item.id} className="rounded-xl glass-dark p-4">
                  <div className="flex items-start justify-between gap-2">
                    <p className="min-w-0 text-support font-semibold text-onnavy">{item.titulo}</p>
                    <span
                      className={cn(
                        "shrink-0 rounded-md px-2 py-0.5 text-label font-semibold",
                        item.prioridade === "alta" ? "bg-gold/25 text-gold" : "bg-white/12 text-onnavy-muted",
                      )}
                    >
                      {item.prioridade === "alta" ? "Alta" : "Média"}
                    </span>
                  </div>
                  <p className="mt-2 text-label leading-relaxed text-onnavy-muted">
                    <span className="font-semibold text-onnavy">Por que: </span>
                    {item.porque}
                  </p>
                  <p className="mt-2 text-label leading-relaxed text-onnavy">
                    <span className="font-semibold text-gold">Ação sugerida: </span>
                    {item.acao}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => onResolve(item.id)}
                      className="inline-flex min-h-11 items-center gap-1.5 rounded-lg bg-onnavy px-3 text-label font-semibold text-navy transition-transform duration-200 hover:-translate-y-0.5"
                    >
                      <Check className="size-3.5" aria-hidden="true" />
                      Concluir
                    </button>
                    <button
                      type="button"
                      onClick={() => onResolve(item.id)}
                      className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-white/20 px-3 text-label font-semibold text-onnavy"
                    >
                      <Clock className="size-3.5" aria-hidden="true" />
                      Adiar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>
    </>
  );
}
