<script setup>
import { ref, computed, onMounted } from 'vue'
import IconFeather from '@/components/icons/IconFeather.vue'

// Constants
const REPORT_TYPES = [
  { value: 'annual', label: 'Annual Report', icon: 'calendar' },
  { value: 'biannual', label: 'Bi-Annual Report', icon: 'calendar' },
  { value: 'quarterly', label: 'Quarterly Report', icon: 'calendar' },
  { value: 'monthly', label: 'Monthly Report', icon: 'calendar' }
]

// State
const timelines = ref([])
const loading = ref(false)
const error = ref(null)
const showCreateDialog = ref(false)
const showDeleteDialog = ref(false)
const selectedTimeline = ref(null)
const searchQuery = ref('')
const activeTab = ref('all')
const currentYear = new Date().getFullYear()

// Form state
const form = ref({
  ReportingID: '',
  ReportName: '',
  Type: '',
  Description: '',
  Year: currentYear.toString(),
  status: 'active',
  LastBiAnnual: false
})

// Computed
const filteredTimelines = computed(() => {
  let filtered = timelines.value
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(timeline => 
      timeline.ReportingID?.toLowerCase().includes(query) ||
      timeline.ReportName?.toLowerCase().includes(query) ||
      timeline.Description?.toLowerCase().includes(query)
    )
  }

  if (activeTab.value !== 'all') {
    filtered = filtered.filter(timeline => timeline.Type === activeTab.value)
  }

  return filtered
})

const stats = computed(() => [
  {
    title: 'Total Reports',
    value: timelines.value.length,
    icon: 'file-text',
    trend: '+8%',
    color: 'primary'
  },
  {
    title: 'Active Reports',
    value: timelines.value.filter(t => t.status === 'active').length,
    icon: 'check-circle',
    trend: '+15%',
    color: 'success'
  },
  {
    title: 'Pending Reports',
    value: timelines.value.filter(t => t.status === 'pending').length,
    icon: 'clock',
    trend: '-5%',
    color: 'warning'
  },
  {
    title: 'Completion Rate',
    value: '85%',
    icon: 'pie-chart',
    trend: '+12%',
    color: 'info'
  }
])

// Methods
const fetchTimelines = async () => {
  try {
    loading.value = true
    error.value = null
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock data
    timelines.value = [
      {
        id: 1,
        ReportingID: 'REP-2024-Q1',
        ReportName: 'Q1 2024 Performance Report',
        Type: 'quarterly',
        Description: 'First quarter performance analysis and metrics.',
        Year: '2024',
        status: 'active',
        LastBiAnnual: false
      },
      {
        id: 2,
        ReportingID: 'REP-2024-A1',
        ReportName: '2024 Annual Report',
        Type: 'annual',
        Description: 'Comprehensive annual performance review.',
        Year: '2024',
        status: 'pending',
        LastBiAnnual: false
      }
    ]
  } catch (err) {
    error.value = 'Failed to fetch reporting timelines'
  } finally {
    loading.value = false
  }
}

const handleCreate = () => {
  form.value = {
    ReportingID: '',
    ReportName: '',
    Type: '',
    Description: '',
    Year: currentYear.toString(),
    status: 'active',
    LastBiAnnual: false
  }
  showCreateDialog.value = true
  selectedTimeline.value = null
}

const handleEdit = (timeline) => {
  form.value = { ...timeline }
  selectedTimeline.value = timeline
  showCreateDialog.value = true
}

const handleDelete = (timeline) => {
  selectedTimeline.value = timeline
  showDeleteDialog.value = true
}

const handleSubmit = async () => {
  try {
    loading.value = true
    error.value = null
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (selectedTimeline.value) {
      const index = timelines.value.findIndex(t => t.id === selectedTimeline.value.id)
      if (index !== -1) {
        timelines.value[index] = { ...form.value }
      }
    } else {
      const newTimeline = {
        id: Date.now(),
        ...form.value
      }
      timelines.value.push(newTimeline)
    }

    showCreateDialog.value = false
  } catch (err) {
    error.value = err.message || 'An error occurred'
  } finally {
    loading.value = false
  }
}

