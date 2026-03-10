import { useCallback, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'github-hunter-search-history'
const MAX_ITEMS = 5

function safeParse(value: string | null): string[] {
  if (!value) return []
  try {
    const parsed = JSON.parse(value) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed.filter((v): v is string => typeof v === 'string')
  } catch {
    return []
  }
}

function normalize(username: string): string {
  return username.trim()
}

export function useSearchHistory() {
  const [items, setItems] = useState<string[]>([])

  useEffect(() => {
    setItems(safeParse(window.localStorage.getItem(STORAGE_KEY)))
  }, [])

  const persist = useCallback((next: string[] | ((prev: string[]) => string[])) => {
    setItems((prev) => {
      const value = typeof next === 'function' ? next(prev) : next
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
      return value
    })
  }, [])

  const add = useCallback(
    (username: string) => {
      const trimmed = normalize(username)
      if (!trimmed) return

      persist((prev) => {
        const without = prev.filter((u) => u.toLowerCase() !== trimmed.toLowerCase())
        return [trimmed, ...without].slice(0, MAX_ITEMS)
      })
    },
    [persist],
  )

  const remove = useCallback(
    (username: string) => {
      const trimmed = normalize(username)
      if (!trimmed) return
      persist((prev) => prev.filter((u) => u.toLowerCase() !== trimmed.toLowerCase()))
    },
    [persist],
  )

  const clear = useCallback(() => {
    persist([])
  }, [persist])

  return useMemo(() => ({ items, add, remove, clear }), [items, add, remove, clear])
}
