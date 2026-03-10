import { useEffect, useRef } from 'react'
import { useSearchStore } from '@/store/searchStore'
import { RepositoryListLoading } from '@/components/repository/list/RepositoryListLoading'
import { RepositoryListError } from '@/components/repository/list/RepositoryListError'
import { RepositoryListHeader } from '@/components/repository/list/RepositoryListHeader'
import { RepositoryListEmpty } from '@/components/repository/list/RepositoryListEmpty'
import { RepositoryListItems } from '@/components/repository/list/RepositoryListItems'

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

  const loadMoreRef = useRef<HTMLDivElement | null>(null)
  const loadLockRef = useRef(false)

  const sortedRepos = getSortedRepositories()

  useEffect(() => {
    const el = loadMoreRef.current
    if (!el) return
    if (!reposHasMore) return

    if (!isLoadingMoreRepos) {
      loadLockRef.current = false
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry?.isIntersecting) return
        if (!reposHasMore) return
        if (isLoadingMoreRepos) return
        if (loadLockRef.current) return
        loadLockRef.current = true
        loadMoreRepos()
      },
      {
        root: null,
        rootMargin: '240px 0px',
        threshold: 0,
      },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [reposHasMore, isLoadingMoreRepos, loadMoreRepos])

  if (isLoadingRepos) {
    return <RepositoryListLoading />
  }

  if (reposError) {
    return <RepositoryListError message={reposError} />
  }

  return (
    <section aria-label="Repositórios públicos">
      <RepositoryListHeader
        total={sortedRepos.length}
        sortOption={sortOption}
        onSortChange={setSortOption}
      />

      {sortedRepos.length === 0 && <RepositoryListEmpty />}

      {sortedRepos.length > 0 && <RepositoryListItems repos={sortedRepos} />}

      {sortedRepos.length > 0 && (
        <div className="mt-6 flex flex-col items-center gap-3">
          {reposLoadMoreError && (
            <p className="text-sm text-destructive text-center">{reposLoadMoreError}</p>
          )}

          <div className="w-full" aria-hidden="true">
            <div ref={loadMoreRef} className="h-px w-full" />
          </div>

          <div className="h-6 flex items-center justify-center">
            {reposHasMore && isLoadingMoreRepos && (
              <p className="text-xs text-muted-foreground">Carregando...</p>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
