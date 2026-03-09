import { describe, it, expect } from 'vitest'
import { formatNumber, formatDate, truncate } from '@/utils/format'

describe('formatNumber', () => {
  it('returns the number as string below 1k', () => {
    expect(formatNumber(999)).toBe('999')
    expect(formatNumber(0)).toBe('0')
  })

  it('formats thousands with k suffix', () => {
    expect(formatNumber(1000)).toBe('1.0k')
    expect(formatNumber(1500)).toBe('1.5k')
    expect(formatNumber(23456)).toBe('23.5k')
  })

  it('formats millions with M suffix', () => {
    expect(formatNumber(1_000_000)).toBe('1.0M')
    expect(formatNumber(2_500_000)).toBe('2.5M')
  })
})

describe('formatDate', () => {
  it('returns a formatted date string in pt-BR', () => {
    const result = formatDate('2020-01-15T00:00:00Z')
    expect(result).toMatch(/jan/i)
    expect(result).toMatch(/2020/)
  })

  it('handles different dates', () => {
    const result = formatDate('2011-09-03T15:26:22Z')
    expect(result).toMatch(/2011/)
  })
})

describe('truncate', () => {
  it('returns the original string if shorter than maxLength', () => {
    expect(truncate('hello', 10)).toBe('hello')
  })

  it('returns the original string if equal to maxLength', () => {
    expect(truncate('hello', 5)).toBe('hello')
  })

  it('truncates and appends ellipsis if longer', () => {
    expect(truncate('hello world', 5)).toBe('hello...')
  })
})
