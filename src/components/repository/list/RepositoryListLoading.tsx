import { RepositoryCardSkeleton } from "@/components/repository/RepositoryCardSkeleton";

export function RepositoryListLoading() {
  return (
    <section aria-label="Carregando repositórios">
      <div className="flex items-center justify-between mb-4">
        <div className="h-6 w-32 shimmer rounded" />
        <div className="h-10 w-52 shimmer rounded-md" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <RepositoryCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}
