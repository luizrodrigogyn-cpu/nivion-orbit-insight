import { Instagram, Linkedin, Mail, Youtube } from "lucide-react";
import { Logo } from "./Logo";

const columns = [
  {
    title: "Produto",
    links: [
      { label: "Visão geral", href: "#produto" },
      { label: "Funil de vendas", href: "#pipeline" },
      { label: "Assistente Orbit", href: "#orbit" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { label: "Funcionalidades", href: "#funcionalidades" },
      { label: "Segurança", href: "#seguranca" },
      { label: "Para quem é", href: "#para-quem-e" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Contato", href: "#contato" },
      { label: "Política de privacidade", href: "#contato" },
      { label: "Termos de uso", href: "#contato" },
    ],
  },
];

const socials = [
  { icon: Linkedin, label: "LinkedIn" },
  { icon: Instagram, label: "Instagram" },
  { icon: Youtube, label: "YouTube" },
  { icon: Mail, label: "E-mail" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-white/60">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 lg:grid-cols-[1.3fr_2fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-[0.9rem] leading-relaxed text-foreground/75">
            NivionTech CRM: gestão comercial simples, visual e segura para empresas que querem crescer com processo.
          </p>
          <ul className="mt-6 flex gap-2.5">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href="#contato"
                  aria-label={s.label}
                  className="grid size-10 place-items-center rounded-xl hairline bg-white transition-colors duration-300 hover:bg-ink hover:text-onnavy"
                >
                  <s.icon className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {col.title}
              </p>
              <ul className="mt-4 grid gap-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-[0.9rem] text-foreground/80 transition-colors hover:text-ink">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-[0.8rem] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} NivionTech. Todos os direitos reservados.</p>
          <p>Feito no Brasil · contato@niviontech.com.br</p>
        </div>
      </div>
    </footer>
  );
}
