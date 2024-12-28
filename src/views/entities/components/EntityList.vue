<script setup>
import { computed } from 'vue'
import IconFeather from '@/components/icons/IconFeather.vue'

const props = defineProps({
  entities: {
    type: Array,
    default: () => []
  },
  loading: Boolean,
  error: String,
  searchQuery: String
})

const emit = defineEmits(['edit', 'delete'])

const filteredEntities = computed(() => {
  if (!props.searchQuery) return props.entities
  
  const query = props.searchQuery.toLowerCase()
  return props.entities.filter(entity => 
    entity.EntityID?.toLowerCase().includes(query) ||
    entity.Entity?.toLowerCase().includes(query) ||
    entity.EntityProjectDetails?.toLowerCase().includes(query)
  )
})
</script>

<template>
  <div class="overflow-x-auto">
    <table class="table">
      <!-- Table Header -->
      <thead>
        <tr>
          <th>Entity ID</th>
          <th>Name</th>
          <th>Project Details</th>
          <th class="w-20">Actions</th>
        </tr>
      </thead>

      <!-- Table Body -->
      <tbody>
        <template v-if="loading">
          <tr v-for="i in 3" :key="i">
            <td colspan="4">
              <div class="animate-pulse flex items-center space-x-4 p-4">
                <div class="h-4 bg-base-300 rounded w-full"></div>
              </div>
            </td>
          </tr>
        </template>

        <template v-else-if="error">
          <tr>
            <td colspan="4">
              <div class="alert alert-error">
                <IconFeather name="alert-circle" />
                <span>{{ error }}</span>
              </div>
            </td>
          </tr>
        </template>

        <template v-else-if="filteredEntities.length === 0">
          <tr>
            <td colspan="4">
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
            class="hover:bg-base-200/50 transition-colors"
          >
            <td>
              <span class="font-mono text-sm">{{ entity.EntityID }}</span>
            </td>
            <td>{{ entity.Entity }}</td>
            <td class="max-w-md">
              <p class="truncate">{{ entity.EntityProjectDetails }}</p>
            </td>
            <td>
              <div class="flex items-center gap-2">
                <button 
                  class="btn btn-ghost btn-sm btn-square"
                  @click="$emit('edit', entity)"
                >
                  <IconFeather name="edit-2" size="16" />
                </button>
                <button 
                  class="btn btn-ghost btn-sm btn-square text-error"
                  @click="$emit('delete', entity)"
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
</template>