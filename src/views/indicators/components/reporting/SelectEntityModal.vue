```vue
<script setup>
import { ref } from 'vue'
import IconFeather from '@/components/icons/IconFeather.vue'

const props = defineProps({
  open: Boolean
})

const emit = defineEmits(['update:open', 'select'])

const entities = ref([
  { id: 1, name: 'Kenya Ministry of Environment', code: 'KEN-ENV' },
  { id: 2, name: 'Tanzania Wildlife Authority', code: 'TZA-WLD' }
])

const loading = ref(false)
const error = ref(null)
const searchQuery = ref('')

const handleSelect = (entity) => {
  emit('select', entity)
}
</script>

<template>
  <dialog :class="['modal', { 'modal-open': open }]">
    <div class="modal-box max-w-2xl">
      <h3 class="font-bold text-lg mb-6">Select Entity</h3>

      <!-- Search -->
      <div class="form-control mb-6">
        <div class="input-group">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search entities..."
            class="input input-bordered w-full"
          />
          <button class="btn btn-square">
            <IconFeather name="search" size="16" />
          </button>
        </div>
      </div>

      <!-- Entity List -->
      <div class="space-y-2">
        <button
          v-for="entity in entities"
          :key="entity.id"
          class="w-full btn btn-ghost justify-start gap-4 h-auto py-4"
          @click="handleSelect(entity)"
        >
          <div class="w-12 h-12 rounded-lg bg-base-200 flex items-center justify-center">
            <IconFeather name="briefcase" />
          </div>
          <div class="text-left">
            <h4 class="font-medium">{{ entity.name }}</h4>
            <p class="text-sm text-base-content/70">{{ entity.code }}</p>
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