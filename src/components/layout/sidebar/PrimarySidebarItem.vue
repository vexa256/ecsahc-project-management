<script setup>
import { ref } from 'vue'
import IconFeather from '@/components/icons/IconFeather.vue'

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  isActive: {
    type: Boolean,
    default: false
  }
})

const isHovered = ref(false)
</script>

<template>
  <button
    class="primary-nav-item"
    :class="{ 'active': isActive }"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    @click="$emit('click')"
  >
    <!-- Background Effects -->
    <div class="item-background" :class="{ 'active': isActive }" />
    
    <!-- Icon Container -->
    <div class="icon-container" :class="{ 'active': isActive }">
      <div class="icon-glow" :class="{ 'active': isActive || isHovered }" />
      <IconFeather 
        :name="item.icon" 
        size="20"
        class="icon"
        :class="{ 'active': isActive }"
      />
    </div>

    <!-- Active Indicator -->
    <div 
      v-if="isActive"
      class="active-indicator"
    >
      <div class="indicator-line" />
      <div class="indicator-glow" />
    </div>

    <!-- Tooltip -->
    <div 
      class="tooltip"
      :class="{ 'active': isHovered }"
    >
      {{ item.name }}
      <span 
        v-if="item.count" 
        class="tooltip-badge"
      >
        {{ item.count }}
      </span>
    </div>
  </button>
</template>

<style scoped>
.primary-nav-item {
  @apply relative w-full aspect-square flex items-center justify-center;
  @apply transition-all duration-300;
}

.item-background {
  @apply absolute inset-2 rounded-xl opacity-0 transition-all duration-300;
  background: linear-gradient(
    135deg,
    hsl(var(--primary)/0.1),
    hsl(var(--primary)/0.05)
  );
}

.item-background.active {
  @apply opacity-100;
}

.icon-container {
  @apply relative z-10 w-10 h-10 rounded-xl flex items-center justify-center;
  @apply transition-all duration-300;
}

.icon-glow {
  @apply absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300;
  background: radial-gradient(
    circle at center,
    hsl(var(--primary)/0.3),
    transparent 70%
  );
  filter: blur(8px);
}

.icon-glow.active {
  @apply opacity-100;
}

.icon {
  @apply transition-all duration-300;
  color: hsl(var(--primary)/0.7);
}

.icon.active {
  @apply text-primary;
  filter: drop-shadow(0 0 8px hsl(var(--primary)/0.3));
}

.active-indicator {
  @apply absolute right-0 top-1/2 -translate-y-1/2 h-5 overflow-hidden;
  width: 2px;
}

.indicator-line {
  @apply absolute inset-0;
  background: hsl(var(--primary));
}

.indicator-glow {
  @apply absolute inset-0;
  background: radial-gradient(
    circle at right,
    hsl(var(--primary)/0.5),
    transparent
  );
  filter: blur(2px);
}

.tooltip {
  @apply absolute left-full ml-2 px-2 py-1 rounded-lg;
  @apply opacity-0 pointer-events-none translate-x-2;
  @apply transition-all duration-300;
  background: hsl(var(--primary)/0.1);
  backdrop-filter: blur(8px);
  border: 1px solid hsl(var(--primary)/0.2);
  font-size: 0.8rem;
  white-space: nowrap;
  color: hsl(var(--primary));
}

.tooltip.active {
  @apply opacity-100 translate-x-0;
}

.tooltip-badge {
  @apply ml-1.5 px-1.5 py-0.5 text-xs rounded-full;
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}

.primary-nav-item:hover .icon {
  @apply scale-110 text-primary;
}
</style>