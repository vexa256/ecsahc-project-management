```vue
<script setup>
import { ref, computed } from 'vue'
import IconFeather from '@/components/icons/IconFeather.vue'
import IndicatorDetails from './IndicatorDetails.vue'

const props = defineProps({
  indicator: {
    type: Object,
    required: true
  },
  previousValue: {
    type: [String, Number],
    default: null
  }
})

const emit = defineEmits(['save'])

const form = ref({
  value: '',
  evidence: '',
  comments: '',
  challenges: '',
  nextSteps: ''
})

const isComplete = computed(() => {
  return form.value.value && form.value.evidence
})

const handleSubmit = () => {
  if (isComplete.value) {
    emit('save', { ...form.value })
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Detailed Indicator Information -->
    <IndicatorDetails :indicator="indicator" />

    <!-- Reporting Form -->
    <div class="card bg-base-100">
      <div class="card-body">
        <h3 class="font-medium mb-4">Report Response</h3>
        
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text font-medium">{{ indicator.IndicatorQuestion }}</span>
            </label>
            <input
              v-model="form.value"
              :type="indicator.ResponseType.toLowerCase() === 'number' ? 'number' : 'text'"
              class="input input-bordered"
              required
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Supporting Evidence</span>
            </label>
            <textarea
              v-model="form.evidence"
              class="textarea textarea-bordered"
              placeholder="Provide evidence to support the reported value"
              required
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Comments</span>
            </label>
            <textarea
              v-model="form.comments"
              class="textarea textarea-bordered"
              placeholder="Add any additional comments"
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Challenges</span>
              </label>
              <textarea
                v-model="form.challenges"
                class="textarea textarea-bordered"
                placeholder="List any challenges faced"
              />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Next Steps</span>
              </label>
              <textarea
                v-model="form.nextSteps"
                class="textarea textarea-bordered"
                placeholder="Outline next steps or actions"
              />
            </div>
          </div>

          <div class="flex justify-end">
            <button 
              type="submit" 
              class="btn btn-primary gap-2"
              :disabled="!isComplete"
            >
              <IconFeather name="save" size="16" />
              Save Response
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
```