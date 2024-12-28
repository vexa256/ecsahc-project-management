```vue
<script setup>
import { ref } from 'vue'
import IconFeather from '@/components/icons/IconFeather.vue'

const props = defineProps({
  open: Boolean,
  entityId: {
    type: [String, Number],
    required: true
  }
})

const emit = defineEmits(['update:open', 'select'])

// Mock data - replace with actual API call
const reports = ref([
  { 
    id: 1, 
    name: 'Q1 2024 Report',
    period: 'January - March 2024',
    status: 'active',
    dueDate: '2024-03-31'
  },
  { 
    id: 2, 
    name: 'Annual Report 2023',
    period: 'January - December 2023',
    status: 'closed',
    dueDate: '2024-01-31'
  }
])

const loading = ref(false)
const error = ref(null)
const searchQuery = ref('')

const handleSelect = (report) => {
  emit('select', report)
}
</script>

<template>
  <dialog :class="['modal', { 'modal-open': open }]">
    <div class="modal-box max-w-2xl">
      <h3 class="font-bold text-lg mb-6">Select Report</h3>

      <!-- Search -->
      <div class="form-control mb-6">
        <div class="input-group">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search reports..."
            class="input input-bordered w-full"
          />
          <button class="btn btn-square">
            <IconFeather name="search" size="16" />
          </button>
        </div>
      </div>

      <!-- Report List -->
      <div class="space-y-2">
        <button
          v-for="report in reports"
          :key="report.id"
          class="w-full btn btn-ghost justify-start gap-4 h-auto py-4"
          :disabled="report.status === 'closed'"
          @click="handleSelect(report)"
        >
          <div class="w-12 h-12 rounded-lg bg-base-200 flex items-center justify-center">
            <IconFeather name="file-text" />
          </div>
          <div class="text-left flex-1">
            <div class="flex items-center gap-2">
              <h4 class="font-medium">{{ report.name }}</h4>
              <span 
                class="badge badge-sm"
                :class="report.status === 'active' ? 'badge-success' : 'badge-neutral'"
              >
                {{ report.status }}
              </span>
            </div>
            <p class="text-sm text-base-content/70">{{ report.period }}</p>
          </div>
          <div class="text-right text-sm">
            <p class="font-medium">Due Date</p>
            <p class="text-base-content/70">{{ report.dueDate }}</p>
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