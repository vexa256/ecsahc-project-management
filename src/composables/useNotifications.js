import { useAppStore } from '@/stores/app'

export function useNotifications() {
  const appStore = useAppStore()

  function showSuccess(message) {
    appStore.addNotification(message, 'success')
  }

  function showError(message) {
    appStore.addNotification(message, 'error')
  }

  function showInfo(message) {
    appStore.addNotification(message, 'info')
  }

  return {
    showSuccess,
    showError,
    showInfo
  }
}