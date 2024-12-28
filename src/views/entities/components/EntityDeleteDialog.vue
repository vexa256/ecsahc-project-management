<script setup>
import { ref } from 'vue'
import { useNotifications } from '@/composables/useNotifications'
import IconFeather from '@/components/icons/IconFeather.vue'
import { useEntities } from '../composables/useEntities'

const props = defineProps({
  open: Boolean,
  entity: Object
})

const emit = defineEmits(['update:open', 'success'])
const { showSuccess, showError } = useNotifications()
const { deleteEntity } = useEntities()

const loading = ref(false)
const error = ref(null)

const handleDelete = async () => {
  try {
    loading.value = true
    error.value = null

    await deleteEntity(props.entity.id)
    showSuccess('Entity deleted successfully')
    emit('update:open', false)
    emit('success')
  } catch (err) {
    error.value = err.message
    showError(err.message)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <dialog :class="['modal', { 'modal-open': open }]">
    <div class="modal-box">
      <h3 class="font-bold text-lg mb-4">Delete Entity</h3>
      
      <p class="mb-4">
        Are you sure you want to delete the entity "{{ entity?.Entity }}"? 
        This action cannot be undone.
      </p>

      <div v-if="error" class="alert alert-error mb-4">
        <IconFeather name="alert-circle" />
        <span>{{ error }}</span>
      </div>

      <div class="modal-action">
        <button 
          type="button" 
          class="btn" 
          @click="$emit('update:open', false)"
        >
          Cancel
        </button>
        <button 
          type="button" 
          class="btn btn-error"
          :disabled="loading"
          @click="handleDelete"
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
    <form method="dialog" class="modal-backdrop" @click="$emit('update:open', false)">
      <button>close</button>
    </form>
  </dialog>
</template>