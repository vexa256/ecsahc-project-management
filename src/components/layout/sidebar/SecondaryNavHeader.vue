<script setup>
import { onMounted, ref } from 'vue'
import IconFeather from '@/components/icons/IconFeather.vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  section: {
    type: Object,
    required: true
  }
})

const router = useRouter()
const isGlowing = ref(false)

onMounted(() => {
  isGlowing.value = true
})
</script>

<template>
  <div class="secondary-nav-header">
    <div class="header-content">
      <div 
        class="icon-container"
        :class="{ 'glow-effect': isGlowing }"
      >
        <div class="icon-background" />
        <div class="icon-wrapper">
          <IconFeather 
            :name="section.icon" 
            size="24"
            class="icon"
          />
        </div>
        <div class="orbital-ring" />
        <div class="orbital-dots">
          <span v-for="n in 3" :key="n" class="dot" :style="{ '--delay': `${n * 0.2}s` }" />
        </div>
      </div>
      
      <div class="text-content">
        <h2 class="title">
          {{ section.name }}
          <span class="title-accent" />
        </h2>
        <p class="description">
          {{ router.currentRoute.value.meta?.description || `Manage ${section.name.toLowerCase()}` }}
        </p>
      </div>
    </div>
    <div class="header-decoration" />
  </div>
</template>

<style scoped>
.secondary-nav-header {
  @apply relative h-16 overflow-hidden;
  background: linear-gradient(
    135deg,
    hsl(var(--primary)/0.05),
    hsl(var(--primary)/0.02) 50%,
    transparent
  );
}

.header-content {
  @apply flex items-center gap-4 px-6 h-full relative z-10;
}

.icon-container {
  @apply relative flex items-center justify-center;
  width: 48px;
  height: 48px;
}

.icon-background {
  @apply absolute inset-0 rounded-xl opacity-50;
  background: radial-gradient(
    circle at center,
    hsl(var(--primary)/0.2),
    transparent 70%
  );
  filter: blur(8px);
  animation: pulse 3s ease-in-out infinite;
}

.icon-wrapper {
  @apply relative flex items-center justify-center rounded-xl;
  width: 40px;
  height: 40px;
  background: linear-gradient(
    135deg,
    hsl(var(--primary)/0.2),
    hsl(var(--primary)/0.1)
  );
  backdrop-filter: blur(8px);
  border: 1px solid hsl(var(--primary)/0.2);
  box-shadow: 
    0 4px 12px hsl(var(--primary)/0.1),
    inset 0 0 0 1px hsl(var(--primary)/0.1);
}

.icon {
  @apply text-primary transition-all duration-500;
  filter: drop-shadow(0 0 8px hsl(var(--primary)/0.3));
}

.orbital-ring {
  @apply absolute inset-0 rounded-xl;
  border: 1px dashed hsl(var(--primary)/0.2);
  animation: spin 10s linear infinite;
}

.orbital-dots {
  @apply absolute inset-0;
  animation: spin 10s linear infinite reverse;
}

.dot {
  @apply absolute w-1.5 h-1.5 rounded-full bg-primary;
  opacity: 0;
  animation: fadeInOut 3s ease-in-out infinite;
  animation-delay: var(--delay);
}

.dot:nth-child(1) { top: 0; left: 50%; transform: translateX(-50%); }
.dot:nth-child(2) { bottom: 0; left: 50%; transform: translateX(-50%); }
.dot:nth-child(3) { left: 0; top: 50%; transform: translateY(-50%); }

.text-content {
  @apply flex-1;
}

.title {
  @apply text-lg font-semibold relative inline-block;
  background: linear-gradient(
    to right,
    hsl(var(--primary)),
    hsl(var(--primary)/0.7)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.title-accent {
  @apply absolute -bottom-0.5 left-0 right-0 h-px;
  background: linear-gradient(
    to right,
    transparent,
    hsl(var(--primary)/0.5) 20%,
    hsl(var(--primary)/0.5) 80%,
    transparent
  );
}

.description {
  @apply text-sm text-base-content/60 mt-0.5;
}

.header-decoration {
  @apply absolute bottom-0 left-0 right-0 h-px;
  background: linear-gradient(
    to right,
    transparent,
    hsl(var(--primary)/0.2),
    transparent
  );
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.1); opacity: 0.3; }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes fadeInOut {
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
}
</style>