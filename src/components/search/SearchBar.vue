<script setup>
import { ref } from 'vue'
import IconFeather from '@/components/icons/IconFeather.vue'

const searchQuery = ref('')
</script>

<template>
  <div class="form-control relative">
    <div class="input-group">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search..."
        class="input input-bordered w-full max-w-xs pl-10"
      />
      <IconFeather 
        name="search" 
        class="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50"
        size="16"
      />
    </div>
  </div>
</template>