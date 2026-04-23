import { ref, computed } from 'vue'

type ViewMode = 'simple' | 'detailed'

const viewMode = ref<ViewMode>('simple')

export function useRepoViewMode() {
  /**
   * Toggle between view modes
   */
  function toggleViewMode(): void {
    viewMode.value = viewMode.value === 'simple' ? 'detailed' : 'simple'
  }

  /**
   * Set view mode explicitly
   */
  function setViewMode(mode: ViewMode): void {
    viewMode.value = mode
  }

  /**
   * Get current view mode
   */
  const currentMode = computed(() => viewMode.value)

  /**
   * Check if in simple mode
   */
  const isSimple = computed(() => viewMode.value === 'simple')

  /**
   * Check if in detailed mode
   */
  const isDetailed = computed(() => viewMode.value === 'detailed')

  return {
    viewMode: currentMode,
    toggleViewMode,
    setViewMode,
    isSimple,
    isDetailed
  }
}
