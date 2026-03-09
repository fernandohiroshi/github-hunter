import { describe, it, expect } from 'vitest'
import { sortRepositories } from '@/utils/sort'
import { mockRepositories } from '@/test/mocks'

describe('sortRepositories', () => {
  it('sorts by stars descending (default)', () => {
    const sorted = sortRepositories(mockRepositories, 'stars-desc')
    expect(sorted[0].stargazers_count).toBeGreaterThanOrEqual(sorted[1].stargazers_count)
    expect(sorted[1].stargazers_count).toBeGreaterThanOrEqual(sorted[2].stargazers_count)
  })

  it('sorts by stars ascending', () => {
    const sorted = sortRepositories(mockRepositories, 'stars-asc')
    expect(sorted[0].stargazers_count).toBeLessThanOrEqual(sorted[1].stargazers_count)
    expect(sorted[1].stargazers_count).toBeLessThanOrEqual(sorted[2].stargazers_count)
  })

  it('sorts by name ascending (A → Z)', () => {
    const sorted = sortRepositories(mockRepositories, 'name-asc')
    expect(sorted[0].name <= sorted[1].name).toBe(true)
    expect(sorted[1].name <= sorted[2].name).toBe(true)
  })

  it('sorts by name descending (Z → A)', () => {
    const sorted = sortRepositories(mockRepositories, 'name-desc')
    expect(sorted[0].name >= sorted[1].name).toBe(true)
    expect(sorted[1].name >= sorted[2].name).toBe(true)
  })

  it('sorts by updated_at descending (most recent)', () => {
    const sorted = sortRepositories(mockRepositories, 'updated-desc')
    const dates = sorted.map((r) => new Date(r.updated_at).getTime())
    expect(dates[0]).toBeGreaterThanOrEqual(dates[1])
    expect(dates[1]).toBeGreaterThanOrEqual(dates[2])
  })

  it('sorts by updated_at ascending (oldest)', () => {
    const sorted = sortRepositories(mockRepositories, 'updated-asc')
    const dates = sorted.map((r) => new Date(r.updated_at).getTime())
    expect(dates[0]).toBeLessThanOrEqual(dates[1])
    expect(dates[1]).toBeLessThanOrEqual(dates[2])
  })

  it('does not mutate the original array', () => {
    const original = [...mockRepositories]
    sortRepositories(mockRepositories, 'name-asc')
    expect(mockRepositories).toEqual(original)
  })

  it('handles empty array', () => {
    expect(sortRepositories([], 'stars-desc')).toEqual([])
  })
})
