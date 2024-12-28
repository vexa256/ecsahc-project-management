<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'ghost'].includes(value)
  },
  size: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'sm', 'lg'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <button
    :class="[
      'btn',
      `btn-${variant}`,
      {
        'h-9 px-3': size === 'sm',
        'h-10 px-4': size === 'default',
        'h-11 px-8': size === 'lg',
      }
    ]"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>