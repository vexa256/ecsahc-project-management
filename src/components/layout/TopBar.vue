<script setup>
import { ref } from 'vue'
import IconFeather from '@/components/icons/IconFeather.vue'
import SearchBar from '@/components/search/SearchBar.vue'
import NotificationsDropdown from '@/components/dropdowns/NotificationsDropdown.vue'
import UserDropdown from '@/components/dropdowns/UserDropdown.vue'

defineEmits(['toggle-sidebar', 'open-profile', 'open-settings'])
</script>

<template>
  <header class="sticky top-0 z-30 w-full border-b bg-base-100">
    <div class="flex h-16 items-center px-4 md:px-6">
      <!-- Left Section -->
      <div class="flex items-center space-x-4">
        <button 
          class="btn btn-ghost btn-square lg:hidden"
          @click="$emit('toggle-sidebar')"
        >
          <IconFeather name="menu" />
        </button>
        <SearchBar />
      </div>

      <!-- Right Section -->
      <div class="ml-auto flex items-center space-x-4">
        <NotificationsDropdown />
        <UserDropdown 
          @open-profile="$emit('open-profile')"
          @open-settings="$emit('open-settings')"
        />
      </div>
    </div>
  </header>
</template>