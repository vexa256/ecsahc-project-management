<script setup>
import { ref } from 'vue'
import IconFeather from '@/components/icons/IconFeather.vue'
import { INDICATOR_CATEGORIES } from '../constants/categories'

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({})
  },
  loading: Boolean
})

const emit = defineEmits(['submit', 'cancel'])

const form = ref({
  IndicatorPrimaryCategory: INDICATOR_CATEGORIES.PRIMARY,
  IndicatorSecondaryCategory: '',
  EntityID: '',
  IID: '',
  Indicator: '',
  IndicatorDefinition: '',
  IndicatorQuestion: '',
  RemarksComments: '',
  SourceOfData: '',
  ResponseType: '',
  ReportingPeriod: '',
  ExpectedTarget: '',
  BaselinePAD2023: '',
  Baseline2024: '',
  TargetYearOne2024: '',
  TargetYearTwo2025: '',
  TargetYearThree2026: '',
  TargetYearFour2027: '',
  TargetYearFive2028: '',
  TargetYearSix2029: '',
  TargetYearSeven2030: '',
  ...props.initialData
})

const handleSubmit = () => {
  emit('submit', { ...form.value })
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <!-- Categories -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="form-control">
        <label class="label">
          <span class="label-text">Primary Category</span>
        </label>
        <input
          v-model="form.IndicatorPrimaryCategory"
          type="text"
          class="input input-bordered bg-base-200"
          readonly
        />
      </div>

      <div class="form-control">
        <label class="label">
          <span class="label-text">Secondary Category</span>
        </label>
        <select 
          v-model="form.IndicatorSecondaryCategory"
          class="select select-bordered w-full"
          required
        >
          <option value="">Select category</option>
          <option
            v-for="category in INDICATOR_CATEGORIES.SECONDARY"
            :key="category"
            :value="category"
          >
            {{ category }}
          </option>
        </select>
      </div>
    </div>

    <!-- Rest of the form fields remain the same -->
    
    <div class="modal-action">
      <button 
        type="button" 
        class="btn" 
        @click="$emit('cancel')"
      >
        Cancel
      </button>
      <button 
        type="submit" 
        class="btn btn-primary"
        :disabled="loading"
      >
        <IconFeather 
          v-if="loading" 
          name="loader" 
          class="animate-spin"
        />
        Create Indicator
      </button>
    </div>
  </form>
</template>