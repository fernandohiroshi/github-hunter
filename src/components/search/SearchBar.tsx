import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearchStore } from "@/store/searchStore";
import { cn } from "@/utils/cn";

interface SearchBarProps {
  autoFocus?: boolean;
  size?: "default" | "lg";
  className?: string;
}

export function SearchBar({
  autoFocus = false,
  size = "default",
  className,
}: SearchBarProps) {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { isLoadingUser, query } = useSearchStore();

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    if (query) setInputValue(query);
  }, [query]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed || isLoadingUser) return;
    navigate(`/user/${trimmed}`);
  }

  const isLarge = size === "lg";

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex gap-2 w-full", className)}
      role="search"
      aria-label="Buscar usuário do GitHub"
    >
      <div className="relative flex-1">
        <Search
          className={cn(
            "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none",
            isLarge ? "w-5 h-5" : "w-4 h-4",
          )}
          aria-hidden="true"
        />
        <Input
          ref={inputRef}
          type="search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Digite um nome de usuário do GitHub..."
          aria-label="Nome de usuário do GitHub"
          disabled={isLoadingUser}
          className={cn(
            "transition-all duration-200 border-border/70 focus:border-primary/50",
            isLarge ? "h-12 pl-11 text-base" : "pl-9",
          )}
          maxLength={39}
          pattern="[a-zA-Z0-9]([a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?"
          title="Nome de usuário GitHub válido"
        />
      </div>

      <Button
        type="submit"
        disabled={!inputValue.trim() || isLoadingUser}
        className={cn("shrink-0", isLarge && "h-12 px-6")}
        aria-label={isLoadingUser ? "Buscando..." : "Buscar usuário"}
      >
        {isLoadingUser ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            <span className="sr-only">Buscando...</span>
          </>
        ) : (
          <>
            <Search className="w-4 h-4" aria-hidden="true" />
            <span className={cn("hidden", isLarge && "sm:block")}>Buscar</span>
          </>
        )}
      </Button>
    </form>
  );
}
