import { useState, type ReactNode } from "react";
import { ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";

/* ---------------- StatusBadge ---------------- */
const badgeTones = {
  neutral: "bg-secondary text-navy",
  green: "bg-green/12 text-green",
  blue: "bg-blue/12 text-blue",
  gold: "bg-gold/14 text-gold",
  danger: "bg-danger/12 text-danger",
} as const;

export function StatusBadge({
  children,
  tone = "neutral",
  dot = true,
}: {
  children: ReactNode;
  tone?: keyof typeof badgeTones;
  dot?: boolean;
}) {
  const dotTone =
    tone === "green"
      ? "bg-green"
      : tone === "danger"
        ? "bg-danger"
        : tone === "gold"
          ? "bg-gold"
          : tone === "blue"
            ? "bg-blue"
            : "bg-titanium";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-label font-semibold",
        badgeTones[tone],
      )}
    >
      {dot && <span className={cn("size-1.5 rounded-full", dotTone)} aria-hidden="true" />}
      {children}
    </span>
  );
}

/* ---------------- PageHeader ---------------- */
export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="grid gap-4 sm:flex sm:flex-wrap sm:items-end sm:justify-between">
      <div className="min-w-0">
        {eyebrow && (
          <p className="text-label font-semibold uppercase tracking-[0.18em] text-titanium">{eyebrow}</p>
        )}
        <h1 className="mt-1 font-display text-page font-semibold text-navy">{title}</h1>
        {description && <p className="mt-2 max-w-2xl text-support text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
    </header>
  );
}

