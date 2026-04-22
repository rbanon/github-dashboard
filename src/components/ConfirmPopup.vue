<template>
  <Teleport to="body">
    <Transition name="popup">
      <div v-if="isOpen" class="popup-overlay" @click="handleOverlayClick">
        <div class="popup-container" @click.stop>
          <div class="popup-header">
            <h2 class="popup-title">{{ title }}</h2>
          </div>
          <div class="popup-content">
            <p class="popup-message">{{ message }}</p>
          </div>
          <div class="popup-footer">
            <button class="popup-button popup-button-cancel" @click="handleCancel">
              {{ cancelText }}
            </button>
            <button class="popup-button popup-button-confirm" @click="handleConfirm">
              {{ confirmText }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">

interface Props {
  isOpen: boolean
  title?: string
  message?: string
  cancelText?: string
  confirmText?: string
  isDangerous?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Confirm Action',
  message: 'Are you sure?',
  cancelText: 'Cancel',
  confirmText: 'Confirm',
  isDangerous: false
})

const emit = defineEmits<{
  confirm: []
  cancel: []
  close: []
}>()

function handleConfirm(): void {
  emit('confirm')
}

function handleCancel(): void {
  emit('cancel')
}

function handleOverlayClick(): void {
  emit('close')
}
</script>

<style lang="scss" scoped>
.popup-overlay {
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

.popup-container {
  background-color: var(--bg-primary);
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
  animation: slideUp 0.3s ease;
}

.popup-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.popup-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
}

.popup-content {
  padding: 1.5rem;
}

.popup-message {
  margin: 0;
  font-size: 1rem;
  line-height: 1.5;
  color: var(--text-secondary);
}

.popup-footer {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  border-top: 1px solid var(--border-color);
  justify-content: flex-end;
}

.popup-button {
  padding: 0.65rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 100px;

  &-cancel {
    background-color: var(--bg-secondary);
    color: var(--text-primary);
    border: 1px solid var(--border-color);

    &:hover {
      background-color: var(--bg-tertiary);
      border-color: var(--text-secondary);
    }

    &:active {
      transform: scale(0.98);
    }
  }

  &-confirm {
    background-color: var(--accent);
    color: white;

    &:hover {
      opacity: 0.9;
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
    }

    &:active {
      transform: scale(0.98);
    }
  }
}

// Animation keyframes
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

@keyframes backdropFade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

// Transition animations
.popup-enter-active,
.popup-leave-active {
  transition: opacity 0.3s ease;
}

.popup-enter-from,
.popup-leave-to {
  opacity: 0;
}
</style>
