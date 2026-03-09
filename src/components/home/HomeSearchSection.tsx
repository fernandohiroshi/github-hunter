import { useState } from "react";
import { SearchBar } from "@/components/search/SearchBar";

interface HomeSearchSectionProps {
  exampleUsername?: string;
}

export function HomeSearchSection({
  exampleUsername = "fernandohiroshi",
}: HomeSearchSectionProps) {
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
  );
}
