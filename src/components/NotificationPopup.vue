<template>
  <Teleport to="body">
    <Transition name="popup">
      <div v-if="isOpen" class="notification-overlay" @click="handleClose">
        <div class="notification-container" @click.stop>
          <div class="notification-header">
            <h2 class="notification-title">{{ title }}</h2>
            <button class="notification-close" @click="handleClose" title="Close">✕</button>
          </div>
          <div class="notification-content">
            <p class="notification-message">{{ message }}</p>
            <div v-if="content" class="notification-content-box">
              <code class="notification-code">{{ content }}</code>
              <button class="notification-copy-btn" @click="copyContent" :title="copyButtonTitle">
                {{ copyButtonText }}
              </button>
            </div>
          </div>
          <div class="notification-footer">
            <button class="notification-button" @click="handleClose">
              {{ t('common.close') }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface Props {
  isOpen: boolean
  title?: string
  message?: string
  content?: string
  type?: 'success' | 'error' | 'info'
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Notification',
  message: '',
  content: '',
  type: 'info'
})

const emit = defineEmits<{
  close: []
  copy: []
}>()

const copied = ref(false)
const copyButtonText = computed(() => copied.value ? `✓ ${t('common.copied')}` : `📋 ${t('common.copy')}`)
const copyButtonTitle = computed(() => copied.value ? t('common.copied') : t('common.copy'))

function handleClose(): void {
  emit('close')
  copied.value = false
}

function copyContent(): void {
  if (props.content) {
    navigator.clipboard.writeText(props.content).then(() => {
      copied.value = true
      emit('copy')
      setTimeout(() => {
        copied.value = false
      }, 2000)
    })
  }
}
</script>

<style lang="scss" scoped>
.notification-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(2px);
}

.notification-container {
  background-color: var(--bg-primary);
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  width: 90%;
  overflow: hidden;
  animation: slideUp 0.3s ease;
}

.notification-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.notification-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
}

.notification-close {
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--bg-secondary);
    color: var(--text-primary);
  }
}

.notification-content {
  padding: 1.5rem;
}

.notification-message {
  margin: 0 0 1rem 0;
  font-size: 1rem;
  line-height: 1.5;
  color: var(--text-secondary);
}

.notification-content-box {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.notification-code {
  flex: 1;
  font-family: 'Courier New', monospace;
  font-size: 0.85rem;
  color: var(--accent);
  word-break: break-all;
  margin: 0;
  padding: 0;
  background: none;
  border: none;
}

.notification-copy-btn {
  flex-shrink: 0;
  background-color: var(--accent);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--accent-hover);
  }

  &:active {
    transform: scale(0.95);
  }
}

.notification-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: flex-end;
}

.notification-button {
  padding: 0.65rem 2rem;
  background-color: var(--accent);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--accent-hover);
  }

  &:active {
    transform: scale(0.98);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.popup-enter-active,
.popup-leave-active {
  transition: opacity 0.2s ease;

  .notification-container {
    transition: transform 0.2s ease;
  }
}

.popup-enter-from,
.popup-leave-to {
  opacity: 0;

  .notification-container {
    transform: translateY(20px);
  }
}
</style>
