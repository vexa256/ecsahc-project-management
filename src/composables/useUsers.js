```js
import { ref } from 'vue'
import { USER_ROLES } from '@/constants/userRoles'

export function useUsers() {
  const users = ref([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'REGIONAL_ADMIN',
      entity: 1,
      status: 'active',
      lastActive: '2024-01-20'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'COUNTRY_ADMIN',
      entity: 2,
      status: 'active',
      lastActive: '2024-01-19'
    }
  ])

  const loading = ref(false)
  const error = ref(null)

  const createUser = async (userData) => {
    try {
      loading.value = true
      error.value = null
      await new Promise(resolve => setTimeout(resolve, 1000))

      const newUser = {
        id: Date.now(),
        ...userData,
        status: 'active',
        lastActive: new Date().toISOString().split('T')[0]
      }

      users.value.push(newUser)
      return newUser
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteUser = async (userId) => {
    try {
      loading.value = true
      error.value = null
      await new Promise(resolve => setTimeout(resolve, 1000))
      users.value = users.value.filter(u => u.id !== userId)
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    users,
    loading,
    error,
    createUser,
    deleteUser
  }
}
```