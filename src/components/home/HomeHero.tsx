import { Github } from 'lucide-react'

export function HomeHero() {
  return (
    <div className="text-center mb-12 animate-fade-in">
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center">
          <Github className="w-8 h-8 text-primary" aria-hidden="true" />
        </div>
      </div>

      <h1 className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight mb-4">
        GitHub <span className="text-gradient">Hunter</span>
      </h1>

      <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
        Explore perfis e repositórios públicos do GitHub de forma rápida e intuitiva.
      </p>
    </div>
  )
}
