import { Star, GitFork, Users } from 'lucide-react'
import { FeatureCard } from '@/components/home/FeatureCard'

const FEATURES = [
  {
    icon: <Users className="w-5 h-5" />,
    title: 'Perfis de Usuários',
    description: 'Seguidores, seguidos, bio, e-mail e muito mais.',
  },
  {
    icon: <Star className="w-5 h-5" />,
    title: 'Repositórios Ordenados',
    description: 'Veja todos os repositórios, ordenados como preferir.',
  },
  {
    icon: <GitFork className="w-5 h-5" />,
    title: 'Detalhes Completos',
    description: 'Linguagem, estrelas, forks, descrição e link direto.',
  },
]

export function FeaturesGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in stagger-3">
      {FEATURES.map((feature) => (
        <FeatureCard
          key={feature.title}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  )
}
