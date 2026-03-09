import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { GitHubRepository } from "@/types/github";

interface RepositoryLinksProps {
  repo: GitHubRepository;
}

export function RepositoryLinks({ repo }: RepositoryLinksProps) {
  return (
    <div className="flex flex-wrap gap-3 animate-fade-in stagger-4">
      <Button variant="outline" asChild>
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
          <ExternalLink className="w-4 h-4" aria-hidden="true" />
          Ver repositório
        </a>
      </Button>

      {repo.homepage && (
        <Button variant="outline" asChild>
          <a
            href={repo.homepage.startsWith("http") ? repo.homepage : `https://${repo.homepage}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
            Site / Demo
          </a>
        </Button>
      )}
    </div>
  );
}
