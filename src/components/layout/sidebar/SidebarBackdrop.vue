<script setup>
defineEmits(['close'])
</script>

<template>
  <transition
    enter-active-class="transition-opacity duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-300"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      class="fixed inset-0 bg-black/20 z-20 backdrop-blur-sm"
      @click="$emit('close')"
    />
  </transition>
</template>