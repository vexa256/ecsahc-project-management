<script setup>
import { ref } from 'vue'
import IconFeather from '@/components/icons/IconFeather.vue'
import SecondaryNavItem from './SecondaryNavItem.vue'

defineProps({
  title: String,
  items: {
    type: Array,
    default: () => []
  }
})

const isExpanded = ref(true)
const isHovered = ref(false)
</script>

<template>
  <div 
    class="nav-section"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div 
      v-if="title"
      class="section-header"
      :class="{ 'hovered': isHovered }"
      @click="isExpanded = !isExpanded"
    >
      <!-- Header Background -->
      <div class="header-background" />
      
      <!-- Header Content -->
      <div class="header-content">
        <span class="title">{{ title }}</span>
        <IconFeather 
          name="chevron-down"
          size="14"
          class="icon"
          :class="{ 'collapsed': !isExpanded }"
        />
      </div>
      
      <!-- Decorative Elements -->
      <div class="header-decoration">
        <div class="line" />
        <div class="glow" />
      </div>
    </div>
    
    <!-- Section Content with Smooth Animation -->
    <div 
      class="section-content"
      :class="{ 'collapsed': !isExpanded }"
      :style="{ '--items-count': items.length }"
    >
      <div class="items-wrapper">
        <SecondaryNavItem 
          v-for="(item, index) in items"
          :key="item.path"
          :item="item"
          :style="{ '--item-index': index }"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.nav-section {
  @apply relative py-2;
}

.section-header {
  @apply relative flex items-center justify-between px-4 py-2 cursor-pointer;
  @apply transition-all duration-300;
}

.header-background {
  @apply absolute inset-0 opacity-0 transition-opacity duration-300;
  background: linear-gradient(
    to right,
    hsl(var(--primary)/0.03),
    transparent
  );
}

.section-header.hovered .header-background {
  @apply opacity-100;
}

.header-content {
  @apply relative z-10 flex items-center justify-between w-full;
}

.title {
  @apply text-xs font-semibold uppercase tracking-wider;
  @apply transition-all duration-300;
  color: hsl(var(--primary)/0.6);
}

.section-header:hover .title {
  color: hsl(var(--primary));
  text-shadow: 0 0 8px hsl(var(--primary)/0.3);
}

.icon {
  @apply transition-all duration-500;
  color: hsl(var(--primary)/0.6);
}

.icon.collapsed {
  @apply rotate-180;
}

.section-header:hover .icon {
  color: hsl(var(--primary));
  filter: drop-shadow(0 0 4px hsl(var(--primary)/0.3));
}

.header-decoration {
  @apply absolute bottom-0 left-4 right-4 h-px overflow-hidden;
}

.line {
  @apply absolute inset-0 transition-transform duration-300;
  background: linear-gradient(
    to right,
    transparent,
    hsl(var(--primary)/0.2),
    transparent
  );
  transform: scaleX(0);
  transform-origin: left;
}

.section-header:hover .line {
  transform: scaleX(1);
}

.glow {
  @apply absolute inset-0 opacity-0 transition-opacity duration-300;
  background: linear-gradient(
    to right,
    transparent,
    hsl(var(--primary)/0.4),
    transparent
  );
  filter: blur(2px);
}

.section-header:hover .glow {
  @apply opacity-100;
}

.section-content {
  @apply transition-all duration-500 ease-in-out;
  max-height: calc(var(--items-count) * 3rem);
}

.section-content.collapsed {
  @apply overflow-hidden;
  max-height: 0;
}

.items-wrapper {
  @apply space-y-1;
}

.items-wrapper > * {
  animation: slideIn 0.5s ease-out backwards;
  animation-delay: calc(var(--item-index) * 0.05s);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>