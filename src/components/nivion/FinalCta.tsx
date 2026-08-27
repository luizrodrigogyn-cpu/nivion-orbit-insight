import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Reveal } from "./Reveal";

export function FinalCta() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ nome: "", email: "", empresa: "" });
  const [error, setError] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Preencha seu nome e um e-mail válido para continuar.");
      return;
    }
    setError(null);
    setSent(true);
  };

  return (
    <section id="contato" className="relative px-5 py-24">
      <div
        className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] px-6 py-16 sm:px-14"
        style={{ background: "var(--gradient-navy)", boxShadow: "var(--shadow-float)" }}
      >
        <div className="pointer-events-none absolute inset-0 opacity-[0.12] tech-grid" />
        <div className="pointer-events-none absolute -left-24 top-0 size-72 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--ice)_30%,transparent),transparent_70%)] blur-2xl" />

        <div className="relative grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold leading-tight text-onnavy sm:text-[2.6rem]">
              Venda com mais clareza.
              <br />
              Cresça com mais controle.
            </h2>
            <p className="mt-5 max-w-md text-[1rem] leading-relaxed text-onnavy-muted">
              Coloque clientes, oportunidades e decisões comerciais no mesmo lugar.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#contato-form"
                className="group inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3.5 text-[0.94rem] font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5"
              >
                Começar agora
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#contato-form"
                className="inline-flex items-center gap-2 rounded-xl glass-dark px-5 py-3.5 text-[0.94rem] font-semibold text-onnavy transition-transform duration-300 hover:-translate-y-0.5"
              >
                Solicitar uma demonstração
              </a>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <form
              id="contato-form"
              onSubmit={submit}
              className="rounded-2xl glass-dark p-6"
              aria-label="Formulário de contato NivionTech CRM"
            >
              {sent ? (
                <div className="flex flex-col items-start gap-3 py-6">
                  <CheckCircle2 className="size-8 text-ice" />
                  <p className="font-display text-lg font-semibold text-onnavy">Recebemos seu contato.</p>
                  <p className="text-[0.9rem] leading-relaxed text-onnavy-muted">
                    Nossa equipe vai falar com você em breve para apresentar o NivionTech CRM.
                  </p>
                </div>
              ) : (
                <>
                  <p className="font-display text-[1.05rem] font-semibold text-onnavy">
                    Fale com a equipe NivionTech
                  </p>
                  <div className="mt-5 grid gap-3.5">
                    {[
                      { id: "nome", label: "Nome", type: "text", ph: "Seu nome completo" },
                      { id: "email", label: "E-mail corporativo", type: "email", ph: "voce@empresa.com.br" },
                      { id: "empresa", label: "Empresa", type: "text", ph: "Nome da empresa" },
                    ].map((field) => (
                      <div key={field.id}>
                        <label
                          htmlFor={field.id}
                          className="block text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-onnavy-muted"
                        >
                          {field.label}
                        </label>
                        <input
                          id={field.id}
                          name={field.id}
                          type={field.type}
                          placeholder={field.ph}
                          value={form[field.id as keyof typeof form]}
                          onChange={(e) => setForm((f) => ({ ...f, [field.id]: e.target.value }))}
                          className="mt-2 w-full rounded-xl border border-white/15 bg-white/10 px-3.5 py-3 text-[0.92rem] text-onnavy placeholder:text-onnavy-muted/60 outline-none transition-colors focus:border-ice/70"
                        />
                      </div>
                    ))}
                  </div>
                  {error && (
                    <p role="alert" className="mt-3 text-[0.82rem] text-[oklch(0.8_0.13_30)]">
                      {error}
                    </p>
                  )}
                  <button
                    type="submit"
                    className="mt-5 w-full rounded-xl bg-white px-5 py-3.5 text-[0.94rem] font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    Solicitar demonstração
                  </button>
                </>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
