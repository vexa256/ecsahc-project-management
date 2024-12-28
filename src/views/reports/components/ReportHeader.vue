```vue
<script setup>
import IconFeather from '@/components/icons/IconFeather.vue'

defineProps({
  searchQuery: String
})

defineEmits(['update:searchQuery'])
</script>

<template>
  <div class="relative overflow-hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
    <div class="absolute inset-0 pattern-grid opacity-5 animate-slide-pattern"></div>
    <div class="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"></div>
    
    <div class="container mx-auto px-6 py-8 relative z-10">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div class="animate-title-reveal">
          <h1 class="text-4xl font-bold text-gray-900 dark:text-white">
            Report Timelines
            <div class="h-1 w-20 bg-primary mt-2 rounded-full animate-width"></div>
          </h1>
          <p class="text-gray-600 dark:text-gray-400 mt-2 max-w-xl">
            Track and manage your organization's reporting schedules with our enhanced dashboard
          </p>
        </div>

        <div class="relative group animate-fade-in">
          <div class="absolute inset-0 bg-primary/5 rounded-lg blur-lg group-hover:bg-primary/10 transition-all duration-300"></div>
          <div class="relative flex items-center">
            <input
              :value="searchQuery"
              @input="$emit('update:searchQuery', $event.target.value)"
              type="text"
              placeholder="Search reports..."
              class="w-full px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg
                     shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary
                     transition-all duration-300 pl-12"
            />
            <IconFeather 
              name="search" 
              class="absolute left-4 text-gray-400 group-hover:text-primary transition-colors duration-300"
              size="18"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pattern-grid {
  background-image: radial-gradient(circle, currentColor 1px, transparent 1px);
  background-size: 24px 24px;
}

.animate-slide-pattern {
  animation: slidePattern 20s linear infinite;
}

@keyframes slidePattern {
  0% { background-position: 0 0; }
  100% { background-position: 50px 50px; }
}
</style>
```