import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { ErrorMessage } from "@/components/ui/error-message";
import { useSearchStore } from "@/store/searchStore";
import { fetchUserRepositories } from "@/services/github";
import type { GitHubRepository } from "@/types/github";
import { RepositoryBreadcrumb } from "@/components/repository/detail/RepositoryBreadcrumb";
import { RepositoryHeader } from "@/components/repository/detail/RepositoryHeader";
import { RepositoryStatsGrid } from "@/components/repository/detail/RepositoryStatsGrid";
import { RepositoryDetailsSection } from "@/components/repository/detail/RepositoryDetailsSection";
import { RepositoryLinks } from "@/components/repository/detail/RepositoryLinks";
import { RepositoryDetailSkeleton } from "@/components/repository/detail/RepositoryDetailSkeleton";

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
      <RepositoryBreadcrumb username={username ?? ""} />

      {/* Header */}
      <RepositoryHeader username={username ?? ""} repo={repo} />

      <Separator />

      {/* Stats grid */}
      <RepositoryStatsGrid repo={repo} />

      {/* Details */}
      <RepositoryDetailsSection repo={repo} />

      {/* Links */}
      <RepositoryLinks repo={repo} />
    </main>
  );
}
