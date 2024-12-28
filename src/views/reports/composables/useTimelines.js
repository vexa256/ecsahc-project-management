import { ref } from 'vue'

export function useTimelines() {
  const timelines = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Mock data to match the database schema
  const mockTimelines = [
    {
      id: 1,
      ReportingID: 'REP-2024-Q1',
      ReportName: 'Q1 2024 Performance Report',
      Type: 'quarterly',
      Description: 'First quarter performance analysis and metrics.',
      Year: '2024',
      status: 'active',
      LastBiAnnual: false
    },
    {
      id: 2,
      ReportingID: 'REP-2024-A1',
      ReportName: '2024 Annual Report',
      Type: 'annual',
      Description: 'Comprehensive annual performance review.',
      Year: '2024',
      status: 'closed',
      LastBiAnnual: false
    }
  ]

  const fetchTimelines = async () => {
    try {
      loading.value = true
      error.value = null
      
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 1000))
      timelines.value = mockTimelines
    } catch (err) {
      error.value = 'Failed to fetch reporting timelines'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const updateTimelineStatus = async (id, status) => {
    try {
      loading.value = true
      error.value = null
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const index = timelines.value.findIndex(t => t.id === id)
      if (index !== -1) {
        timelines.value[index].status = status
      }
      return true
    } catch (err) {
      error.value = 'Failed to update timeline status'
      console.error(err)
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    timelines,
    loading,
    error,
    fetchTimelines,
    updateTimelineStatus
  }
}