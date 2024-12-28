<script setup>
import { ref } from 'vue'

const technologies = ref([
  'Vue.js 3',
  'Vite',
  'DaisyUI',
  'Tailwind CSS',
  'Pinia',
  'Vue Router'
])
</script>

<template>
  <div class="page-container">
    <BaseCard title="About Vue Enterprise">
      <p class="mb-4">
        This is an enterprise-ready Vue.js starter template that follows best practices
        and includes modern tooling for building scalable applications.
      </p>
      
      <h3 class="font-bold mb-2">Technologies Used:</h3>
      <ul class="list-disc list-inside">
        <li v-for="tech in technologies" :key="tech" class="mb-1">
          {{ tech }}
        </li>
      </ul>
    </BaseCard>
  </div>
</template>