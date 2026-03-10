import { Clock, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'

interface SearchHistoryProps {
  items: string[]
  onSelect: (username: string) => void
  onRemove: (username: string) => void
  className?: string
}

export function SearchHistory({ items, onSelect, onRemove, className }: SearchHistoryProps) {
  if (items.length === 0) return null

  return (
    <div className={cn('mt-3', className)} aria-label="Histórico de buscas">
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
        <Clock className="w-3.5 h-3.5" aria-hidden="true" />
        <span>Recentes</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {items.map((username) => (
          <div key={username} className="inline-flex items-center rounded-md bg-secondary">
            <button
              type="button"
              className="h-8 px-3 font-mono text-xs text-secondary-foreground hover:bg-secondary/80 rounded-l-md transition-colors"
              onClick={() => onSelect(username)}
              aria-label={`Buscar novamente: ${username}`}
            >
              {username}
            </button>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-l-none rounded-r-md text-muted-foreground hover:text-foreground"
              aria-label={`Remover do histórico: ${username}`}
              onClick={(e) => {
                e.stopPropagation()
                onRemove(username)
              }}
            >
              <X className="w-3.5 h-3.5" aria-hidden="true" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