const handleDeleteConfirm = async () => {
  try {
    loading.value = true
    error.value = null
    await new Promise(resolve => setTimeout(resolve, 1000))
    timelines.value = timelines.value.filter(t => t.id !== selectedTimeline.value.id)
    showDeleteDialog.value = false
  } catch (err) {
    error.value = err.message || 'An error occurred'
  } finally {
    loading.value = false
  }
}

const exportToCSV = async () => {
  try {
    loading.value = true
    error.value = null
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const headers = ['ReportingID', 'ReportName', 'Type', 'Description', 'Year', 'Status']
    const rows = timelines.value.map(timeline => 
      headers.map(header => timeline[header]).join(',')
    )
    
    const csv = [headers.join(','), ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.setAttribute('href', url)
    a.setAttribute('download', `reporting-timelines-${new Date().toISOString()}.csv`)
    a.click()
    window.URL.revokeObjectURL(url)
  } catch (err) {
    error.value = 'Failed to export timelines'
  } finally {
    loading.value = false
  }
}

// Lifecycle
onMounted(() => {
  fetchTimelines()
})
</script>

<template>
  <div class="min-h-[calc(100vh-4rem)] bg-base-100">
    <!-- Animated Header Section with Parallax Effect -->
    <div class="relative border-b overflow-hidden bg-gradient-to-br from-primary/5 via-base-200 to-base-100">
      <div class="absolute inset-0 bg-grid-pattern opacity-5 transform rotate-3 scale-110"></div>
      <div 
        class="absolute inset-0"
        style="background: radial-gradient(circle at 50% 50%, var(--primary) 0%, transparent 50%) opacity-0.05;"
      ></div>
      <div class="px-6 py-8 relative z-10">
        <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div class="animate-fade-in">
            <h1 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Reporting Timelines
            </h1>
            <p class="text-base-content/70 mt-2">Manage and track your organization's reporting schedules</p>
          </div>
          <div class="flex items-center gap-3 animate-slide-in">
            <button 
              class="btn btn-ghost gap-2 hover:scale-105 transition-transform"
              @click="exportToCSV"
              :disabled="loading"
            >
              <IconFeather name="download" size="16" />
              Export
            </button>
            <button 
              class="btn btn-primary gap-2 hover:scale-105 transition-transform"
              @click="handleCreate"
            >
              <IconFeather name="plus" size="16" />
              New Timeline
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Animated Stats Cards with Hover Effects -->
    <div class="px-6 py-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          v-for="(stat, index) in stats"
          :key="stat.title"
          class="card bg-base-100 shadow-sm hover:shadow-md transition-all duration-500 animate-fade-in-up group"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <div class="card-body relative overflow-hidden">
            <!-- Decorative Background -->
            <div 
              class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              :style="`background: radial-gradient(circle at var(--x, 50%) var(--y, 50%), hsl(var(--${stat.color})/0.15), transparent 100px);`"
              @mousemove="e => {
                const rect = e.currentTarget.getBoundingClientRect()
                e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`)
                e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`)
              }"
            ></div>

            <div class="flex items-start justify-between relative">
              <div>
                <h3 class="font-medium text-base-content/70">{{ stat.title }}</h3>
                <div class="text-2xl font-bold mt-2 group-hover:scale-110 transition-transform">
                  {{ stat.value }}
                </div>
                <div class="flex items-center gap-2 mt-2">
                  <span class="text-sm" :class="`text-${stat.color}`">{{ stat.trend }}</span>
                  <IconFeather 
                    name="trending-up" 
                    size="14" 
                    :class="`text-${stat.color}`" 
                  />
                </div>
              </div>
              <div 
                class="w-12 h-12 rounded-xl flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"
                :class="`bg-${stat.color}/10 text-${stat.color}`"
              >
                <IconFeather :name="stat.icon" size="24" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="px-6 pb-6">
      <div class="card bg-base-100 shadow-sm overflow-hidden">
        <!-- Advanced Filters with Animation -->
        <div class="border-b bg-base-200/50 backdrop-blur-sm">
          <div class="p-4">
            <div class="flex flex-col md:flex-row md:items-center gap-4">
              <!-- Animated Search -->
              <div class="form-control flex-1 group">
                <div class="input-group">
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Search timelines..."
                    class="input input-bordered w-full transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                  />
                  <button class="btn btn-square bg-base-100 group-hover:bg-primary group-hover:text-primary-content transition-colors">
                    <IconFeather name="search" size="16" />
                  </button>
                </div>
              </div>

              <!-- Dynamic Type Filters -->
              <div class="tabs tabs-boxed bg-base-100 p-1">
                <a
                  v-for="type in ['all', ...REPORT_TYPES.map(t => t.value)]"
                  :key="type"
                  class="tab transition-all duration-300 capitalize"
                  :class="{ 'tab-active': activeTab === type }"
                  @click="activeTab = type"
                >
                  <IconFeather 
                    v-if="type !== 'all'"
                    :name="REPORT_TYPES.find(t => t.value === type)?.icon || 'file-text'"
                    size="14"
                    class="mr-2"
                  />
                  {{ type }}
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Enhanced Table with Animations -->
        <div class="overflow-x-auto">
          <table class="table table-zebra">
            <thead>
              <tr>
                <th>Report ID</th>
                <th>Name</th>
                <th>Type</th>
                <th>Year</th>
                <th>Status</th>
                <th>Description</th>
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

              <template v-else-if="filteredTimelines.length === 0">
                <tr>
                  <td colspan="7">
                    <div class="text-center py-8">
                      <IconFeather name="calendar" size="48" class="mx-auto mb-4 text-base-content/30" />
                      <p class="text-base-content/70">No reporting timelines found</p>
                    </div>
                  </td>
                </tr>
              </template>

              <template v-else>
                <tr 
                  v-for="timeline in filteredTimelines" 
                  :key="timeline.id"
                  class="hover:bg-base-200/50 transition-all duration-300 group"
                >
                  <td>
                    <span class="font-mono text-sm">{{ timeline.ReportingID }}</span>
                  </td>
                  <td class="font-medium">{{ timeline.ReportName }}</td>
                  <td>
                    <div class="flex items-center gap-2">
                      <IconFeather 
                        :name="REPORT_TYPES.find(t => t.value === timeline.Type)?.icon || 'file-text'"
                        size="16"
                      />
                      {{ REPORT_TYPES.find(t => t.value === timeline.Type)?.label || timeline.Type }}
                    </div>
                  </td>
                  <td>{{ timeline.Year }}</td>
                  <td>
                    <span 
                      class="badge"
                      :class="{
                        'badge-success': timeline.status === 'active',
                        'badge-warning': timeline.status === 'pending',
                        'badge-error': timeline.status === 'inactive'
                      }"
                    >
                      {{ timeline.status }}
                    </span>
                  </td>
                  <td class="max-w-md">
                    <p class="truncate">{{ timeline.Description }}</p>
                  </td>
                  <td>
                    <div class="flex items-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                      <button 
                        class="btn btn-ghost btn-sm btn-square hover:scale-110 transition-transform"
                        @click="handleEdit(timeline)"
                      >
                        <IconFeather name="edit-2" size="16" />
                      </button>
                      <button 
                        class="btn btn-ghost btn-sm btn-square text-error hover:scale-110 transition-transform"
                        @click="handleDelete(timeline)"
                      >
                        <IconFeather name="trash-2" size="16" />
                      </button>
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Enhanced Create/Edit Dialog -->
    <dialog :class="['modal modal-bottom sm:modal-middle', { 'modal-open': showCreateDialog }]">
      <div class="modal-box relative overflow-hidden">
        <!-- Decorative Background -->
        <div 
          class="absolute inset-0 opacity-5"
          style="background: radial-gradient(circle at 50% 0%, var(--primary), transparent 70%);"
        ></div>

        <div class="relative">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-bold flex items-center gap-2">
              <IconFeather 
                :name="selectedTimeline ? 'edit' : 'plus-circle'"
                size="20"
              />
              {{ selectedTimeline ? 'Edit Timeline' : 'Create New Timeline' }}
            </h3>
            <button 
              class="btn btn-ghost btn-sm btn-square"
              @click="showCreateDialog = false"
            >
              <IconFeather name="x" />
            </button>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Report ID</span>
                </label>
                <input
                  v-model="form.ReportingID"
                  type="text"
                  placeholder="Enter report ID"
                  class="input input-bordered"
                  required
                />
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">Report Type</span>
                </label>
                <select 
                  v-model="form.Type"
                  class="select select-bordered w-full"
                  required
                >
                  <option value="">Select type</option>
                  <option 
                    v-for="type in REPORT_TYPES"
                    :key="type.value"
                    :value="type.value"
                  >
                    {{ type.label }}
                  </option>
                </select>
              </div>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Report Name</span>
              </label>
              <input
                v-model="form.ReportName"
                type="text"
                placeholder="Enter report name"
                class="input input-bordered"
                required
              />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Year</span>
                </label>
                <select 
                  v-model="form.Year"
                  class="select select-bordered w-full"
                >
                  <option 
                    v-for="year in [currentYear - 1, currentYear, currentYear + 1]"
                    :key="year"
                    :value="year.toString()"
                  >
                    {{ year }}
                  </option>
                </select>
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">Status</span>
                </label>
                <select 
                  v-model="form.status"
                  class="select select-bordered w-full"
                >
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Description</span>
              </label>
              <textarea
                v-model="form.Description"
                class="textarea textarea-bordered h-24"
                placeholder="Enter report description"
              ></textarea>
            </div>

            <div class="form-control">
              <label class="label cursor-pointer">
                <span class="label-text">Last Bi-Annual Report</span>
                <input
                  v-model="form.LastBiAnnual"
                  type="checkbox"
                  class="toggle toggle-primary"
                />
              </label>
            </div>

            <div v-if="error" class="alert alert-error">
              <IconFeather name="alert-circle" />
              <span>{{ error }}</span>
            </div>

            <div class="modal-action">
              <button 
                type="button" 
                class="btn" 
                @click="showCreateDialog = false"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                class="btn btn-primary gap-2"
                :disabled="loading"
              >
                <IconFeather 
                  v-if="loading" 
                  name="loader" 
                  class="animate-spin"
                />
                <IconFeather 
                  v-else
                  :name="selectedTimeline ? 'save' : 'plus'"
                  size="16"
                />
                {{ selectedTimeline ? 'Update Timeline' : 'Create Timeline' }}
              </button>
            </div>
          </form>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop" @click="showCreateDialog = false">
        <button>close</button>
      </form>
    </dialog>

    <!-- Enhanced Delete Dialog -->
    <dialog :class="['modal modal-bottom sm:modal-middle', { 'modal-open': showDeleteDialog }]">
      <div class="modal-box">
        <h3 class="font-bold text-lg mb-4">Delete Timeline</h3>
        
        <div class="bg-base-200 rounded-lg p-4 mb-4">
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 rounded-lg bg-error/10 flex items-center justify-center animate-pulse">
              <IconFeather name="alert-triangle" class="text-error" />
            </div>
            <div>
              <h4 class="font-medium mb-1">Confirm Deletion</h4>
              <p class="text-sm text-base-content/70">
                Are you sure you want to delete "{{ selectedTimeline?.ReportName }}"? 
                This action cannot be undone.
              </p>
            </div>
          </div>
        </div>

        <div v-if="error" class="alert alert-error mb-4">
          <IconFeather name="alert-circle" />
          <span>{{ error }}</span>
        </div>

        <div class="modal-action">
          <button 
            type="button" 
            class="btn" 
            @click="showDeleteDialog = false"
          >
            Cancel
          </button>
          <button 
            type="button" 
            class="btn btn-error gap-2"
            :disabled="loading"
            @click="handleDeleteConfirm"
          >
            <IconFeather 
              v-if="loading" 
              name="loader" 
              class="animate-spin"
            />
            <IconFeather v-else name="trash-2" size="16" />
            Delete Timeline
          </button>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop" @click="showDeleteDialog = false">
        <button>close</button>
      </form>
    </dialog>
  </div>
</template>

<style scoped>
.bg-grid-pattern {
  background-image: linear-gradient(to right, currentColor 1px, transparent 1px),
    linear-gradient(to bottom, currentColor 1px, transparent 1px);
  background-size: 24px 24px;
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

.animate-slide-in {
  animation: slideIn 0.5s ease-out;
}

.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out both;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>