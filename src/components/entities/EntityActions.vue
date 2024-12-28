<script setup>
import IconFeather from '@/components/icons/IconFeather.vue'

defineProps({
  selectedCount: {
    type: Number,
    default: 0
  }
})

defineEmits(['create'])
</script>

<template>
  <div class="flex items-center gap-2">
    <template v-if="selectedCount > 0">
      <div class="bg-base-200 px-3 py-1 rounded-lg text-sm">
        {{ selectedCount }} selected
      </div>
      <button class="btn btn-error btn-sm gap-2">
        <IconFeather name="trash-2" size="16" />
        Delete
      </button>
      <button class="btn btn-ghost btn-sm gap-2">
        <IconFeather name="archive" size="16" />
        Archive
      </button>
    </template>
    <button 
      class="btn btn-primary gap-2"
      @click="$emit('create')"
    >
      <IconFeather name="plus" size="16" />
      New Entity
    </button>
  </div>
</template>