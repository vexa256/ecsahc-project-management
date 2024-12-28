<script setup>
import { ref, watch } from 'vue'
import { useNotifications } from '@/composables/useNotifications'
import IconFeather from '@/components/icons/IconFeather.vue'
import { useEntities } from '../composables/useEntities'

const props = defineProps({
  open: Boolean,
  entity: Object
})

const emit = defineEmits(['update:open', 'success'])
const { showSuccess, showError } = useNotifications()
const { createEntity, updateEntity } = useEntities()

const form = ref({
  EntityID: '',
  Entity: '',
  EntityProjectDetails: ''
})

const loading = ref(false)
const error = ref(null)

watch(() => props.entity, (newEntity) => {
  if (newEntity) {
    form.value = { ...newEntity }
  } else {
    form.value = {
      EntityID: '',
      Entity: '',
      EntityProjectDetails: ''
    }
  }
}, { immediate: true })

const handleSubmit = async () => {
  try {
    loading.value = true
    error.value = null

    if (props.entity) {
      await updateEntity(form.value)
      showSuccess('Entity updated successfully')
    } else {
      await createEntity(form.value)
      showSuccess('Entity created successfully')
    }

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
      <h3 class="font-bold text-lg mb-4">
        {{ entity ? 'Edit Entity' : 'Create New Entity' }}
      </h3>

      <form @submit.prevent="handleSubmit" class="space-y-4">
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
            <span class="label-text">Project Details</span>
          </label>
          <textarea
            v-model="form.EntityProjectDetails"
            class="textarea textarea-bordered h-24"
            placeholder="Enter project details"
          ></textarea>
        </div>

        <div v-if="error" class="alert alert-error">
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
            type="submit" 
            class="btn btn-primary"
            :disabled="loading"
          >
            <IconFeather 
              v-if="loading" 
              name="loader" 
              class="animate-spin"
            />
            {{ entity ? 'Update' : 'Create' }}
          </button>
        </div>
      </form>
    </div>
    <form method="dialog" class="modal-backdrop" @click="$emit('update:open', false)">
      <button>close</button>
    </form>
  </dialog>
</template>