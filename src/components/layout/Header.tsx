import { Link, useNavigate } from "react-router-dom";
import { Github, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearchStore } from "@/store/searchStore";

export function Header() {
  const { query, clearSearch } = useSearchStore();
  const navigate = useNavigate();

  function handleLogoClick() {
    clearSearch();
    navigate("/");
  }

  return (
    <header className="sticky top-0 z-50 glass border-b border-border">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-2 group"
            aria-label="Voltar para início"
          >
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Github className="w-4 h-4 text-primary" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight hidden sm:block">
              GitHub <span className="text-gradient">Hunter</span>
            </span>
          </button>

          {query && (
            <div className="flex items-center gap-2 animate-fade-in">
              <span className="text-sm text-muted-foreground hidden sm:block">
                Buscando:
              </span>
              <Link
                to={`/user/${query}`}
                className="flex items-center gap-1.5 text-sm font-mono text-primary hover:text-primary/80 transition-colors"
              >
                <Search className="w-3 h-3" />
                {query}
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={handleLogoClick}
                aria-label="Limpar busca"
              >
                <X className="w-3.5 h-3.5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
