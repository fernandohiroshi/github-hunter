interface RepositoryListErrorProps {
  message: string
}

export function RepositoryListError({ message }: RepositoryListErrorProps) {
  return (
    <section aria-label="Erro ao carregar repositórios">
      <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-center">
        <p className="text-destructive font-medium mb-1">Erro ao carregar repositórios</p>
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
    </section>
  )
}
