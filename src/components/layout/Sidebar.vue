<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { sidebarNavigation } from '@/config/navigation'
import PrimarySidebar from './sidebar/PrimarySidebar.vue'
import SecondarySidebar from './sidebar/SecondarySidebar.vue'

const router = useRouter()
const activeSection = ref(null)
const showSecondaryMenu = ref(false)

const toggleSecondaryMenu = (section) => {
  if (activeSection.value?.name === section.name) {
    showSecondaryMenu.value = false
    activeSection.value = null
  } else {
    activeSection.value = section
    showSecondaryMenu.value = true
  }
}

// Close secondary menu on route change
watch(
  () => router.currentRoute.value.path,
  () => {
    showSecondaryMenu.value = false
    activeSection.value = null
  }
)

// Close secondary menu when clicking outside
const handleOutsideClick = (event) => {
  const isSecondaryMenu = event.target.closest('.secondary-sidebar')
  const isPrimaryMenu = event.target.closest('.primary-sidebar')
  
  if (!isSecondaryMenu && !isPrimaryMenu && showSecondaryMenu.value) {
    showSecondaryMenu.value = false
    activeSection.value = null
  }
}

// Add click listener
if (typeof window !== 'undefined') {
  window.addEventListener('click', handleOutsideClick)
}
</script>

<template>
  <div class="sidebar-wrapper">
    <!-- Primary Sidebar -->
    <PrimarySidebar
      class="primary-sidebar"
      :navigation="sidebarNavigation"
      :active-section="activeSection"
      @toggle-section="toggleSecondaryMenu"
    />

    <!-- Secondary Sidebar with Transition -->
    <Transition
      enter-active-class="transition-transform duration-300 ease-out"
      enter-from-class="-translate-x-full opacity-0"
      enter-to-class="translate-x-0 opacity-100"
      leave-active-class="transition-transform duration-300 ease-in"
      leave-from-class="translate-x-0 opacity-100"
      leave-to-class="-translate-x-full opacity-0"
    >
      <aside
        v-if="showSecondaryMenu && activeSection"
        class="secondary-sidebar fixed top-0 left-16 z-50 h-screen w-72 bg-base-100 border-r shadow-xl"
        @click.stop
      >
        <SecondarySidebar
          :section="activeSection"
          @close="showSecondaryMenu = false"
        />
      </aside>
    </Transition>

    <!-- Backdrop for mobile -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showSecondaryMenu"
        class="fixed inset-0 bg-black/20 z-40 lg:hidden"
        @click="showSecondaryMenu = false"
      />
    </Transition>
  </div>
</template>

<style scoped>
.sidebar-wrapper {
  @apply fixed top-0 left-0 z-40;
}

.secondary-sidebar {
  box-shadow: 4px 0 16px rgba(0, 0, 0, 0.1);
}
</style>