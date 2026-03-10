import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSearchHistory } from '@/hooks/useSearchHistory'

export function useNavigateToUser() {
  const navigate = useNavigate()
  const { add } = useSearchHistory()

  return useCallback(
    (username: string) => {
      const trimmed = username.trim()
      if (!trimmed) return
      add(trimmed)
      navigate(`/user/${trimmed}`)
    },
    [add, navigate],
  )
}
