<script setup>
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import IconFeather from '@/components/icons/IconFeather.vue'

const email = ref('')
const password = ref('')
const { login, loading, error } = useAuth()

async function handleSubmit() {
  if (!email.value || !password.value) return
  await login(email.value, password.value)
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-base-200">
    <div class="card w-full max-w-md bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="flex justify-center mb-6">
          <div class="w-12 h-12">
            <img 
              src="https://api.dicebear.com/7.x/shapes/svg?seed=enterprise" 
              alt="Logo"
              class="animate-pulse"
            />
          </div>
        </div>
        
        <h2 class="text-2xl font-bold text-center mb-6">Welcome back</h2>
        
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input
              v-model="email"
              type="email"
              placeholder="Enter your email"
              class="input input-bordered"
              required
            />
          </div>
          
          <div class="form-control">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input
              v-model="password"
              type="password"
              placeholder="Enter your password"
              class="input input-bordered"
              required
            />
          </div>

          <div v-if="error" class="alert alert-error">
            <IconFeather name="alert-circle" />
            <span>{{ error }}</span>
          </div>
          
          <button 
            type="submit" 
            class="btn btn-primary w-full"
            :disabled="loading"
          >
            <IconFeather 
              v-if="loading" 
              name="loader" 
              class="animate-spin"
            />
            <span>{{ loading ? 'Signing in...' : 'Sign in' }}</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>