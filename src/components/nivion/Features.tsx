import {
  BarChart3,
  Bell,
  CalendarCheck,
  Filter,
  Handshake,
  KeyRound,
  LayoutDashboard,
  ToggleRight,
  UserCog,
  UserPlus,
} from "lucide-react";
import { Reveal } from "./Reveal";

const features = [
  { icon: Filter, title: "Funil de vendas", text: "Etapas configuráveis para o seu processo real." },
  { icon: UserPlus, title: "Cadastro de clientes", text: "Ficha completa, contatos e histórico." },
  { icon: Handshake, title: "Gestão de oportunidades", text: "Valores, prazos e responsáveis sempre visíveis." },
  { icon: CalendarCheck, title: "Tarefas e agenda", text: "Compromissos e follow-ups no ritmo do time." },
  { icon: LayoutDashboard, title: "Dashboard comercial", text: "Indicadores do mês em uma única tela." },
  { icon: BarChart3, title: "Relatórios e estatísticas", text: "Resultados por período, etapa e vendedor." },
  { icon: UserCog, title: "Gestão de usuários", text: "Cadastre a equipe e organize por função." },
  { icon: KeyRound, title: "Controle de acessos", text: "Cada pessoa vê apenas o que precisa." },
  { icon: ToggleRight, title: "Módulos ativáveis", text: "Ligue recursos conforme a empresa cresce." },
  { icon: Bell, title: "Notificações inteligentes", text: "Avisos no momento em que fazem diferença." },
];

export function Features() {
  return (
    <section id="funcionalidades" className="relative py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="max-w-2xl">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Funcionalidades
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-ink sm:text-[2.6rem]">
            Tudo que o comercial precisa, sem excesso.
          </h2>
        </Reveal>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl hairline bg-border sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal as="li" key={f.title} delay={(i % 3) * 90}>
              <article className="group h-full bg-white/70 p-6 transition-colors duration-500 hover:bg-white">
                <div className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-lg bg-secondary text-ink transition-colors duration-500 group-hover:bg-ink group-hover:text-onnavy">
                    <f.icon className="size-4" />
                  </span>
                  <h3 className="font-display text-[1rem] font-semibold text-ink">{f.title}</h3>
                </div>
                <p className="mt-3 text-[0.88rem] leading-relaxed text-foreground/75">{f.text}</p>
              </article>
            </Reveal>
          ))}
          <li aria-hidden className="hidden bg-white/70 lg:block" />
          <li aria-hidden className="hidden bg-white/70 sm:block" />
        </ul>
      </div>
    </section>
  );
}
