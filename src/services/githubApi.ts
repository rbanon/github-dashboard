import axios, { AxiosError } from 'axios'
import type { GithubUser, GithubRepo, GithubEvent } from '../types/github'

// Cache expiration time in milliseconds (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000

// Rate limit tracking
export interface RateLimit {
  limit: number
  remaining: number
  reset: number
}

// Cache structure
interface CacheEntry<T> {
  data: T
  timestamp: number
}

// In-memory cache storage
const cache = new Map<string, CacheEntry<any>>()

// Rate limit state
let rateLimit: RateLimit = {
  limit: 60,
  remaining: 60,
  reset: Date.now()
}

const client = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    'Accept': 'application/vnd.github.v3+json'
  }
})

// Interceptor to track rate limit
client.interceptors.response.use(
  (response) => {
    const limit = response.headers['x-ratelimit-limit']
    const remaining = response.headers['x-ratelimit-remaining']
    const reset = response.headers['x-ratelimit-reset']

    if (limit && remaining !== undefined && reset) {
      rateLimit = {
        limit: parseInt(limit),
        remaining: parseInt(remaining),
        reset: parseInt(reset) * 1000 // Convert to milliseconds
      }
    }

    return response
  },
  (error) => {
    // Handle rate limit error
    if (error.response?.status === 403) {
      error.message = 'Rate limit exceeded. Please try again later.'
    }
    return Promise.reject(error)
  }
)

/**
 * Get current rate limit information
 */
export function getRateLimit(): RateLimit {
  return rateLimit
}

/**
 * Check if cache entry is still valid
 */
function isCacheValid(timestamp: number): boolean {
  return Date.now() - timestamp < CACHE_DURATION
}

/**
 * Get from cache or return null
 */
function getFromCache<T>(key: string): T | null {
  const entry = cache.get(key)
  if (entry && isCacheValid(entry.timestamp)) {
    return entry.data
  }
  cache.delete(key)
  return null
}

/**
 * Store in cache
 */
function setCache<T>(key: string, data: T): void {
  cache.set(key, {
    data,
    timestamp: Date.now()
  })
}

/**
 * Fetch user with caching
 */
export async function getUser(username: string): Promise<GithubUser> {
  const cacheKey = `user:${username}`
  
  // Check cache first
  const cached = getFromCache<GithubUser>(cacheKey)
  if (cached) {
    return cached
  }

  try {
    const { data } = await client.get<GithubUser>(`/users/${username}`)
    setCache(cacheKey, data)
    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('User not found')
      } else if (error.response?.status === 403) {
        throw new Error('Rate limit exceeded. Please try again later.')
      }
    }
    throw error
  }
}

export async function getRepos(username: string): Promise<GithubRepo[]> {
  const cacheKey = `repos:${username}`
  
  // Check cache first
  const cached = getFromCache<GithubRepo[]>(cacheKey)
  if (cached) {
    return cached
  }

  try {
    const { data } = await client.get<GithubRepo[]>(`/users/${username}/repos`, {
      params: {
        sort: 'updated',
        per_page: 12
      }
    })
    setCache(cacheKey, data)
    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('User repositories not found')
      }
    }
    throw error
  }
}

export async function getEvents(username: string): Promise<GithubEvent[]> {
  const cacheKey = `events:${username}`
  
  // Check cache first
  const cached = getFromCache<GithubEvent[]>(cacheKey)
  if (cached) {
    return cached
  }

  try {
    const { data } = await client.get<GithubEvent[]>(`/users/${username}/events/public`, {
      params: {
        per_page: 10
      }
    })
    setCache(cacheKey, data)
    return data
  } catch (error) {
    // If no events, return empty array (this is not an error)
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      setCache(cacheKey, [])
      return []
    }
    throw error
  }
}

export async function getLanguages(reposUrl: string): Promise<Record<string, number>> {
  const { data } = await client.get<GithubRepo[]>(reposUrl)
  
  const languageMap: Record<string, number> = {}
  
  data.forEach((repo) => {
    if (repo.language && !repo.fork) {
      languageMap[repo.language] = (languageMap[repo.language] || 0) + 1
    }
  })
  
  return languageMap
}

/**
 * Clear all cache (useful for manual refresh)
 */
export function clearCache(): void {
  cache.clear()
}