/* ---------------- Module (bloco modular) ---------------- */
export function Module({
  title,
  hint,
  actions,
  children,
  className,
  tone = "solid",
}: {
  title: string;
  hint?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  tone?: "solid" | "glass";
}) {
  return (
    <section
      className={cn(
        "rounded-2xl p-5",
        tone === "glass" ? "glass metal-edge" : "surface-1",
        className,
      )}
    >
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <div className="min-w-0">
          <h2 className="truncate font-display text-cardtitle font-semibold text-navy">{title}</h2>
          {hint && <p className="mt-0.5 truncate text-label text-muted-foreground">{hint}</p>}
        </div>
        {actions}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

/* ---------------- MetricCard ---------------- */
export function MetricCard({
  label,
  value,
  delta,
  deltaTone = "green",
  footnote,
  progress,
  emphasis = false,
}: {
  label: string;
  value: string;
  delta?: string;
  deltaTone?: "green" | "danger" | "neutral";
  footnote?: string;
  progress?: number;
  emphasis?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl p-5 transition-all duration-200 hover:-translate-y-0.5",
        emphasis ? "cinematic metal-edge" : "surface-1 hover:shadow-[var(--shadow-raised)]",
      )}
    >
      <p
        className={cn(
          "text-label font-semibold uppercase tracking-[0.14em]",
          emphasis ? "text-onnavy-muted" : "text-titanium",
        )}
      >
        {label}
      </p>
      <p
        className={cn(
          "mt-2 font-display text-metric font-semibold",
          emphasis ? "text-onnavy" : "text-navy",
        )}
      >
        {value}
      </p>
      {typeof progress === "number" && (
        <div
          className={cn("mt-3 h-1.5 overflow-hidden rounded-full", emphasis ? "bg-white/15" : "bg-secondary")}
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${label}: ${Math.round(progress)}%`}
        >
          <span
            className={cn("block h-full rounded-full", emphasis ? "bg-gold" : "bg-blue")}
            style={{ width: `${Math.min(100, progress)}%` }}
          />
        </div>
      )}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {delta && (
          <span
            className={cn(
              "text-label font-semibold",
              deltaTone === "danger" ? "text-danger" : deltaTone === "neutral" ? "text-titanium" : "text-green",
              emphasis && deltaTone === "green" && "text-[color-mix(in_oklab,var(--nivion-green)_55%,white)]",
            )}
          >
            {delta}
          </span>
        )}
        {footnote && (
          <span className={cn("text-label", emphasis ? "text-onnavy-muted" : "text-muted-foreground")}>
            {footnote}
          </span>
        )}
      </div>
    </div>
  );
}

/* ---------------- AlertCard ---------------- */
export function AlertCard({
  tone,
  titulo,
  texto,
  valor,
  onAction,
  actionLabel = "Resolver agora",
}: {
  tone: "danger" | "gold" | "green";
  titulo: string;
  texto: string;
  valor?: string;
  onAction?: () => void;
  actionLabel?: string;
}) {
  const bar = tone === "danger" ? "bg-danger" : tone === "gold" ? "bg-gold" : "bg-green";
  return (
    <div className="relative overflow-hidden rounded-xl surface-1 p-4 pl-5">
      <span className={cn("absolute inset-y-0 left-0 w-1", bar)} aria-hidden="true" />
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <div className="min-w-0">
          <p className="truncate text-support font-semibold text-navy">{titulo}</p>
          <p className="mt-1 text-label text-muted-foreground">{texto}</p>
        </div>
        {valor && <span className="shrink-0 text-label font-semibold text-titanium">{valor}</span>}
      </div>
      {onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-3 rounded-lg bg-navy px-3 py-2 text-label font-semibold text-onnavy transition-transform duration-200 hover:-translate-y-0.5"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

/* ---------------- EmptyState ---------------- */
export function EmptyState({
  icon,
  title,
  description,
  action,
  compact = false,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "grid place-items-center rounded-xl border border-dashed border-line bg-secondary/40 text-center",
        compact ? "px-3 py-6" : "px-6 py-12",
      )}
    >
      {icon && <span className="mb-2 text-titanium">{icon}</span>}
      <p className={cn("font-semibold text-navy", compact ? "text-label" : "text-support")}>{title}</p>
      {description && <p className="mt-1 max-w-sm text-label text-muted-foreground">{description}</p>}
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}

/* ---------------- FilterBar ---------------- */
export function FilterBar({
  query,
  onQuery,
  placeholder = "Buscar",
  filters,
  children,
}: {
  query: string;
  onQuery: (v: string) => void;
  placeholder?: string;
  filters?: { label: string; value: string }[];
  children?: ReactNode;
}) {
  return (
    <div className="grid gap-3 rounded-xl glass metal-edge p-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
      <label className="flex min-w-0 items-center gap-2 rounded-lg surface-1 px-3 py-2">
        <Search className="size-4 shrink-0 text-titanium" aria-hidden="true" />
        <span className="sr-only">{placeholder}</span>
        <input
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent text-support text-foreground outline-none placeholder:text-titanium"
        />
      </label>
      <div className="flex flex-wrap items-center gap-2">
        {filters?.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => onQuery(f.value === "todos" ? "" : f.value)}
            className="rounded-lg hairline bg-surface px-3 py-2 text-label font-semibold text-navy transition-colors hover:bg-secondary"
          >
            {f.label}
          </button>
        ))}
        {children}
      </div>
    </div>
  );
}

/* ---------------- DataTable ---------------- */
export type Column<T> = {
  key: string;
  header: string;
  align?: "left" | "right";
  secondary?: boolean;
  render: (row: T) => ReactNode;
};

export function DataTable<T extends { id: string }>({
  columns,
  rows,
  emptyTitle = "Nenhum registro encontrado",
  caption,
}: {
  columns: Column<T>[];
  rows: T[];
  emptyTitle?: string;
  caption: string;
}) {
  if (rows.length === 0) return <EmptyState title={emptyTitle} description="Ajuste a busca ou os filtros." />;
  return (
    <div className="overflow-hidden rounded-xl surface-1">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="border-b border-line bg-secondary/50">
              {columns.map((c) => (
                <th
                  key={c.key}
                  scope="col"
                  className={cn(
                    "px-4 py-3 text-label font-semibold uppercase tracking-[0.1em] text-titanium",
                    c.align === "right" && "text-right",
                    c.secondary && "hidden md:table-cell",
                  )}
                >
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-line/70 last:border-0 transition-colors hover:bg-accent/40">
                {columns.map((c) => (
                  <td
                    key={c.key}
                    className={cn(
                      "px-4 py-3 text-support text-foreground",
                      c.align === "right" && "text-right",
                      c.secondary && "hidden md:table-cell",
                    )}
                  >
                    {c.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------------- Disclosure (revelação progressiva) ---------------- */
export function Disclosure({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl surface-1">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
      >
        <span className="text-support font-semibold text-navy">{title}</span>
        <ChevronDown
          className={cn("size-4 shrink-0 text-titanium transition-transform duration-200", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>
      {open && <div className="border-t border-line px-4 py-4 text-support text-muted-foreground">{children}</div>}
    </div>
  );
}

/* ---------------- FormField ---------------- */
export function FormField({
  label,
  htmlFor,
  hint,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string | undefined;
  error?: string | undefined;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-1.5">
      <label htmlFor={htmlFor} className="text-label font-semibold text-navy">
        {label}
      </label>
      {children}
      {hint && !error && <p className="text-label text-muted-foreground">{hint}</p>}
      {error && (
        <p className="text-label font-medium text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export const inputClass =
  "w-full rounded-lg border border-line bg-surface px-3.5 py-2.5 text-support text-foreground outline-none transition-colors placeholder:text-titanium focus-visible:border-blue";

export function PrimaryButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg bg-navy px-4 py-2.5 text-support font-semibold text-onnavy shadow-[var(--shadow-soft)] transition-transform duration-200 hover:-translate-y-0.5 disabled:opacity-60",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg hairline bg-surface px-4 py-2.5 text-support font-semibold text-navy transition-colors hover:bg-secondary",
        className,
      )}
    >
      {children}
    </button>
  );
}
