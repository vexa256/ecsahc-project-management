<script setup>
import { ref, computed } from 'vue'
import IconFeather from '@/components/icons/IconFeather.vue'

// Constants
const USER_ROLES = {
  REGIONAL_ADMIN: {
    id: 'regional_admin',
    name: 'Regional Admin',
    icon: 'globe',
    description: 'Manages regional operations and oversees country admins',
    permissions: ['manage_users', 'manage_entities', 'view_reports', 'manage_settings']
  },
  COUNTRY_ADMIN: {
    id: 'country_admin',
    name: 'Country/Partner Admin',
    icon: 'flag',
    description: 'Administers country-level operations and user management',
    permissions: ['manage_country_users', 'view_reports', 'manage_country_settings']
  },
  COUNTRY_REPORTER: {
    id: 'country_reporter',
    name: 'Country Reporter',
    icon: 'file-text',
    description: 'Submits and manages country-level reports',
    permissions: ['submit_reports', 'view_reports']
  },
  WORLD_BANK: {
    id: 'world_bank',
    name: 'World Bank',
    icon: 'briefcase',
    description: 'World Bank representative with oversight capabilities',
    permissions: ['view_all_reports', 'manage_indicators', 'view_analytics']
  }
}

// State Management
const users = ref([
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'REGIONAL_ADMIN',
    entity: 1,
    status: 'active',
    lastActive: '2024-01-20'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'COUNTRY_ADMIN',
    entity: 2,
    status: 'active',
    lastActive: '2024-01-19'
  }
])

const entities = ref([
  { id: 1, name: 'East African Community', type: 'regional', code: 'EAC' },
  { id: 2, name: 'Kenya Ministry of Environment', type: 'country', code: 'KEN' },
  { id: 3, name: 'World Bank Group', type: 'partner', code: 'WBG' }
])

const selectedEntity = ref(null)
const searchQuery = ref('')
const activeTab = ref('all')
const showCreateUser = ref(false)
const loading = ref(false)
const error = ref(null)
const createForm = ref({
  name: '',
  email: '',
  role: '',
  entity: null,
  password: '',
  confirmPassword: ''
})

// Computed Properties
const filteredUsers = computed(() => {
  let filtered = users.value

  if (selectedEntity.value) {
    filtered = filtered.filter(user => user.entity === selectedEntity.value.id)
  }

  if (activeTab.value !== 'all') {
    filtered = filtered.filter(user => user.role === activeTab.value)
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(user => 
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    )
  }

  return filtered
})

const stats = computed(() => [
  {
    title: 'Total Users',
    value: users.value.length,
    icon: 'users',
    trend: '+12%',
    color: 'primary'
  },
  {
    title: 'Active Users',
    value: users.value.filter(u => u.status === 'active').length,
    icon: 'user-check',
    trend: '+8%',
    color: 'success'
  },
  {
    title: 'Pending Invites',
    value: 3,
    icon: 'mail',
    trend: '+2',
    color: 'warning'
  }
])

