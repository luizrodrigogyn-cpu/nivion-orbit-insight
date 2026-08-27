import { useEffect, useState, type ReactNode } from "react";
import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  BarChart3,
  Bell,
  Building2,
  ChevronLeft,
  Kanban,
  LayoutDashboard,
  Menu,
  PanelsTopLeft,
  Search,
  Settings2,
  Users,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/nivion/Logo";
import { OrbitPanel, OrbitTrigger, useOrbit } from "./OrbitPanel";

const groups: {
  label: string;
  items: { to: string; label: string; icon: typeof LayoutDashboard }[];
}[] = [
  {
    label: "Visão geral",
    items: [{ to: "/app", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    label: "Comercial",
    items: [{ to: "/app/pipeline", label: "Pipeline", icon: Kanban }],
  },
  {
    label: "Relacionamento",
    items: [{ to: "/app/clientes", label: "Clientes", icon: Users }],
  },
  {
    label: "Inteligência",
    items: [{ to: "/app/relatorios", label: "Relatórios", icon: BarChart3 }],
  },
  {
    label: "Administração",
    items: [{ to: "/app/administracao", label: "Empresa e acessos", icon: Settings2 }],
  },
];

export function AppShell() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [orbitOpen, setOrbitOpen] = useState(false);
  const { items, remove } = useOrbit();

  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setMobileNav(false);
  }, [pathname]);

  return (
    <div className="min-h-screen w-full bg-background">
      <div className="flex min-h-screen w-full">
        {/* Sidebar desktop */}
        <aside
          aria-label="Navegação do CRM"
          className={cn(
            "sticky top-0 hidden h-screen shrink-0 flex-col border-r border-line bg-navy transition-[width] duration-200 lg:flex",
            collapsed ? "w-[4.5rem]" : "w-[16rem]",
          )}
        >
          <div className="flex items-center justify-between gap-2 px-4 py-5">
            {!collapsed && (
              <Link to="/app" className="min-w-0" aria-label="NivionTech CRM — dashboard">
                <Logo variant="dark" />
              </Link>
            )}
            <button
              type="button"
              onClick={() => setCollapsed((v) => !v)}
              aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
              aria-expanded={!collapsed}
              className="grid size-9 shrink-0 place-items-center rounded-lg glass-dark text-onnavy"
            >
              {collapsed ? <PanelsTopLeft className="size-4" /> : <ChevronLeft className="size-4" />}
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-2 pb-4">
            {groups.map((group) => (
              <div key={group.label} className="mb-4">
                {!collapsed && (
                  <p className="px-3 pb-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-onnavy-muted">
                    {group.label}
                  </p>
                )}
                <ul className="grid gap-1">
                  {group.items.map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        activeOptions={{ exact: item.to === "/app" }}
                        activeProps={{ className: "bg-white/12 text-onnavy" }}
                        inactiveProps={{ className: "text-onnavy-muted hover:bg-white/8" }}
                        className={cn(
                          "flex min-h-11 items-center gap-3 rounded-lg px-3 text-support font-medium transition-colors",
                          collapsed && "justify-center px-0",
                        )}
                        title={collapsed ? item.label : undefined}
                      >
                        <item.icon className="size-4 shrink-0" aria-hidden="true" />
                        {!collapsed && <span className="truncate">{item.label}</span>}
                        {collapsed && <span className="sr-only">{item.label}</span>}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          {!collapsed && (
            <div className="m-3 rounded-xl glass-dark p-3">
              <p className="text-label font-semibold text-onnavy">Grupo Meridian</p>
              <p className="mt-0.5 text-label text-onnavy-muted">Ambiente demonstrativo</p>
            </div>
          )}
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          {/* Topbar */}
          <header className="sticky top-0 z-30 border-b border-line/80 glass px-4 py-3">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
              <div className="flex min-w-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => setMobileNav(true)}
                  aria-label="Abrir menu de navegação"
                  className="grid size-11 shrink-0 place-items-center rounded-xl hairline bg-surface lg:hidden"
                >
                  <Menu className="size-5 text-navy" />
                </button>
                <label className="hidden min-w-0 flex-1 items-center gap-2 rounded-xl surface-1 px-3 py-2 md:flex">
                  <Search className="size-4 shrink-0 text-titanium" aria-hidden="true" />
                  <span className="sr-only">Buscar no CRM</span>
                  <input
                    placeholder="Buscar clientes, oportunidades, tarefas"
                    className="min-w-0 flex-1 bg-transparent text-support outline-none placeholder:text-titanium"
                  />
                </label>
                <Link to="/" className="truncate text-label font-semibold text-titanium md:hidden">
                  NivionTech CRM
                </Link>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  aria-label="Notificações"
                  className="relative grid size-11 place-items-center rounded-xl hairline bg-surface"
                >
                  <Bell className="size-4 text-navy" aria-hidden="true" />
                  <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-danger" aria-hidden="true" />
                </button>
                <OrbitTrigger count={items.length} onClick={() => setOrbitOpen(true)} />
                <span
                  className="grid size-11 place-items-center rounded-xl bg-navy text-label font-bold text-onnavy"
                  aria-hidden="true"
                >
                  AF
                </span>
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8">
            <div className="mx-auto max-w-7xl">
              <Outlet />
            </div>
          </main>
        </div>
      </div>

      {/* Navegação mobile */}
      {mobileNav && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-nblack/45" onClick={() => setMobileNav(false)} aria-hidden="true" />
          <nav
            aria-label="Navegação do CRM"
            className="absolute inset-y-0 left-0 flex w-[17rem] flex-col bg-navy px-3 py-4"
          >
            <div className="flex items-center justify-between px-1 pb-4">
              <Logo variant="dark" />
              <button
                type="button"
                onClick={() => setMobileNav(false)}
                aria-label="Fechar menu"
                className="grid size-11 place-items-center rounded-xl glass-dark text-onnavy"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {groups.map((group) => (
                <div key={group.label} className="mb-4">
                  <p className="px-3 pb-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-onnavy-muted">
                    {group.label}
                  </p>
                  <ul className="grid gap-1">
                    {group.items.map((item) => (
                      <li key={item.to}>
                        <Link
                          to={item.to}
                          activeOptions={{ exact: item.to === "/app" }}
                          activeProps={{ className: "bg-white/12 text-onnavy" }}
                          inactiveProps={{ className: "text-onnavy-muted" }}
                          className="flex min-h-12 items-center gap-3 rounded-lg px-3 text-support font-medium"
                        >
                          <item.icon className="size-4 shrink-0" aria-hidden="true" />
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <Link to="/" className="rounded-lg glass-dark px-3 py-3 text-label font-semibold text-onnavy">
              <Building2 className="mr-2 inline size-4" aria-hidden="true" />
              Voltar ao site
            </Link>
          </nav>
        </div>
      )}

      <OrbitPanel open={orbitOpen} onClose={() => setOrbitOpen(false)} items={items} onResolve={remove} />
    </div>
  );
}

export function ShellFallback({ children }: { children: ReactNode }) {
  return <div className="p-6">{children}</div>;
}
