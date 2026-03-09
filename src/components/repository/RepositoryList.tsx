import { useSearchStore } from "@/store/searchStore";
import { RepositoryListLoading } from "@/components/repository/list/RepositoryListLoading";
import { RepositoryListError } from "@/components/repository/list/RepositoryListError";
import { RepositoryListHeader } from "@/components/repository/list/RepositoryListHeader";
import { RepositoryListEmpty } from "@/components/repository/list/RepositoryListEmpty";
import { RepositoryListItems } from "@/components/repository/list/RepositoryListItems";

export function RepositoryList() {
  const {
    isLoadingRepos,
    reposError,
    sortOption,
    setSortOption,
    getSortedRepositories,
  } = useSearchStore();

  const sortedRepos = getSortedRepositories();

  if (isLoadingRepos) {
    return <RepositoryListLoading />;
  }

  if (reposError) {
    return <RepositoryListError message={reposError} />;
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
    </section>
  );
}
