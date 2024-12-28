<script setup>
defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  }
})

const sizeClasses = {
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-10 w-10'
}
</script>

<template>
  <div class="flex items-center justify-center">
    <img 
      src="https://api.dicebear.com/7.x/shapes/svg?seed=enterprise"
      :class="sizeClasses[size]"
      alt="Enterprise Logo" 
    />
  </div>
</template>