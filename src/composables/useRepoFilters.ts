import { ref, computed } from 'vue'
import type { GithubRepo } from '../types/github'

export interface RepoFilters {
  language: string | null
  minStars: number
  maxStars: number
  sortBy: 'stars' | 'forks' | 'updated' | 'name'
  sortOrder: 'asc' | 'desc'
}

const defaultFilters: RepoFilters = {
  language: null,
  minStars: 0,
  maxStars: Infinity,
  sortBy: 'stars',
  sortOrder: 'desc'
}

const filters = ref<RepoFilters>({ ...defaultFilters })

export function useRepoFilters() {
  /**
   * Get unique languages from repositories
   */
  function getUniqueLanguages(repos: GithubRepo[]): string[] {
    const languages = repos
      .map((repo) => repo.language)
      .filter((lang) => lang !== null && lang !== undefined) as string[]
    return [...new Set(languages)].sort()
  }

  /**
   * Get max stars count from repositories
   */
  function getMaxStars(repos: GithubRepo[]): number {
    if (repos.length === 0) return 0
    return Math.max(...repos.map((repo) => repo.stargazers_count))
  }

  /**
   * Filter and sort repositories
   */
  function filterRepos(repos: GithubRepo[]): GithubRepo[] {
    let filtered = [...repos]

    // Apply language filter
    if (filters.value.language) {
      filtered = filtered.filter((repo) => repo.language === filters.value.language)
    }

    // Apply stars range filter
    filtered = filtered.filter(
      (repo) =>
        repo.stargazers_count >= filters.value.minStars &&
        repo.stargazers_count <= filters.value.maxStars
    )

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: number | string = 0
      let bValue: number | string = 0

      switch (filters.value.sortBy) {
        case 'stars':
          aValue = a.stargazers_count
          bValue = b.stargazers_count
          break
        case 'forks':
          aValue = a.forks_count
          bValue = b.forks_count
          break
        case 'updated':
          aValue = new Date(a.updated_at).getTime()
          bValue = new Date(b.updated_at).getTime()
          break
        case 'name':
          aValue = a.name.toLowerCase()
          bValue = b.name.toLowerCase()
          break
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return filters.value.sortOrder === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }

      return filters.value.sortOrder === 'asc'
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number)
    })

    return filtered
  }

  /**
   * Set a single filter
   */
  function setFilter<K extends keyof RepoFilters>(key: K, value: RepoFilters[K]): void {
    filters.value[key] = value
  }

  /**
   * Set multiple filters at once
   */
  function setFilters(newFilters: Partial<RepoFilters>): void {
    filters.value = { ...filters.value, ...newFilters }
  }

  /**
   * Reset all filters to defaults
   */
  function resetFilters(): void {
    filters.value = { ...defaultFilters }
  }

  /**
   * Get current filters
   */
  function getFilters(): RepoFilters {
    return { ...filters.value }
  }

  /**
   * Check if any filters are active
   */
  const hasActiveFilters = computed(() => {
    return (
      filters.value.language !== null ||
      filters.value.minStars > 0 ||
      filters.value.maxStars !== Infinity ||
      filters.value.sortBy !== 'stars' ||
      filters.value.sortOrder !== 'desc'
    )
  })

  return {
    filters: computed(() => filters.value),
    filterRepos,
    getUniqueLanguages,
    getMaxStars,
    setFilter,
    setFilters,
    resetFilters,
    getFilters,
    hasActiveFilters
  }
}
