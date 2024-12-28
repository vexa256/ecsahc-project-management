<script setup>
import { computed } from 'vue'
import { TimelineStatus } from '../types/timeline'

const props = defineProps({
  status: {
    type: String,
    required: true
  }
})

const badgeClass = computed(() => ({
  'badge-success': props.status === TimelineStatus.ACTIVE,
  'badge-neutral': props.status === TimelineStatus.CLOSED
}))

const displayStatus = computed(() => 
  props.status.charAt(0).toUpperCase() + props.status.slice(1)
)
</script>

<template>
  <span class="badge" :class="badgeClass">
    {{ displayStatus }}
  </span>
</template>