import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { UserCard } from '@/components/user/UserCard'
import { UserCardSkeleton } from '@/components/user/UserCardSkeleton'
import { RepositoryList } from '@/components/repository/RepositoryList'
import { SearchBar } from '@/components/search/SearchBar'
import { ErrorMessage } from '@/components/ui/error-message'
import { Separator } from '@/components/ui/separator'
import { useSearchStore } from '@/store/searchStore'

export function UserPage() {
  const { username } = useParams<{ username: string }>()
  const { user, isLoadingUser, userError, searchUser } = useSearchStore()

  useEffect(() => {
    if (!username) return
    searchUser(username)
  }, [username, searchUser])

  return (
    <main className="container mx-auto px-4 max-w-4xl py-8 space-y-8">
      <div className="animate-fade-in">
        <SearchBar />
      </div>

      <Separator />

      <section aria-label="Perfil do usuário">
        {isLoadingUser && <UserCardSkeleton />}
        {!isLoadingUser && userError && (
          <ErrorMessage
            title="Usuário não encontrado"
            message={userError}
            onRetry={() => username && searchUser(username)}
          />
        )}
        {!isLoadingUser && user && <UserCard user={user} />}
      </section>

      {(user || !userError) && !isLoadingUser && (
        <>
          <Separator />
          <RepositoryList />
        </>
      )}
    </main>
  )
}
