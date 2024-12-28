<script setup>
import { ref, computed, onMounted } from 'vue'
import IconFeather from '@/components/icons/IconFeather.vue'

// Constants
const INDICATOR_CATEGORIES = {
  PRIMARY: 'Country/Partner results framework',
  SECONDARY: [
    'Country/Partner PDO Indicator',
    'Country/Partner Intermediate Results Indicator'
  ]
}

// State
const entities = ref([
  { id: 1, name: 'Kenya Ministry of Environment', code: 'KEN-ENV' },
  { id: 2, name: 'Tanzania Wildlife Authority', code: 'TZA-WLD' }
])

const indicators = ref([])
const selectedEntity = ref(null)
const searchQuery = ref('')
const showCreateModal = ref(false)
const showViewModal = ref(false)
const selectedIndicator = ref(null)
const loading = ref(false)
const error = ref(null)

// Form state
const indicatorForm = ref({
  IndicatorPrimaryCategory: INDICATOR_CATEGORIES.PRIMARY,
  IndicatorSecondaryCategory: '',
  EntityID: '',
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

// Methods
const fetchIndicators = async (entityId) => {
  try {
    loading.value = true
    error.value = null
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock data
    indicators.value = [
      {
        id: 1,
        EntityID: entityId,
        IID: 'IND-001',
        IndicatorPrimaryCategory: INDICATOR_CATEGORIES.PRIMARY,
        IndicatorSecondaryCategory: INDICATOR_CATEGORIES.SECONDARY[0],
        Indicator: 'Forest Coverage Rate',
        IndicatorDefinition: 'Percentage of land area covered by forests',
        IndicatorQuestion: 'What is the current forest coverage rate?',
        ResponseType: 'Percentage',
        SourceOfData: 'Satellite Imagery Analysis',
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
    error.value = 'Failed to fetch indicators'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const handleEntitySelect = (entity) => {
  selectedEntity.value = entity
  fetchIndicators(entity.id)
}

const handleCreateSubmit = async () => {
  try {
    loading.value = true
    error.value = null
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const newIndicator = {
      id: Date.now(),
      ...indicatorForm.value,
      EntityID: selectedEntity.value.id
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
    EntityID: '',
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

onMounted(() => {
  if (selectedEntity.value) {
    fetchIndicators(selectedEntity.value.id)
  }
})
</script>

<template>
  <div class="min-h-screen bg-base-100">
    <!-- Entity Selection Header -->
    <div class="bg-base-200 border-b">
      <div class="container mx-auto px-6 py-8">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 class="text-3xl font-bold">Results Framework Indicators</h1>
            <p class="text-base-content/70 mt-2">Manage entity-specific indicators and targets</p>
          </div>

          <div class="form-control w-full max-w-xs">
            <select 
              v-model="selectedEntity"
              class="select select-bordered w-full"
              @change="handleEntitySelect(selectedEntity)"
            >
              <option :value="null">Select an entity</option>
              <option
                v-for="entity in entities"
                :key="entity.id"
                :value="entity"
              >
                {{ entity.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-6 py-8">
      <template v-if="selectedEntity">
        <!-- Actions Bar -->
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div class="form-control">
            <div class="input-group">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search indicators..."
                class="input input-bordered w-full max-w-xs"
              />
              <button class="btn btn-square bg-base-100">
                <IconFeather name="search" size="16" />
              </button>
            </div>
          </div>

          <button 
            class="btn btn-primary gap-2"
            @click="showCreateModal = true"
          >
            <IconFeather name="plus" size="16" />
            New Indicator
          </button>
        </div>

        <!-- Indicators Table -->
        <div class="card bg-base-100 shadow-sm">
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
                        <p class="text-base-content/70">No indicators found</p>
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
                      <div class="flex items-center gap-2">
                        <button 
                          class="btn btn-circle btn-sm bg-primary text-white hover:bg-primary/90 border-0"
                          @click="viewIndicator(indicator)"
                        >
                          <IconFeather name="eye" size="14" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </template>

      <template v-else>
        <div class="text-center py-16">
          <IconFeather name="target" size="48" class="mx-auto mb-4 text-base-content/30" />
          <h2 class="text-xl font-semibold mb-2">Select an Entity</h2>
          <p class="text-base-content/70">Choose an entity to manage its indicators</p>
        </div>
      </template>
    </div>

    <!-- Create Modal -->
    <dialog :class="['modal', { 'modal-open': showCreateModal }]">
      <div class="modal-box max-w-4xl">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-bold">Create New Indicator</h3>
          <button 
            class="btn btn-ghost btn-sm btn-circle"
            @click="showCreateModal = false"
          >
            <IconFeather name="x" />
          </button>
        </div>
        
        <form @submit.prevent="handleCreateSubmit" class="space-y-4">
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
                placeholder="Enter indicator ID"
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
              placeholder="Enter indicator name"
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
              placeholder="Enter indicator definition"
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
              placeholder="Enter indicator question"
              required
            ></textarea>
          </div>

          <!-- Baselines and Targets -->
          <div class="space-y-4">
            <h4 class="font-medium">Baselines and Targets</h4>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Baseline PAD 2023</span>
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
                  <span class="label-text">Baseline 2024</span>
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
                  <span class="label-text">2024 Target</span>
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
                  <span class="label-text">2025 Target</span>
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
                  <span class="label-text">2026 Target</span>
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
                  <span class="label-text">2027 Target</span>
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
                  <span class="label-text">2028 Target</span>
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
                  <span class="label-text">2029 Target</span>
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
                  <span class="label-text">2030 Target</span>
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
                <span class="label-text">Source of Data</span>
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
                <span class="label-text">Reporting Period</span>
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
              <span class="label-text">Remarks/Comments</span>
            </label>
            <textarea
              v-model="indicatorForm.RemarksComments"
              class="textarea textarea-bordered"
              placeholder="Enter any additional remarks or comments"
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
              Create Indicator
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
          <h3 class="text-xl font-bold">Indicator Details</h3>
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
            <h5 class="font-medium mb-4">Targets Timeline</h5>
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
              <h5 class="font-medium mb-2">Source of Data</h5>
              <p class="bg-base-200/50 p-3 rounded">{{ selectedIndicator.SourceOfData }}</p>
            </div>
            <div>
              <h5 class="font-medium mb-2">Remarks/Comments</h5>
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