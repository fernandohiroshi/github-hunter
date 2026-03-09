import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface RepositoryBreadcrumbProps {
  username: string;
}

export function RepositoryBreadcrumb({ username }: RepositoryBreadcrumbProps) {
  return (
    <nav aria-label="Navegação" className="animate-fade-in">
      <Link
        to={`/user/${username}`}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
        Voltar para{" "}
        <span className="font-mono text-primary/70">@{username}</span>
      </Link>
    </nav>
  );
}
