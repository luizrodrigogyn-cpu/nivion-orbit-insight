import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/nivion/Nav";
import { Hero } from "@/components/nivion/Hero";
import { Benefits } from "@/components/nivion/Benefits";
import { Pipeline } from "@/components/nivion/Pipeline";
import { Orbit } from "@/components/nivion/Orbit";
import { Features } from "@/components/nivion/Features";
import { Security } from "@/components/nivion/Security";
import { Audience } from "@/components/nivion/Audience";
import { FinalCta } from "@/components/nivion/FinalCta";
import { Footer } from "@/components/nivion/Footer";

const title = "NivionTech CRM — Gestão comercial sob controle";
const description =
  "O NivionTech CRM reúne clientes, oportunidades, tarefas e inteligência comercial em uma experiência simples, visual e segura.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Nav />
      <main>
        <Hero />
        <Benefits />
        <Pipeline />
        <Orbit />
        <Features />
        <Security />
        <Audience />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
