import { SlidersHorizontal } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { RepositoryCard } from './RepositoryCard'
import { RepositoryCardSkeleton } from './RepositoryCardSkeleton'
import { useSearchStore } from '@/store/searchStore'
import { SORT_OPTIONS } from '@/utils/sort'
import type { SortOption } from '@/types/github'

export function RepositoryList() {
  const { isLoadingRepos, reposError, sortOption, setSortOption, getSortedRepositories } =
    useSearchStore()

  const sortedRepos = getSortedRepositories()

  if (isLoadingRepos) {
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
    )
  }

  if (reposError) {
    return (
      <section aria-label="Erro ao carregar repositórios">
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-center">
          <p className="text-destructive font-medium mb-1">Erro ao carregar repositórios</p>
          <p className="text-sm text-muted-foreground">{reposError}</p>
        </div>
      </section>
    )
  }

  return (
    <section aria-label="Repositórios públicos">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <h2 className="text-lg font-bold flex items-center gap-2">
          Repositórios
          <span className="text-sm font-normal text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
            {sortedRepos.length}
          </span>
        </h2>

        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-muted-foreground shrink-0" aria-hidden="true" />
          <Select
            value={sortOption}
            onValueChange={(value) => setSortOption(value as SortOption)}
          >
            <SelectTrigger
              className="w-full sm:w-56"
              aria-label="Ordenar repositórios por"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Empty state */}
      {sortedRepos.length === 0 && (
        <div className="rounded-xl border border-border bg-card p-12 text-center animate-fade-in">
          <p className="text-4xl mb-3" aria-hidden="true">📭</p>
          <p className="text-muted-foreground font-medium">Nenhum repositório público encontrado</p>
          <p className="text-sm text-muted-foreground/70 mt-1">
            Este usuário não possui repositórios públicos.
          </p>
        </div>
      )}

      {/* List */}
      {sortedRepos.length > 0 && (
        <ul className="space-y-3" role="list">
          {sortedRepos.map((repo, index) => (
            <li key={repo.id} role="listitem">
              <RepositoryCard repo={repo} index={index} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
