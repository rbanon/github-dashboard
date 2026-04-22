<template>
  <a :href="repo.html_url" target="_blank" class="repo-card">
    <div class="repo-header">
      <h3 class="repo-name">{{ repo.name }}</h3>
      <span v-if="repo.fork" class="fork-badge">{{ t('repos.fork') }}</span>
    </div>

    <p v-if="repo.description" class="repo-description">
      {{ truncateText(repo.description, 100) }}
    </p>
    <p v-else class="repo-description text-secondary">
      {{ t('repos.noDescription') }}
    </p>

    <div class="repo-footer">
      <div class="repo-stats">
        <span v-if="repo.language" class="language-tag">
          <span class="language-dot"></span>
          {{ repo.language }}
        </span>
      </div>

      <div class="repo-metrics">
        <span class="metric">
          ⭐ {{ repo.stargazers_count.toLocaleString() }}
        </span>
        <span class="metric">
          🍴 {{ repo.forks_count.toLocaleString() }}
        </span>
      </div>
    </div>

    <p class="repo-updated">
      {{ t('repos.updated') }}: {{ formatDate(repo.updated_at) }}
    </p>
  </a>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { GithubRepo } from '../types/github'

const { t } = useI18n()

defineProps<{
  repo: GithubRepo
}>()

function truncateText(text: string, length: number): string {
  return text.length > length ? text.slice(0, length) + '...' : text
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<style lang="scss" scoped>
.repo-card {
  display: block;
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1.25rem;
  text-decoration: none;
  color: var(--text-primary);
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(88, 166, 255, 0.1);
    transform: translateY(-2px);
  }
}

.repo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.repo-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--accent);
  margin: 0;
  word-break: break-word;
}

.fork-badge {
  display: inline-block;
  background-color: var(--bg-tertiary);
  color: var(--text-secondary);
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  white-space: nowrap;
  flex-shrink: 0;
}

.repo-description {
  color: var(--text-secondary);
  font-size: 0.95rem;
  margin: 0 0 1rem 0;
  line-height: 1.4;
}

.repo-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-top: 1px solid var(--border-color);
  margin-bottom: 0.75rem;
  gap: 1rem;
}

.repo-stats {
  display: flex;
  gap: 0.75rem;
}

.language-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.language-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--accent);
}

.repo-metrics {
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.metric {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.repo-updated {
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin: 0;
}

.text-secondary {
  color: var(--text-secondary) !important;
}
</style>
