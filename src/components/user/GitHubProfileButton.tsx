import { ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface GitHubProfileButtonProps {
  htmlUrl: string
}

export function GitHubProfileButton({ htmlUrl }: GitHubProfileButtonProps) {
  return (
    <Button variant="outline" size="sm" asChild className="shrink-0 mx-auto sm:mx-0">
      <a href={htmlUrl} target="_blank" rel="noopener noreferrer" aria-label="Ver no GitHub">
        <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
        Ver no GitHub
      </a>
    </Button>
  )
}
