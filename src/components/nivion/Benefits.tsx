import { BrainCircuit, KanbanSquare, Lock, Users } from "lucide-react";
import { Reveal } from "./Reveal";

const items = [
  {
    icon: KanbanSquare,
    title: "Pipeline visual",
    text: "Acompanhe oportunidades e mova negócios entre as etapas com um gesto.",
  },
  {
    icon: Users,
    title: "Clientes organizados",
    text: "Histórico, contatos e próximos passos reunidos em um só lugar.",
  },
  {
    icon: BrainCircuit,
    title: "Inteligência comercial",
    text: "Identifique atrasos, riscos e prioridades antes que virem problema.",
  },
  {
    icon: Lock,
    title: "Operação segura",
    text: "Dados protegidos e separados por empresa, do primeiro acesso ao relatório.",
  },
];

export function Benefits() {
  return (
    <section id="produto" className="relative py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="max-w-2xl">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Por que NivionTech
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-ink sm:text-[2.6rem]">
            Um ambiente único para conduzir o comercial com clareza.
          </h2>
        </Reveal>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 110}>
              <article className="group h-full rounded-2xl glass metal-edge p-6 transition-transform duration-500 hover:-translate-y-1.5">
                <span className="grid size-11 place-items-center rounded-xl bg-ink text-onnavy shadow-[var(--shadow-soft)]">
                  <item.icon className="size-5" />
                </span>
                <h3 className="mt-5 font-display text-[1.1rem] font-semibold text-ink">{item.title}</h3>
                <p className="mt-2.5 text-[0.9rem] leading-relaxed text-foreground/75">{item.text}</p>
                <span className="mt-6 block h-px w-full bg-gradient-to-r from-border to-transparent transition-all duration-500 group-hover:from-ink/40" />
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