// Methods
const createUser = async () => {
  try {
    loading.value = true
    error.value = null
    await new Promise(resolve => setTimeout(resolve, 1000))

    const newUser = {
      id: Date.now(),
      ...createForm.value,
      status: 'active',
      lastActive: new Date().toISOString().split('T')[0]
    }

    users.value.push(newUser)
    showCreateUser.value = false
    createForm.value = {
      name: '',
      email: '',
      role: '',
      entity: null,
      password: '',
      confirmPassword: ''
    }
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const deleteUser = async (userId) => {
  try {
    loading.value = true
    error.value = null
    await new Promise(resolve => setTimeout(resolve, 1000))
    users.value = users.value.filter(u => u.id !== userId)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-base-100">
    <!-- Header with Entity Selection -->
    <div class="relative border-b overflow-hidden bg-gradient-to-br from-primary/5 via-base-200 to-base-100">
      <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div class="px-6 py-8 relative z-10">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div class="animate-fade-in">
            <h1 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              User Management
            </h1>
            <p class="text-base-content/70 mt-2">Manage user accounts and permissions across entities</p>
          </div>

          <div class="flex items-center gap-4">
            <div class="form-control">
              <select 
                v-model="selectedEntity"
                class="select select-bordered w-full max-w-xs"
              >
                <option :value="null">All Entities</option>
                <option
                  v-for="entity in entities"
                  :key="entity.id"
                  :value="entity"
                >
                  {{ entity.name }}
                </option>
              </select>
            </div>
            <button 
              class="btn btn-primary gap-2"
              @click="showCreateUser = true"
            >
              <IconFeather name="user-plus" size="16" />
              New User
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="px-6 py-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
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
        <div class="border-b bg-base-200/50">
          <div class="p-4">
            <div class="flex flex-col md:flex-row md:items-center gap-4">
              <div class="form-control flex-1">
                <div class="input-group">
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Search users..."
                    class="input input-bordered w-full"
                  />
                  <button class="btn btn-square bg-base-100">
                    <IconFeather name="search" size="16" />
                  </button>
                </div>
              </div>

              <div class="tabs tabs-boxed bg-base-100">
                <a
                  v-for="tab in ['all', ...Object.keys(USER_ROLES)]"
                  :key="tab"
                  class="tab transition-all duration-300"
                  :class="{ 'tab-active': activeTab === tab }"
                  @click="activeTab = tab"
                >
                  {{ tab === 'all' ? 'All Roles' : USER_ROLES[tab].name }}
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Users Table -->
        <div class="overflow-x-auto">
          <table class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Entity</th>
                <th>Status</th>
                <th>Last Active</th>
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
                  v-for="user in filteredUsers" 
                  :key="user.id"
                  class="hover:bg-base-200/50"
                >
                  <td>{{ user.name }}</td>
                  <td>{{ user.email }}</td>
                  <td>
                    <div class="flex items-center gap-2">
                      <IconFeather 
                        :name="USER_ROLES[user.role].icon"
                        size="16"
                      />
                      {{ USER_ROLES[user.role].name }}
                    </div>
                  </td>
                  <td>{{ entities.find(e => e.id === user.entity)?.name }}</td>
                  <td>
                    <span 
                      class="badge"
                      :class="user.status === 'active' ? 'badge-success' : 'badge-warning'"
                    >
                      {{ user.status }}
                    </span>
                  </td>
                  <td class="text-sm text-base-content/70">{{ user.lastActive }}</td>
                  <td>
                    <div class="flex items-center gap-2">
                      <button 
                        class="btn btn-circle btn-sm bg-black text-white hover:bg-black/90 border-0"
                        @click="deleteUser(user.id)"
                      >
                        <IconFeather name="trash-2" size="14" />
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

    <!-- Create User Modal -->
    <dialog :class="['modal', { 'modal-open': showCreateUser }]">
      <div class="modal-box">
        <h3 class="font-bold text-lg mb-6">Create New User</h3>
        
        <form @submit.prevent="createUser" class="space-y-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Name</span>
            </label>
            <input
              v-model="createForm.name"
              type="text"
              placeholder="Enter user's name"
              class="input input-bordered"
              required
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input
              v-model="createForm.email"
              type="email"
              placeholder="Enter user's email"
              class="input input-bordered"
              required
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Role</span>
            </label>
            <select 
              v-model="createForm.role"
              class="select select-bordered w-full"
              required
            >
              <option value="">Select role</option>
              <option
                v-for="(role, id) in USER_ROLES"
                :key="id"
                :value="id"
              >
                {{ role.name }}
              </option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Entity</span>
            </label>
            <select 
              v-model="createForm.entity"
              class="select select-bordered w-full"
              required
            >
              <option value="">Select entity</option>
              <option
                v-for="entity in entities"
                :key="entity.id"
                :value="entity.id"
              >
                {{ entity.name }}
              </option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input
              v-model="createForm.password"
              type="password"
              placeholder="Enter password"
              class="input input-bordered"
              required
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Confirm Password</span>
            </label>
            <input
              v-model="createForm.confirmPassword"
              type="password"
              placeholder="Confirm password"
              class="input input-bordered"
              required
            />
          </div>

          <div v-if="error" class="alert alert-error">
            <IconFeather name="alert-circle" />
            <span>{{ error }}</span>
          </div>

          <div class="modal-action">
            <button 
              type="button" 
              class="btn" 
              @click="showCreateUser = false"
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
              Create User
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" class="modal-backdrop" @click="showCreateUser = false">
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

.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out both;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
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