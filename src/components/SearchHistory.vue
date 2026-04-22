<template>
  <div v-if="recentSearches.length > 0" class="search-history">
    <div class="search-history-header">
      <h3 class="search-history-title">{{ $t('searchHistory.title') }}</h3>
      <button class="search-history-clear" @click="openClearConfirm" :title="$t('searchHistory.clearButton')">
        ✕ {{ $t('searchHistory.clearButton') }}
      </button>
    </div>
    <div class="search-history-list">
      <button
        v-for="(search, index) in recentSearches"
        :key="index"
        class="search-history-item"
        @click="$emit('select', search)"
        :title="`Search for ${search}`"
      >
        <span class="search-history-icon">🔍</span>
        <span class="search-history-name">{{ search }}</span>
      </button>
    </div>
  </div>

  <ConfirmPopup
    :is-open="showClearConfirm"
    :title="$t('searchHistory.clearConfirmTitle')"
    :message="$t('searchHistory.clearConfirmMessage')"
    :cancel-text="$t('searchHistory.keepButton')"
    :confirm-text="$t('searchHistory.clearAllButton')"
    @confirm="confirmClear"
    @cancel="closeClearConfirm"
    @close="closeClearConfirm"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ConfirmPopup from './ConfirmPopup.vue'
import { useSearchHistory } from '../composables/useSearchHistory'

const { recentSearches, clearRecentSearches } = useSearchHistory()
const showClearConfirm = ref(false)

defineEmits<{
  select: [username: string]
}>()

function openClearConfirm(): void {
  showClearConfirm.value = true
}

function closeClearConfirm(): void {
  showClearConfirm.value = false
}

function confirmClear(): void {
  clearRecentSearches()
  closeClearConfirm()
}
</script>

<style lang="scss" scoped>
.search-history {
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: var(--bg-secondary);
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.search-history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.search-history-title {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary);
}

.search-history-clear {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 0.85rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--bg-tertiary);
    color: var(--danger);
  }
}

.search-history-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.search-history-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background-color: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  color: var(--text-primary);
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--accent);
    border-color: var(--accent);
    color: var(--bg-primary);
  }
}

.search-history-icon {
  opacity: 0.7;
}

.search-history-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
