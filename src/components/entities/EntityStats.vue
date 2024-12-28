<script setup>
import IconFeather from '@/components/icons/IconFeather.vue'

const stats = [
  {
    name: 'Total Entities',
    value: '156',
    change: '+12%',
    trend: 'up',
    icon: 'briefcase'
  },
  {
    name: 'Active Projects',
    value: '64',
    change: '+25%',
    trend: 'up',
    icon: 'activity'
  },
  {
    name: 'Pending Reports',
    value: '23',
    change: '-5%',
    trend: 'down',
    icon: 'file-text'
  },
  {
    name: 'Completion Rate',
    value: '85%',
    change: '+3%',
    trend: 'up',
    icon: 'pie-chart'
  }
]
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <div 
      v-for="stat in stats" 
      :key="stat.name"
      class="card bg-base-100 shadow-sm hover:shadow-md transition-shadow"
    >
      <div class="card-body">
        <div class="flex items-start justify-between">
          <div>
            <h3 class="font-medium text-base-content/70">{{ stat.name }}</h3>
            <div class="text-2xl font-bold mt-2">{{ stat.value }}</div>
          </div>
          <div class="w-10 h-10 rounded-lg bg-base-200 flex items-center justify-center">
            <IconFeather :name="stat.icon" />
          </div>
        </div>
        <div class="mt-4 flex items-center gap-2">
          <div 
            class="text-sm"
            :class="stat.trend === 'up' ? 'text-success' : 'text-error'"
          >
            {{ stat.change }}
          </div>
          <IconFeather 
            :name="stat.trend === 'up' ? 'trending-up' : 'trending-down'"
            size="16"
            :class="stat.trend === 'up' ? 'text-success' : 'text-error'"
          />
          <span class="text-sm text-base-content/50">vs last month</span>
        </div>
      </div>
    </div>
  </div>
</template>