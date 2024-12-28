```vue
<script setup>
import { ref } from 'vue'
import IconFeather from '@/components/icons/IconFeather.vue'
import { USER_ROLES } from '@/constants/userRoles'

const props = defineProps({
  open: Boolean,
  entities: {
    type: Array,
    required: true
  },
  loading: Boolean,
  error: String
})

const emit = defineEmits(['update:open', 'create'])

const form = ref({
  name: '',
  email: '',
  role: '',
  entity: null,
  password: '',
  confirmPassword: ''
})

const handleSubmit = () => {
  emit('create', { ...form.value })
}
</script>

<template>
  <dialog :class="['modal', { 'modal-open': open }]">
    <div class="modal-box">
      <h3 class="font-bold text-lg mb-6">Create New User</h3>
      
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Name</span>
          </label>
          <input
            v-model="form.name"
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
            v-model="form.email"
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
            v-model="form.role"
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
            v-model="form.entity"
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
            v-model="form.password"
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
            v-model="form.confirmPassword"
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
            Create User
          </button>
        </div>
      </form>
    </div>
    <form method="dialog" class="modal-backdrop" @click="$emit('update:open', false)">
      <button>close</button>
    </form>
  </dialog>
</template>
```