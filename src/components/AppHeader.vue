<template>
  <header class="header">
    <div class="container header__inner">

      <div class="header__brand">
        <h1 class="header__title">GitHub<span class="header__title-accent"> Dashboard</span></h1>
        <p class="header__subtitle">{{ t('header.subtitle') }}</p>
      </div>

      <div class="header__controls">

        <!-- Language selector -->
        <div class="header__lang">
          <button
            :class="['lang-btn', { active: locale === 'en' }]"
            @click="setLocale('en')"
          >EN</button>
          <span class="lang-divider">|</span>
          <button
            :class="['lang-btn', { active: locale === 'es' }]"
            @click="setLocale('es')"
          >ES</button>
        </div>

        <!-- Theme toggle -->
        <button class="theme-btn" @click="toggleTheme" :title="t(`theme.${theme}`)">
          <IconSun v-if="theme === 'dark'" />
          <IconMoon v-else />
        </button>

      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useTheme } from '../composables/useTheme'
import IconSun from './icons/IconSun.vue'
import IconMoon from './icons/IconMoon.vue'

const { t, locale } = useI18n()
const { theme, toggleTheme } = useTheme()

function setLocale(lang: 'en' | 'es') {
  locale.value = lang
  localStorage.setItem('locale', lang)
}
</script>

<style lang="scss" scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
  backdrop-filter: blur(8px);

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
  }

  &__brand {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1px;
  }

  &__title {
    font-family: var(--font-display);
    font-size: 20px;
    font-weight: 600;
    color: var(--text-primary);
    letter-spacing: -0.02em;
    line-height: 1.2;
    margin: 0;
  }

  &__title-accent {
    color: var(--accent);
  }

  &__subtitle {
    font-family: var(--font-body);
    font-size: 0.72rem;
    color: var(--text-secondary);
    line-height: 1.2;
    margin: 0;
  }

  &__controls {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  &__lang {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
}

.lang-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0.25rem 0.35rem;
  border-radius: 4px;
  transition: color 0.15s;

  &.active {
    color: var(--accent);
  }

  &:hover {
    color: var(--text-primary);
  }
}

.lang-divider {
  color: var(--border-color);
  font-size: 0.75rem;
}

.theme-btn {
  background: none;
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  cursor: pointer;
  padding: 0.4rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.2s ease, color 0.2s ease;

  svg {
    width: 18px;
    height: 18px;
    display: block;
  }

  &:hover {
    border-color: var(--accent);
    color: var(--accent);
  }
}
</style>