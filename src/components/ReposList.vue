<template>
  <div v-if="repos.length > 0" class="repos-container">
    <h3 class="repos-title">{{ t('repos.title') }}</h3>
    <div class="repos-grid">
      <RepoCard v-for="repo in repos" :key="repo.id" :repo="repo" />
    </div>
  </div>
  <div v-else class="repos-empty">
    <p>{{ t('repos.noRepos') }}</p>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import RepoCard from './RepoCard.vue'
import type { GithubRepo } from '../types/github'

const { t } = useI18n()

defineProps<{
  repos: GithubRepo[]
}>()
</script>

<style lang="scss" scoped>
.repos-container {
  margin-bottom: 2rem;
}

.repos-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 1rem 0;
}

.repos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

.repos-empty {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  color: var(--text-secondary);
}
</style>
