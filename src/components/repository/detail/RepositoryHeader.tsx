import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { GitHubRepository } from "@/types/github";

interface RepositoryHeaderProps {
  username: string;
  repo: GitHubRepository;
}

export function RepositoryHeader({ username, repo }: RepositoryHeaderProps) {
  return (
    <div className="animate-fade-in stagger-1">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-muted-foreground font-mono text-sm">
              {username} /
            </span>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight">
              {repo.name}
            </h1>
            {repo.fork && <Badge variant="muted">fork</Badge>}
            {repo.archived && <Badge variant="secondary">arquivado</Badge>}
            <Badge variant="outline" className="capitalize text-xs">
              {repo.visibility}
            </Badge>
          </div>

          {repo.description && (
            <p className="text-muted-foreground leading-relaxed max-w-2xl">
              {repo.description}
            </p>
          )}
        </div>

        <Button asChild className="shrink-0">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Abrir ${repo.name} no GitHub`}
          >
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
            Abrir no GitHub
          </a>
        </Button>
      </div>
    </div>
  );
}
