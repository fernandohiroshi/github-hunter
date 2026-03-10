import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from '@/components/layout/Header'
import { HomePage } from '@/pages/HomePage'
import { UserPage } from '@/pages/UserPage'
import { RepositoryDetailPage } from '@/pages/RepositoryDetailPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/user/:username" element={<UserPage />} />
            <Route path="/user/:username/repo/:repoName" element={<RepositoryDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>

        <footer className="border-t border-border py-4 text-center text-xs text-muted-foreground">
          Projeto desenvolvido por{' '}
          <a
            href="https://fernandohiroshi.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary/70 hover:text-primary transition-colors"
          >
            Fernando Hiroshi
          </a>
        </footer>
      </div>
    </BrowserRouter>
  )
}
