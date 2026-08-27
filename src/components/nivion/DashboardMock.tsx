import { ArrowUpRight, Sparkles, TrendingUp } from "lucide-react";

const stages = [
  {
    name: "Qualificação",
    total: "R$ 84.200",
    cards: [
      { empresa: "Atlas Log", valor: "R$ 32.000", owner: "MC", health: "ok" },
      { empresa: "Verdi Alimentos", valor: "R$ 18.400", owner: "RS", health: "warn" },
    ],
  },
  {
    name: "Proposta",
    total: "R$ 146.900",
    cards: [
      { empresa: "Nortek Serviços", valor: "R$ 76.500", owner: "LP", health: "ok" },
      { empresa: "Clara Consultoria", valor: "R$ 41.900", owner: "MC", health: "risk" },
    ],
  },
  {
    name: "Negociação",
    total: "R$ 212.300",
    cards: [{ empresa: "Grupo Meridian", valor: "R$ 128.000", owner: "AF", health: "ok" }],
  },
];

const healthColor: Record<string, string> = {
  ok: "bg-[oklch(0.72_0.14_160)]",
  warn: "bg-[oklch(0.78_0.15_85)]",
  risk: "bg-[oklch(0.65_0.19_25)]",
};

export function DashboardMock() {
  return (
    <div className="relative [perspective:1600px]">
      <div className="pointer-events-none absolute -inset-10 -z-10 rounded-[3rem] bg-[radial-gradient(60%_60%_at_70%_20%,color-mix(in_oklab,var(--ice)_45%,transparent),transparent_70%)] blur-2xl" />

      <div
        className="relative overflow-hidden rounded-[1.75rem] metal-edge animate-float-slow"
        style={{
          background: "var(--gradient-navy)",
          boxShadow: "var(--shadow-float)",
          transform: "rotateY(-8deg) rotateX(4deg)",
        }}
      >
        <div className="pointer-events-none absolute inset-0 opacity-[0.18] tech-grid" />
        <div className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-[var(--gradient-sheen)] opacity-25 animate-sweep" />

        <div className="relative p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-onnavy-muted">
                Painel comercial
              </p>
              <p className="font-display text-lg font-semibold text-onnavy">Pipeline · Agosto</p>
            </div>
            <div className="flex items-center gap-1.5 rounded-full glass-dark px-3 py-1.5 text-[0.72rem] font-semibold text-onnavy">
              <TrendingUp className="size-3.5 text-ice" />
              +18,4%
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2.5">
            {[
              { k: "Em aberto", v: "R$ 443k" },
              { k: "Ganhos no mês", v: "R$ 128k" },
              { k: "Taxa de conversão", v: "34%" },
            ].map((item) => (
              <div key={item.k} className="rounded-xl glass-dark px-3 py-2.5">
                <p className="truncate text-[0.62rem] uppercase tracking-[0.12em] text-onnavy-muted">{item.k}</p>
                <p className="font-display text-sm font-semibold text-onnavy sm:text-base">{item.v}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2.5">
            {stages.map((stage) => (
              <div key={stage.name} className="rounded-xl glass-dark p-2.5">
                <div className="flex items-baseline justify-between gap-1">
                  <p className="truncate text-[0.68rem] font-semibold text-onnavy">{stage.name}</p>
                </div>
                <p className="mt-0.5 text-[0.6rem] text-onnavy-muted">{stage.total}</p>
                <div className="mt-2.5 grid gap-2">
                  {stage.cards.map((card) => (
                    <div
                      key={card.empresa}
                      className="rounded-lg border border-white/12 bg-white/8 p-2 transition-transform duration-300 hover:-translate-y-0.5"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className={`size-1.5 rounded-full ${healthColor[card.health]}`} />
                        <p className="truncate text-[0.63rem] font-semibold text-onnavy">{card.empresa}</p>
                      </div>
                      <div className="mt-1.5 flex items-center justify-between">
                        <p className="text-[0.6rem] text-onnavy-muted">{card.valor}</p>
                        <span className="grid size-4 place-items-center rounded-full bg-white/20 text-[0.5rem] font-bold text-onnavy">
                          {card.owner}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cartão flutuante do Orbit */}
      <div
        className="absolute -bottom-8 -left-4 w-[16.5rem] rounded-2xl glass metal-edge p-4 sm:-left-10"
        style={{ boxShadow: "var(--shadow-float)" }}
      >
        <div className="flex items-center gap-2">
          <span className="relative grid size-7 place-items-center rounded-full bg-ink">
            <Sparkles className="size-3.5 text-ice" />
            <span className="absolute inset-0 rounded-full border border-ice/60 animate-pulse-ring" />
          </span>
          <p className="font-display text-sm font-semibold text-ink">Orbit</p>
        </div>
        <p className="mt-2.5 text-[0.78rem] leading-relaxed text-foreground/80">
          3 oportunidades sem próximo passo definido. Priorize <strong className="font-semibold">Grupo Meridian</strong>.
        </p>
        <span className="mt-2.5 inline-flex items-center gap-1 text-[0.72rem] font-semibold text-ink">
          Revisar agora <ArrowUpRight className="size-3.5" />
        </span>
      </div>
    </div>
  );
}
