import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Home, Search } from 'lucide-react'

export function NotFoundPage() {
  return (
    <main className="container mx-auto px-4 max-w-lg py-24 text-center">
      <p className="text-7xl font-display font-extrabold text-gradient mb-4" aria-hidden="true">
        404
      </p>
      <h1 className="text-2xl font-bold mb-2">Página não encontrada</h1>
      <p className="text-muted-foreground mb-8">
        A página que você está procurando não existe ou foi movida.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button asChild>
          <Link to="/">
            <Home className="w-4 h-4" aria-hidden="true" />
            Voltar ao início
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/">
            <Search className="w-4 h-4" aria-hidden="true" />
            Buscar usuário
          </Link>
        </Button>
      </div>
    </main>
  )
}
