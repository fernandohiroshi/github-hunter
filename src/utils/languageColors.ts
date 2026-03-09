const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
  'C++': '#f34b7d',
  C: '#555555',
  'C#': '#178600',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  Vue: '#41b883',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Scala: '#c22d40',
  R: '#198CE7',
  Elixir: '#6e4a7e',
  Haskell: '#5e5086',
  Lua: '#000080',
  Perl: '#0298c3',
  MATLAB: '#e16737',
  Dockerfile: '#384d54',
  'Jupyter Notebook': '#DA5B0B',
}

export function getLanguageColor(language: string | null): string {
  if (!language) return '#8b949e'
  return LANGUAGE_COLORS[language] ?? '#8b949e'
}
