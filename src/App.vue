<script setup>
import { ref } from 'vue'
import Sidebar from '@/components/layout/Sidebar.vue'
import TopBar from '@/components/layout/TopBar.vue'
import UserProfileModal from '@/components/modals/UserProfileModal.vue'
import SettingsModal from '@/components/modals/SettingsModal.vue'

const isProfileModalOpen = ref(false)
const isSettingsModalOpen = ref(false)
</script>

<template>
  <div class="min-h-screen bg-base-200">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main Content Area -->
    <div class="transition-all duration-300 pl-16">
      <!-- Top Bar -->
      <TopBar 
        @open-profile="isProfileModalOpen = true"
        @open-settings="isSettingsModalOpen = true"
      />

      <!-- Main Content -->
      <main class="min-h-[calc(100vh-4rem)] bg-base-100">
        <router-view />
      </main>
    </div>

    <!-- Modals -->
    <UserProfileModal 
      v-model:open="isProfileModalOpen" 
    />
    <SettingsModal 
      v-model:open="isSettingsModalOpen" 
    />
  </div>
</template>