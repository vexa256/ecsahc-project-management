<script setup>
import { ref } from 'vue'
import IconFeather from '@/components/icons/IconFeather.vue'

defineProps({
  search: String
})

defineEmits(['update:search'])

const showFilters = ref(false)
</script>

<template>
  <div class="border-b">
    <div class="p-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <!-- Search -->
      <div class="form-control">
        <div class="input-group">
          <input
            :value="search"
            @input="$emit('update:search', $event.target.value)"
            type="text"
            placeholder="Search entities..."
            class="input input-bordered w-full max-w-xs"
          />
          <button class="btn btn-square">
            <IconFeather name="search" size="16" />
          </button>
        </div>
      </div>

      <!-- Filters -->
      <div class="flex items-center gap-2">
        <button 
          class="btn btn-ghost gap-2"
          :class="{ 'btn-active': showFilters }"
          @click="showFilters = !showFilters"
        >
          <IconFeather name="filter" size="16" />
          Filters
        </button>
        <button class="btn btn-ghost gap-2">
          <IconFeather name="download" size="16" />
          Export
        </button>
      </div>
    </div>

    <!-- Advanced Filters -->
    <div v-if="showFilters" class="p-4 border-t bg-base-200/50">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Status</span>
          </label>
          <select class="select select-bordered w-full">
            <option value="">All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Type</span>
          </label>
          <select class="select select-bordered w-full">
            <option value="">All Types</option>
            <option>Organization</option>
            <option>Project</option>
          </select>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Date Range</span>
          </label>
          <input type="date" class="input input-bordered w-full" />
        </div>
      </div>
    </div>
  </div>
</template>