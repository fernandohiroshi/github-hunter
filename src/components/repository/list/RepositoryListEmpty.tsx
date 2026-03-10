export function RepositoryListEmpty() {
  return (
    <div className="rounded-xl border border-border bg-card p-12 text-center animate-fade-in">
      <p className="text-4xl mb-3" aria-hidden="true">
        📭
      </p>
      <p className="text-muted-foreground font-medium">Nenhum repositório público encontrado</p>
      <p className="text-sm text-muted-foreground/70 mt-1">
        Este usuário não possui repositórios públicos.
      </p>
    </div>
  )
}
