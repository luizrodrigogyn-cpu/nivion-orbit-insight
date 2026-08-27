import { useState } from "react";
import { CalendarClock, CircleDollarSign, GripVertical, MoveRight, TriangleAlert, UserRound } from "lucide-react";
import { Reveal } from "./Reveal";

type Deal = {
  id: string;
  empresa: string;
  valor: string;
  owner: string;
  proximo: string;
  status: "saudavel" | "atencao" | "risco";
};

const initial: Record<string, Deal[]> = {
  Qualificação: [
    { id: "1", empresa: "Atlas Log", valor: "R$ 32.000", owner: "Marina C.", proximo: "Reunião de diagnóstico", status: "saudavel" },
    { id: "2", empresa: "Verdi Alimentos", valor: "R$ 18.400", owner: "Rafael S.", proximo: "Retornar contato", status: "atencao" },
  ],
  Proposta: [
    { id: "3", empresa: "Nortek Serviços", valor: "R$ 76.500", owner: "Lucas P.", proximo: "Enviar escopo revisado", status: "saudavel" },
    { id: "4", empresa: "Clara Consultoria", valor: "R$ 41.900", owner: "Marina C.", proximo: "Sem próximo passo", status: "risco" },
  ],
  Negociação: [
    { id: "5", empresa: "Grupo Meridian", valor: "R$ 128.000", owner: "Ana F.", proximo: "Ajuste de condições", status: "saudavel" },
  ],
  Fechamento: [
    { id: "6", empresa: "Studio Havre", valor: "R$ 54.700", owner: "Ana F.", proximo: "Assinatura do contrato", status: "saudavel" },
  ],
};

const statusStyle: Record<Deal["status"], { dot: string; label: string }> = {
  saudavel: { dot: "bg-[oklch(0.68_0.14_160)]", label: "Saudável" },
  atencao: { dot: "bg-[oklch(0.75_0.15_85)]", label: "Atenção" },
  risco: { dot: "bg-[oklch(0.6_0.19_25)]", label: "Em risco" },
};

const capabilities = [
  { icon: MoveRight, text: "Arraste oportunidades entre as etapas do funil" },
  { icon: CircleDollarSign, text: "Visualize valores negociados por etapa" },
  { icon: UserRound, text: "Saiba quem é o responsável por cada negociação" },
  { icon: CalendarClock, text: "Registre e cobre o próximo passo" },
  { icon: TriangleAlert, text: "Identifique negócios parados ou em risco" },
];

export function Pipeline() {
  const [columns, setColumns] = useState(initial);
  const [dragging, setDragging] = useState<{ deal: Deal; from: string } | null>(null);
  const [hover, setHover] = useState<string | null>(null);

  const drop = (to: string) => {
    if (!dragging || dragging.from === to) {
      setDragging(null);
      setHover(null);
      return;
    }
    setColumns((prev) => ({
      ...prev,
      [dragging.from]: (prev[dragging.from] ?? []).filter((d) => d.id !== dragging.deal.id),
      [to]: [...(prev[to] ?? []), dragging.deal],
    }));
    setDragging(null);
    setHover(null);
  };

  return (
    <section id="pipeline" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-start">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold leading-tight text-ink sm:text-[2.6rem]">
              Visualize cada oportunidade.
              <br />
              <span className="text-gradient-navy">Decida o próximo passo.</span>
            </h2>
            <p className="mt-5 max-w-lg text-[1rem] leading-relaxed text-foreground/80">
              O funil do NivionTech mostra o que realmente importa: onde está o dinheiro, quem está conduzindo e o que
              precisa acontecer hoje.
            </p>
            <ul className="mt-8 grid gap-3">
              {capabilities.map((cap, i) => (
                <Reveal as="li" key={cap.text} delay={i * 80}>
                  <span className="flex items-start gap-3 rounded-xl hairline bg-white/60 px-4 py-3">
                    <cap.icon className="mt-0.5 size-4 shrink-0 text-ink" />
                    <span className="text-[0.9rem] text-foreground/85">{cap.text}</span>
                  </span>
                </Reveal>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={150}>
            <div className="rounded-[1.5rem] glass metal-edge p-4" style={{ boxShadow: "var(--shadow-float)" }}>
              <div className="flex items-center justify-between px-1 pb-3">
                <p className="font-display text-[0.95rem] font-semibold text-ink">Funil de vendas</p>
                <p className="text-[0.7rem] text-muted-foreground">Arraste os cards</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {Object.entries(columns).map(([stage, deals]) => (
                  <div
                    key={stage}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setHover(stage);
                    }}
                    onDragLeave={() => setHover((h) => (h === stage ? null : h))}
                    onDrop={() => drop(stage)}
                    className={`rounded-xl border p-2.5 transition-colors duration-300 ${
                      hover === stage ? "border-ink/40 bg-secondary" : "border-border bg-white/55"
                    }`}
                  >
                    <div className="flex items-center justify-between px-0.5">
                      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-foreground/70">
                        {stage}
                      </p>
                      <span className="rounded-md bg-secondary px-1.5 py-0.5 text-[0.65rem] font-semibold text-foreground/70">
                        {deals.length}
                      </span>
                    </div>
                    <div className="mt-2.5 grid gap-2">
                      {deals.map((deal) => (
                        <article
                          key={deal.id}
                          draggable
                          onDragStart={() => setDragging({ deal, from: stage })}
                          onDragEnd={() => setDragging(null)}
                          className="cursor-grab rounded-lg border border-border bg-card p-2.5 shadow-[0_2px_10px_-6px_rgba(0,0,0,0.25)] transition-transform duration-300 hover:-translate-y-0.5 active:cursor-grabbing"
                        >
                          <div className="flex items-center gap-1.5">
                            <GripVertical className="size-3 text-titanium" />
                            <span className={`size-1.5 rounded-full ${statusStyle[deal.status].dot}`} />
                            <p className="truncate text-[0.78rem] font-semibold text-ink">{deal.empresa}</p>
                          </div>
                          <p className="mt-1.5 font-display text-[0.85rem] font-semibold text-ink">{deal.valor}</p>
                          <p className="mt-1 truncate text-[0.68rem] text-muted-foreground">{deal.owner}</p>
                          <p className="mt-1.5 truncate text-[0.68rem] text-foreground/70">→ {deal.proximo}</p>
                        </article>
                      ))}
                      {deals.length === 0 && (
                        <p className="rounded-lg border border-dashed border-border px-2 py-4 text-center text-[0.68rem] text-muted-foreground">
                          Solte aqui
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
