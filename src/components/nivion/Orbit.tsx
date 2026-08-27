import { AlarmClock, ListChecks, PhoneCall, Sparkles, Target } from "lucide-react";
import { Reveal } from "./Reveal";

const recommendations = [
  { icon: Target, title: "Oportunidades sem próximo passo", text: "4 negócios seguem sem ação definida nesta semana." },
  { icon: PhoneCall, title: "Clientes que precisam de contato", text: "Verdi Alimentos e Studio Havre há 12 dias sem interação." },
  { icon: AlarmClock, title: "Negociações com risco de atraso", text: "Clara Consultoria passou do prazo previsto de proposta." },
  { icon: ListChecks, title: "Ações prioritárias do dia", text: "3 tarefas de alto impacto para fechar o mês no plano." },
];

export function Orbit() {
  return (
    <section id="orbit" className="relative overflow-hidden py-24">
      <div
        className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] px-6 py-16 sm:px-12"
        style={{ background: "var(--gradient-navy)", boxShadow: "var(--shadow-float)" }}
      >
        <div className="pointer-events-none absolute inset-0 opacity-[0.14] tech-grid" />
        <div className="relative grid gap-12 lg:grid-cols-[0.95fr_1fr] lg:items-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full glass-dark px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-onnavy-muted">
              <Sparkles className="size-3.5 text-ice" />
              Assistente Orbit
            </span>
            <h2 className="mt-6 font-display text-3xl font-semibold leading-tight text-onnavy sm:text-[2.5rem]">
              Uma inteligência que trabalha ao lado da sua equipe.
            </h2>
            <p className="mt-5 max-w-md text-[1rem] leading-relaxed text-onnavy-muted">
              O Orbit analisa o cenário comercial, identifica prioridades e ajuda sua equipe a agir no momento certo.
            </p>

            <div className="relative mt-12 hidden size-40 place-items-center sm:grid">
              <span className="absolute inset-0 rounded-full border border-ice/30 animate-pulse-ring" />
              <span className="absolute inset-6 rounded-full border border-ice/25" />
              <span
                className="grid size-20 place-items-center rounded-full animate-float-slow"
                style={{
                  background: "radial-gradient(circle at 30% 25%, oklch(0.85 0.08 230), oklch(0.32 0.06 250))",
                  boxShadow: "0 0 60px -10px color-mix(in oklab, var(--ice) 60%, transparent)",
                }}
              >
                <Sparkles className="size-7 text-white" />
              </span>
            </div>
          </Reveal>

          <ul className="grid gap-3.5">
            {recommendations.map((rec, i) => (
              <Reveal as="li" key={rec.title} delay={i * 120}>
                <article className="flex items-start gap-4 rounded-2xl glass-dark p-5 transition-transform duration-500 hover:-translate-y-1">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/12">
                    <rec.icon className="size-4.5 text-ice" />
                  </span>
                  <div>
                    <h3 className="font-display text-[1rem] font-semibold text-onnavy">{rec.title}</h3>
                    <p className="mt-1.5 text-[0.88rem] leading-relaxed text-onnavy-muted">{rec.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
