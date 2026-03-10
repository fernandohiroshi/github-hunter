import { useState } from 'react'
import { SearchBar } from '@/components/search/SearchBar'

interface HomeSearchSectionProps {
  exampleUsernames?: string[]
}

export function HomeSearchSection({
  exampleUsernames = ['fernandohiroshi', 'vercel', 'shadcn'],
}: HomeSearchSectionProps) {
  const [tooltipText, setTooltipText] = useState('Copiar')
  const [activeTooltipUsername, setActiveTooltipUsername] = useState<string | null>(null)

  async function handleCopyExample(username: string) {
    try {
      await navigator.clipboard.writeText(username)
      setActiveTooltipUsername(username)
      setTooltipText('Copiado!')
      window.setTimeout(() => setTooltipText('Copiar'), 1200)
    } catch {
      // ignore
    }
  }

  function handleMouseLeave(username: string) {
    if (activeTooltipUsername === username) {
      setActiveTooltipUsername(null)
    }
    setTooltipText('Copiar')
  }

  return (
    <div className="animate-fade-in stagger-2">
      <SearchBar autoFocus size="lg" />
      <p className="text-xs text-muted-foreground text-center mt-3">
        Ex:{' '}
        {exampleUsernames.map((username, index) => (
          <span key={username}>
            {index > 0 ? ', ' : null}
            <button
              type="button"
              onClick={() => handleCopyExample(username)}
              onMouseLeave={() => handleMouseLeave(username)}
              className="group font-mono text-primary/70 relative inline-flex items-center cursor-pointer hover:text-primary transition-colors"
              aria-label={`Copiar usuário de exemplo: ${username}`}
            >
              {username}
              <span className="absolute left-1/2 -translate-x-1/2 -top-7 rounded-md border border-border/60 bg-popover px-2 py-1 text-[10px] text-foreground shadow-sm opacity-0 pointer-events-none transition-opacity duration-150 group-hover:opacity-100">
                {activeTooltipUsername === username ? tooltipText : 'Copiar'}
              </span>
            </button>
          </span>
        ))}
      </p>
    </div>
  )
}
