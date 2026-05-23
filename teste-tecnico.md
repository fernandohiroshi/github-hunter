# Resumo Simplificado do Projeto

## Arquitetura Principal

**Rotas (App.tsx)** → Cada página (pages/) corresponde a uma rota (/, /user/:username, etc).

**Fetch/API (services/github.ts)** → Axios faz requisições ao GitHub; erros são tratados e viram mensagens amigáveis.

**Estado global (store/searchStore.ts)** → Zustand guarda dados compartilhados (usuário, repositórios, loading, erros). Todo componente acessa esse estado direto da memória do navegador.

**Componentes (components/)** → UI reutilizável (cards, listas, botões).

**Custom hooks (hooks/)** → Lógica reutilizável de React (ex: histórico de buscas, navegação).

**Utils (utils/)** → Funções puras, como ordenação e formatação, sem dependência de React.

**Testes (test/)** → Unit e component tests garantem que funções e UI funcionem corretamente.

---

## Tópicos Mais Importantes para Entrevista Técnica

### 1. Por que **Zustand** e não Redux/Context?

- **Simplicidade**: Menos boilerplate que Redux
- **Performance**: Re-renderização otimizada automaticamente
- **TypeScript**: Tipagem nativa excelente
- **DevTools**: Debugging integrado

### 2. Como funciona o **infinite scroll**?

- Primeira página: 30 itens carregados imediatamente
- Conforme usuário rola, `loadMoreRepos()` busca próximas páginas
- Skeleton loading durante carregamento
- Performance: evita carregar tudo de uma vez

### 3. **Tratamento de erros** da API

```typescript
// services/github.ts
function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    if (error.response?.status === 404) {
      return 'Usuário não encontrado. Verifique o nome e tente novamente.'
    }
    if (error.response?.status === 403) {
      return 'Limite de requisições da API atingido. Tente novamente em alguns minutos.'
    }
  }
  return 'Ocorreu um erro inesperado. Tente novamente.'
}
```

- 404: usuário não existe
- 403: rate limit do GitHub
- 5xx: erro servidor
- Rede: problemas de conexão

### 4. **Promise.allSettled** - Por que usar?

```typescript
const [userResult, reposResult] = await Promise.allSettled([
  fetchUser(username),
  fetchUserRepositoriesPage(username, 1, 30),
])
```

- Busca usuário e repositórios em **paralelo**
- Se um falhar, o outro ainda funciona
- UX melhor: fallbacks granulares

### 5. **Ordenação** de repositórios

```typescript
// utils/sort.ts
export function sortRepositories(repos, option) {
  const sorted = [...repos] // imutabilidade
  switch (option) {
    case 'stars-desc':
      return sorted.sort((a, b) => b.stargazers_count - a.stargazers_count)
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    // ...
  }
}
```

- Opções: estrelas, nome, data de atualização
- Imutabilidade: não altera array original
- Client-side: eficiente para volume atual

### 6. **Estado global** - principais estados

```typescript
{
  query: '',              // termo buscado
  user: null,             // dados do usuário
  repositories: [],       // lista de repositórios
  isLoadingUser: false,   // carregando usuário
  isLoadingRepos: false,  // carregando repositórios
  userError: null,        // erro do usuário
  reposError: null,       // erro dos repositórios
  reposNextPage: 1,       // próxima página
  reposHasMore: false,    // tem mais páginas?
  sortOption: 'stars-desc' // ordenação atual
}
```

### 7. **Custom hooks** - quando criar?

- `useSearchHistory`: localStorage + estado React
- `useNavigateToUser`: abstração de navegação
- **Critério**: lógica com estado que precisa ser reutilizada

### 8. **Testes** - o que testar?

- **Unit tests**: funções puras (sort, format)
- **Component tests**: renderização, interação, estados
- **Não testar**: implementação interna, apenas comportamento

### 9. **Performance** - otimizações

- **Lazy loading**: 30 itens por página
- **Skeletons**: feedback visual imediato
- **Immutability**: evita re-renders
- **Zustand**: seletores otimizados

### 10. **TypeScript** - interfaces vs types

- **Interfaces**: objetos com forma definida (GitHubUser, GitHubRepository)
- **Types**: uniões e tipos calculados (SortOption)

---

## Fluxo Principal da Aplicação

1. **Busca**: SearchBar → navega para `/user/:username`
2. **Carregamento**: UserPage detecta mudança → chama `searchUser()`
3. **Paralelo**: Promise.allSettled busca usuário + repositórios
4. **Estado**: Zustand atualiza → componentes re-renderizam
5. **Infinite Scroll**: loadMoreRepos() busca próximas páginas
6. **Ordenação**: setSortOption() + getSortedRepositories()

---

## UI/UX - Destaques

### Dark/Light Mode

- CSS variables + localStorage persistência
- Preferência salva automaticamente

### Responsividade

- Mobile-first com Tailwind
- `flex-col sm:flex-row` para layouts

### Acessibilidade

- `aria-label` em controles interativos
- Navegação por teclado
- Semântica HTML5 correta

### Estados da UI

- **Loading**: Skeleton screens
- **Erro**: Mensagens amigáveis com retry
- **Vazio**: Call-to-action
- **Sucesso**: Dados com animações suaves

---

## Insights e Trade-offs

### Por que **client-side sorting**?

- Simplicidade: sem API adicional
- Performance: eficiente para volume atual
- Trade-off: server-side seria melhor para milhares de itens

### Por que **shadcn/ui**?

- Consistência visual
- Componentes acessíveis
- Customizável com Tailwind
- Trade-off: bundle size maior

### Por que **infinite scroll**?

- UX melhor que paginação tradicional
- Menos cliques do usuário
- Trade-off: complexidade de implementação

---

## Melhorias Futuras

1. **React Query/SWR**: Cache inteligente
2. **Error Boundaries**: Tratamento de erros em componente
3. **Virtual Scrolling**: Para listas muito grandes
4. **PWA**: Offline support
5. **Analytics**: Tracking de performance
