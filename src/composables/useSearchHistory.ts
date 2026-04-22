import { ref, computed } from 'vue'

const MAX_SEARCHES = 10
const STORAGE_KEY = 'recentSearches'

const recentSearches = ref<string[]>([])

/**
 * Load recent searches from localStorage on app start
 */
export function initRecentSearches(): void {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    try {
      recentSearches.value = JSON.parse(stored)
    } catch {
      recentSearches.value = []
    }
  }
}

/**
 * Add a search to recent searches
 */
export function addSearch(username: string): void {
  const trimmed = username.trim()
  if (!trimmed) return

  // Remove if already exists
  const index = recentSearches.value.indexOf(trimmed)
  if (index > -1) {
    recentSearches.value.splice(index, 1)
  }

  // Add to beginning
  recentSearches.value.unshift(trimmed)

  // Keep only last MAX_SEARCHES
  if (recentSearches.value.length > MAX_SEARCHES) {
    recentSearches.value = recentSearches.value.slice(0, MAX_SEARCHES)
  }

  // Persist to localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recentSearches.value))
}

/**
 * Remove a search from recent searches
 */
export function removeSearch(username: string): void {
  const index = recentSearches.value.indexOf(username)
  if (index > -1) {
    recentSearches.value.splice(index, 1)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recentSearches.value))
  }
}

/**
 * Clear all recent searches
 */
export function clearRecentSearches(): void {
  recentSearches.value = []
  localStorage.removeItem(STORAGE_KEY)
}

/**
 * Get recent searches (reactive)
 */
export function useRecentSearches() {
  return computed(() => recentSearches.value)
}

/**
 * Export composable
 */
export function useSearchHistory() {
  return {
    recentSearches: useRecentSearches(),
    addSearch,
    removeSearch,
    clearRecentSearches
  }
}
