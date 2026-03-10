import { useSearchStore } from '@/store/searchStore'
import { RepositoryListLoading } from '@/components/repository/list/RepositoryListLoading'
import { RepositoryListError } from '@/components/repository/list/RepositoryListError'
import { RepositoryListHeader } from '@/components/repository/list/RepositoryListHeader'
import { RepositoryListEmpty } from '@/components/repository/list/RepositoryListEmpty'
import { RepositoryListItems } from '@/components/repository/list/RepositoryListItems'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

export function RepositoryList() {
  const {
    isLoadingRepos,
    isLoadingMoreRepos,
    reposError,
    reposLoadMoreError,
    reposHasMore,
    loadMoreRepos,
    sortOption,
    setSortOption,
    getSortedRepositories,
  } = useSearchStore()

  const sortedRepos = getSortedRepositories()

  if (isLoadingRepos) {
    return <RepositoryListLoading />
  }

  if (reposError) {
    return <RepositoryListError message={reposError} />
  }

  return (
    <section aria-label="Repositórios públicos">
      {/* Header */}
      <RepositoryListHeader
        total={sortedRepos.length}
        sortOption={sortOption}
        onSortChange={setSortOption}
      />

      {/* Empty state */}
      {sortedRepos.length === 0 && <RepositoryListEmpty />}

      {/* List */}
      {sortedRepos.length > 0 && <RepositoryListItems repos={sortedRepos} />}

      {/* Pagination */}
      {sortedRepos.length > 0 && (
        <div className="mt-6 flex flex-col items-center gap-3">
          {reposLoadMoreError && (
            <p className="text-sm text-destructive text-center">{reposLoadMoreError}</p>
          )}

          {reposHasMore && (
            <Button
              type="button"
              variant="outline"
              onClick={() => loadMoreRepos()}
              disabled={isLoadingMoreRepos}
              aria-label="Carregar mais repositórios"
            >
              {isLoadingMoreRepos && (
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
              )}
              {isLoadingMoreRepos ? 'Carregando...' : 'Carregar mais'}
            </Button>
          )}
        </div>
      )}
    </section>
  )
}
