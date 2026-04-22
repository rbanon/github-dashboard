<template>
  <div v-if="Object.keys(languages).length > 0" class="chart-container">
    <h3 class="chart-title">{{ t('languages.title') }}</h3>
    <div class="chart-wrapper">
      <canvas ref="chartCanvas"></canvas>
    </div>
    <div class="languages-list">
      <div v-for="(count, lang) in languages" :key="lang" class="language-item">
        <span class="language-dot" :style="{ backgroundColor: getLanguageColor(lang as string) }"></span>
        <span class="language-name">{{ lang }}</span>
        <span class="language-count">{{ count }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import Chart from 'chart.js/auto'
import type { GithubRepo } from '../types/github'

const { t } = useI18n()

const chartCanvas = ref<HTMLCanvasElement | null>(null)
let chartInstance: Chart | null = null

const props = defineProps<{
  repos: GithubRepo[]
}>()

const languages = ref<Record<string, number>>({})

// Paleta de colores para lenguajes populares
const languageColors: Record<string, string> = {
  JavaScript: '#F1E05A',
  TypeScript: '#2B7A0B',
  Python: '#3572A5',
  Java: '#B07219',
  Go: '#00ADD8',
  Rust: '#CE422B',
  C: '#555555',
  'C++': '#F34B7D',
  'C#': '#239120',
  PHP: '#777BB4',
  Ruby: '#CC342D',
  Swift: '#FA7343',
  Kotlin: '#7F52FF',
  Vue: '#42B983',
  React: '#61DAFB',
  HTML: '#E34C26',
  CSS: '#563D7C',
  SCSS: '#C6538C',
  SQL: '#336791',
  Shell: '#89E051'
}

function getLanguageColor(language: string): string {
  return languageColors[language] || '#' + Math.floor(Math.random() * 16777215).toString(16)
}

function calculateLanguages() {
  const langs: Record<string, number> = {}
  
  props.repos.forEach(repo => {
    if (repo.language && !repo.fork) {
      langs[repo.language] = (langs[repo.language] || 0) + 1
    }
  })

  // Ordenar por cantidad de descendente
  const sorted = Object.entries(langs)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10) // Top 10 lenguajes

  languages.value = Object.fromEntries(sorted)
}

function createChart() {
  if (!chartCanvas.value) return

  const labels = Object.keys(languages.value)
  const data = Object.values(languages.value)
  const colors = labels.map(lang => getLanguageColor(lang))

  if (chartInstance) {
    chartInstance.destroy()
  }

  chartInstance = new Chart(chartCanvas.value, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [
        {
          data,
          backgroundColor: colors,
          borderColor: getComputedStyle(document.documentElement).getPropertyValue('--bg-secondary'),
          borderWidth: 2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: false
        }
      }
    }
  })
}

watch(() => props.repos, () => {
  calculateLanguages()
  createChart()
}, { deep: true })

onMounted(() => {
  calculateLanguages()
  createChart()
})
</script>

<style lang="scss" scoped>
.chart-container {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.chart-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 1rem 0;
}

.chart-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

canvas {
  max-width: 100%;
}

.languages-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.75rem;
}

.language-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background-color: var(--bg-tertiary);
  border-radius: 4px;
  font-size: 0.85rem;
}

.language-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.language-name {
  color: var(--text-primary);
  font-weight: 500;
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.language-count {
  color: var(--text-secondary);
  font-size: 0.75rem;
  flex-shrink: 0;
}
</style>
