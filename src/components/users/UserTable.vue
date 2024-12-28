```vue
<script setup>
import { computed } from 'vue'
import IconFeather from '@/components/icons/IconFeather.vue'
import { USER_ROLES } from '@/constants/userRoles'

const props = defineProps({
  users: {
    type: Array,
    required: true
  },
  entities: {
    type: Array,
    required: true
  },
  loading: Boolean,
  error: String
})

const emit = defineEmits(['delete'])
</script>

<template>
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
            v-for="user in users" 
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
                  @click="$emit('delete', user)"
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
</template>
```