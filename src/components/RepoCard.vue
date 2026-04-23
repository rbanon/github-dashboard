<template>
  <div class="repo-card" @click="handleCardClick">
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

    <div class="repo-actions">
      <a :href="repo.html_url" target="_blank" class="repo-link-btn" @click.stop>
        🔗 {{ t('repos.details.viewOnGithub') }}
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRepoDetails } from '../composables/useRepoDetails'
import type { GithubRepo } from '../types/github'

const { t } = useI18n()
const { openDetails } = useRepoDetails()

const props = defineProps<{
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

function handleCardClick(): void {
  openDetails(props.repo)
}
</script>

<style lang="scss" scoped>
.repo-card {
  display: flex;
  flex-direction: column;
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1.25rem;
  text-decoration: none;
  color: var(--text-primary);
  transition: all 0.2s ease;
  cursor: pointer;
  height: 100%;

  &:hover {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(88, 166, 255, 0.1);
    transform: translateY(-2px);
  }
}

.repo-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.repo-name {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  flex: 1;
  word-break: break-word;
}

.fork-badge {
  font-size: 0.7rem;
  padding: 0.25rem 0.5rem;
  background-color: var(--accent);
  color: white;
  border-radius: 4px;
  font-weight: 600;
  white-space: nowrap;
}

.repo-description {
  margin: 0 0 1rem 0;
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.5;
  flex: 1;

  &.text-secondary {
    opacity: 0.7;
  }
}

.repo-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}

.repo-stats {
  display: flex;
  gap: 0.5rem;
}

.language-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--text-secondary);
  background-color: var(--bg-tertiary);
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
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
}

.metric {
  font-size: 0.9rem;
  color: var(--text-secondary);
  white-space: nowrap;
}

.repo-updated {
  margin: 0 0 1rem 0;
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.repo-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: auto;
}

.repo-link-btn {
  flex: 1;
  padding: 0.65rem;
  background-color: var(--accent);
  color: white;
  border: none;
  border-radius: 6px;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    opacity: 0.9;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.98);
  }
}
</style>
