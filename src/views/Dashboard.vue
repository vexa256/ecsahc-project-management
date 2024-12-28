<script setup>
import { ref } from 'vue'
import IconFeather from '@/components/icons/IconFeather.vue'

const stats = ref([
  { 
    title: 'Total Entities', 
    value: '156',
    icon: 'database',
    change: '+12%',
    trend: 'up'
  },
  { 
    title: 'Active Projects', 
    value: '64',
    icon: 'activity',
    change: '+25%',
    trend: 'up'
  },
  { 
    title: 'Pending Reports', 
    value: '23',
    icon: 'file-text',
    change: '-5%',
    trend: 'down'
  },
  { 
    title: 'Completion Rate', 
    value: '85%',
    icon: 'pie-chart',
    change: '+3%',
    trend: 'up'
  }
])

const recentActivity = ref([
  {
    id: 1,
    action: 'Entity Created',
    entity: 'Project Alpha',
    time: '2 hours ago',
    user: 'John Doe'
  },
  {
    id: 2,
    action: 'Report Submitted',
    entity: 'Beta Foundation',
    time: '5 hours ago',
    user: 'Jane Smith'
  },
  {
    id: 3,
    action: 'Indicator Updated',
    entity: 'Gamma Institute',
    time: '1 day ago',
    user: 'Mike Johnson'
  }
])
</script>

<template>
  <div class="p-6">
    <div class="mb-8">
      <h1 class="text-2xl font-bold mb-2">Dashboard</h1>
      <p class="text-base-content/70">Welcome to your enterprise management dashboard</p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div 
        v-for="stat in stats" 
        :key="stat.title"
        class="card bg-base-100 shadow-sm hover:shadow-md transition-shadow"
      >
        <div class="card-body">
          <div class="flex items-start justify-between">
            <div>
              <h3 class="font-medium text-base-content/70">{{ stat.title }}</h3>
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

    <!-- Recent Activity -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="card bg-base-100 shadow-sm">
        <div class="card-body">
          <h2 class="card-title mb-4">Recent Activity</h2>
          <div class="space-y-4">
            <div 
              v-for="activity in recentActivity" 
              :key="activity.id"
              class="flex items-start gap-4"
            >
              <div class="w-8 h-8 rounded-full bg-base-200 flex items-center justify-center">
                <IconFeather name="activity" size="16" />
              </div>
              <div>
                <p class="font-medium">{{ activity.action }}</p>
                <p class="text-sm text-base-content/70">{{ activity.entity }}</p>
                <div class="flex items-center gap-2 mt-1 text-xs text-base-content/50">
                  <span>{{ activity.time }}</span>
                  <span>•</span>
                  <span>{{ activity.user }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-sm">
        <div class="card-body">
          <h2 class="card-title mb-4">Quick Actions</h2>
          <div class="space-y-3">
            <router-link 
              to="/entities" 
              class="btn btn-primary w-full justify-start gap-2"
            >
              <IconFeather name="plus" size="16" />
              Create New Entity
            </router-link>
            <button class="btn btn-ghost w-full justify-start gap-2">
              <IconFeather name="file-text" size="16" />
              Generate Report
            </button>
            <button class="btn btn-ghost w-full justify-start gap-2">
              <IconFeather name="bar-chart-2" size="16" />
              View Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>