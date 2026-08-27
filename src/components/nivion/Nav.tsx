import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { label: "Produto", href: "#produto" },
  { label: "Funcionalidades", href: "#funcionalidades" },
  { label: "Segurança", href: "#seguranca" },
  { label: "Para quem é", href: "#para-quem-e" },
  { label: "Contato", href: "#contato" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav
        aria-label="Navegação principal"
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 ${
          scrolled ? "glass metal-edge" : "border border-transparent"
        }`}
      >
        <a href="#topo" className="shrink-0" aria-label="NivionTech CRM — início">
          <Logo />
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative text-[0.9rem] font-medium text-foreground/75 transition-colors hover:text-ink after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-ink after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            to="/app"
            className="hidden rounded-xl bg-ink px-4 py-2.5 text-[0.875rem] font-semibold text-onnavy shadow-[var(--shadow-soft)] transition-transform duration-300 hover:-translate-y-0.5 sm:inline-flex"
          >
            Entrar no CRM
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            className="grid size-10 place-items-center rounded-xl hairline bg-white/70 lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="mx-auto mt-2 max-w-6xl rounded-2xl glass p-3 lg:hidden">
          <ul className="grid gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 text-sm font-medium text-foreground/85 transition-colors hover:bg-secondary"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#produto"
                onClick={() => setOpen(false)}
                className="mt-1 block rounded-xl bg-ink px-3 py-3 text-center text-sm font-semibold text-onnavy"
              >
                Conhecer o CRM
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
