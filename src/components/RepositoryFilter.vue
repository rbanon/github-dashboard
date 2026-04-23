<template>
  <div class="repo-filter-container">
    <div class="filter-header">
      <h4 class="filter-title">{{ $t('repos.filters.title') }}</h4>
      <div class="header-actions">
        <div class="view-toggle">
          <button
            class="view-btn"
            :class="{ active: isSimple }"
            @click="setViewMode('simple')"
            :title="$t('repos.viewMode.simple')"
          >
            ▦▦ {{ $t('repos.viewMode.simple') }}
          </button>
          <button
            class="view-btn"
            :class="{ active: isDetailed }"
            @click="setViewMode('detailed')"
            :title="$t('repos.viewMode.detailed')"
          >
            ☰ {{ $t('repos.viewMode.detailed') }}
          </button>
        </div>
        <button
          v-if="hasActiveFilters"
          class="filter-reset-btn"
          @click="handleResetFilters"
          :title="$t('repos.filters.reset')"
        >
          ✕ {{ $t('repos.filters.reset') }}
        </button>
      </div>
    </div>

    <div class="filters-grid">
      <!-- Language Filter -->
      <div class="filter-group">
        <label class="filter-label">{{ $t('repos.filters.language') }}</label>
        <select
          class="filter-select"
          :value="filters.language || ''"
          @change="(e) => setFilter('language', (e.target as HTMLSelectElement).value || null)"
        >
          <option value="">{{ $t('repos.filters.allLanguages') }}</option>
          <option v-for="lang in availableLanguages" :key="lang" :value="lang">
            {{ lang }}
          </option>
        </select>
      </div>

      <!-- Min Stars Filter -->
      <div class="filter-group">
        <label class="filter-label">
          {{ $t('repos.filters.minStars') }}: {{ filters.minStars }}
        </label>
        <input
          type="range"
          class="filter-range"
          :value="filters.minStars"
          min="0"
          :max="maxStars"
          @input="(e) => setFilter('minStars', Number((e.target as HTMLInputElement).value))"
        />
      </div>

      <!-- Max Stars Filter -->
      <div class="filter-group">
        <label class="filter-label">
          {{ $t('repos.filters.maxStars') }}: {{ filters.maxStars === Infinity ? '∞' : filters.maxStars }}
        </label>
        <input
          type="range"
          class="filter-range"
          :value="filters.maxStars === Infinity ? maxStars : filters.maxStars"
          min="0"
          :max="maxStars"
          @input="(e) => setFilter('maxStars', Number((e.target as HTMLInputElement).value) === maxStars ? Infinity : Number((e.target as HTMLInputElement).value))"
        />
      </div>

      <!-- Sort By -->
      <div class="filter-group">
        <label class="filter-label">{{ $t('repos.filters.sortBy') }}</label>
        <select
          class="filter-select"
          :value="filters.sortBy"
          @change="(e) => setFilter('sortBy', (e.target as HTMLSelectElement).value as any)"
        >
          <option value="stars">{{ $t('repos.filters.sortStars') }}</option>
          <option value="forks">{{ $t('repos.filters.sortForks') }}</option>
          <option value="updated">{{ $t('repos.filters.sortUpdated') }}</option>
          <option value="name">{{ $t('repos.filters.sortName') }}</option>
        </select>
      </div>

      <!-- Sort Order -->
      <div class="filter-group">
        <label class="filter-label">{{ $t('repos.filters.sortOrder') }}</label>
        <div class="sort-order-buttons">
          <button
            class="sort-btn"
            :class="{ active: filters.sortOrder === 'desc' }"
            @click="setFilter('sortOrder', 'desc')"
            :title="$t('repos.filters.descending')"
          >
            ↓ {{ $t('repos.filters.descending') }}
          </button>
          <button
            class="sort-btn"
            :class="{ active: filters.sortOrder === 'asc' }"
            @click="setFilter('sortOrder', 'asc')"
            :title="$t('repos.filters.ascending')"
          >
            ↑ {{ $t('repos.filters.ascending') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Filter Status -->
    <div v-if="hasActiveFilters" class="filter-status">
      <p class="status-text">
        {{ $t('repos.filters.active') }}: {{ activeFilterCount }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRepoFilters } from '../composables/useRepoFilters'
import { useRepoViewMode } from '../composables/useRepoViewMode'
import type { GithubRepo } from '../types/github'

const props = defineProps<{
  repos: GithubRepo[]
}>()

const { filters, setFilter, resetFilters, hasActiveFilters, getUniqueLanguages, getMaxStars } =
  useRepoFilters()
const { isSimple, isDetailed, setViewMode } = useRepoViewMode()

const availableLanguages = computed(() => getUniqueLanguages(props.repos))
const maxStars = computed(() => getMaxStars(props.repos))

const activeFilterCount = computed(() => {
  let count = 0
  if (filters.value.language !== null) count++
  if (filters.value.minStars > 0) count++
  if (filters.value.maxStars !== Infinity) count++
  return count
})

function handleResetFilters(): void {
  resetFilters()
}
</script>

<style lang="scss" scoped>
.repo-filter-container {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 1rem;
  flex-wrap: wrap;
}

.filter-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.view-toggle {
  display: flex;
  gap: 0.5rem;
  background-color: var(--bg-tertiary);
  padding: 0.25rem;
  border-radius: 6px;
  border: 1px solid var(--border-color);
}

.view-btn {
  padding: 0.5rem 0.75rem;
  background-color: transparent;
  color: var(--text-secondary);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    color: var(--text-primary);
  }

  &.active {
    background-color: var(--accent);
    color: white;
  }
}

.filter-reset-btn {
  background: none;
  border: none;
  color: var(--danger);
  cursor: pointer;
  font-size: 0.85rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px solid var(--danger);
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(255, 77, 77, 0.1);
  }
}

.filters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-label {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-secondary);
}

.filter-select,
.filter-range {
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background-color: var(--bg-tertiary);
  color: var(--text-primary);
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--accent);
  }

  &:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 2px rgba(88, 166, 255, 0.1);
  }
}

.filter-select {
  cursor: pointer;
}

.sort-order-buttons {
  display: flex;
  gap: 0.5rem;
}

.sort-btn {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background-color: var(--bg-tertiary);
  color: var(--text-primary);
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--bg-primary);
    border-color: var(--accent);
  }

  &.active {
    background-color: var(--accent);
    color: white;
    border-color: var(--accent);
  }
}

.filter-status {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
}

.status-text {
  margin: 0;
  font-size: 0.85rem;
  color: var(--text-secondary);
}
</style>
