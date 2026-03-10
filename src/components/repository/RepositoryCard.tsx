import { useNavigate } from 'react-router-dom'
import { Star, GitFork, Eye, Clock, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import type { GitHubRepository } from '@/types/github'
import { formatNumber, formatRelativeDate } from '@/utils/format'
import { getLanguageColor } from '@/utils/languageColors'
import { cn } from '@/utils/cn'

interface RepositoryCardProps {
  repo: GitHubRepository
  index?: number
}

export function RepositoryCard({ repo, index = 0 }: RepositoryCardProps) {
  const navigate = useNavigate()

  function handleClick() {
    navigate(`/user/${repo.owner.login}/repo/${repo.name}`)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={`Ver detalhes do repositório ${repo.name}`}
      className={cn(
        'cursor-pointer card-hover border-border/60',
        `stagger-${Math.min((index % 5) + 1, 5)}`,
      )}
    >
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <h3 className="font-bold text-base text-foreground font-mono truncate">
                {repo.name}
              </h3>
              {repo.fork && (
                <Badge variant="muted" className="text-[10px] px-1.5 py-0">
                  fork
                </Badge>
              )}
              {repo.archived && (
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                  arquivado
                </Badge>
              )}
            </div>

            {repo.description && (
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
                {repo.description}
              </p>
            )}

            {repo.topics && repo.topics.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {repo.topics
                  .filter((topic) => topic !== repo.name)
                  .slice(0, 4)
                  .map((topic) => (
                    <span
                      key={topic}
                      className="text-[11px] px-2 py-0.5 rounded-full bg-primary/10 text-primary/80 font-medium border border-primary/20"
                    >
                      {topic}
                    </span>
                  ))}
                {repo.topics.length > 4 && (
                  <span className="text-[11px] text-muted-foreground px-1">
                    +{repo.topics.length - 4}
                  </span>
                )}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
              {repo.language && (
                <span className="flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: getLanguageColor(repo.language) }}
                    aria-hidden="true"
                  />
                  {repo.language}
                </span>
              )}

              <span className="flex items-center gap-1" title={`${repo.stargazers_count} estrelas`}>
                <Star className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{formatNumber(repo.stargazers_count)}</span>
              </span>

              {repo.forks_count > 0 && (
                <span className="flex items-center gap-1" title={`${repo.forks_count} forks`}>
                  <GitFork className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{formatNumber(repo.forks_count)}</span>
                </span>
              )}

              {repo.watchers_count > 0 && repo.watchers_count !== repo.stargazers_count && (
                <span className="flex items-center gap-1" title={`${repo.watchers_count} watchers`}>
                  <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{formatNumber(repo.watchers_count)}</span>
                </span>
              )}

              <span
                className="flex items-center gap-1 ml-auto"
                title={`Atualizado ${formatRelativeDate(repo.updated_at)}`}
              >
                <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{formatRelativeDate(repo.updated_at)}</span>
              </span>
            </div>
          </div>

          <ArrowRight
            className="w-4 h-4 text-muted-foreground/40 shrink-0 mt-1 group-hover:text-primary transition-colors"
            aria-hidden="true"
          />
        </div>
      </CardContent>
    </Card>
  )
}
