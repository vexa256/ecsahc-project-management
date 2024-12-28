<script setup>
import { computed } from 'vue'
import IconFeather from '@/components/icons/IconFeather.vue'
import BaseLogo from '@/components/base/BaseLogo.vue'

const props = defineProps({
  navigation: {
    type: Object,
    required: true,
    default: () => ({
      main: [],
      reporting: [],
      bottom: []
    })
  },
  activeSection: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['toggle-section'])

const handleItemClick = (item) => {
  if (item.children || item.path === undefined) {
    emit('toggle-section', item)
  }
}
</script>

<template>
  <aside class="fixed top-0 left-0 z-40 h-screen w-16 bg-base-100 border-r flex flex-col">
    <!-- Logo -->
    <div class="h-16 flex-shrink-0 flex items-center justify-center border-b">
      <BaseLogo size="sm" />
    </div>

    <!-- Navigation -->
    <nav class="flex-1 flex flex-col justify-between py-4">
      <!-- Top Icons -->
      <div class="space-y-1 px-2">
        <button
          v-for="item in navigation.main"
          :key="item.name"
          class="w-full aspect-square flex items-center justify-center rounded-lg hover:bg-base-200 transition-all duration-300 relative group"
          :class="{ 'bg-base-200': activeSection?.name === item.name }"
          @click="handleItemClick(item)"
        >
          <IconFeather 
            :name="item.icon" 
            size="20"
            class="transition-transform group-hover:scale-110 duration-300"
          />
          <div
            v-if="activeSection?.name === item.name"
            class="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-primary rounded-l"
          />
          <!-- Tooltip -->
          <div 
            class="absolute left-full ml-2 px-2 py-1 bg-base-200 rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50"
          >
            {{ item.name }}
            <span 
              v-if="item.count" 
              class="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-primary text-primary-foreground"
            >
              {{ item.count }}
            </span>
          </div>
        </button>
      </div>

      <!-- Reporting Icons -->
      <div class="space-y-1 px-2">
        <button
          v-for="item in navigation.reporting"
          :key="item.name"
          class="w-full aspect-square flex items-center justify-center rounded-lg hover:bg-base-200 transition-all duration-300 relative group"
          :class="{ 'bg-base-200': activeSection?.name === item.name }"
          @click="handleItemClick(item)"
        >
          <IconFeather 
            :name="item.icon" 
            size="20"
            class="transition-transform group-hover:scale-110 duration-300"
          />
          <div
            v-if="activeSection?.name === item.name"
            class="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-primary rounded-l"
          />
          <!-- Tooltip -->
          <div 
            class="absolute left-full ml-2 px-2 py-1 bg-base-200 rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50"
          >
            {{ item.name }}
          </div>
        </button>
      </div>

      <!-- Bottom Icons -->
      <div class="space-y-1 px-2">
        <button
          v-for="item in navigation.bottom"
          :key="item.name"
          class="w-full aspect-square flex items-center justify-center rounded-lg hover:bg-base-200 transition-all duration-300 relative group"
          :class="{ 'bg-base-200': activeSection?.name === item.name }"
          @click="handleItemClick(item)"
        >
          <IconFeather 
            :name="item.icon" 
            size="20"
            class="transition-transform group-hover:scale-110 duration-300"
          />
          <div
            v-if="activeSection?.name === item.name"
            class="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-primary rounded-l"
          />
          <!-- Tooltip -->
          <div 
            class="absolute left-full ml-2 px-2 py-1 bg-base-200 rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50"
          >
            {{ item.name }}
          </div>
        </button>
      </div>
    </nav>
  </aside>
</template>