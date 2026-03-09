import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Star,
  GitFork,
  Eye,
  Code,
  ExternalLink,
  AlertCircle,
  ArrowLeft,
  Clock,
  Scale,
  Tag,
  GitBranch,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { ErrorMessage } from "@/components/ui/error-message";
import { useSearchStore } from "@/store/searchStore";
import { fetchUserRepositories } from "@/services/github";
import type { GitHubRepository } from "@/types/github";
import { formatNumber, formatDate, formatRelativeDate } from "@/utils/format";
import { getLanguageColor } from "@/utils/languageColors";

export function RepositoryDetailPage() {
  const { username, repoName } = useParams<{
    username: string;
    repoName: string;
  }>();
  const { repositories } = useSearchStore();

  const [repo, setRepo] = useState<GitHubRepository | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Try to find the repo in existing store data first
    const found = repositories.find(
      (r) => r.name === repoName && r.owner.login === username,
    );

    if (found) {
      setRepo(found);
      setIsLoading(false);
      return;
    }

    // Fallback: fetch from API
    async function loadRepo() {
      if (!username || !repoName) return;
      setIsLoading(true);
      setError(null);
      try {
        const repos = await fetchUserRepositories(username);
        const found = repos.find((r) => r.name === repoName);
        if (found) {
          setRepo(found);
        } else {
          setError("Repositório não encontrado.");
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    }

    loadRepo();
  }, [username, repoName, repositories]);

  if (isLoading) {
    return <RepositoryDetailSkeleton username={username ?? ""} />;
  }

  if (error || !repo) {
    return (
      <main className="container mx-auto px-4 max-w-4xl py-8">
        <Link
          to={`/user/${username}`}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Voltar para {username}
        </Link>
        <ErrorMessage
          title="Repositório não encontrado"
          message={error ?? "Não foi possível carregar este repositório."}
        />
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 max-w-4xl py-8 space-y-6">
      {/* Breadcrumb */}
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

      {/* Header */}
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

      <Separator />

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 animate-fade-in stagger-2">
        <StatCard
          icon={<Star className="w-4 h-4 text-yellow-400" />}
          label="Estrelas"
          value={formatNumber(repo.stargazers_count)}
        />
        <StatCard
          icon={<GitFork className="w-4 h-4 text-blue-400" />}
          label="Forks"
          value={formatNumber(repo.forks_count)}
        />
        <StatCard
          icon={<Eye className="w-4 h-4 text-purple-400" />}
          label="Watchers"
          value={formatNumber(repo.watchers_count)}
        />
        <StatCard
          icon={<AlertCircle className="w-4 h-4 text-orange-400" />}
          label="Issues abertas"
          value={formatNumber(repo.open_issues_count)}
        />
      </div>

      {/* Details */}
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
                        style={{
                          backgroundColor: getLanguageColor(repo.language),
                        }}
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

        {/* Topics */}
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

      {/* Links */}
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
              href={
                repo.homepage.startsWith("http")
                  ? repo.homepage
                  : `https://${repo.homepage}`
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
              Site / Demo
            </a>
          </Button>
        )}
      </div>
    </main>
  );
}

/* ── Sub-components ── */

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <Card className="border-border/60">
      <CardContent className="p-4 text-center">
        <div className="flex justify-center mb-1.5" aria-hidden="true">
          {icon}
        </div>
        <p className="text-2xl font-bold font-mono">{value}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
      </CardContent>
    </Card>
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

function RepositoryDetailSkeleton({ username }: { username: string }) {
  return (
    <main className="container mx-auto px-4 max-w-4xl py-8 space-y-6">
      <Link
        to={`/user/${username}`}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar para @{username}
      </Link>

      <div className="space-y-3">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-full max-w-lg" />
        <Skeleton className="h-4 w-3/4 max-w-md" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-xl" />
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Skeleton className="h-48 rounded-xl" />
        <Skeleton className="h-48 rounded-xl" />
      </div>
    </main>
  );
}
