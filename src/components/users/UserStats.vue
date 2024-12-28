```vue
<script setup>
import { computed } from 'vue'
import IconFeather from '@/components/icons/IconFeather.vue'

const props = defineProps({
  users: {
    type: Array,
    required: true
  }
})

const stats = computed(() => [
  {
    title: 'Total Users',
    value: props.users.length,
    icon: 'users',
    trend: '+12%',
    color: 'primary'
  },
  {
    title: 'Active Users',
    value: props.users.filter(u => u.status === 'active').length,
    icon: 'user-check',
    trend: '+8%',
    color: 'success'
  },
  {
    title: 'Pending Invites',
    value: 3,
    icon: 'mail',
    trend: '+2',
    color: 'warning'
  }
])
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div 
      v-for="(stat, index) in stats"
      :key="stat.title"
      class="card bg-base-100 shadow-sm hover:shadow-md transition-all duration-500 animate-fade-in-up"
      :style="{ animationDelay: `${index * 100}ms` }"
    >
      <div class="card-body">
        <div class="flex items-start justify-between">
          <div>
            <h3 class="font-medium text-base-content/70">{{ stat.title }}</h3>
            <div class="text-2xl font-bold mt-2">{{ stat.value }}</div>
            <div class="flex items-center gap-2 mt-2">
              <span class="text-sm text-success">{{ stat.trend }}</span>
              <IconFeather name="trending-up" size="14" class="text-success" />
            </div>
          </div>
          <div 
            class="w-12 h-12 rounded-xl flex items-center justify-center transform transition-transform hover:scale-110"
            :class="`bg-${stat.color}/10 text-${stat.color}`"
          >
            <IconFeather :name="stat.icon" size="24" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
```