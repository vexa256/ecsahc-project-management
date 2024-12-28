```vue
<script setup>
import IconFeather from '@/components/icons/IconFeather.vue'

defineProps({
  totalIndicators: Number,
  completedIndicators: Number
})
</script>

<template>
  <div class="card bg-base-100 shadow-sm">
    <div class="card-body">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold">Reporting Progress</h3>
        <div class="badge badge-primary">
          {{ completedIndicators }}/{{ totalIndicators }} Complete
        </div>
      </div>
      
      <div class="space-y-2">
        <div class="flex items-center justify-between text-sm">
          <span>Progress</span>
          <span>{{ Math.round((completedIndicators / totalIndicators) * 100) }}%</span>
        </div>
        <progress 
          class="progress progress-primary w-full" 
          :value="completedIndicators" 
          :max="totalIndicators"
        />
      </div>

      <div class="mt-4 flex items-center gap-2 text-sm text-base-content/70">
        <IconFeather name="info" size="14" />
        <span>{{ totalIndicators - completedIndicators }} indicators remaining</span>
      </div>
    </div>
  </div>
</template>
```