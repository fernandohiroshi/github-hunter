import axios, { AxiosError } from 'axios'
import type { GitHubUser, GitHubRepository } from '@/types/github'

const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github.v3+json',
    'X-GitHub-Api-Version': '2022-11-28',
  },
})

function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    if (error.response?.status === 404) {
      return 'Usuário não encontrado. Verifique o nome de usuário e tente novamente.'
    }
    if (error.response?.status === 403) {
      return 'Limite de requisições da API atingido. Tente novamente em alguns minutos.'
    }
    if (error.response?.status === 401) {
      return 'Acesso não autorizado à API do GitHub.'
    }
    if (error.response?.status && error.response.status >= 500) {
      return 'Erro no servidor do GitHub. Tente novamente mais tarde.'
    }
    if (error.code === 'ERR_NETWORK' || error.code === 'ECONNABORTED') {
      return 'Erro de conexão. Verifique sua internet e tente novamente.'
    }
  }
  return 'Ocorreu um erro inesperado. Tente novamente.'
}

export async function fetchUser(username: string): Promise<GitHubUser> {
  try {
    const { data } = await githubApi.get<GitHubUser>(`/users/${username}`)
    return data
  } catch (error) {
    throw new Error(getErrorMessage(error))
  }
}

export async function fetchUserRepositories(username: string): Promise<GitHubRepository[]> {
  try {
    const allRepos: GitHubRepository[] = []
    let page = 1
    const perPage = 100

    while (true) {
      const { data } = await githubApi.get<GitHubRepository[]>(
        `/users/${username}/repos`,
        {
          params: {
            per_page: perPage,
            page,
            type: 'owner',
          },
        }
      )

      allRepos.push(...data)

      if (data.length < perPage) break
      page++

      // Safety cap to avoid infinite loops
      if (page > 10) break
    }

    return allRepos
  } catch (error) {
    throw new Error(getErrorMessage(error))
  }
}
