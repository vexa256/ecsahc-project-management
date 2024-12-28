```vue
<script setup>
import { computed } from 'vue'
import IconFeather from '@/components/icons/IconFeather.vue'
import TimelineStatusBadge from './TimelineStatusBadge.vue'

const props = defineProps({
  timelines: {
    type: Array,
    required: true
  },
  loading: Boolean,
  error: String,
  searchQuery: String
})

const emit = defineEmits(['update-status'])

const filteredTimelines = computed(() => {
  if (!props.searchQuery) return props.timelines
  
  const query = props.searchQuery.toLowerCase()
  return props.timelines.filter(timeline => 
    timeline.ReportingID?.toLowerCase().includes(query) ||
    timeline.ReportName?.toLowerCase().includes(query) ||
    timeline.Description?.toLowerCase().includes(query)
  )
})
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200">
    <div class="overflow-x-auto">
      <table class="table">
        <thead>
          <tr>
            <th>Report ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Description</th>
            <th class="w-20"></th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="timeline in filteredTimelines" 
            :key="timeline.id"
            class="group hover:bg-gray-50"
          >
            <td class="font-mono">{{ timeline.ReportingID }}</td>
            <td>{{ timeline.ReportName }}</td>
            <td>
              <TimelineStatusBadge :status="timeline.status" />
            </td>
            <td>{{ timeline.Description }}</td>
            <td class="text-right">
              <button 
                class="btn btn-circle btn-sm bg-black text-white hover:bg-black/90 border-0"
                @click="$emit('update-status', timeline)"
              >
                <IconFeather name="edit-2" size="14" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
```