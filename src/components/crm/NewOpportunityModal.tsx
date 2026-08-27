import { useEffect, useRef, useState } from "react";
import { Check, X } from "lucide-react";
import { FormField, GhostButton, PrimaryButton, inputClass } from "./primitives";
import { Disclosure } from "./primitives";

export function NewOpportunityModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [titulo, setTitulo] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [valor, setValor] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);
  const firstField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setDone(false);
      setErro(null);
      firstField.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim() || !empresa.trim()) {
      setErro("Informe o nome da oportunidade e o cliente.");
      return;
    }
    setErro(null);
    setSaving(true);
    window.setTimeout(() => {
      setSaving(false);
      setDone(true);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-end sm:place-items-center">
      <div className="absolute inset-0 bg-nblack/45" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="nova-op-titulo"
        className="relative w-full max-w-lg animate-rise rounded-t-2xl surface-1 p-5 sm:rounded-2xl"
      >
        <div className="flex items-start justify-between gap-3">
          <h2 id="nova-op-titulo" className="font-display text-section font-semibold text-navy">
            Nova oportunidade
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="grid size-11 place-items-center rounded-xl hairline bg-surface"
          >
            <X className="size-4 text-navy" aria-hidden="true" />
          </button>
        </div>

        {done ? (
          <div className="mt-6 grid place-items-center rounded-xl bg-green/8 px-5 py-10 text-center">
            <Check className="mb-2 size-6 text-green" aria-hidden="true" />
            <p className="text-support font-semibold text-navy">Oportunidade criada</p>
            <p className="mt-1 text-label text-muted-foreground">Ela entra na etapa de qualificação.</p>
            <PrimaryButton className="mt-4" onClick={onClose}>
              Voltar ao pipeline
            </PrimaryButton>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-5 grid gap-4" noValidate>
            <FormField label="Nome da oportunidade" htmlFor="op-titulo" error={erro ?? undefined}>
              <input
                id="op-titulo"
                ref={firstField}
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className={inputClass}
                placeholder="Implantação CRM comercial"
              />
            </FormField>

            <FormField label="Cliente ou empresa" htmlFor="op-empresa">
              <input
                id="op-empresa"
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
                className={inputClass}
                placeholder="Atlas Log"
              />
            </FormField>

            <FormField label="Valor estimado" htmlFor="op-valor" hint="Opcional nesta etapa.">
              <input
                id="op-valor"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                className={inputClass}
                inputMode="numeric"
                placeholder="R$ 32.000"
              />
            </FormField>

            <Disclosure title="Detalhes adicionais">
              <div className="grid gap-4">
                <FormField label="Responsável" htmlFor="op-resp">
                  <input id="op-resp" className={inputClass} placeholder="Ana Ferraz" />
                </FormField>
                <FormField label="Próximo passo" htmlFor="op-passo">
                  <input id="op-passo" className={inputClass} placeholder="Reunião de diagnóstico" />
                </FormField>
              </div>
            </Disclosure>

            <div className="mt-1 flex flex-wrap justify-end gap-2">
              <GhostButton type="button" onClick={onClose}>
                Cancelar
              </GhostButton>
              <PrimaryButton type="submit" disabled={saving}>
                {saving ? "Salvando…" : "Criar oportunidade"}
              </PrimaryButton>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
