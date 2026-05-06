<template>
  <div class="search-bar">
    <form @submit.prevent="handleSearch" class="search-form">
      <div class="search-input-wrapper">
        <input
          v-model="username"
          type="text"
          :placeholder="t('search.placeholder')"
          class="search-input"
          :disabled="isLoading"
          @keyup.enter="handleSearch"
        />
      </div>
      <button
        type="submit"
        class="search-btn"
        :disabled="!username.trim() || isLoading"
      >
        <span v-if="!isLoading">{{ t('search.button') }}</span>
        <span v-else class="loading-spinner">⏳</span>
      </button>
    </form>
    
    <!-- Error message -->
    <p v-if="error" class="search-error">
      {{ error }}
    </p>

    <!-- Recent searches -->
    <SearchHistory @select="selectRecentSearch" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import SearchHistory from './SearchHistory.vue'

const { t } = useI18n()

const username = ref('')
const isLoading = ref(false)
const error = ref('')

const emit = defineEmits<{
  search: [username: string]
}>()

async function handleSearch() {
  const trimmedUsername = username.value.trim()
  
  if (!trimmedUsername) {
    error.value = t('search.error')
    return
  }

  isLoading.value = true
  error.value = ''
  
  try {
    emit('search', trimmedUsername)
  } catch (err) {
    error.value = t('search.error')
  } finally {
    isLoading.value = false
  }
}

function selectRecentSearch(selectedUsername: string) {
  username.value = selectedUsername
  handleSearch()
}
</script>

<style lang="scss" scoped>
.search-bar {
  margin: 2rem 0;
}

.search-form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.search-input-wrapper {
  flex: 1;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background-color: var(--bg-tertiary);
  color: var(--text-primary);
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &::placeholder {
    color: var(--text-secondary);
  }

  &:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-dim);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.search-btn {
  padding: 0.75rem 1.5rem;
  background-color: var(--accent);
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease, opacity 0.2s ease;
  white-space: nowrap;

  &:hover:not(:disabled) {
    background-color: var(--accent-hover);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.loading-spinner {
  display: inline-block;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.search-error {
  color: var(--danger);
  font-size: 0.875rem;
  margin: 0;
}
</style>
