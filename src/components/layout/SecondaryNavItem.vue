<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import IconFeather from '@/components/icons/IconFeather.vue'

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const route = useRoute()
const isActive = computed(() => route.path === props.item.path)
const isHovered = ref(false)

const getItemIcon = (item) => {
  const iconMap = {
    'entities': 'box',
    'types': 'tag',
    'projects': 'folder',
    'active': 'zap',
    'submitted': 'check-circle',
    'pending': 'clock',
    'history': 'archive',
    'overview': 'activity',
    'trends': 'trending-up',
    'custom': 'sliders',
    'users': 'users',
    'roles': 'shield',
    'settings': 'settings',
    'audit': 'eye',
    'docs': 'book-open',
    'guide': 'compass',
    'faqs': 'help-circle',
    'support': 'life-buoy'
  }
  
  const path = item.path.split('/').pop()
  return iconMap[path] || 'chevron-right'
}
</script>

<template>
  <router-link 
    :to="item.path"
    class="nav-item group"
    :class="{ 'active': isActive }"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- Background Effects -->
    <div 
      class="item-background"
      :class="{ 'active': isActive, 'hovered': isHovered }"
    />
    
    <!-- Content -->
    <div class="item-content">
      <div 
        class="icon-box"
        :class="{ 'active': isActive, 'hovered': isHovered }"
      >
        <div class="icon-glow" />
        <IconFeather 
          :name="getItemIcon(item)" 
          size="16"
          class="icon"
        />
      </div>
      
      <span class="item-text">{{ item.name }}</span>
      
      <span 
        v-if="item.count" 
        class="counter"
        :class="{ 'active': isActive, 'hovered': isHovered }"
      >
        {{ item.count }}
      </span>
    </div>

    <!-- Hover Effects -->
    <div class="hover-effects">
      <div class="hover-line" />
      <div class="hover-glow" />
    </div>
  </router-link>
</template>

<style scoped>
.nav-item {
  @apply relative flex items-center px-4 py-3 text-sm;
  @apply transition-all duration-500;
}

.item-background {
  @apply absolute inset-0 opacity-0 transition-all duration-300;
  background: linear-gradient(
    to right,
    hsl(var(--primary)/0.05),
    hsl(var(--primary)/0.02)
  );
}

.item-background.active {
  @apply opacity-100;
}

.item-background.hovered {
  @apply opacity-70;
  animation: shimmer 2s linear infinite;
  background: linear-gradient(
    90deg,
    hsl(var(--primary)/0.03) 0%,
    hsl(var(--primary)/0.06) 50%,
    hsl(var(--primary)/0.03) 100%
  );
  background-size: 200% 100%;
}

.item-content {
  @apply relative z-10 flex items-center gap-3 w-full;
}

.icon-box {
  @apply relative w-8 h-8 rounded-lg flex items-center justify-center;
  @apply transition-all duration-300;
  background: linear-gradient(
    135deg,
    hsl(var(--primary)/0.1),
    hsl(var(--primary)/0.05)
  );
  border: 1px solid hsl(var(--primary)/0.1);
}

.icon-box.active {
  background: linear-gradient(
    135deg,
    hsl(var(--primary)/0.2),
    hsl(var(--primary)/0.1)
  );
  border-color: hsl(var(--primary)/0.2);
}

.icon-glow {
  @apply absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300;
  background: radial-gradient(
    circle at center,
    hsl(var(--primary)/0.3),
    transparent 70%
  );
  filter: blur(4px);
}

.icon-box.hovered .icon-glow {
  @apply opacity-100;
}

.icon {
  @apply transition-all duration-300;
}

.icon-box.hovered .icon {
  @apply scale-110 text-primary;
  filter: drop-shadow(0 0 4px hsl(var(--primary)/0.3));
}

.item-text {
  @apply flex-1 font-medium transition-all duration-300;
}

.nav-item:hover .item-text {
  @apply text-primary translate-x-0.5;
}

.counter {
  @apply px-2 py-0.5 text-xs rounded-full;
  @apply transition-all duration-300;
  background: linear-gradient(
    135deg,
    hsl(var(--primary)/0.1),
    hsl(var(--primary)/0.05)
  );
  border: 1px solid hsl(var(--primary)/0.1);
  color: hsl(var(--primary)/0.8);
}

.counter.active,
.counter.hovered {
  background: linear-gradient(
    135deg,
    hsl(var(--primary)),
    hsl(var(--primary)/0.8)
  );
  border-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}

.hover-effects {
  @apply absolute inset-y-0 left-0 w-1;
  overflow: hidden;
}

.hover-line {
  @apply absolute inset-0 w-0.5 opacity-0;
  @apply transition-all duration-300;
  background: linear-gradient(
    to bottom,
    transparent,
    hsl(var(--primary)),
    transparent
  );
}

.nav-item:hover .hover-line {
  @apply opacity-100;
}

.hover-glow {
  @apply absolute inset-0 opacity-0;
  @apply transition-all duration-300;
  background: radial-gradient(
    circle at left,
    hsl(var(--primary)/0.3),
    transparent 70%
  );
  filter: blur(4px);
}

.nav-item:hover .hover-glow {
  @apply opacity-100;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>