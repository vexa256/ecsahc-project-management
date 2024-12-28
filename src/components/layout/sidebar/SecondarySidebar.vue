<script setup>
import { ref } from 'vue'
import SecondaryNavHeader from './SecondaryNavHeader.vue'
import SecondaryNavSection from './SecondaryNavSection.vue'
import SecondaryNavQuickActions from './SecondaryNavQuickActions.vue'

const props = defineProps({
  section: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])
</script>

<template>
  <aside
    class="fixed top-0 left-16 z-30 h-screen w-72 bg-base-100 border-r shadow-lg"
    @click.stop
  >
    <!-- Header -->
    <SecondaryNavHeader :section="section" />

    <!-- Navigation Content -->
    <div class="h-[calc(100vh-4rem)] overflow-y-auto">
      <!-- Quick Actions -->
      <SecondaryNavQuickActions :section="section" />

      <!-- Menu Items -->
      <div v-if="section.children" class="p-3">
        <SecondaryNavSection
          :items="section.children"
        />
      </div>
      <div v-else class="p-4 text-center text-base-content/70">
        <p>No items available</p>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: hsl(var(--primary)/0.2) transparent;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: hsl(var(--primary)/0.2);
  border-radius: 2px;
}
</style>