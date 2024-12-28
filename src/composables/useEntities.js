import { ref } from 'vue'

export function useEntities() {
  const entities = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function fetchEntities() {
    try {
      loading.value = true
      error.value = null
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock data
      entities.value = Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        EntityID: `ENT-${String(i + 1).padStart(4, '0')}`,
        Entity: `Entity ${i + 1}`,
        EntityProjectDetails: `This is a detailed description for Entity ${i + 1}. It contains important project information and other relevant details.`
      }))
    } catch (e) {
      error.value = 'Failed to fetch entities'
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  return {
    entities,
    loading,
    error,
    fetchEntities
  }
}