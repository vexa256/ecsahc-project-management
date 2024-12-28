import { ref } from 'vue'

export function useIndicators() {
  const indicators = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchIndicators = async (entityId) => {
    try {
      loading.value = true
      error.value = null
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock data
      indicators.value = [
        {
          id: 1,
          EntityID: entityId,
          IID: 'IND-001',
          IndicatorPrimaryCategory: 'Country/Partner results framework',
          IndicatorSecondaryCategory: 'Country/Partner PDO Indicator',
          Indicator: 'Forest Coverage Rate',
          IndicatorDefinition: 'Percentage of land area covered by forests',
          IndicatorQuestion: 'What is the current forest coverage rate?',
          ResponseType: 'Percentage',
          SourceOfData: 'Satellite Imagery Analysis',
          ReportingPeriod: 'Annual',
          BaselinePAD2023: '45%',
          Baseline2024: '45%',
          TargetYearOne2024: '47%',
          TargetYearTwo2025: '50%',
          TargetYearThree2026: '52%',
          TargetYearFour2027: '55%',
          TargetYearFive2028: '57%',
          TargetYearSix2029: '60%',
          TargetYearSeven2030: '62%'
        }
      ]
    } catch (err) {
      error.value = 'Failed to fetch indicators'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  return {
    indicators,
    loading,
    error,
    fetchIndicators
  }
}