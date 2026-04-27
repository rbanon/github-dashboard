import { ref, computed } from 'vue'

type ViewMode = 'simple' | 'detailed'

const viewMode = ref<ViewMode>('detailed')
const isLocked = ref(false)

export function useRepoViewMode() {
  /**
   * Toggle between view modes
   */
  function toggleViewMode(): void {
    if (!isLocked.value) {
      viewMode.value = viewMode.value === 'simple' ? 'detailed' : 'simple'
    }
  }

  /**
   * Set view mode explicitly
   */
  function setViewMode(mode: ViewMode): void {
    console.log('Setting repo view mode to:', mode, 'locked:', isLocked.value)
    if (!isLocked.value) {
      viewMode.value = mode
    }
  }

  /**
   * Lock/unlock view mode changes
   */
  function setLocked(locked: boolean): void {
    console.log('Setting repo view mode locked to:', locked)
    isLocked.value = locked
    if (locked) {
      viewMode.value = 'detailed' // Force table when locked
    }
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

  /**
   * Check if locked
   */
  const locked = computed(() => isLocked.value)

  return {
    viewMode: currentMode,
    toggleViewMode,
    setViewMode,
    setLocked,
    isSimple,
    isDetailed,
    locked
  }
}
