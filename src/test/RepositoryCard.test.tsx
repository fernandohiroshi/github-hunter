import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { RepositoryCard } from '@/components/repository/RepositoryCard'
import { mockRepository } from '@/test/mocks'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return { ...actual, useNavigate: () => mockNavigate }
})

function renderRepositoryCard() {
  return render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <RepositoryCard repo={mockRepository} />
    </MemoryRouter>,
  )
}

describe('RepositoryCard', () => {
  it('renders repository name', () => {
    renderRepositoryCard()
    expect(screen.getByText('linux')).toBeInTheDocument()
  })

  it('renders repository description', () => {
    renderRepositoryCard()
    expect(screen.getByText('Linux kernel source tree')).toBeInTheDocument()
  })

  it('renders the language', () => {
    renderRepositoryCard()
    expect(screen.getByText('C')).toBeInTheDocument()
  })

  it('renders star count', () => {
    renderRepositoryCard()
    // 180000 -> 180.0k
    expect(screen.getByText('180.0k')).toBeInTheDocument()
  })

  it('renders fork count', () => {
    renderRepositoryCard()
    expect(screen.getByText('55.0k')).toBeInTheDocument()
  })

  it('navigates to repo detail page on click', () => {
    renderRepositoryCard()
    const card = screen.getByRole('button')
    fireEvent.click(card)
    expect(mockNavigate).toHaveBeenCalledWith('/user/torvalds/repo/linux')
  })

  it('navigates on Enter key press', () => {
    renderRepositoryCard()
    const card = screen.getByRole('button')
    fireEvent.keyDown(card, { key: 'Enter' })
    expect(mockNavigate).toHaveBeenCalledWith('/user/torvalds/repo/linux')
  })

  it('is keyboard accessible with tabIndex', () => {
    renderRepositoryCard()
    const card = screen.getByRole('button')
    expect(card).toHaveAttribute('tabIndex', '0')
  })
})
