<script setup>
import { ref, computed, onMounted } from 'vue'
import IconFeather from '@/components/icons/IconFeather.vue'

// Constants
const ENTITY_TYPES = [
  { value: 'country', label: 'Country', icon: 'flag' },
  { value: 'regional', label: 'Regional Organization', icon: 'globe' },
  { value: 'worldbank', label: 'World Bank', icon: 'briefcase' },
  { value: 'external', label: 'External Partner', icon: 'users' }
]

// State
const entities = ref([])
const loading = ref(false)
const error = ref(null)
const showCreateDialog = ref(false)
const showDeleteDialog = ref(false)
const selectedEntity = ref(null)
const searchQuery = ref('')
const activeTab = ref('all')

// Form state
const form = ref({
  EntityID: '',
  Entity: '',
  EntityType: '',
  EntityDetails: '',
  status: 'active'
})

// Computed
const filteredEntities = computed(() => {
  let filtered = entities.value
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(entity => 
      entity.EntityID?.toLowerCase().includes(query) ||
      entity.Entity?.toLowerCase().includes(query) ||
      entity.EntityDetails?.toLowerCase().includes(query)
    )
  }

  if (activeTab.value !== 'all') {
    filtered = filtered.filter(entity => entity.EntityType === activeTab.value)
  }

  return filtered
})

const stats = computed(() => [
  {
    title: 'Total Entities',
    value: entities.value.length,
    icon: 'database',
    trend: '+12%',
    color: 'primary'
  },
  {
    title: 'Countries',
    value: entities.value.filter(e => e.EntityType === 'country').length,
    icon: 'flag',
    trend: '+5%',
    color: 'success'
  },
  {
    title: 'Regional Orgs',
    value: entities.value.filter(e => e.EntityType === 'regional').length,
    icon: 'globe',
    trend: '+8%',
    color: 'info'
  },
  {
    title: 'Partners',
    value: entities.value.filter(e => e.EntityType === 'external').length,
    icon: 'users',
    trend: '+15%',
    color: 'warning'
  }
])

// Methods
const fetchEntities = async () => {
  try {
    loading.value = true
    error.value = null
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock data
    entities.value = [
      {
        id: 1,
        EntityID: 'ENT-0001',
        Entity: 'Kenya Ministry of Environment',
        EntityType: 'country',
        EntityDetails: 'National environmental protection agency.',
        status: 'active'
      },
      {
        id: 2,
        EntityID: 'ENT-0002',
        Entity: 'East African Community',
        EntityType: 'regional',
        EntityDetails: 'Regional intergovernmental organization.',
        status: 'active'
      }
    ]
  } catch (err) {
    error.value = 'Failed to fetch entities'
  } finally {
    loading.value = false
  }
}

const handleCreate = () => {
  form.value = {
    EntityID: '',
    Entity: '',
    EntityType: '',
    EntityDetails: '',
    status: 'active'
  }
  showCreateDialog.value = true
  selectedEntity.value = null
}

const handleEdit = (entity) => {
  form.value = { ...entity }
  selectedEntity.value = entity
  showCreateDialog.value = true
}

const handleDelete = (entity) => {
  selectedEntity.value = entity
  showDeleteDialog.value = true
}

