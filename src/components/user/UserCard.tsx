import type { GitHubUser } from '@/types/github'
import { formatDate } from '@/utils/format'
import { UserAvatar } from '@/components/user/UserAvatar'
import { UserHeader } from '@/components/user/UserHeader'
import { UserBio } from '@/components/user/UserBio'
import { UserMeta } from '@/components/user/UserMeta'
import { UserStats } from '@/components/user/UserStats'
import { GitHubProfileButton } from '@/components/user/GitHubProfileButton'

interface UserCardProps {
  user: GitHubUser
}

export function UserCard({ user }: UserCardProps) {
  const initials = (user.name ?? user.login)
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join('')

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row gap-6 items-center md:items-start">
        {/* Avatar */}
        <UserAvatar avatarUrl={user.avatar_url} login={user.login} initials={initials} />

        {/* Info */}
        <div className="flex-1 min-w-0 text-center sm:text-left">
          <UserHeader name={user.name} login={user.login} />

          <UserBio bio={user.bio} />

          {/* Meta */}
          <UserMeta
            company={user.company}
            location={user.location}
            email={user.email}
            blog={user.blog}
            twitterUsername={user.twitter_username}
          />

          {/* Stats */}
          <UserStats
            followers={user.followers}
            following={user.following}
            publicRepos={user.public_repos}
          />
        </div>

        {/* GitHub link */}
        <GitHubProfileButton htmlUrl={user.html_url} />
      </div>

      <p className="text-xs text-muted-foreground mt-4 text-center sm:text-left">
        Membro desde {formatDate(user.created_at)}
      </p>
    </div>
  )
}
