import type { GitHubRepository, SortOption } from '@/types/github'

export function sortRepositories(
  repos: GitHubRepository[],
  option: SortOption,
): GitHubRepository[] {
  const sorted = [...repos]

  switch (option) {
    case 'stars-desc':
      return sorted.sort((a, b) => b.stargazers_count - a.stargazers_count)

    case 'stars-asc':
      return sorted.sort((a, b) => a.stargazers_count - b.stargazers_count)

    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name))

    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name))

    case 'updated-desc':
      return sorted.sort(
        (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
      )

    case 'updated-asc':
      return sorted.sort(
        (a, b) => new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime(),
      )

    default:
      return sorted
  }
}

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'stars-desc', label: '⭐ Estrelas (maior primeiro)' },
  { value: 'stars-asc', label: '⭐ Estrelas (menor primeiro)' },
  { value: 'name-asc', label: '🔤 Nome (A → Z)' },
  { value: 'name-desc', label: '🔤 Nome (Z → A)' },
  { value: 'updated-desc', label: '🕐 Atualização (mais recente)' },
  { value: 'updated-asc', label: '🕐 Atualização (mais antiga)' },
]
