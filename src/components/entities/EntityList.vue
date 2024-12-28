<script setup>
import { computed } from 'vue'
import IconFeather from '@/components/icons/IconFeather.vue'

const props = defineProps({
  entities: {
    type: Array,
    default: () => []
  },
  selected: {
    type: Array,
    default: () => []
  },
  loading: Boolean,
  error: String,
  searchQuery: String
})

const emit = defineEmits(['update:selected'])

const filteredEntities = computed(() => {
  if (!props.searchQuery) return props.entities
  const query = props.searchQuery.toLowerCase()
  return props.entities.filter(entity => 
    entity.Entity?.toLowerCase().includes(query) ||
    entity.EntityID?.toLowerCase().includes(query)
  )
})

const toggleSelect = (entity) => {
  const newSelected = props.selected.includes(entity.id)
    ? props.selected.filter(id => id !== entity.id)
    : [...props.selected, entity.id]
  emit('update:selected', newSelected)
}

const toggleSelectAll = () => {
  emit('update:selected', 
    props.selected.length === filteredEntities.value.length
      ? []
      : filteredEntities.value.map(e => e.id)
  )
}
</script>

<template>
  <div class="overflow-x-auto">
    <table class="table">
      <!-- Table Header -->
      <thead>
        <tr>
          <th class="w-16">
            <label>
              <input 
                type="checkbox"
                class="checkbox"
                :checked="selected.length === filteredEntities.length && filteredEntities.length > 0"
                :indeterminate="selected.length > 0 && selected.length < filteredEntities.length"
                @change="toggleSelectAll"
              />
            </label>
          </th>
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
            <td colspan="5">
              <div class="animate-pulse flex items-center space-x-4 p-4">
                <div class="h-4 bg-base-300 rounded w-full"></div>
              </div>
            </td>
          </tr>
        </template>

        <template v-else-if="error">
          <tr>
            <td colspan="5">
              <div class="alert alert-error">
                <IconFeather name="alert-circle" />
                <span>{{ error }}</span>
              </div>
            </td>
          </tr>
        </template>

        <template v-else-if="filteredEntities.length === 0">
          <tr>
            <td colspan="5">
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
              <label>
                <input 
                  type="checkbox"
                  class="checkbox"
                  :checked="selected.includes(entity.id)"
                  @change="toggleSelect(entity)"
                />
              </label>
            </td>
            <td>
              <span class="font-mono text-sm">{{ entity.EntityID }}</span>
            </td>
            <td>{{ entity.Entity }}</td>
            <td class="max-w-md">
              <p class="truncate">{{ entity.EntityProjectDetails }}</p>
            </td>
            <td>
              <div class="flex items-center gap-2">
                <button class="btn btn-ghost btn-sm btn-square">
                  <IconFeather name="edit-2" size="16" />
                </button>
                <button class="btn btn-ghost btn-sm btn-square text-error">
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