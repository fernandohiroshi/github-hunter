export interface GitHubUser {
  id: number
  login: string
  name: string | null
  avatar_url: string
  html_url: string
  bio: string | null
  email: string | null
  location: string | null
  company: string | null
  blog: string | null
  twitter_username: string | null
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: string
  updated_at: string
}

export interface GitHubRepository {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  clone_url: string
  ssh_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  watchers_count: number
  forks_count: number
  open_issues_count: number
  size: number
  default_branch: string
  topics: string[]
  private: boolean
  fork: boolean
  archived: boolean
  created_at: string
  updated_at: string
  pushed_at: string
  owner: {
    login: string
    avatar_url: string
    html_url: string
  }
  license: {
    name: string
    spdx_id: string
  } | null
  visibility: string
}

export type SortOption =
  | 'stars-desc'
  | 'stars-asc'
  | 'name-asc'
  | 'name-desc'
  | 'updated-desc'
  | 'updated-asc'

export interface SearchState {
  query: string
  user: GitHubUser | null
  repositories: GitHubRepository[]
  isLoadingUser: boolean
  isLoadingRepos: boolean
  isLoadingMoreRepos: boolean
  userError: string | null
  reposError: string | null
  reposLoadMoreError: string | null
  reposNextPage: number
  reposHasMore: boolean
  sortOption: SortOption
}
