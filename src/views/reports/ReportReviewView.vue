```vue
<script setup>
import { ref, computed } from 'vue'
import IconFeather from '@/components/icons/IconFeather.vue'

const reports = ref([
  {
    id: 1,
    name: 'Q1 2024 Performance Report',
    entity: 'Kenya Ministry of Environment',
    submittedBy: 'John Doe',
    submittedDate: '2024-03-31',
    status: 'pending',
    type: 'quarterly',
    indicators: 12,
    completedIndicators: 12
  },
  {
    id: 2,
    name: 'Annual Report 2023',
    entity: 'Tanzania Wildlife Authority',
    submittedBy: 'Jane Smith',
    submittedDate: '2024-01-15',
    status: 'under_review',
    type: 'annual',
    indicators: 24,
    completedIndicators: 24
  }
])

const loading = ref(false)
const error = ref(null)
const searchQuery = ref('')
const selectedReport = ref(null)
const showReviewModal = ref(false)

const stats = computed(() => [
  {
    title: 'Pending Review',
    value: reports.value.filter(r => r.status === 'pending').length,
    icon: 'clock',
    trend: '+2',
    color: 'warning'
  },
  {
    title: 'Under Review',
    value: reports.value.filter(r => r.status === 'under_review').length,
    icon: 'eye',
    trend: '+5',
    color: 'info'
  },
  {
    title: 'Reviewed Today',
    value: 3,
    icon: 'check-circle',
    trend: '+3',
    color: 'success'
  }
])

const filteredReports = computed(() => {
  if (!searchQuery.value) return reports.value
  
  const query = searchQuery.value.toLowerCase()
  return reports.value.filter(report => 
    report.name.toLowerCase().includes(query) ||
    report.entity.toLowerCase().includes(query) ||
    report.submittedBy.toLowerCase().includes(query)
  )
})

const openReviewModal = (report) => {
  selectedReport.value = report
  showReviewModal.value = true
}

const getStatusBadgeClass = (status) => {
  const classes = {
    pending: 'badge-warning',
    under_review: 'badge-info',
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
            <h1 class="text-3xl font-bold">Report Review</h1>
            <p class="text-base-content/70 mt-2">Review and approve submitted reports</p>
          </div>

          <div class="form-control">
            <div class="input-group">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search reports..."
                class="input input-bordered w-full max-w-xs"
              />
              <button class="btn btn-square bg-base-100">
                <IconFeather name="search" size="16" />
              </button>
            </div>
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
              <span class="text-sm text-success">{{ stat.trend }}</span>
              <span class="text-sm text-base-content/50">vs yesterday</span>
            </div>
          </div>
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
                <th>Submitted By</th>
                <th>Date</th>
                <th>Status</th>
                <th>Completion</th>
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

              <template v-else>
                <tr 
                  v-for="report in filteredReports" 
                  :key="report.id"
                  class="hover:bg-base-200/50"
                >
                  <td>{{ report.name }}</td>
                  <td>{{ report.entity }}</td>
                  <td>{{ report.submittedBy }}</td>
                  <td>{{ report.submittedDate }}</td>
                  <td>
                    <span 
                      class="badge"
                      :class="getStatusBadgeClass(report.status)"
                    >
                      {{ report.status.replace('_', ' ') }}
                    </span>
                  </td>
                  <td>
                    <div class="flex items-center gap-2">
                      <progress 
                        class="progress progress-success w-20" 
                        :value="report.completedIndicators" 
                        :max="report.indicators" 
                      />
                      <span class="text-sm">
                        {{ report.completedIndicators }}/{{ report.indicators }}
                      </span>
                    </div>
                  </td>
                  <td>
                    <button 
                      class="btn btn-circle btn-sm bg-primary text-white hover:bg-primary/90 border-0"
                      @click="openReviewModal(report)"
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

    <!-- Review Modal -->
    <dialog :class="['modal', { 'modal-open': showReviewModal }]">
      <div class="modal-box max-w-4xl">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-bold">Review Report</h3>
          <button 
            class="btn btn-ghost btn-sm btn-circle"
            @click="showReviewModal = false"
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
              <span>Submitted: {{ selectedReport.submittedDate }}</span>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex justify-end gap-2">
            <button class="btn btn-error gap-2">
              <IconFeather name="x-circle" size="16" />
              Reject
            </button>
            <button class="btn btn-success gap-2">
              <IconFeather name="check-circle" size="16" />
              Approve
            </button>
          </div>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop" @click="showReviewModal = false">
        <button>close</button>
      </form>
    </dialog>
  </div>
</template>
```