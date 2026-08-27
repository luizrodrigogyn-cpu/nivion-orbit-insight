import { Building2, Eye, Fingerprint, Lock, ScrollText, ShieldCheck } from "lucide-react";
import { Reveal } from "./Reveal";

const pillars = [
  { icon: Fingerprint, title: "Autenticação segura", text: "Só entra quem realmente tem acesso à conta." },
  { icon: Building2, title: "Dados separados por empresa", text: "As informações de cada cliente ficam isoladas." },
  { icon: ShieldCheck, title: "Usuários e permissões", text: "Você define quem pode ver, editar e excluir." },
  { icon: Lock, title: "Proteção de informações sensíveis", text: "Dados comerciais guardados com cuidado." },
  { icon: Eye, title: "Conexão HTTPS", text: "Todo o tráfego é criptografado de ponta a ponta." },
  { icon: ScrollText, title: "Monitoramento e auditoria", text: "Registro das ações importantes do sistema." },
];

export function Security() {
  return (
    <section id="seguranca" className="relative py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="max-w-2xl">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Segurança</p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-ink sm:text-[2.6rem]">
            Segurança não é um detalhe.
            <br />
            <span className="text-gradient-navy">É parte do produto.</span>
          </h2>
        </Reveal>

        <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal as="li" key={p.title} delay={(i % 3) * 100}>
              <article className="relative h-full overflow-hidden rounded-2xl glass metal-edge p-6">
                <span className="absolute -right-6 -top-6 size-24 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--ice)_45%,transparent),transparent_70%)] blur-lg" />
                <span className="relative grid size-11 place-items-center rounded-xl bg-ink text-onnavy">
                  <p.icon className="size-5" />
                </span>
                <h3 className="relative mt-5 font-display text-[1.05rem] font-semibold text-ink">{p.title}</h3>
                <p className="relative mt-2.5 text-[0.9rem] leading-relaxed text-foreground/75">{p.text}</p>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
