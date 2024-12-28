import { ref, computed } from 'vue'

export function useReports() {
  const reports = ref([
    {
      id: 1,
      title: 'Q1 Performance Report',
      description: 'Quarterly performance analysis and metrics',
      status: 'active'
    },
    {
      id: 2,
      title: 'Annual Review 2024',
      description: 'Comprehensive annual performance review',
      status: 'pending'
    },
    {
      id: 3,
      title: 'Project Impact Assessment',
      description: 'Analysis of project outcomes and impact',
      status: 'draft'
    }
  ])
  
  const loading = ref(false)
  const error = ref(null)

  const getReportsByStatus = (status) => {
    return reports.value.filter(r => r.status === status)
  }

  return {
    reports,
    loading,
    error,
    getReportsByStatus
  }
}