<template>
  <div v-if="show" class="rate-limit-info" :class="{ 'rate-limit-warning': isLow }">
    <div class="rate-limit-content">
      <p class="rate-limit-text">
        <strong>API Rate Limit:</strong> {{ remaining }} / {{ limit }} requests remaining
      </p>
      <p v-if="isLow" class="rate-limit-warning-text">
        ⚠️ Running low on API requests. Resets at {{ resetTime }}
      </p>
      <div class="rate-limit-bar">
        <div class="rate-limit-progress" :style="{ width: percentage + '%' }"></div>
      </div>
    </div>
    <button class="rate-limit-close" @click="dismiss" title="Close">✕</button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { getRateLimit } from '../services/githubApi'

const show = ref(false)
const limit = ref(60)
const remaining = ref(60)
const reset = ref(0)

const isLow = computed(() => remaining.value <= 10)
const percentage = computed(() => (remaining.value / limit.value) * 100)
const resetTime = computed(() => {
  const date = new Date(reset.value)
  return date.toLocaleTimeString()
})

function updateRateLimit(): void {
  const rateLimit = getRateLimit()
  limit.value = rateLimit.limit
  remaining.value = rateLimit.remaining
  reset.value = rateLimit.reset

  // Show warning if low
  if (isLow.value) {
    show.value = true
  }
}

function dismiss(): void {
  show.value = false
}

onMounted(() => {
  updateRateLimit()
  // Update every 30 seconds
  setInterval(updateRateLimit, 30000)
})

// Expose for external updates
defineExpose({
  updateRateLimit,
  show
})
</script>

<style lang="scss" scoped>
.rate-limit-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  margin: 1rem 0;
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &.rate-limit-warning {
    border-color: var(--warning);
    background-color: rgba(217, 119, 6, 0.1);
  }
}

.rate-limit-content {
  flex: 1;
  min-width: 0;
}

.rate-limit-text {
  margin: 0 0 0.5rem 0;
  color: var(--text-primary);
}

.rate-limit-warning-text {
  margin: 0.5rem 0;
  color: var(--warning);
  font-weight: 500;
}

.rate-limit-bar {
  width: 100%;
  height: 6px;
  background-color: var(--bg-tertiary);
  border-radius: 3px;
  overflow: hidden;
  margin-top: 0.5rem;
}

.rate-limit-progress {
  height: 100%;
  background: linear-gradient(90deg, var(--success), var(--accent));
  transition: width 0.3s ease;

  .rate-limit-warning & {
    background: linear-gradient(90deg, var(--danger), var(--warning));
  }
}

.rate-limit-close {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
  flex-shrink: 0;

  &:hover {
    color: var(--text-primary);
  }
}
</style>
