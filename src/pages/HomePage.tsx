import { useState } from "react";
import { Github, Star, GitFork, Users } from "lucide-react";
import { SearchBar } from "@/components/search/SearchBar";

const FEATURES = [
  {
    icon: <Users className="w-5 h-5" />,
    title: "Perfis de Usuários",
    description: "Seguidores, seguidos, bio, e-mail e muito mais.",
  },
  {
    icon: <Star className="w-5 h-5" />,
    title: "Repositórios Ordenados",
    description: "Veja todos os repositórios, ordenados como preferir.",
  },
  {
    icon: <GitFork className="w-5 h-5" />,
    title: "Detalhes Completos",
    description: "Linguagem, estrelas, forks, descrição e link direto.",
  },
];

export function HomePage() {
  const exampleUsername = "fernandohiroshi";
  const [tooltipText, setTooltipText] = useState("Copiar");

  async function handleCopyExample() {
    try {
      await navigator.clipboard.writeText(exampleUsername);
      setTooltipText("Copiado!");
      window.setTimeout(() => setTooltipText("Copiar"), 1200);
    } catch {
      // ignore
    }
  }

  return (
    <main className="container mx-auto px-4 max-w-3xl py-16 sm:py-24">
      {/* Hero */}
      <div className="text-center mb-12 animate-fade-in">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center">
            <Github className="w-8 h-8 text-primary" aria-hidden="true" />
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight mb-4">
          GitHub <span className="text-gradient">Hunter</span>
        </h1>

        <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
          Explore perfis e repositórios públicos do GitHub de forma rápida e
          intuitiva.
        </p>
      </div>

      {/* Search */}
      <div className="animate-fade-in stagger-2 mb-16">
        <SearchBar autoFocus size="lg" />
        <p className="text-xs text-muted-foreground text-center mt-3">
          Ex:{" "}
          <button
            type="button"
            onClick={handleCopyExample}
            onMouseLeave={() => setTooltipText("Copiar")}
            className="group font-mono text-primary/70 relative inline-flex items-center cursor-pointer hover:text-primary transition-colors"
            aria-label="Copiar usuário de exemplo"
          >
            {exampleUsername}
            <span className="absolute left-1/2 -translate-x-1/2 -top-7 rounded-md border border-border/60 bg-popover px-2 py-1 text-[10px] text-foreground shadow-sm opacity-0 pointer-events-none transition-opacity duration-150 group-hover:opacity-100">
              {tooltipText}
            </span>
          </button>
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in stagger-3">
        {FEATURES.map((feature) => (
          <div
            key={feature.title}
            className="rounded-xl border border-border/60 bg-card p-5 text-center"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mx-auto mb-3">
              {feature.icon}
            </div>
            <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
