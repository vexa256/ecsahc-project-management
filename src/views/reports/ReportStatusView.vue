```vue
<script setup>
import { ref, computed, onMounted } from 'vue'
import IconFeather from '@/components/icons/IconFeather.vue'

// Constants
const TimelineStatus = {
  ACTIVE: 'active',
  CLOSED: 'closed'
}

// State
const timelines = ref([])
const loading = ref(false)
const error = ref(null)
const searchQuery = ref('')
const showStatusModal = ref(false)
const selectedTimeline = ref(null)
const activeFilter = ref('all')

// Mock data with more entries
const mockTimelines = [
  {
    id: 1,
    ReportingID: 'REP-2024-Q1',
    ReportName: 'Q1 2024 Performance Report',
    Description: 'First quarter performance analysis and metrics.',
    status: TimelineStatus.ACTIVE,
    lastUpdated: '2024-01-15'
  },
  {
    id: 2,
    ReportingID: 'REP-2024-A1',
    ReportName: '2024 Annual Report',
    Description: 'Comprehensive annual performance review.',
    status: TimelineStatus.CLOSED,
    lastUpdated: '2024-01-10'
  },
  {
    id: 3,
    ReportingID: 'REP-2024-Q2',
    ReportName: 'Q2 2024 Performance Report',
    Description: 'Second quarter performance analysis.',
    status: TimelineStatus.ACTIVE,
    lastUpdated: '2024-01-20'
  }
]

// Computed
const stats = computed(() => [
  {
    title: 'Total Reports',
    value: timelines.value.length,
    icon: 'file-text',
    trend: '+12%',
    trendIcon: 'trending-up',
    color: 'primary'
  },
  {
    title: 'Active Reports',
    value: timelines.value.filter(t => t.status === TimelineStatus.ACTIVE).length,
    icon: 'check-circle',
    trend: '+8%',
    trendIcon: 'trending-up',
    color: 'success'
  },
  {
    title: 'Closed Reports',
    value: timelines.value.filter(t => t.status === TimelineStatus.CLOSED).length,
    icon: 'archive',
    trend: '-5%',
    trendIcon: 'trending-down',
    color: 'neutral'
  }
])

const filteredTimelines = computed(() => {
  let filtered = timelines.value

  // Apply status filter
  if (activeFilter.value !== 'all') {
    filtered = filtered.filter(t => t.status === activeFilter.value)
  }
  
  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(timeline => 
      timeline.ReportingID?.toLowerCase().includes(query) ||
      timeline.ReportName?.toLowerCase().includes(query) ||
      timeline.Description?.toLowerCase().includes(query)
    )
  }

  return filtered
})

// Methods
const fetchTimelines = async () => {
  try {
    loading.value = true
    error.value = null
    await new Promise(resolve => setTimeout(resolve, 1000))
    timelines.value = mockTimelines
  } catch (err) {
    error.value = 'Failed to fetch timelines'
  } finally {
    loading.value = false
  }
}

const openStatusModal = (timeline) => {
  selectedTimeline.value = timeline
  showStatusModal.value = true
}

const updateStatus = async (newStatus) => {
  try {
    loading.value = true
    error.value = null
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const index = timelines.value.findIndex(t => t.id === selectedTimeline.value.id)
    if (index !== -1) {
      timelines.value[index].status = newStatus
      timelines.value[index].lastUpdated = new Date().toISOString().split('T')[0]
    }
    
    showStatusModal.value = false
    selectedTimeline.value = null
  } catch (err) {
    error.value = 'Failed to update status'
  } finally {
    loading.value = false
  }
}

onMounted(fetchTimelines)
</script>

<template>
  <div class="min-h-screen bg-base-100">
    <!-- Header -->
    <div class="bg-base-200 border-b">
      <div class="container mx-auto px-6 py-8">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 class="text-3xl font-bold">Report Status</h1>
            <p class="text-base-content/70 mt-2">Manage and track report statuses</p>
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
                :name="stat.trendIcon"
                size="16"
                :class="stat.trend.startsWith('+') ? 'text-success' : 'text-error'"
              />
              <span 
                class="text-sm"
                :class="stat.trend.startsWith('+') ? 'text-success' : 'text-error'"
              >
                {{ stat.trend }}
              </span>
              <span class="text-sm text-base-content/50">vs last month</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters and Content -->
    <div class="container mx-auto px-6 pb-8">
      <div class="card bg-base-100 shadow-sm">
        <!-- Status Filters -->
        <div class="p-4 border-b">
          <div class="flex items-center gap-2">
            <button
              v-for="filter in ['all', 'active', 'closed']"
              :key="filter"
              class="btn btn-sm"
              :class="activeFilter === filter ? 'btn-primary' : 'btn-ghost'"
              @click="activeFilter = filter"
            >
              <IconFeather 
                :name="filter === 'all' ? 'layers' : filter === 'active' ? 'check-circle' : 'archive'"
                size="14"
                class="mr-2"
              />
              {{ filter.charAt(0).toUpperCase() + filter.slice(1) }}
            </button>
          </div>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="table">
            <thead>
              <tr>
                <th>Report ID</th>
                <th>Name</th>
                <th>Status</th>
                <th>Description</th>
                <th>Last Updated</th>
                <th class="w-20"></th>
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
                  v-for="timeline in filteredTimelines" 
                  :key="timeline.id"
                  class="hover:bg-base-200/50"
                >
                  <td class="font-mono">{{ timeline.ReportingID }}</td>
                  <td>{{ timeline.ReportName }}</td>
                  <td>
                    <span 
                      class="badge"
                      :class="timeline.status === TimelineStatus.ACTIVE ? 'badge-success' : 'badge-neutral'"
                    >
                      {{ timeline.status }}
                    </span>
                  </td>
                  <td>{{ timeline.Description }}</td>
                  <td class="text-sm text-base-content/70">{{ timeline.lastUpdated }}</td>
                  <td>
                    <button 
                      class="btn btn-circle btn-sm bg-black hover:bg-black/90 text-white border-0"
                      @click="openStatusModal(timeline)"
                    >
                      <IconFeather name="edit-2" size="14" />
                    </button>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Status Update Modal -->
    <dialog :class="['modal', { 'modal-open': showStatusModal }]">
      <div class="modal-box">
        <h3 class="font-bold text-lg mb-6">Update Status</h3>
        
        <div class="space-y-6">
          <div class="bg-base-200 rounded-lg p-4">
            <h4 class="font-medium">{{ selectedTimeline?.ReportName }}</h4>
            <p class="text-sm text-base-content/70 mt-1">{{ selectedTimeline?.Description }}</p>
          </div>

          <div class="space-y-3">
            <button 
              class="btn w-full bg-black hover:bg-black/90 text-white gap-2"
              :disabled="selectedTimeline?.status === TimelineStatus.ACTIVE"
              @click="updateStatus(TimelineStatus.ACTIVE)"
            >
              <IconFeather name="check-circle" size="18" />
              Mark as Active
            </button>

            <button 
              class="btn w-full bg-black hover:bg-black/90 text-white gap-2"
              :disabled="selectedTimeline?.status === TimelineStatus.CLOSED"
              @click="updateStatus(TimelineStatus.CLOSED)"
            >
              <IconFeather name="x-circle" size="18" />
              Mark as Closed
            </button>
          </div>
        </div>

        <div class="modal-action">
          <form method="dialog">
            <button class="btn" @click="showStatusModal = false">Close</button>
          </form>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop" @click="showStatusModal = false">
        <button>close</button>
      </form>
    </dialog>
  </div>
</template>
```