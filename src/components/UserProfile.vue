<template>
  <div v-if="user" class="profile-card">
    <!-- Simple View -->
    <div v-if="isSimple" class="profile-simple">
      <div class="simple-header">
        <img :src="user.avatar_url" :alt="user.login" class="simple-avatar" />
        <div class="simple-info">
          <h2 class="simple-name">{{ user.name || user.login }}</h2>
          <p class="simple-login">@{{ user.login }}</p>
        </div>
      </div>
      <a :href="user.html_url" target="_blank" class="profile-link-btn profile-link-btn--simple">
        {{ t('profile.viewProfile') }}
      </a>
    </div>

    <!-- Complete View -->
    <div v-else class="profile-complete">
      <div class="profile-header">
        <img :src="user.avatar_url" :alt="user.login" class="profile-avatar" />
        <div class="profile-info">
          <h2 class="profile-name">{{ user.name || user.login }}</h2>
          <p class="profile-login">@{{ user.login }}</p>
          <p v-if="user.bio" class="profile-bio">{{ user.bio }}</p>
          <p v-else class="profile-bio text-secondary">{{ t('profile.noBio') }}</p>
        </div>
      </div>

      <div class="profile-details">
        <div class="detail-item">
          <span class="detail-label">{{ t('profile.followers') }}</span>
          <span class="detail-value">{{ user.followers.toLocaleString() }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">{{ t('profile.following') }}</span>
          <span class="detail-value">{{ user.following.toLocaleString() }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">{{ t('profile.repos') }}</span>
          <span class="detail-value">{{ user.public_repos.toLocaleString() }}</span>
        </div>
      </div>

      <div v-if="user.location || user.blog" class="profile-links">
        <p v-if="user.location" class="link-item">📍 {{ user.location }}</p>
        <a v-if="user.blog" :href="user.blog" target="_blank" class="link-item">
          🔗 {{ user.blog }}
        </a>
      </div>

      <a :href="user.html_url" target="_blank" class="profile-link-btn">
        {{ t('profile.viewProfile') }}
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { GithubUser } from '../types/github'

const { t } = useI18n()

defineProps<{
  user: GithubUser | null
  isSimple: boolean
}>()
</script>

<style lang="scss" scoped>
.profile-card {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.profile-header {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.profile-avatar {
  width: 100px;
  height: 100px;
  border-radius: 8px;
  border: 2px solid var(--border-color);
  object-fit: cover;
}

.profile-info {
  flex: 1;
}

.profile-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 0.25rem 0;
}

.profile-login {
  color: var(--text-secondary);
  font-size: 0.95rem;
  margin: 0 0 0.75rem 0;
}

.profile-bio {
  color: var(--text-secondary);
  font-size: 0.95rem;
  margin: 0;
  line-height: 1.4;
}

.profile-details {
  display: flex;
  gap: 2rem;
  padding: 1.5rem 0;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 1.5rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.detail-label {
  color: var(--text-secondary);
  font-size: 0.85rem;
  font-weight: 500;
}

.detail-value {
  color: var(--text-primary);
  font-size: 1.25rem;
  font-weight: 700;
}

.profile-links {
  margin-bottom: 1rem;
}

.link-item {
  color: var(--text-secondary);
  margin: 0.5rem 0;
  font-size: 0.95rem;

  &:hover {
    color: var(--accent);
  }
}

.profile-link-btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: var(--accent);
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--accent-hover);
  }
}

.text-secondary {
  color: var(--text-secondary) !important;
}

// Simple View Styles
.profile-simple {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

.simple-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.simple-avatar {
  width: 60px;
  height: 60px;
  border-radius: 6px;
  border: 2px solid var(--border-color);
  object-fit: cover;
  flex-shrink: 0;
}

.simple-info {
  flex: 1;
}

.simple-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 0.125rem 0;
}

.simple-login {
  color: var(--text-secondary);
  font-size: 0.85rem;
  margin: 0;
}

.profile-link-btn--simple {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  flex-shrink: 0;
}

// Responsive
@media (max-width: 768px) {
  .profile-simple {
    flex-direction: column;
    align-items: flex-start;
  }

  .profile-link-btn--simple {
    width: 100%;
    text-align: center;
  }

  .profile-details {
    gap: 1rem;
  }
}
</style>

