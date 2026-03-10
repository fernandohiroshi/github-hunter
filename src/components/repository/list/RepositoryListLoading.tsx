import { RepositoryCardSkeleton } from '@/components/repository/RepositoryCardSkeleton'
import { Skeleton } from '@/components/ui/skeleton'

export function RepositoryListLoading() {
  return (
    <section aria-label="Carregando repositórios">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-10 w-52" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <RepositoryCardSkeleton key={i} />
        ))}
      </div>
    </section>
  )
}
