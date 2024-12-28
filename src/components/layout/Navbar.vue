<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const navItems = computed(() => [
  { name: 'Home', path: '/' },
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'About', path: '/about' }
])
</script>

<template>
  <div class="border-b">
    <div class="flex h-16 items-center px-4">
      <router-link to="/" class="font-bold text-lg">Vue Enterprise</router-link>
      <nav class="mx-6 flex items-center space-x-4 lg:space-x-6">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="text-sm font-medium transition-colors hover:text-primary"
        >
          {{ item.name }}
        </router-link>
      </nav>
    </div>
  </div>
</template>