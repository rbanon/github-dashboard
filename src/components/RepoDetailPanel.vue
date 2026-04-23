<template>
  <Teleport to="body">
    <Transition name="panel-slide">
      <div v-if="isOpen" class="detail-panel-wrapper">
        <!-- Backdrop -->
        <div class="detail-panel-backdrop" @click="closeDetails"></div>

        <!-- Panel -->
        <div class="detail-panel">
          <!-- Header -->
          <div class="detail-header">
            <h2 class="detail-title">{{ repo?.name }}</h2>
            <button class="detail-close" @click="closeDetails" :title="$t('common.close')">
              ✕
            </button>
          </div>

          <!-- Content -->
          <div class="detail-content">
            <!-- Description -->
            <section class="detail-section" v-if="repo?.description">
              <h3 class="section-title">{{ $t('repos.details.description') }}</h3>
              <p class="section-content description-text">{{ repo.description }}</p>
            </section>

            <!-- Key Metrics -->
            <section class="detail-section">
              <h3 class="section-title">{{ $t('repos.details.metrics') }}</h3>
              <div class="metrics-grid">
                <div class="metric-card">
                  <div class="metric-label">{{ $t('repos.stars') }}</div>
                  <div class="metric-value">{{ repo?.stargazers_count }}</div>
                </div>
                <div class="metric-card">
                  <div class="metric-label">{{ $t('repos.forks') }}</div>
                  <div class="metric-value">{{ repo?.forks_count }}</div>
                </div>
                <div class="metric-card" v-if="repo?.language">
                  <div class="metric-label">{{ $t('repos.details.language') }}</div>
                  <div class="metric-value">{{ repo.language }}</div>
                </div>
                <div class="metric-card">
                  <div class="metric-label">{{ $t('repos.details.status') }}</div>
                  <div class="metric-value" :style="{ color: getHealthColor(getHealthStatus(repo!)) }">
                    {{ $t(`repos.details.${getHealthStatus(repo!)}`) }}
                  </div>
                </div>
              </div>
            </section>

            <!-- Dates -->
            <section class="detail-section">
              <h3 class="section-title">{{ $t('repos.details.dates') }}</h3>
              <div class="dates-grid">
                <div class="date-item">
                  <span class="date-label">{{ $t('repos.details.created') }}</span>
                  <span class="date-value">{{ formatDate(repo?.created_at || '') }}</span>
                </div>
                <div class="date-item">
                  <span class="date-label">{{ $t('repos.details.lastUpdate') }}</span>
                  <span class="date-value">{{ formatDate(repo?.updated_at || '') }}</span>
                  <span class="date-info">({{ daysSinceUpdate(repo?.updated_at || '') }} days ago)</span>
                </div>
              </div>
            </section>

            <!-- Fork Info -->
            <section class="detail-section" v-if="repo?.fork">
              <h3 class="section-title">{{ $t('repos.details.forkInfo') }}</h3>
              <div class="fork-info">
                <p class="fork-text">
                  {{ $t('repos.details.isForked') }}
                  <a :href="`https://github.com/${repo.parent?.full_name}`" target="_blank" class="fork-link">
                    {{ repo.parent?.full_name || 'View parent' }}
                  </a>
                </p>
              </div>
            </section>

            <!-- Links -->
            <section class="detail-section">
              <h3 class="section-title">{{ $t('repos.details.links') }}</h3>
              <div class="links-group">
                <a :href="repo?.html_url" target="_blank" class="detail-link">
                  🔗 {{ $t('repos.details.viewOnGithub') }}
                </a>
                <a v-if="repo?.homepage" :href="repo.homepage" target="_blank" class="detail-link">
                  🌐 {{ $t('repos.details.homepage') }}
                </a>
              </div>
            </section>
          </div>

          <!-- Footer -->
          <div class="detail-footer">
            <button class="detail-action-btn" @click="closeDetails">
              {{ $t('common.close') }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useRepoDetails } from '../composables/useRepoDetails'

const { selectedRepo: repo, isOpen, closeDetails, daysSinceUpdate, formatDate, getHealthStatus, getHealthColor } =
  useRepoDetails()
</script>

<style lang="scss" scoped>
.detail-panel-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  display: flex;
}

.detail-panel-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
  cursor: pointer;
}

.detail-panel {
  position: relative;
  margin-left: auto;
  width: 100%;
  max-width: 450px;
  background-color: var(--bg-primary);
  border-left: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.3);
  animation: slideInRight 0.3s ease-out;

  @media (max-width: 768px) {
    max-width: 100%;
  }
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-color);
  background-color: var(--bg-secondary);
  position: sticky;
  top: 0;
  z-index: 10;
}

.detail-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  word-break: break-word;
  flex: 1;
  padding-right: 1rem;
}

.detail-close {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 1.5rem;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--bg-tertiary);
    color: var(--text-primary);
  }
}

.detail-content {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
}

.detail-section {
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }
}

.section-title {
  margin: 0 0 1rem 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  opacity: 0.8;
}

.section-content {
  margin: 0;
  color: var(--text-secondary);
  line-height: 1.6;
}

.description-text {
  font-size: 0.9rem;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.metric-card {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 1rem;
  text-align: center;
}

.metric-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.metric-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--accent);
}

.dates-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.date-item {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.date-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
}

.date-value {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
}

.date-info {
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.fork-info {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 1rem;
}

.fork-text {
  margin: 0;
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

.fork-link {
  color: var(--accent);
  text-decoration: none;
  font-weight: 600;
  margin: 0 0.25rem;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
    text-decoration: underline;
  }
}

.links-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.detail-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--accent);
  text-decoration: none;
  padding: 0.75rem 1rem;
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--accent);
    color: white;
    border-color: var(--accent);
  }
}

.detail-footer {
  padding: 1.5rem;
  border-top: 1px solid var(--border-color);
  background-color: var(--bg-secondary);
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  position: sticky;
  bottom: 0;
}

.detail-action-btn {
  padding: 0.65rem 1.5rem;
  background-color: var(--bg-tertiary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--accent);
    color: white;
    border-color: var(--accent);
  }
}

// Animations
@keyframes slideInRight {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

.panel-slide-enter-active,
.panel-slide-leave-active {
  transition: opacity 0.3s ease;
}

.panel-slide-enter-from,
.panel-slide-leave-to {
  opacity: 0;
}

// Scrollbar styling
.detail-content {
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: 4px;

    &:hover {
      background: var(--text-secondary);
    }
  }
}
</style>
