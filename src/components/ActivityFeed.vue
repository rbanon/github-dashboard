<template>
  <div v-if="events.length > 0" class="activity-container">
    <h3 class="activity-title">{{ t('activity.title') }}</h3>
    <div class="activity-list">
      <div v-for="event in events" :key="event.id" class="activity-item">
        <div class="activity-marker"></div>
        <div class="activity-content">
          <p class="activity-action">
            <strong>{{ getEventType(event.type) }}</strong>
            on <a :href="`https://github.com/${event.repo.name.split('/')[0]}`" target="_blank" class="repo-link">
              {{ event.repo.name }}
            </a>
          </p>
          <time class="activity-time">{{ formatTime(event.created_at) }}</time>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="activity-empty">
    <p>{{ t('activity.noActivity') }}</p>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { GithubEvent } from '../types/github'

const { t } = useI18n()

defineProps<{
  events: GithubEvent[]
}>()

function getEventType(type: string): string {
  const eventTypes: Record<string, string> = {
    PushEvent: '📤 Pushed',
    PullRequestEvent: '🔀 Pull Request',
    IssuesEvent: '📋 Issue',
    CreateEvent: '✨ Created',
    DeleteEvent: '🗑️ Deleted',
    ForkEvent: '🍴 Forked',
    WatchEvent: '⭐ Starred',
    ReleaseEvent: '📦 Released'
  }
  return eventTypes[type] || type
}

function formatTime(date: string): string {
  const now = new Date()
  const eventDate = new Date(date)
  const diffMs = now.getTime() - eventDate.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 30) return `${diffDays}d ago`
  
  return eventDate.toLocaleDateString(undefined, {
    year: '2-digit',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<style lang="scss" scoped>
.activity-container {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.activity-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 1.5rem 0;
}

.activity-list {
  position: relative;
  padding-left: 2rem;

  &::before {
    content: '';
    position: absolute;
    left: 6px;
    top: 0;
    bottom: 0;
    width: 2px;
    background-color: var(--border-color);
  }
}

.activity-item {
  position: relative;
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
}

.activity-marker {
  position: absolute;
  left: -2.25rem;
  top: 2px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: var(--accent);
  border: 2px solid var(--bg-primary);
}

.activity-content {
  padding: 0.75rem;
  border-left: 2px solid var(--accent);
  padding-left: 1rem;
}

.activity-action {
  color: var(--text-primary);
  margin: 0 0 0.25rem 0;
  font-size: 0.95rem;
}

.repo-link {
  color: var(--accent);
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
}

.activity-time {
  display: block;
  color: var(--text-secondary);
  font-size: 0.8rem;
  margin: 0;
}

.activity-empty {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  color: var(--text-secondary);
}
</style>
