import { FeaturesGrid } from '@/components/home/FeaturesGrid'
import { HomeHero } from '@/components/home/HomeHero'
import { HomeSearchSection } from '@/components/home/HomeSearchSection'
import { FeaturedRepositories } from '@/components/featured/FeaturedRepositories'
import { ShineBorder } from '@/components/ui/shine-border'
import { useNavigateToUser } from '@/hooks/useNavigateToUser'

export function HomePage() {
  const navigateToUser = useNavigateToUser()

  return (
    <main className="container mx-auto px-4 max-w-3xl py-16">
      <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-6 sm:p-10 mb-16">
        <ShineBorder
          borderWidth={2}
          duration={24}
          shineColor={['#00ff88', '#22c55e', '#22d3ee', '#a3ff12']}
          className="opacity-95"
        />
        <div className="relative z-20">
          <HomeHero />
          <HomeSearchSection />
        </div>
      </div>

      <FeaturesGrid />

      <FeaturedRepositories onSelectOwner={(owner) => navigateToUser(owner)} />
    </main>
  )
}
