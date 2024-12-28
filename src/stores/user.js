import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref({
    id: null,
    name: '',
    email: '',
    avatar: '',
    preferences: {
      theme: 'light',
      notifications: true,
      language: 'en'
    }
  })

  const isAuthenticated = ref(false)

  function setUser(userData) {
    user.value = { ...user.value, ...userData }
    isAuthenticated.value = true
  }

  function updateProfile(profileData) {
    user.value = { ...user.value, ...profileData }
  }

  function updatePreferences(preferences) {
    user.value.preferences = { ...user.value.preferences, ...preferences }
  }

  function logout() {
    user.value = {
      id: null,
      name: '',
      email: '',
      avatar: '',
      preferences: {
        theme: 'light',
        notifications: true,
        language: 'en'
      }
    }
    isAuthenticated.value = false
  }

  return {
    user,
    isAuthenticated,
    setUser,
    updateProfile,
    updatePreferences,
    logout
  }
})