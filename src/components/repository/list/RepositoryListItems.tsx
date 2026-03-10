import type { GitHubRepository } from '@/types/github'
import { RepositoryCard } from '@/components/repository/RepositoryCard'

interface RepositoryListItemsProps {
  repos: GitHubRepository[]
}

export function RepositoryListItems({ repos }: RepositoryListItemsProps) {
  return (
    <ul className="space-y-3" role="list">
      {repos.map((repo, index) => (
        <li key={repo.id} role="listitem">
          <RepositoryCard repo={repo} index={index} />
        </li>
      ))}
    </ul>
  )
}