const handleSubmit = async () => {
  try {
    loading.value = true
    error.value = null
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (selectedEntity.value) {
      const index = entities.value.findIndex(e => e.id === selectedEntity.value.id)
      if (index !== -1) {
        entities.value[index] = { ...form.value }
      }
    } else {
      const newEntity = {
        id: Date.now(),
        ...form.value
      }
      entities.value.push(newEntity)
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
    entities.value = entities.value.filter(e => e.id !== selectedEntity.value.id)
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
    
    const headers = ['EntityID', 'Entity', 'EntityType', 'EntityDetails', 'Status']
    const rows = entities.value.map(entity => 
      headers.map(header => entity[header]).join(',')
    )
    
    const csv = [headers.join(','), ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.setAttribute('href', url)
    a.setAttribute('download', `entities-${new Date().toISOString()}.csv`)
    a.click()
    window.URL.revokeObjectURL(url)
  } catch (err) {
    error.value = 'Failed to export entities'
  } finally {
    loading.value = false
  }
}

// Lifecycle
onMounted(() => {
  fetchEntities()
})
</script>

<template>
  <div class="min-h-[calc(100vh-4rem)] bg-base-100">
    <!-- Animated Header Section -->
    <div class="relative border-b overflow-hidden bg-gradient-to-r from-base-200 to-base-100">
      <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div class="px-6 py-8 relative z-10">
        <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div class="animate-fade-in">
            <h1 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Entities
            </h1>
            <p class="text-base-content/70 mt-2">Manage and monitor your organization's entities</p>
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
              New Entity
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Animated Stats Cards -->
    <div class="px-6 py-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          v-for="(stat, index) in stats"
          :key="stat.title"
          class="card bg-base-100 shadow-sm hover:shadow-md transition-all duration-500 animate-fade-in-up"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <div class="card-body">
            <div class="flex items-start justify-between">
              <div>
                <h3 class="font-medium text-base-content/70">{{ stat.title }}</h3>
                <div class="text-2xl font-bold mt-2">{{ stat.value }}</div>
                <div class="flex items-center gap-2 mt-2">
                  <span class="text-sm text-success">{{ stat.trend }}</span>
                  <IconFeather name="trending-up" size="14" class="text-success" />
                </div>
              </div>
              <div 
                class="w-12 h-12 rounded-xl flex items-center justify-center transform transition-transform hover:scale-110"
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
        <!-- Filters -->
        <div class="border-b bg-base-200/50 backdrop-blur-sm">
          <div class="p-4">
            <div class="flex flex-col md:flex-row md:items-center gap-4">
              <!-- Search -->
              <div class="form-control flex-1">
                <div class="input-group">
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Search entities..."
                    class="input input-bordered w-full"
                  />
                  <button class="btn btn-square bg-base-100">
                    <IconFeather name="search" size="16" />
                  </button>
                </div>
              </div>

              <!-- Type Filters -->
              <div class="tabs tabs-boxed bg-base-100">
                <a
                  v-for="type in ['all', ...ENTITY_TYPES.map(t => t.value)]"
                  :key="type"
                  class="tab transition-all duration-300"
                  :class="{ 'tab-active': activeTab === type }"
                  @click="activeTab = type"
                >
                  {{ type.charAt(0).toUpperCase() + type.slice(1) }}
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="table table-zebra">
            <thead>
              <tr>
                <th>Entity ID</th>
                <th>Name</th>
                <th>Type</th>
                <th>Details</th>
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

              <template v-else-if="filteredEntities.length === 0">
                <tr>
                  <td colspan="6">
                    <div class="text-center py-8">
                      <IconFeather name="inbox" size="48" class="mx-auto mb-4 text-base-content/30" />
                      <p class="text-base-content/70">No entities found</p>
                    </div>
                  </td>
                </tr>
              </template>

              <template v-else>
                <tr 
                  v-for="entity in filteredEntities" 
                  :key="entity.id"
                  class="hover:bg-base-200/50 transition-all duration-300"
                >
                  <td>
                    <span class="font-mono text-sm">{{ entity.EntityID }}</span>
                  </td>
                  <td>{{ entity.Entity }}</td>
                  <td>
                    <div class="flex items-center gap-2">
                      <IconFeather 
                        :name="ENTITY_TYPES.find(t => t.value === entity.EntityType)?.icon || 'help-circle'"
                        size="16"
                      />
                      {{ ENTITY_TYPES.find(t => t.value === entity.EntityType)?.label || entity.EntityType }}
                    </div>
                  </td>
                  <td class="max-w-md">
                    <p class="truncate">{{ entity.EntityDetails }}</p>
                  </td>
                  <td>
                    <span 
                      class="badge"
                      :class="entity.status === 'active' ? 'badge-success' : 'badge-warning'"
                    >
                      {{ entity.status }}
                    </span>
                  </td>
                  <td>
                    <div class="flex items-center gap-2">
                      <button 
                        class="btn btn-ghost btn-sm btn-square hover:scale-110 transition-transform"
                        @click="handleEdit(entity)"
                      >
                        <IconFeather name="edit-2" size="16" />
                      </button>
                      <button 
                        class="btn btn-ghost btn-sm btn-square text-error hover:scale-110 transition-transform"
                        @click="handleDelete(entity)"
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

    <!-- Create/Edit Dialog -->
    <dialog :class="['modal modal-bottom sm:modal-middle', { 'modal-open': showCreateDialog }]">
      <div class="modal-box">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-bold">
            {{ selectedEntity ? 'Edit Entity' : 'Create New Entity' }}
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
                <span class="label-text">Entity ID</span>
              </label>
              <input
                v-model="form.EntityID"
                type="text"
                placeholder="Enter entity ID"
                class="input input-bordered"
                required
              />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Entity Type</span>
              </label>
              <select 
                v-model="form.EntityType"
                class="select select-bordered w-full"
                required
              >
                <option value="">Select type</option>
                <option 
                  v-for="type in ENTITY_TYPES"
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
              <span class="label-text">Name</span>
            </label>
            <input
              v-model="form.Entity"
              type="text"
              placeholder="Enter entity name"
              class="input input-bordered"
              required
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Entity Details</span>
            </label>
            <textarea
              v-model="form.EntityDetails"
              class="textarea textarea-bordered h-24"
              placeholder="Enter entity details"
            ></textarea>
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
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
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
              class="btn btn-primary"
              :disabled="loading"
            >
              <IconFeather 
                v-if="loading" 
                name="loader" 
                class="animate-spin"
              />
              {{ selectedEntity ? 'Update' : 'Create' }}
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" class="modal-backdrop" @click="showCreateDialog = false">
        <button>close</button>
      </form>
    </dialog>

    <!-- Delete Dialog -->
    <dialog :class="['modal modal-bottom sm:modal-middle', { 'modal-open': showDeleteDialog }]">
      <div class="modal-box">
        <h3 class="font-bold text-lg mb-4">Delete Entity</h3>
        
        <div class="bg-base-200 rounded-lg p-4 mb-4">
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 rounded-lg bg-error/10 flex items-center justify-center">
              <IconFeather name="alert-triangle" class="text-error" />
            </div>
            <div>
              <h4 class="font-medium mb-1">Confirm Deletion</h4>
              <p class="text-sm text-base-content/70">
                Are you sure you want to delete "{{ selectedEntity?.Entity }}"? 
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
            class="btn btn-error"
            :disabled="loading"
            @click="handleDeleteConfirm"
          >
            <IconFeather 
              v-if="loading" 
              name="loader" 
              class="animate-spin"
            />
            Delete
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