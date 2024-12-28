import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

export function useAuth() {
  const userStore = useUserStore()
  const router = useRouter()
  const loading = ref(false)
  const error = ref(null)

  async function login(email, password) {
    try {
      loading.value = true
      error.value = null
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock successful login
      userStore.setUser({
        id: '1',
        name: 'John Doe',
        email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
      })
      
      router.push('/dashboard')
    } catch (e) {
      error.value = 'Invalid credentials'
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    try {
      loading.value = true
      error.value = null
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      userStore.logout()
      router.push('/login')
    } catch (e) {
      error.value = 'Error logging out'
    } finally {
      loading.value = false
    }
  }

  return {
    login,
    logout,
    loading,
    error
  }
}