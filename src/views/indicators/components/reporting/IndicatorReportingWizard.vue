```vue
<script setup>
import { ref, computed } from 'vue'
import IconFeather from '@/components/icons/IconFeather.vue'
import ReportHeader from './ReportHeader.vue'
import ReportingProgress from './ReportingProgress.vue'
import IndicatorReportingForm from './IndicatorReportingForm.vue'

const props = defineProps({
  indicators: {
    type: Array,
    required: true
  },
  entity: {
    type: Object,
    required: true
  },
  report: {
    type: Object,
    required: true
  },
  user: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['complete'])

const currentIndex = ref(0)
const responses = ref({})

const currentIndicator = computed(() => props.indicators[currentIndex.value])
const isLastIndicator = computed(() => currentIndex.value === props.indicators.length - 1)
const completedCount = computed(() => Object.keys(responses.value).length)

const handleNext = () => {
  if (isLastIndicator.value) {
    emit('complete', responses.value)
  } else {
    currentIndex.value++
  }
}

const handlePrevious = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

const handleSave = (response) => {
  responses.value[currentIndicator.value.IID] = response
  handleNext()
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <ReportHeader 
      :entity="entity"
      :report="report"
      :user="user"
    />

    <!-- Progress -->
    <ReportingProgress
      :total-indicators="indicators.length"
      :completed-indicators="completedCount"
    />

    <!-- Current Indicator Form -->
    <div class="card bg-base-100 shadow-sm">
      <div class="card-body">
        <IndicatorReportingForm
          :indicator="currentIndicator"
          :previous-value="null"
          @save="handleSave"
        />
      </div>
    </div>

    <!-- Navigation -->
    <div class="flex items-center justify-between">
      <button
        class="btn btn-ghost gap-2"
        :disabled="currentIndex === 0"
        @click="handlePrevious"
      >
        <IconFeather name="arrow-left" size="16" />
        Previous
      </button>

      <button
        class="btn btn-primary gap-2"
        @click="handleNext"
      >
        {{ isLastIndicator ? 'Complete' : 'Skip' }}
        <IconFeather 
          :name="isLastIndicator ? 'check' : 'arrow-right'"
          size="16"
        />
      </button>
    </div>
  </div>
</template>
```