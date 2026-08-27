import { Briefcase, Building, Compass, Network, Store, Wrench } from "lucide-react";
import { Reveal } from "./Reveal";

const audiences = [
  { icon: Store, title: "Pequenas empresas", text: "Organize as vendas sem contratar um time de sistemas." },
  { icon: Briefcase, title: "Equipes comerciais", text: "Metas, funil e responsabilidades claras para todos." },
  { icon: Wrench, title: "Prestadores de serviços", text: "Propostas, contatos e recorrência sob controle." },
  { icon: Compass, title: "Consultorias", text: "Ciclos longos acompanhados etapa por etapa." },
  { icon: Network, title: "Negócios B2B", text: "Múltiplos contatos e decisores em cada oportunidade." },
  { icon: Building, title: "Empresas em estruturação", text: "Para quem precisa criar um processo de vendas de verdade." },
];

export function Audience() {
  return (
    <section id="para-quem-e" className="relative py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="max-w-2xl">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Para quem é</p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-ink sm:text-[2.6rem]">
            Feito para quem vende com processo.
          </h2>
        </Reveal>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((a, i) => (
            <Reveal as="li" key={a.title} delay={(i % 3) * 100}>
              <article className="group flex h-full items-start gap-4 rounded-2xl hairline bg-white/70 p-6 transition-all duration-500 hover:-translate-y-1 hover:bg-white">
                <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-xl bg-secondary text-ink transition-colors duration-500 group-hover:bg-ink group-hover:text-onnavy">
                  <a.icon className="size-4.5" />
                </span>
                <div>
                  <h3 className="font-display text-[1.02rem] font-semibold text-ink">{a.title}</h3>
                  <p className="mt-2 text-[0.88rem] leading-relaxed text-foreground/75">{a.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
