import { ref } from 'vue'
import axios from 'axios'

export function useEntities() {
  const entities = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Mock data for now - replace with actual API calls later
  const mockEntities = [
    {
      id: 1,
      EntityID: 'ENT-0001',
      Entity: 'Project Alpha',
      EntityProjectDetails: 'A flagship enterprise project focused on sustainable development.'
    },
    {
      id: 2,
      EntityID: 'ENT-0002',
      Entity: 'Beta Foundation',
      EntityProjectDetails: 'Community development initiative with multiple stakeholders.'
    }
  ]

  async function fetchEntities() {
    try {
      loading.value = true
      error.value = null
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      entities.value = mockEntities
    } catch (err) {
      error.value = 'Failed to fetch entities'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  async function createEntity(data) {
    try {
      loading.value = true
      error.value = null
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock response
      const newEntity = {
        id: Date.now(),
        ...data
      }
      entities.value.push(newEntity)
      
      return newEntity
    } catch (err) {
      error.value = 'Failed to create entity'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateEntity(data) {
    try {
      loading.value = true
      error.value = null
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const index = entities.value.findIndex(e => e.id === data.id)
      if (index !== -1) {
        entities.value[index] = { ...data }
      }
      
      return data
    } catch (err) {
      error.value = 'Failed to update entity'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function deleteEntity(id) {
    try {
      loading.value = true
      error.value = null
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      entities.value = entities.value.filter(e => e.id !== id)
    } catch (err) {
      error.value = 'Failed to delete entity'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function exportToCSV() {
    try {
      loading.value = true
      error.value = null
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Convert entities to CSV
      const headers = ['EntityID', 'Entity', 'EntityProjectDetails']
      const rows = entities.value.map(entity => 
        headers.map(header => entity[header]).join(',')
      )
      
      const csv = [
        headers.join(','),
        ...rows
      ].join('\n')
      
      // Create and download file
      const blob = new Blob([csv], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.setAttribute('href', url)
      a.setAttribute('download', `entities-${new Date().toISOString()}.csv`)
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (err) {
      error.value = 'Failed to export entities'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    entities,
    loading,
    error,
    fetchEntities,
    createEntity,
    updateEntity,
    deleteEntity,
    exportToCSV
  }
}