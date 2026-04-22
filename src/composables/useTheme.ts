import { ref, onMounted, watch } from 'vue'

type Theme = 'dark' | 'light'

const theme = ref<Theme>('dark')

function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

function applyTheme(t: Theme) {
  if (t === 'light') {
    document.documentElement.classList.add('theme-light')
  } else {
    document.documentElement.classList.remove('theme-light')
  }
}

export function useTheme() {
  onMounted(() => {
    // 1. Check if user has already chosen a theme before
    const saved = localStorage.getItem('theme') as Theme | null

    if (saved) {
      theme.value = saved
    } else {
      // 2. If not, use system theme
      theme.value = getSystemTheme()

      // 3. Listen for system theme changes in real-time
      window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
        // Only update if user hasn't manually chosen
        if (!localStorage.getItem('theme')) {
          theme.value = e.matches ? 'light' : 'dark'
        }
      })
    }

    applyTheme(theme.value)
  })

  // Whenever theme changes, apply and save it
  watch(theme, (newTheme) => {
    applyTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  })

  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  return {
    theme,
    toggleTheme
  }
}