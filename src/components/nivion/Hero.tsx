import { ArrowRight, PlayCircle, ShieldCheck } from "lucide-react";
import { DashboardMock } from "./DashboardMock";
import { Reveal } from "./Reveal";

export function Hero() {
  return (
    <section id="topo" className="relative overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div className="pointer-events-none absolute inset-0 tech-grid opacity-40 [mask-image:radial-gradient(75%_60%_at_50%_0%,black,transparent)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 size-[46rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--ice)_35%,transparent),transparent_65%)] blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-5 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-foreground/70">
              <ShieldCheck className="size-3.5 text-ink" />
              Gestão comercial brasileira
            </span>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="mt-6 font-display text-[2.6rem] font-semibold leading-[1.04] text-ink sm:text-6xl">
              Seu processo comercial,{" "}
              <span className="text-gradient-navy">finalmente sob controle.</span>
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-6 max-w-xl text-[1.06rem] leading-relaxed text-foreground/80">
              O NivionTech CRM reúne clientes, oportunidades, tarefas e inteligência comercial em uma experiência
              simples, visual e segura.
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#contato"
                className="group inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-3.5 text-[0.94rem] font-semibold text-onnavy shadow-[var(--shadow-float)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                Experimentar o NivionTech CRM
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#produto"
                className="inline-flex items-center gap-2 rounded-xl glass metal-edge px-5 py-3.5 text-[0.94rem] font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5"
              >
                <PlayCircle className="size-4" />
                Ver como funciona
              </a>
            </div>
          </Reveal>

          <Reveal delay={340}>
            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-5 border-t border-border pt-6">
              {[
                { v: "1 ambiente", k: "Clientes, negócios e tarefas" },
                { v: "Orbit", k: "Inteligência que sugere ações" },
                { v: "Multiempresa", k: "Dados separados e protegidos" },
              ].map((item) => (
                <div key={item.v}>
                  <dt className="font-display text-[0.95rem] font-semibold text-ink">{item.v}</dt>
                  <dd className="mt-1 text-[0.76rem] leading-snug text-muted-foreground">{item.k}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={200} className="lg:pl-6">
          <DashboardMock />
        </Reveal>
      </div>
    </section>
  );
}
