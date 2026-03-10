import { useEffect, useRef } from 'react'
import type { GitHubRepository } from '@/types/github'
import { RepositoryCard } from '@/components/repository/RepositoryCard'

interface RepositoryListItemsProps {
  repos: GitHubRepository[]
}

export function RepositoryListItems({ repos }: RepositoryListItemsProps) {
  const listRef = useRef<HTMLUListElement | null>(null)

  useEffect(() => {
    const listEl = listRef.current
    if (!listEl) return

    const items = Array.from(
      listEl.querySelectorAll<HTMLLIElement>('li[data-reveal="true"]'),
    ).filter((el) => el.classList.contains('opacity-0'))
    if (items.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const el = entry.target as HTMLElement
          requestAnimationFrame(() => {
            el.classList.remove('opacity-0', 'translate-y-2')
            el.classList.add('opacity-100', 'translate-y-0')
          })
          observer.unobserve(el)
        }
      },
      { threshold: 0.12 },
    )

    for (const el of items) observer.observe(el)
    return () => observer.disconnect()
  }, [repos.length])

  return (
    <ul ref={listRef} className="space-y-3" role="list">
      {repos.map((repo, index) => (
        <li
          key={repo.id}
          role="listitem"
          data-reveal="true"
          className="opacity-0 translate-y-2 transition-all duration-500 ease-out will-change-transform motion-reduce:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-none"
        >
          <RepositoryCard repo={repo} index={index} />
        </li>
      ))}
    </ul>
  )
}
