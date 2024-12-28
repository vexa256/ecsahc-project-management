```vue
<script setup>
import { ref, computed } from 'vue'
import IconFeather from '@/components/icons/IconFeather.vue'
import SelectEntityModal from './components/reporting/SelectEntityModal.vue'
import SelectReportModal from './components/reporting/SelectReportModal.vue'
import SelectFrameworkModal from './components/reporting/SelectFrameworkModal.vue'
import IndicatorReportingWizard from './components/reporting/IndicatorReportingWizard.vue'

// State
const showEntityModal = ref(true)
const showReportModal = ref(false)
const showFrameworkModal = ref(false)
const showWizard = ref(false)

const selectedEntity = ref(null)
const selectedReport = ref(null)
const selectedFramework = ref(null)
const matchingIndicators = ref([])
const loading = ref(false)
const error = ref(null)

// Handle entity selection
const handleEntitySelect = (entity) => {
  selectedEntity.value = entity
  showEntityModal.value = false
  showReportModal.value = true
}

// Handle report selection
const handleReportSelect = (report) => {
  selectedReport.value = report
  showReportModal.value = false
  showFrameworkModal.value = true
}

// Handle framework selection
const handleFrameworkSelect = async (framework) => {
  selectedFramework.value = framework
  showFrameworkModal.value = false
  
  try {
    loading.value = true
    // Fetch matching indicators based on EID, RID and framework
    await fetchMatchingIndicators()
    showWizard.value = true
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

// Fetch indicators matching the criteria
const fetchMatchingIndicators = async () => {
  // Mock data - replace with actual API call
  matchingIndicators.value = [
    {
      id: 1,
      IID: 'IND-001',
      Indicator: 'Forest Coverage Rate',
      IndicatorDefinition: 'Percentage of land area covered by forests',
      IndicatorQuestion: 'What is the current forest coverage rate?',
      ResponseType: 'percentage',
      BaselinePAD2023: '45%',
      TargetYearSeven2030: '62%'
    }
  ]
}

// Handle wizard completion
const handleWizardComplete = (responses) => {
  // Save indicator responses
  console.log('Saving responses:', responses)
}

// Reset wizard
const resetWizard = () => {
  showEntityModal.value = true
  showReportModal.value = false
  showFrameworkModal.value = false
  showWizard.value = false
  selectedEntity.value = null
  selectedReport.value = null
  selectedFramework.value = null
  matchingIndicators.value = []
}
</script>

<template>
  <div class="min-h-screen bg-base-100">
    <!-- Header -->
    <div class="bg-base-200 border-b">
      <div class="container mx-auto px-6 py-8">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 class="text-3xl font-bold">Report Indicators</h1>
            <p class="text-base-content/70 mt-2">Report on framework indicators</p>
          </div>

          <button 
            v-if="!showEntityModal"
            class="btn btn-ghost gap-2"
            @click="resetWizard"
          >
            <IconFeather name="refresh-cw" size="16" />
            Start New Report
          </button>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="container mx-auto px-6 py-8">
      <!-- Error Display -->
      <div v-if="error" class="alert alert-error mb-6">
        <IconFeather name="alert-circle" />
        <span>{{ error }}</span>
        <button class="btn btn-ghost btn-sm" @click="error = null">Dismiss</button>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex items-center justify-center py-12">
        <div class="loading loading-spinner loading-lg"></div>
      </div>

      <!-- Progress Display -->
      <div v-else-if="!showWizard" class="card bg-base-100 shadow-sm">
        <div class="card-body">
          <ul class="steps steps-vertical lg:steps-horizontal w-full">
            <li 
              class="step"
              :class="{ 'step-primary': selectedEntity }"
            >
              Select Entity
            </li>
            <li 
              class="step"
              :class="{ 'step-primary': selectedReport }"
            >
              Select Report
            </li>
            <li 
              class="step"
              :class="{ 'step-primary': selectedFramework }"
            >
              Select Framework
            </li>
            <li 
              class="step"
              :class="{ 'step-primary': showWizard }"
            >
              Report Indicators
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <SelectEntityModal
      v-model:open="showEntityModal"
      @select="handleEntitySelect"
    />

    <SelectReportModal
      v-if="selectedEntity"
      v-model:open="showReportModal"
      :entity-id="selectedEntity.id"
      @select="handleReportSelect"
    />

    <SelectFrameworkModal
      v-if="selectedReport"
      v-model:open="showFrameworkModal"
      @select="handleFrameworkSelect"
    />

    <!-- Reporting Wizard -->
    <IndicatorReportingWizard
      v-if="showWizard"
      :indicators="matchingIndicators"
      :entity="selectedEntity"
      :report="selectedReport"
      :framework="selectedFramework"
      @complete="handleWizardComplete"
    />
  </div>
</template>
```