import { ref, computed } from 'vue'

type ProfileViewMode = 'simple' | 'complete'

const profileViewMode = ref<ProfileViewMode>('simple')

export function useProfileViewMode() {
  function toggleViewMode(): void {
    profileViewMode.value = profileViewMode.value === 'simple' ? 'complete' : 'simple'
  }

  function setViewMode(mode: ProfileViewMode): void {
    profileViewMode.value = mode
  }

  const currentMode = computed(() => profileViewMode.value)
  const isSimple = computed(() => profileViewMode.value === 'simple')
  const isComplete = computed(() => profileViewMode.value === 'complete')

  return { viewMode: currentMode, toggleViewMode, setViewMode, isSimple, isComplete }
}
