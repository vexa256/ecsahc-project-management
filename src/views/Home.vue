<script setup>
import { ref } from 'vue'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
const features = ref([
  {
    title: 'Vue 3 Composition API',
    description: 'Modern Vue.js development with Composition API'
  },
  {
    title: 'DaisyUI Components',
    description: 'Beautiful and responsive UI components'
  },
  {
    title: 'Pinia State Management',
    description: 'Intuitive and type-safe state management'
  }
])
</script>

<template>
  <div class="page-container">
    <div class="hero min-h-[50vh] bg-base-200">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">Vue Enterprise</h1>
          <p class="py-6">A modern Vue.js starter template with DaisyUI, Pinia, and best practices.</p>
          <BaseButton @click="appStore.addNotification('Welcome to Vue Enterprise!', 'success')">
            Get Started
          </BaseButton>
        </div>
      </div>
    </div>

    <section class="mt-12">
      <h2 class="section-title">Features</h2>
      <div class="card-grid">
        <BaseCard
          v-for="feature in features"
          :key="feature.title"
          :title="feature.title"
          hoverable
        >
          <p>{{ feature.description }}</p>
        </BaseCard>
      </div>
    </section>
  </div>
</template>