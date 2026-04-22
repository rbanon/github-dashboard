export interface GithubUser {
  login: string
  name: string | null
  avatar_url: string
  bio: string | null
  location: string | null
  blog: string | null
  public_repos: number
  followers: number
  following: number
  html_url: string
  created_at: string
}

export interface GithubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  updated_at: string
  fork: boolean
}

export interface GithubEvent {
  id: string
  type: string
  created_at: string
  repo: {
    name: string
    url: string
  }
}