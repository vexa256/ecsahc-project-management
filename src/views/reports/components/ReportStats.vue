```vue
<script setup>
import { computed } from 'vue'
import IconFeather from '@/components/icons/IconFeather.vue'
import { use3DEffects } from '../composables/use3DEffects'

const { handleMouseMove, handleMouseLeave } = use3DEffects()

const props = defineProps({
  stats: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <div 
      v-for="(stat, index) in stats" 
      :key="stat.title"
      class="stat-card group"
      :style="{ '--delay': `${index * 100}ms` }"
      @mousemove="handleMouseMove"
      @mouseleave="handleMouseLeave"
    >
      <div class="absolute inset-0 bg-gradient-to-br from-white/50 to-white/30 dark:from-gray-800/50 dark:to-gray-800/30 
                  rounded-xl transition-all duration-500 group-hover:scale-95 opacity-50"></div>
      <div class="relative p-6">
        <div class="flex items-center justify-between">
          <div class="space-y-2">
            <h3 class="text-gray-600 dark:text-gray-400 font-medium">{{ stat.title }}</h3>
            <div class="text-3xl font-bold text-gray-900 dark:text-white animate-value">
              {{ stat.value }}
            </div>
          </div>
          <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center
                      transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
            <IconFeather 
              :name="stat.icon"
              class="text-primary transform transition-transform group-hover:scale-110"
              size="24"
            />
          </div>
        </div>
        <div class="flex items-center gap-2 mt-4">
          <IconFeather 
            :name="stat.trendIcon"
            :class="stat.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'"
            size="16"
          />
          <span :class="stat.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'">
            {{ stat.trend }}
          </span>
          <span class="text-gray-500 text-sm">vs last month</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stat-card {
  @apply relative overflow-hidden rounded-xl bg-white dark:bg-gray-900 
         border border-gray-200 dark:border-gray-800
         transition-all duration-500 animate-fade-in-up;
  animation-delay: var(--delay);
}

.animate-value {
  animation: countUp 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  animation-delay: var(--delay);
}

@keyframes countUp {
  0% { transform: translateY(20px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}
</style>
```