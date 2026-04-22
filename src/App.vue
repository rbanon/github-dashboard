<template>
  <div id="app">
    <AppHeader />
    
    <main class="container main-content">
      <!-- Search Section -->
      <SearchBar @search="handleSearch" />

      <!-- Rate Limit Info -->
      <RateLimitInfo ref="rateLimitRef" />

      <!-- Loading State with Skeleton Loaders -->
      <Transition name="fade" mode="out-in">
        <div v-if="isLoading" key="loading" class="loading-state">
          <SkeletonLoader variant="user-profile" :count="1" />
          <SkeletonLoader variant="chart" :count="1" />
          <SkeletonLoader variant="activity-item" :count="3" />
          <SkeletonLoader variant="repo-card" :count="3" />
        </div>

        <!-- Error State -->
        <div v-else-if="error" key="error" class="error-state">
          <p class="error-title">⚠️ {{ t('search.error') }}</p>
          <p class="error-message">{{ error }}</p>
        </div>

        <!-- Dashboard Content -->
        <div v-else-if="currentUser" key="dashboard">
          <!-- User Profile -->
          <UserProfile :user="currentUser" />

          <!-- Language Chart -->
          <LanguageChart :repos="currentRepos" />

          <!-- Recent Activity -->
          <ActivityFeed :events="currentEvents" />

          <!-- Repositories List -->
          <ReposList :repos="currentRepos" />
        </div>

        <!-- Initial State -->
        <div v-else key="initial" class="initial-state">
          <p class="text-secondary">{{ t('status.searchPrompt') }}</p>
        </div>
      </Transition>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import AppHeader from './components/AppHeader.vue'
import SearchBar from './components/SearchBar.vue'
import UserProfile from './components/UserProfile.vue'
import LanguageChart from './components/LanguageChart.vue'
import ActivityFeed from './components/ActivityFeed.vue'
import ReposList from './components/ReposList.vue'
import SkeletonLoader from './components/SkeletonLoader.vue'
import RateLimitInfo from './components/RateLimitInfo.vue'
import { getUser, getRepos, getEvents } from './services/githubApi'
import { initRecentSearches, addSearch } from './composables/useSearchHistory'
import type { GithubUser, GithubRepo, GithubEvent } from './types/github'

const { t } = useI18n()

const currentUser = ref<GithubUser | null>(null)
const currentRepos = ref<GithubRepo[]>([])
const currentEvents = ref<GithubEvent[]>([])
const isLoading = ref(false)
const error = ref('')
const rateLimitRef = ref<InstanceType<typeof RateLimitInfo>>()

async function handleSearch(username: string) {
  isLoading.value = true
  error.value = ''
  currentUser.value = null
  currentRepos.value = []
  currentEvents.value = []

  try {
    const [user, repos, events] = await Promise.all([
      getUser(username),
      getRepos(username),
      getEvents(username)
    ])

    currentUser.value = user
    currentRepos.value = repos
    currentEvents.value = events
    addSearch(username) // Store in search history

    // Update rate limit display
    if (rateLimitRef.value) {
      rateLimitRef.value.updateRateLimit()
    }
  } catch (err) {
    if (err instanceof Error) {
      error.value = err.message
    } else {
      error.value = t('search.error')
    }
    console.error('Error fetching GitHub data:', err)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  // Initialize search history from localStorage
  initRecentSearches()
})
</script>

<style lang="scss">
@use './styles/main.scss' as *;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: background-color 0.2s ease, color 0.2s ease;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  width: 100%;
}

.main-content {
  flex: 1;
  padding: 2rem 1rem;
}
</style>

<style lang="scss" scoped>
.loading-state,
.error-state,
.initial-state {
  text-align: center;
  padding: 3rem 1rem;
  background-color: var(--bg-secondary);
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.loading-state {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem 1rem;
}

.error-state {
  background-color: rgba(248, 81, 73, 0.1);
  border-color: var(--danger);
  color: var(--danger);
  padding: 2rem;
  border-radius: 8px;

  .error-title {
    margin: 0 0 0.5rem 0;
    font-size: 1.1rem;
    font-weight: 600;
  }

  .error-message {
    margin: 0;
    font-size: 0.95rem;
  }
}

.initial-state {
  color: var(--text-secondary);
  padding: 4rem 1rem;
}

.text-secondary {
  color: var(--text-secondary);
}

/* Fade transition for state changes */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>