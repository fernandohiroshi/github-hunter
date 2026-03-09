import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type {
  GitHubUser,
  GitHubRepository,
  SearchState,
  SortOption,
} from "@/types/github";
import { fetchUser, fetchUserRepositories } from "@/services/github";
import { sortRepositories } from "@/utils/sort";

interface SearchActions {
  searchUser: (username: string) => Promise<void>;
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
  userError: null,
  reposError: null,
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
          userError: null,
          reposError: null,
          user: null,
          repositories: [],
        });

        // Fetch user and repositories in parallel
        const [userResult, reposResult] = await Promise.allSettled([
          fetchUser(trimmed),
          fetchUserRepositories(trimmed),
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
          set({ repositories: reposResult.value, isLoadingRepos: false });
        } else {
          set({
            reposError: (reposResult.reason as Error).message,
            isLoadingRepos: false,
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
