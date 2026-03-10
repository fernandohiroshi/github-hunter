import {
  FeaturedRepositoryCard,
  type FeaturedRepository,
} from '@/components/featured/FeaturedRepositoryCard'

const FEATURED: FeaturedRepository[] = [
  {
    name: 'vercel',
    owner: 'vercel',
    description: 'Develop. Preview. Ship.',
    url: 'https://github.com/vercel/vercel',
  },
  {
    name: 'next.js',
    owner: 'vercel',
    description: 'The React Framework.',
    url: 'https://github.com/vercel/next.js',
  },
  {
    name: 'ui',
    owner: 'shadcn-ui',
    description: 'Beautifully designed components that you can copy and paste.',
    url: 'https://github.com/shadcn-ui/ui',
  },
  {
    name: 'tailwindcss',
    owner: 'tailwindlabs',
    description: 'A utility-first CSS framework for rapid UI development.',
    url: 'https://github.com/tailwindlabs/tailwindcss',
  },
  {
    name: 'prisma',
    owner: 'prisma',
    description: 'Next-generation Node.js and TypeScript ORM.',
    url: 'https://github.com/prisma/prisma',
  },
  {
    name: 'sanity',
    owner: 'sanity-io',
    description: 'The composable content cloud.',
    url: 'https://github.com/sanity-io/sanity',
  },
  {
    name: 'magicui',
    owner: 'magicuidesign',
    description: 'UI library for Design Engineers.',
    url: 'https://github.com/magicuidesign/magicui',
  },
  {
    name: 'tiptap',
    owner: 'ueberdosis',
    description: 'The headless rich text editor framework for web artisans.',
    url: 'https://github.com/ueberdosis/tiptap',
  },
  {
    name: 'zustand',
    owner: 'pmndrs',
    description: '🐻 Bear necessities for state management in React.',
    url: 'https://github.com/pmndrs/zustand',
  },
  {
    name: 'better-auth',
    owner: 'better-auth',
    description: 'Authentication for modern web applications.',
    url: 'https://github.com/better-auth/better-auth',
  },
]

interface FeaturedRepositoriesProps {
  onSelectOwner: (owner: string) => void
}

export function FeaturedRepositories({ onSelectOwner }: FeaturedRepositoriesProps) {
  return (
    <section aria-label="Repositórios em destaque" className="animate-fade-in stagger-3 mt-10">
      <div className="mb-4">
        <h2 className="text-lg font-bold">Repositórios em destaque</h2>
        <p className="text-sm text-muted-foreground">
          Atalhos para perfis populares do ecossistema moderno.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {FEATURED.map((repo) => (
          <FeaturedRepositoryCard
            key={`${repo.owner}/${repo.name}`}
            repo={repo}
            onSelectOwner={onSelectOwner}
          />
        ))}
      </div>
    </section>
  )
}
