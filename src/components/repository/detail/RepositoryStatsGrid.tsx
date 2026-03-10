import { Star, GitFork, Eye, AlertCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import type { GitHubRepository } from '@/types/github'
import { formatNumber } from '@/utils/format'

interface RepositoryStatsGridProps {
  repo: GitHubRepository
}

export function RepositoryStatsGrid({ repo }: RepositoryStatsGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 animate-fade-in stagger-2">
      <StatCard
        icon={<Star className="w-4 h-4 text-yellow-400" />}
        label="Estrelas"
        value={formatNumber(repo.stargazers_count)}
      />
      <StatCard
        icon={<GitFork className="w-4 h-4 text-blue-400" />}
        label="Forks"
        value={formatNumber(repo.forks_count)}
      />
      <StatCard
        icon={<Eye className="w-4 h-4 text-purple-400" />}
        label="Watchers"
        value={formatNumber(repo.watchers_count)}
      />
      <StatCard
        icon={<AlertCircle className="w-4 h-4 text-orange-400" />}
        label="Issues abertas"
        value={formatNumber(repo.open_issues_count)}
      />
    </div>
  )
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <Card className="border-border/60">
      <CardContent className="p-4 text-center">
        <div className="flex justify-center mb-1.5" aria-hidden="true">
          {icon}
        </div>
        <p className="text-2xl font-bold font-mono">{value}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
      </CardContent>
    </Card>
  )
}
