import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { FilterBar, GhostButton, PageHeader, PrimaryButton } from "@/components/crm/primitives";
import { PipelineBoard } from "@/components/crm/PipelineBoard";
import { NewOpportunityModal } from "@/components/crm/NewOpportunityModal";

const title = "Pipeline de vendas — NivionTech CRM";
const description = "Funil comercial com etapas, valores, saúde da negociação e próximo passo de cada oportunidade.";

export const Route = createFileRoute("/app/pipeline")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PipelinePage,
});

function PipelinePage() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Comercial"
        title="Pipeline de vendas"
        description="Arraste no desktop ou use os botões de etapa no celular. Cada card mostra valor, saúde e próximo passo."
        actions={
          <>
            <GhostButton>Exportar</GhostButton>
            <PrimaryButton onClick={() => setOpen(true)}>
              <Plus className="size-4" aria-hidden="true" />
              Nova oportunidade
            </PrimaryButton>
          </>
        }
      />

      <FilterBar
        query={query}
        onQuery={setQuery}
        placeholder="Buscar oportunidade ou empresa"
        filters={[
          { label: "Todas", value: "todos" },
          { label: "Em risco", value: "risco" },
          { label: "Minhas", value: "Ana" },
        ]}
      />

      <PipelineBoard />

      <NewOpportunityModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
