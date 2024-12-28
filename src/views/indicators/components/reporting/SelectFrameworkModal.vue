```vue
<script setup>
import { ref } from 'vue'
import IconFeather from '@/components/icons/IconFeather.vue'

const props = defineProps({
  open: Boolean
})

const emit = defineEmits(['update:open', 'select'])

const frameworks = [
  {
    id: 'rrf',
    name: 'Regional Results Framework',
    icon: 'globe',
    description: 'Report on regional-level indicators'
  },
  {
    id: 'cprf',
    name: 'Country/Partner Results Framework',
    icon: 'flag',
    description: 'Report on country/partner-level indicators'
  }
]

const handleSelect = (framework) => {
  emit('select', framework)
}
</script>

<template>
  <dialog :class="['modal', { 'modal-open': open }]">
    <div class="modal-box max-w-2xl">
      <h3 class="font-bold text-lg mb-6">Select Framework</h3>

      <!-- Framework Selection -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          v-for="framework in frameworks"
          :key="framework.id"
          class="card bg-base-100 hover:shadow-md transition-shadow border border-base-200"
          @click="handleSelect(framework)"
        >
          <div class="card-body">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-lg bg-base-200 flex items-center justify-center">
                <IconFeather :name="framework.icon" />
              </div>
              <div>
                <h4 class="font-medium">{{ framework.name }}</h4>
                <p class="text-sm text-base-content/70">{{ framework.description }}</p>
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
```