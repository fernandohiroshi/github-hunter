import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { SearchBar } from '@/components/search/SearchBar'

// Mock react-router-dom's useNavigate
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

// Mock zustand store
vi.mock('@/store/searchStore', () => ({
  useSearchStore: () => ({
    isLoadingUser: false,
    query: '',
  }),
}))

vi.mock('@/hooks/useSearchHistory', () => ({
  useSearchHistory: () => ({
    items: [],
    add: vi.fn(),
    remove: vi.fn(),
    clear: vi.fn(),
  }),
}))

vi.mock('@/hooks/useNavigateToUser', () => ({
  useNavigateToUser: () => (username: string) => mockNavigate(`/user/${username.trim()}`),
}))

function renderSearchBar() {
  return render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <SearchBar />
    </MemoryRouter>,
  )
}

describe('SearchBar', () => {
  it('renders search input and button', () => {
    renderSearchBar()
    expect(screen.getByRole('searchbox', { hidden: true })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /buscar/i })).toBeInTheDocument()
  })

  it('submit button is disabled when input is empty', () => {
    renderSearchBar()
    const button = screen.getByRole('button', { name: /buscar/i })
    expect(button).toBeDisabled()
  })

  it('submit button becomes enabled when user types', async () => {
    renderSearchBar()
    const input = screen.getByPlaceholderText(/nome de usuário/i)
    await userEvent.type(input, 'torvalds')
    const button = screen.getByRole('button', { name: /buscar/i })
    expect(button).not.toBeDisabled()
  })

  it('navigates to user page on form submit', async () => {
    renderSearchBar()
    const input = screen.getByPlaceholderText(/nome de usuário/i)
    await userEvent.type(input, 'torvalds')
    fireEvent.submit(input.closest('form')!)
    expect(mockNavigate).toHaveBeenCalledWith('/user/torvalds')
  })

  it('trims whitespace from username before navigation', async () => {
    renderSearchBar()
    const input = screen.getByPlaceholderText(/nome de usuário/i)
    await userEvent.type(input, '  octocat  ')
    fireEvent.submit(input.closest('form')!)
    expect(mockNavigate).toHaveBeenCalledWith('/user/octocat')
  })
})
