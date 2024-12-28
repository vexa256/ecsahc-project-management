import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const isLoading = ref(false)
  const notifications = ref([])

  function addNotification(message, type = 'info') {
    const id = Date.now()
    notifications.value.push({ id, message, type })
    setTimeout(() => removeNotification(id), 5000)
  }

  function removeNotification(id) {
    notifications.value = notifications.value.filter(n => n.id !== id)
  }

  return {
    isLoading,
    notifications,
    addNotification,
    removeNotification
  }
})