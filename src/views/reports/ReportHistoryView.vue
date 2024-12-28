```vue
<script setup>
import { ref, computed } from 'vue'
import IconFeather from '@/components/icons/IconFeather.vue'

const reports = ref([
  {
    id: 1,
    name: 'Q4 2023 Performance Report',
    entity: 'Kenya Ministry of Environment',
    submittedBy: 'John Doe',
    submittedDate: '2023-12-31',
    reviewedBy: 'Jane Smith',
    reviewedDate: '2024-01-05',
    status: 'approved',
    type: 'quarterly'
  },
  {
    id: 2,
    name: 'Annual Report 2023',
    entity: 'Tanzania Wildlife Authority',
    submittedBy: 'Alice Johnson',
    submittedDate: '2024-01-15',
    reviewedBy: 'Bob Wilson',
    reviewedDate: '2024-01-20',
    status: 'rejected',
    type: 'annual'
  }
])

const loading = ref(false)
const error = ref(null)
const searchQuery = ref('')
const selectedReport = ref(null)
const showDetailsModal = ref(false)
const selectedYear = ref(new Date().getFullYear())
const selectedType = ref('all')

const years = computed(() => {
  const currentYear = new Date().getFullYear()
  return [currentYear - 1, currentYear]
})

const reportTypes = [
  { value: 'all', label: 'All Types' },
  { value: 'annual', label: 'Annual Reports' },
  { value: 'quarterly', label: 'Quarterly Reports' }
]

const stats = computed(() => [
  {
    title: 'Total Reports',
    value: reports.value.length,
    icon: 'file-text',
    trend: '+12%',
    color: 'primary'
  },
  {
    title: 'Approved',
    value: reports.value.filter(r => r.status === 'approved').length,
    icon: 'check-circle',
    trend: '+8%',
    color: 'success'
  },
  {
    title: 'Rejected',
    value: reports.value.filter(r => r.status === 'rejected').length,
    icon: 'x-circle',
    trend: '-5%',
    color: 'error'
  }
])

const filteredReports = computed(() => {
  let filtered = reports.value

  // Apply year filter
  filtered = filtered.filter(report => {
    const reportYear = new Date(report.submittedDate).getFullYear()
    return reportYear === selectedYear.value
  })

  // Apply type filter
  if (selectedType.value !== 'all') {
    filtered = filtered.filter(report => report.type === selectedType.value)
  }
  
  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(report => 
      report.name.toLowerCase().includes(query) ||
      report.entity.toLowerCase().includes(query) ||
      report.submittedBy.toLowerCase().includes(query)
    )
  }

  return filtered
})

const openDetailsModal = (report) => {
  selectedReport.value = report
  showDetailsModal.value = true
}

const getStatusBadgeClass = (status) => {
  const classes = {
    approved: 'badge-success',
    rejected: 'badge-error'
  }
  return classes[status] || 'badge-ghost'
}
</script>

<template>
  <div class="min-h-screen bg-base-100">
    <!-- Header -->
    <div class="bg-base-200 border-b">
      <div class="container mx-auto px-6 py-8">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 class="text-3xl font-bold">Report History</h1>
            <p class="text-base-content/70 mt-2">View historical reports and their outcomes</p>
          </div>

          <div class="flex items-center gap-4">
            <!-- Year Selection -->
            <select 
              v-model="selectedYear"
              class="select select-bordered"
            >
              <option
                v-for="year in years"
                :key="year"
                :value="year"
              >
                {{ year }}
              </option>
            </select>

            <!-- Type Selection -->
            <select 
              v-model="selectedType"
              class="select select-bordered"
            >
              <option
                v-for="type in reportTypes"
                :key="type.value"
                :value="type.value"
              >
                {{ type.label }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats -->
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
              <span 
                class="text-sm"
                :class="stat.trend.startsWith('+') ? 'text-success' : 'text-error'"
              >
                {{ stat.trend }}
              </span>
              <span class="text-sm text-base-content/50">vs previous year</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Search and Filters -->
    <div class="container mx-auto px-6">
      <div class="form-control mb-6">
        <div class="input-group">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search reports..."
            class="input input-bordered w-full"
          />
          <button class="btn btn-square bg-base-100">
            <IconFeather name="search" size="16" />
          </button>
        </div>
      </div>
    </div>

    <!-- Reports Table -->
    <div class="container mx-auto px-6 pb-8">
      <div class="card bg-base-100 shadow-sm">
        <div class="overflow-x-auto">
          <table class="table">
            <thead>
              <tr>
                <th>Report Name</th>
                <th>Entity</th>
                <th>Submitted</th>
                <th>Reviewed</th>
                <th>Status</th>
                <th class="w-20">Actions</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="loading">
                <tr v-for="i in 3" :key="i">
                  <td colspan="6">
                    <div class="animate-pulse flex items-center space-x-4 p-4">
                      <div class="h-4 bg-base-300 rounded w-full"></div>
                    </div>
                  </td>
                </tr>
              </template>

              <template v-else-if="error">
                <tr>
                  <td colspan="6">
                    <div class="alert alert-error">
                      <IconFeather name="alert-circle" />
                      <span>{{ error }}</span>
                    </div>
                  </td>
                </tr>
              </template>

              <template v-else>
                <tr 
                  v-for="report in filteredReports" 
                  :key="report.id"
                  class="hover:bg-base-200/50"
                >
                  <td>{{ report.name }}</td>
                  <td>{{ report.entity }}</td>
                  <td>
                    <div>
                      <p>{{ report.submittedDate }}</p>
                      <p class="text-sm text-base-content/70">by {{ report.submittedBy }}</p>
                    </div>
                  </td>
                  <td>
                    <div>
                      <p>{{ report.reviewedDate }}</p>
                      <p class="text-sm text-base-content/70">by {{ report.reviewedBy }}</p>
                    </div>
                  </td>
                  <td>
                    <span 
                      class="badge"
                      :class="getStatusBadgeClass(report.status)"
                    >
                      {{ report.status }}
                    </span>
                  </td>
                  <td>
                    <button 
                      class="btn btn-circle btn-sm bg-primary text-white hover:bg-primary/90 border-0"
                      @click="openDetailsModal(report)"
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

    <!-- Details Modal -->
    <dialog :class="['modal', { 'modal-open': showDetailsModal }]">
      <div class="modal-box max-w-4xl">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-bold">Report Details</h3>
          <button 
            class="btn btn-ghost btn-sm btn-circle"
            @click="showDetailsModal = false"
          >
            <IconFeather name="x" />
          </button>
        </div>

        <div v-if="selectedReport" class="space-y-6">
          <!-- Report Info -->
          <div class="bg-base-200 p-4 rounded-lg">
            <h4 class="font-medium">{{ selectedReport.name }}</h4>
            <div class="flex items-center gap-4 mt-2 text-sm text-base-content/70">
              <span>{{ selectedReport.entity }}</span>
              <span>•</span>
              <span>{{ selectedReport.type }}</span>
            </div>
          </div>

          <!-- Timeline -->
          <div class="space-y-4">
            <div class="flex items-start gap-4">
              <div class="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                <IconFeather name="upload" size="16" class="text-success" />
              </div>
              <div>
                <p class="font-medium">Submitted</p>
                <p class="text-sm text-base-content/70">
                  {{ selectedReport.submittedDate }} by {{ selectedReport.submittedBy }}
                </p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div 
                class="w-8 h-8 rounded-full flex items-center justify-center"
                :class="selectedReport.status === 'approved' ? 'bg-success/10' : 'bg-error/10'"
              >
                <IconFeather 
                  :name="selectedReport.status === 'approved' ? 'check' : 'x'"
                  size="16"
                  :class="selectedReport.status === 'approved' ? 'text-success' : 'text-error'"
                />
              </div>
              <div>
                <p class="font-medium">{{ selectedReport.status === 'approved' ? 'Approved' : 'Rejected' }}</p>
                <p class="text-sm text-base-content/70">
                  {{ selectedReport.reviewedDate }} by {{ selectedReport.reviewedBy }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop" @click="showDetailsModal = false">
        <button>close</button>
      </form>
    </dialog>
  </div>
</template>
```