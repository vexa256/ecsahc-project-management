import { ref } from 'vue'
import { USER_ROLES } from '@/constants/userRoles'

export function useUserManagement() {
  const selectedEntity = ref(null)
  const searchQuery = ref('')
  const activeTab = ref('all')
  const showCreateUser = ref(false)

  const filterUsers = (users, entity, role, query) => {
    let filtered = users

    if (entity) {
      filtered = filtered.filter(user => user.entity === entity.id)
    }

    if (role !== 'all') {
      filtered = filtered.filter(user => user.role === role)
    }

    if (query) {
      const lowercaseQuery = query.toLowerCase()
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(lowercaseQuery) ||
        user.email.toLowerCase().includes(lowercaseQuery)
      )
    }

    return filtered
  }

  return {
    selectedEntity,
    searchQuery,
    activeTab,
    showCreateUser,
    filterUsers
  }
}