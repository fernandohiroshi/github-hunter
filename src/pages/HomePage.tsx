import { FeaturesGrid } from '@/components/home/FeaturesGrid'
import { HomeHero } from '@/components/home/HomeHero'
import { HomeSearchSection } from '@/components/home/HomeSearchSection'

export function HomePage() {
  return (
    <main className="container mx-auto px-4 max-w-3xl py-16 sm:py-24">
      <HomeHero />

      <HomeSearchSection />

      <FeaturesGrid />
    </main>
  )
}
