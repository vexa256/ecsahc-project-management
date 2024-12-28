<script setup>
import { ref } from 'vue'
import { TimelineStatus } from '../types/timeline'
import IconFeather from '@/components/icons/IconFeather.vue'

const props = defineProps({
  timeline: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update', 'close'])
const loading = ref(false)
const error = ref(null)

const handleSubmit = async (newStatus) => {
  try {
    loading.value = true
    error.value = null
    emit('update', { id: props.timeline.id, status: newStatus })
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="card bg-base-100/50 backdrop-blur-lg border border-base-300 shadow-xl">
    <div class="card-body">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-xl font-bold">Update Status</h3>
        <button 
          class="btn btn-ghost btn-sm btn-circle"
          @click="$emit('close')"
        >
          <IconFeather name="x" />
        </button>
      </div>

      <div class="space-y-4">
        <div class="p-4 bg-base-200/50 rounded-lg">
          <h4 class="font-medium mb-1">{{ timeline.ReportName }}</h4>
          <p class="text-sm text-base-content/70">{{ timeline.Description }}</p>
        </div>

        <div class="space-y-3">
          <button 
            class="btn w-full gap-2 transition-all duration-300 hover:scale-105
                   bg-success/10 hover:bg-success/20 text-success border-success/20"
            :class="{ 'opacity-50 cursor-not-allowed': timeline.status === TimelineStatus.ACTIVE }"
            :disabled="loading || timeline.status === TimelineStatus.ACTIVE"
            @click="handleSubmit(TimelineStatus.ACTIVE)"
          >
            <IconFeather name="check-circle" size="18" />
            Mark as Active
          </button>

          <button 
            class="btn w-full gap-2 transition-all duration-300 hover:scale-105
                   bg-base-300/10 hover:bg-base-300/20 border-base-300"
            :class="{ 'opacity-50 cursor-not-allowed': timeline.status === TimelineStatus.CLOSED }"
            :disabled="loading || timeline.status === TimelineStatus.CLOSED"
            @click="handleSubmit(TimelineStatus.CLOSED)"
          >
            <IconFeather name="x-circle" size="18" />
            Mark as Closed
          </button>
        </div>

        <div v-if="error" class="alert alert-error">
          <IconFeather name="alert-circle" />
          {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>