import {
  Code,
  Clock,
  Scale,
  Tag,
  GitBranch,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { GitHubRepository } from "@/types/github";
import { formatDate, formatRelativeDate } from "@/utils/format";
import { getLanguageColor } from "@/utils/languageColors";

interface RepositoryDetailsSectionProps {
  repo: GitHubRepository;
}

export function RepositoryDetailsSection({ repo }: RepositoryDetailsSectionProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in stagger-3">
      <Card className="border-border/60">
        <CardContent className="p-5 space-y-4">
          <h2 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">
            Detalhes
          </h2>

          <dl className="space-y-3">
            {repo.language && (
              <DetailRow
                icon={<Code className="w-4 h-4" />}
                label="Linguagem principal"
                value={
                  <span className="flex items-center gap-1.5">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getLanguageColor(repo.language) }}
                      aria-hidden="true"
                    />
                    {repo.language}
                  </span>
                }
              />
            )}

            <DetailRow
              icon={<GitBranch className="w-4 h-4" />}
              label="Branch padrão"
              value={
                <span className="font-mono text-sm bg-secondary px-2 py-0.5 rounded">
                  {repo.default_branch}
                </span>
              }
            />

            {repo.license && (
              <DetailRow
                icon={<Scale className="w-4 h-4" />}
                label="Licença"
                value={repo.license.name}
              />
            )}

            <DetailRow
              icon={<Clock className="w-4 h-4" />}
              label="Última atualização"
              value={`${formatRelativeDate(repo.updated_at)} (${formatDate(repo.updated_at)})`}
            />

            <DetailRow
              icon={<Tag className="w-4 h-4" />}
              label="Criado em"
              value={formatDate(repo.created_at)}
            />
          </dl>
        </CardContent>
      </Card>

      {repo.topics && repo.topics.length > 0 && (
        <Card className="border-border/60">
          <CardContent className="p-5">
            <h2 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">
              Tópicos
            </h2>
            <div className="flex flex-wrap gap-2">
              {repo.topics.map((topic) => (
                <span
                  key={topic}
                  className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary/90 font-medium border border-primary/20"
                >
                  {topic}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-2">
      <span
        className="text-muted-foreground mt-0.5 shrink-0"
        aria-hidden="true"
      >
        {icon}
      </span>
      <div className="flex-1 min-w-0">
        <dt className="text-xs text-muted-foreground mb-0.5">{label}</dt>
        <dd className="text-sm font-medium">{value}</dd>
      </div>
    </div>
  );
}
