<template>
  <div class="skeleton-loader" :class="`skeleton-${variant}`">
    <div v-for="i in count" :key="i" class="skeleton-item">
      <div class="skeleton-shimmer"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
type SkeletonVariant = 'user-profile' | 'repo-card' | 'chart' | 'activity-item'

const props = withDefaults(
  defineProps<{
    variant: SkeletonVariant
    count?: number
  }>(),
  {
    count: 1
  }
)
</script>

<style lang="scss" scoped>
$shimmer-duration: 2s;

.skeleton-loader {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.skeleton-item {
  position: relative;
  overflow: hidden;
  background-color: var(--bg-tertiary);
  border-radius: 8px;
}

.skeleton-shimmer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  animation: shimmer $shimmer-duration infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

// Variant: User Profile
.skeleton-user-profile {
  .skeleton-item {
    &:nth-child(1) {
      width: 100%;
      height: 120px;
      display: flex;
      gap: 1rem;

      .skeleton-shimmer {
        width: 100%;
      }
    }

    &:nth-child(2),
    &:nth-child(3),
    &:nth-child(4) {
      width: 100%;
      height: 12px;
    }

    &:nth-child(5) {
      width: 60%;
      height: 40px;
    }
  }
}

// Variant: Repository Card
.skeleton-repo-card {
  .skeleton-item {
    &:nth-child(1) {
      width: 100%;
      height: 20px;
    }

    &:nth-child(2) {
      width: 100%;
      height: 60px;
    }

    &:nth-child(3) {
      width: 100%;
      height: 15px;
    }
  }
}

// Variant: Chart
.skeleton-chart {
  .skeleton-item {
    width: 100%;
    height: 300px;
  }
}

// Variant: Activity Item
.skeleton-activity-item {
  .skeleton-item {
    &:nth-child(1) {
      width: 100%;
      height: 16px;
    }

    &:nth-child(2) {
      width: 70%;
      height: 14px;
    }
  }
}
</style>
