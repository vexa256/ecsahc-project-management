<script setup>
import { Icon } from '@iconify/vue'

defineProps({
  name: {
    type: String,
    required: true
  },
  size: {
    type: [String, Number],
    default: '24'
  }
})
</script>

<template>
  <Icon :icon="`feather:${name}`" :width="size" :height="size" />
</template>