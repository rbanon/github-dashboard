import { ref, computed } from 'vue'
import type { GithubRepo } from '../types/github'

const selectedRepo = ref<GithubRepo | null>(null)
const isOpen = ref(false)

export function useRepoDetails() {
  /**
   * Open the detail panel for a repository
   */
  function openDetails(repo: GithubRepo): void {
    selectedRepo.value = repo
    isOpen.value = true
  }

  /**
   * Close the detail panel
   */
  function closeDetails(): void {
    isOpen.value = false
    selectedRepo.value = null
  }

  /**
   * Get current selected repository
   */
  const repo = computed(() => selectedRepo.value)

  /**
   * Check if panel is open
   */
  const panelOpen = computed(() => isOpen.value)

  /**
   * Calculate days since last update
   */
  function daysSinceUpdate(updatedAt: string): number {
    const updated = new Date(updatedAt)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - updated.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  /**
   * Format date to readable string
   */
  function formatDate(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  /**
   * Get repo health status based on activity
   */
  function getHealthStatus(repo: GithubRepo): 'active' | 'maintenance' | 'archived' {
    const daysSince = daysSinceUpdate(repo.updated_at)
    
    if (repo.fork) return 'maintenance'
    if (daysSince > 365) return 'archived'
    if (daysSince > 90) return 'maintenance'
    return 'active'
  }

  /**
   * Get health status color
   */
  function getHealthColor(status: 'active' | 'maintenance' | 'archived'): string {
    switch (status) {
      case 'active':
        return '#10b981' // green
      case 'maintenance':
        return '#f59e0b' // amber
      case 'archived':
        return '#6b7280' // gray
    }
  }

  return {
    selectedRepo: repo,
    isOpen: panelOpen,
    openDetails,
    closeDetails,
    daysSinceUpdate,
    formatDate,
    getHealthStatus,
    getHealthColor
  }
}
