import { ExternalLink } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/utils/cn'

export interface FeaturedRepository {
  name: string
  owner: string
  description: string
  url: string
}

interface FeaturedRepositoryCardProps {
  repo: FeaturedRepository
  onSelectOwner: (owner: string) => void
  className?: string
}

export function FeaturedRepositoryCard({
  repo,
  onSelectOwner,
  className,
}: FeaturedRepositoryCardProps) {
  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={() => onSelectOwner(repo.owner)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelectOwner(repo.owner)
        }
      }}
      aria-label={`Buscar usuário ${repo.owner}`}
      className={cn('cursor-pointer card-hover border-border/60', className)}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <h3 className="font-bold text-base text-foreground font-mono truncate">
                {repo.name}
              </h3>
              <span className="text-xs text-muted-foreground font-mono">@{repo.owner}</span>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {repo.description}
            </p>
          </div>

          <a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-muted-foreground/60 hover:text-foreground transition-colors"
            aria-label={`Abrir ${repo.owner}/${repo.name} no GitHub`}
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </CardContent>
    </Card>
  )
}
