```vue
<script setup>
import { ref, computed, onMounted } from 'vue'
import IconFeather from '@/components/icons/IconFeather.vue'

// Constants
const INDICATOR_CATEGORIES = {
  PRIMARY: 'Regional Results Framework',
  SECONDARY: [
    'Regional PDO Indicator',
    'Regional Intermediate Results Indicator'
  ]
}

// State
const indicators = ref([])
const loading = ref(false)
const error = ref(null)
const showCreateModal = ref(false)
const showViewModal = ref(false)
const selectedIndicator = ref(null)
const searchQuery = ref('')

// Form state
const indicatorForm = ref({
  IndicatorPrimaryCategory: INDICATOR_CATEGORIES.PRIMARY,
  IndicatorSecondaryCategory: '',
  IID: '',
  Indicator: '',
  IndicatorDefinition: '',
  IndicatorQuestion: '',
  RemarksComments: '',
  SourceOfData: '',
  ResponseType: '',
  ReportingPeriod: '',
  ExpectedTarget: '',
  BaselinePAD2023: '',
  Baseline2024: '',
  TargetYearOne2024: '',
  TargetYearTwo2025: '',
  TargetYearThree2026: '',
  TargetYearFour2027: '',
  TargetYearFive2028: '',
  TargetYearSix2029: '',
  TargetYearSeven2030: ''
})

// Computed
const filteredIndicators = computed(() => {
  if (!searchQuery.value) return indicators.value
  
  const query = searchQuery.value.toLowerCase()
  return indicators.value.filter(indicator => 
    indicator.Indicator?.toLowerCase().includes(query) ||
    indicator.IID?.toLowerCase().includes(query) ||
    indicator.IndicatorDefinition?.toLowerCase().includes(query)
  )
})

const stats = computed(() => [
  {
    title: 'Total Regional Indicators',
    value: indicators.value.length,
    icon: 'globe',
    trend: '+12%',
    color: 'primary'
  },
  {
    title: 'PDO Indicators',
    value: indicators.value.filter(i => i.IndicatorSecondaryCategory === INDICATOR_CATEGORIES.SECONDARY[0]).length,
    icon: 'target',
    trend: '+8%',
    color: 'success'
  },
  {
    title: 'IR Indicators',
    value: indicators.value.filter(i => i.IndicatorSecondaryCategory === INDICATOR_CATEGORIES.SECONDARY[1]).length,
    icon: 'bar-chart-2',
    trend: '+15%',
    color: 'info'
  }
])

// Methods
const fetchIndicators = async () => {
  try {
    loading.value = true
    error.value = null
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock data
    indicators.value = [
      {
        id: 1,
        IID: 'RRF-001',
        IndicatorPrimaryCategory: INDICATOR_CATEGORIES.PRIMARY,
        IndicatorSecondaryCategory: INDICATOR_CATEGORIES.SECONDARY[0],
        Indicator: 'Regional Forest Coverage Rate',
        IndicatorDefinition: 'Percentage of regional land area covered by forests',
        IndicatorQuestion: 'What is the current regional forest coverage rate?',
        ResponseType: 'Percentage',
        SourceOfData: 'Regional Satellite Imagery Analysis',
        ReportingPeriod: 'Annual',
        BaselinePAD2023: '45%',
        Baseline2024: '45%',
        TargetYearOne2024: '47%',
        TargetYearTwo2025: '50%',
        TargetYearThree2026: '52%',
        TargetYearFour2027: '55%',
        TargetYearFive2028: '57%',
        TargetYearSix2029: '60%',
        TargetYearSeven2030: '62%'
      }
    ]
  } catch (err) {
    error.value = 'Failed to fetch regional indicators'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const handleCreateSubmit = async () => {
  try {
    loading.value = true
    error.value = null
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const newIndicator = {
      id: Date.now(),
      ...indicatorForm.value
    }
    
    indicators.value.push(newIndicator)
    showCreateModal.value = false
    resetForm()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const viewIndicator = (indicator) => {
  selectedIndicator.value = indicator
  showViewModal.value = true
}

const resetForm = () => {
  indicatorForm.value = {
    IndicatorPrimaryCategory: INDICATOR_CATEGORIES.PRIMARY,
    IndicatorSecondaryCategory: '',
    IID: '',
    Indicator: '',
    IndicatorDefinition: '',
    IndicatorQuestion: '',
    RemarksComments: '',
    SourceOfData: '',
    ResponseType: '',
    ReportingPeriod: '',
    ExpectedTarget: '',
    BaselinePAD2023: '',
    Baseline2024: '',
    TargetYearOne2024: '',
    TargetYearTwo2025: '',
    TargetYearThree2026: '',
    TargetYearFour2027: '',
    TargetYearFive2028: '',
    TargetYearSix2029: '',
    TargetYearSeven2030: ''
  }
}

onMounted(fetchIndicators)
</script>

<template>
  <div class="min-h-screen bg-base-100">
    <!-- Header -->
    <div class="bg-base-200 border-b">
      <div class="container mx-auto px-6 py-8">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 class="text-3xl font-bold">Regional Results Framework</h1>
            <p class="text-base-content/70 mt-2">Manage regional-level indicators and targets</p>
          </div>

          <div class="flex items-center gap-3">
            <button 
              class="btn btn-primary gap-2"
              @click="showCreateModal = true"
            >
              <IconFeather name="plus" size="16" />
              New Regional Indicator
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Section -->
    <div class="container mx-auto px-6 py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          v-for="stat in stats" 
          :key="stat.title"
          class="card bg-base-100 shadow-sm hover:shadow-md transition-all duration-300"
        >
          <div class="card-body">
            <div class="flex items-start justify-between">
              <div>
                <h3 class="font-medium text-base-content/70">{{ stat.title }}</h3>
                <div class="text-2xl font-bold mt-2">{{ stat.value }}</div>
              </div>
              <div 
                class="w-12 h-12 rounded-xl flex items-center justify-center"
                :class="`bg-${stat.color}/10 text-${stat.color}`"
              >
                <IconFeather :name="stat.icon" size="24" />
              </div>
            </div>
            <div class="mt-4 flex items-center gap-2">
              <IconFeather 
                name="trending-up"
                size="16"
                class="text-success"
              />
              <span class="text-sm text-success">{{ stat.trend }}</span>
              <span class="text-sm text-base-content/50">vs last month</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-6 pb-8">
      <div class="card bg-base-100 shadow-sm">
        <!-- Search -->
        <div class="p-4 border-b">
          <div class="form-control">
            <div class="input-group">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search regional indicators..."
                class="input input-bordered w-full"
              />
              <button class="btn btn-square bg-base-100">
                <IconFeather name="search" size="16" />
              </button>
            </div>
          </div>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Indicator</th>
                <th>Category</th>
                <th>Response Type</th>
                <th>Baseline (2024)</th>
                <th>Target (2030)</th>
                <th class="w-20">Actions</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="loading">
                <tr v-for="i in 3" :key="i">
                  <td colspan="7">
                    <div class="animate-pulse flex items-center space-x-4 p-4">
                      <div class="h-4 bg-base-300 rounded w-full"></div>
                    </div>
                  </td>
                </tr>
              </template>

              <template v-else-if="error">
                <tr>
                  <td colspan="7">
                    <div class="alert alert-error">
                      <IconFeather name="alert-circle" />
                      <span>{{ error }}</span>
                    </div>
                  </td>
                </tr>
              </template>

              <template v-else-if="filteredIndicators.length === 0">
                <tr>
                  <td colspan="7">
                    <div class="text-center py-8">
                      <IconFeather name="inbox" size="48" class="mx-auto mb-4 text-base-content/30" />
                      <p class="text-base-content/70">No regional indicators found</p>
                    </div>
                  </td>
                </tr>
              </template>

              <template v-else>
                <tr 
                  v-for="indicator in filteredIndicators" 
                  :key="indicator.id"
                  class="hover:bg-base-200/50"
                >
                  <td class="font-mono">{{ indicator.IID }}</td>
                  <td>{{ indicator.Indicator }}</td>
                  <td>{{ indicator.IndicatorSecondaryCategory }}</td>
                  <td>{{ indicator.ResponseType }}</td>
                  <td>{{ indicator.Baseline2024 }}</td>
                  <td>{{ indicator.TargetYearSeven2030 }}</td>
                  <td>
                    <button 
                      class="btn btn-circle btn-sm bg-primary text-white hover:bg-primary/90 border-0"
                      @click="viewIndicator(indicator)"
                    >
                      <IconFeather name="eye" size="14" />
                    </button>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Create Modal -->
    <dialog :class="['modal', { 'modal-open': showCreateModal }]">
      <div class="modal-box max-w-4xl">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-bold">Create New Regional Indicator</h3>
          <button 
            class="btn btn-ghost btn-sm btn-circle"
            @click="showCreateModal = false"
          >
            <IconFeather name="x" />
          </button>
        </div>
        
        <form @submit.prevent="handleCreateSubmit" class="space-y-4">
          <!-- Form fields from RRFIndicatorForm -->
          <!-- Categories -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Primary Category</span>
              </label>
              <input
                v-model="indicatorForm.IndicatorPrimaryCategory"
                type="text"
                class="input input-bordered bg-base-200"
                readonly
              />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Secondary Category</span>
              </label>
              <select 
                v-model="indicatorForm.IndicatorSecondaryCategory"
                class="select select-bordered w-full"
                required
              >
                <option value="">Select category</option>
                <option
                  v-for="category in INDICATOR_CATEGORIES.SECONDARY"
                  :key="category"
                  :value="category"
                >
                  {{ category }}
                </option>
              </select>
            </div>
          </div>

          <!-- Basic Info -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Indicator ID</span>
              </label>
              <input
                v-model="indicatorForm.IID"
                type="text"
                placeholder="Enter regional indicator ID"
                class="input input-bordered"
                required
              />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Response Type</span>
              </label>
              <input
                v-model="indicatorForm.ResponseType"
                type="text"
                placeholder="e.g., Percentage, Number, Yes/No"
                class="input input-bordered"
                required
              />
            </div>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Indicator Name</span>
            </label>
            <input
              v-model="indicatorForm.Indicator"
              type="text"
              placeholder="Enter regional indicator name"
              class="input input-bordered"
              required
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Definition</span>
            </label>
            <textarea
              v-model="indicatorForm.IndicatorDefinition"
              class="textarea textarea-bordered h-24"
              placeholder="Enter regional indicator definition"
              required
            ></textarea>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Question</span>
            </label>
            <textarea
              v-model="indicatorForm.IndicatorQuestion"
              class="textarea textarea-bordered"
              placeholder="Enter regional indicator question"
              required
            ></textarea>
          </div>

          <!-- Baselines and Targets -->
          <div class="space-y-4">
            <h4 class="font-medium">Regional Baselines and Targets</h4>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Regional Baseline PAD 2023</span>
                </label>
                <input
                  v-model="indicatorForm.BaselinePAD2023"
                  type="text"
                  class="input input-bordered"
                  required
                />
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">Regional Baseline 2024</span>
                </label>
                <input
                  v-model="indicatorForm.Baseline2024"
                  type="text"
                  class="input input-bordered"
                  required
                />
              </div>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">2024 Regional Target</span>
                </label>
                <input
                  v-model="indicatorForm.TargetYearOne2024"
                  type="text"
                  class="input input-bordered"
                  required
                />
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">2025 Regional Target</span>
                </label>
                <input
                  v-model="indicatorForm.TargetYearTwo2025"
                  type="text"
                  class="input input-bordered"
                  required
                />
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">2026 Regional Target</span>
                </label>
                <input
                  v-model="indicatorForm.TargetYearThree2026"
                  type="text"
                  class="input input-bordered"
                  required
                />
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">2027 Regional Target</span>
                </label>
                <input
                  v-model="indicatorForm.TargetYearFour2027"
                  type="text"
                  class="input input-bordered"
                  required
                />
              </div>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">2028 Regional Target</span>
                </label>
                <input
                  v-model="indicatorForm.TargetYearFive2028"
                  type="text"
                  class="input input-bordered"
                  required
                />
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">2029 Regional Target</span>
                </label>
                <input
                  v-model="indicatorForm.TargetYearSix2029"
                  type="text"
                  class="input input-bordered"
                  required
                />
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">2030 Regional Target</span>
                </label>
                <input
                  v-model="indicatorForm.TargetYearSeven2030"
                  type="text"
                  class="input input-bordered"
                  required
                />
              </div>
            </div>
          </div>

          <!-- Additional Info -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Regional Data Source</span>
              </label>
              <input
                v-model="indicatorForm.SourceOfData"
                type="text"
                class="input input-bordered"
                required
              />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Regional Reporting Period</span>
              </label>
              <input
                v-model="indicatorForm.ReportingPeriod"
                type="text"
                class="input input-bordered"
                required
              />
            </div>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Regional Remarks/Comments</span>
            </label>
            <textarea
              v-model="indicatorForm.RemarksComments"
              class="textarea textarea-bordered"
              placeholder="Enter any additional regional remarks or comments"
            ></textarea>
          </div>

          <div class="modal-action">
            <button 
              type="button" 
              class="btn" 
              @click="showCreateModal = false"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              class="btn btn-primary"
              :disabled="loading"
            >
              <IconFeather 
                v-if="loading" 
                name="loader" 
                class="animate-spin"
              />
              Create Regional Indicator
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" class="modal-backdrop" @click="showCreateModal = false">
        <button>close</button>
      </form>
    </dialog>

    <!-- View Modal -->
    <dialog :class="['modal', { 'modal-open': showViewModal }]">
      <div class="modal-box max-w-4xl">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-bold">Regional Indicator Details</h3>
          <button 
            class="btn btn-ghost btn-sm btn-circle"
            @click="showViewModal = false"
          >
            <IconFeather name="x" />
          </button>
        </div>

        <div v-if="selectedIndicator" class="space-y-6">
          <!-- Header Info -->
          <div class="bg-base-200 p-4 rounded-lg">
            <div class="flex items-start gap-4">
              <div class="flex-1">
                <h4 class="font-medium text-lg">{{ selectedIndicator.Indicator }}</h4>
                <p class="text-sm text-base-content/70 mt-1">{{ selectedIndicator.IID }}</p>
              </div>
              <div class="badge badge-primary">{{ selectedIndicator.ResponseType }}</div>
            </div>
          </div>

          <!-- Categories -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 class="font-medium mb-2">Primary Category</h5>
              <p>{{ selectedIndicator.IndicatorPrimaryCategory }}</p>
            </div>
            <div>
              <h5 class="font-medium mb-2">Secondary Category</h5>
              <p>{{ selectedIndicator.IndicatorSecondaryCategory }}</p>
            </div>
          </div>

          <!-- Definition & Question -->
          <div class="space-y-4">
            <div>
              <h5 class="font-medium mb-2">Definition</h5>
              <p class="bg-base-200/50 p-3 rounded">{{ selectedIndicator.IndicatorDefinition }}</p>
            </div>
            <div>
              <h5 class="font-medium mb-2">Question</h5>
              <p class="bg-base-200/50 p-3 rounded">{{ selectedIndicator.IndicatorQuestion }}</p>
            </div>
          </div>

          <!-- Targets Timeline -->
          <div>
            <h5 class="font-medium mb-4">Regional Targets Timeline</h5>
            <div class="overflow-x-auto">
              <table class="table table-sm">
                <thead>
                  <tr>
                    <th>Baseline PAD 2023</th>
                    <th>Baseline 2024</th>
                    <th>2024</th>
                    <th>2025</th>
                    <th>2026</th>
                    <th>2027</th>
                    <th>2028</th>
                    <th>2029</th>
                    <th>2030</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{ selectedIndicator.BaselinePAD2023 }}</td>
                    <td>{{ selectedIndicator.Baseline2024 }}</td>
                    <td>{{ selectedIndicator.TargetYearOne2024 }}</td>
                    <td>{{ selectedIndicator.TargetYearTwo2025 }}</td>
                    <td>{{ selectedIndicator.TargetYearThree2026 }}</td>
                    <td>{{ selectedIndicator.TargetYearFour2027 }}</td>
                    <td>{{ selectedIndicator.TargetYearFive2028 }}</td>
                    <td>{{ selectedIndicator.TargetYearSix2029 }}</td>
                    <td>{{ selectedIndicator.TargetYearSeven2030 }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Additional Information -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 class="font-medium mb-2">Regional Data Source</h5>
              <p class="bg-base-200/50 p-3 rounded">{{ selectedIndicator.SourceOfData }}</p>
            </div>
            <div>
              <h5 class="font-medium mb-2">Regional Remarks/Comments</h5>
              <p class="bg-base-200/50 p-3 rounded">{{ selectedIndicator.RemarksComments }}</p>
            </div>
          </div>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop" @click="showViewModal = false">
        <button>close</button>
      </form>
    </dialog>
  </div>
</template>
```