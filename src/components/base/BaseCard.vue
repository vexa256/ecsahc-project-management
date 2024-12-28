<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="card">
    <div class="card-body">
      <h3 v-if="title" class="font-semibold leading-none tracking-tight">{{ title }}</h3>
      <slot></slot>
    </div>
  </div>
</template>