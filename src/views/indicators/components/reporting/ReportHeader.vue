```vue
<script setup>
import IconFeather from '@/components/icons/IconFeather.vue'

const props = defineProps({
  entity: {
    type: Object,
    required: true,
    validator: (obj) => obj && typeof obj.name === 'string'
  },
  report: {
    type: Object,
    required: true,
    validator: (obj) => obj && typeof obj.name === 'string' && typeof obj.dueDate === 'string'
  },
  user: {
    type: Object,
    required: true,
    default: () => ({
      name: 'Anonymous User',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=default',
    }),
    validator: (obj) => obj && typeof obj.name === 'string'
  }
})

// Format date to local string
const currentDate = new Date().toLocaleDateString(undefined, {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})
</script>

<template>
  <div class="card bg-base-100 shadow-sm">
    <div class="card-body">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Entity Info -->
        <div>
          <h4 class="text-sm font-medium text-base-content/70 mb-1">Entity</h4>
          <div class="flex items-center gap-2">
            <IconFeather name="briefcase" size="16" />
            <span class="font-medium">{{ entity.name }}</span>
          </div>
        </div>

        <!-- Report Info -->
        <div>
          <h4 class="text-sm font-medium text-base-content/70 mb-1">Report</h4>
          <div class="flex items-center gap-2">
            <IconFeather name="file-text" size="16" />
            <span class="font-medium">{{ report.name }}</span>
          </div>
          <p class="text-sm text-base-content/70 mt-1">Due: {{ report.dueDate }}</p>
        </div>

        <!-- User Info -->
        <div>
          <h4 class="text-sm font-medium text-base-content/70 mb-1">Reported By</h4>
          <div class="flex items-center gap-2">
            <div class="avatar">
              <div class="w-8 h-8 rounded-full bg-base-200">
                <img 
                  :src="user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`" 
                  :alt="user.name"
                  @error="$event.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`"
                />
              </div>
            </div>
            <div>
              <p class="font-medium">{{ user.name }}</p>
              <p class="text-sm text-base-content/70">{{ currentDate }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
```