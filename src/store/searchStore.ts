import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type {
  GitHubUser,
  GitHubRepository,
  SearchState,
  SortOption,
} from "@/types/github";
import { fetchUser, fetchUserRepositoriesPage } from "@/services/github";
import { sortRepositories } from "@/utils/sort";

interface SearchActions {
  searchUser: (username: string) => Promise<void>;
  loadMoreRepos: () => Promise<void>;
  setSortOption: (option: SortOption) => void;
  clearSearch: () => void;
  getSortedRepositories: () => GitHubRepository[];
}

type SearchStore = SearchState & SearchActions;

const initialState: SearchState = {
  query: "",
  user: null,
  repositories: [],
  isLoadingUser: false,
  isLoadingRepos: false,
  isLoadingMoreRepos: false,
  userError: null,
  reposError: null,
  reposLoadMoreError: null,
  reposNextPage: 1,
  reposHasMore: false,
  sortOption: "stars-desc",
};

export const useSearchStore = create<SearchStore>()(
  devtools(
    (set, get) => ({
      ...initialState,

      searchUser: async (username: string) => {
        const trimmed = username.trim();
        if (!trimmed) return;

        set({
          query: trimmed,
          isLoadingUser: true,
          isLoadingRepos: true,
          isLoadingMoreRepos: false,
          userError: null,
          reposError: null,
          reposLoadMoreError: null,
          user: null,
          repositories: [],
          reposNextPage: 1,
          reposHasMore: false,
        });

        const perPage = 30;

        const reposTask = (async () => {
          const first = await fetchUserRepositoriesPage(trimmed, 1, perPage);
          const repos = first.data;
          const nextPage = 2;
          const hasMore = first.hasMore;

          return { repos, hasMore, nextPage };
        })();

        // Fetch user and first pages of repositories in parallel
        const [userResult, reposResult] = await Promise.allSettled([
          fetchUser(trimmed),
          reposTask,
        ]);

        if (userResult.status === "fulfilled") {
          set({ user: userResult.value, isLoadingUser: false });
        } else {
          set({
            userError: (userResult.reason as Error).message,
            isLoadingUser: false,
          });
        }

        if (reposResult.status === "fulfilled") {
          set({
            repositories: reposResult.value.repos,
            reposHasMore: reposResult.value.hasMore,
            reposNextPage: reposResult.value.nextPage,
            isLoadingRepos: false,
          });
        } else {
          set({
            reposError: (reposResult.reason as Error).message,
            isLoadingRepos: false,
          });
        }
      },

      loadMoreRepos: async () => {
        const {
          query,
          reposHasMore,
          reposNextPage,
          isLoadingRepos,
          isLoadingMoreRepos,
        } = get();

        if (!query) return;
        if (!reposHasMore) return;
        if (isLoadingRepos || isLoadingMoreRepos) return;

        set({ isLoadingMoreRepos: true, reposLoadMoreError: null });

        try {
          const perPage = 30;
          const result = await fetchUserRepositoriesPage(
            query,
            reposNextPage,
            perPage,
          );

          set((state) => ({
            repositories: state.repositories.concat(result.data),
            reposHasMore: result.hasMore,
            reposNextPage: state.reposNextPage + 1,
            isLoadingMoreRepos: false,
          }));
        } catch (error) {
          set({
            reposLoadMoreError: (error as Error).message,
            isLoadingMoreRepos: false,
          });
        }
      },

      setSortOption: (option: SortOption) => {
        set({ sortOption: option });
      },

      clearSearch: () => {
        set(initialState);
      },

      getSortedRepositories: () => {
        const { repositories, sortOption } = get();
        return sortRepositories(repositories, sortOption);
      },
    }),
    { name: "github-hunter-store" },
  ),
);

// Selectors
export const selectUser = (state: SearchStore): GitHubUser | null => state.user;
export const selectRepositories = (state: SearchStore): GitHubRepository[] =>
  state.repositories;
export const selectIsLoading = (state: SearchStore): boolean =>
  state.isLoadingUser || state.isLoadingRepos;
export const selectSortOption = (state: SearchStore): SortOption =>
  state.sortOption;
