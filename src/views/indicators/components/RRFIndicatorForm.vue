<script setup>
import { ref } from 'vue'
import IconFeather from '@/components/icons/IconFeather.vue'

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({})
  },
  loading: Boolean
})

const emit = defineEmits(['submit', 'cancel'])

const form = ref({
  // Basic Info
  IID: '',
  Indicator: '',
  IndicatorDefinition: '',
  IndicatorQuestion: '',
  
  // Categories
  IndicatorPrimaryCategory: 'Regional Results Framework',
  IndicatorSecondaryCategory: '',
  
  // Response Details
  ResponseType: '',
  SourceOfData: '',
  ReportingPeriod: '',
  
  // Baselines
  BaselinePAD2023: '',
  Baseline2024: '',
  
  // Annual Targets
  TargetYearOne2024: '',
  TargetYearTwo2025: '',
  TargetYearThree2026: '',
  TargetYearFour2027: '',
  TargetYearFive2028: '',
  TargetYearSix2029: '',
  TargetYearSeven2030: '',
  
  // Additional Info
  RemarksComments: '',
  ...props.initialData
})

const SECONDARY_CATEGORIES = [
  'Regional PDO Indicator',
  'Regional Intermediate Results Indicator'
]

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
            v-for="category in SECONDARY_CATEGORIES"
            :key="category"
            :value="category"
          >
            {{ category }}
          </option>
        </select>
      </div>
    </div>

    <!-- Basic Info -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="form-control">
        <label class="label">
          <span class="label-text">Indicator ID</span>
        </label>
        <input
          v-model="form.IID"
          type="text"
          placeholder="Enter indicator ID"
          class="input input-bordered"
          required
        />
      </div>

      <div class="form-control">
        <label class="label">
          <span class="label-text">Response Type</span>
        </label>
        <input
          v-model="form.ResponseType"
          type="text"
          placeholder="e.g., Percentage, Number, Yes/No"
          class="input input-bordered"
          required
        />
      </div>
    </div>

    <div class="form-control">
      <label class="label">
        <span class="label-text">Indicator Name</span>
      </label>
      <input
        v-model="form.Indicator"
        type="text"
        placeholder="Enter regional indicator name"
        class="input input-bordered"
        required
      />
    </div>

    <div class="form-control">
      <label class="label">
        <span class="label-text">Definition</span>
      </label>
      <textarea
        v-model="form.IndicatorDefinition"
        class="textarea textarea-bordered h-24"
        placeholder="Enter regional indicator definition"
        required
      ></textarea>
    </div>

    <div class="form-control">
      <label class="label">
        <span class="label-text">Question</span>
      </label>
      <textarea
        v-model="form.IndicatorQuestion"
        class="textarea textarea-bordered"
        placeholder="Enter regional indicator question"
        required
      ></textarea>
    </div>

    <!-- Baselines and Targets -->
    <div class="space-y-4">
      <h4 class="font-medium">Regional Baselines and Targets</h4>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Regional Baseline PAD 2023</span>
          </label>
          <input
            v-model="form.BaselinePAD2023"
            type="text"
            class="input input-bordered"
            required
          />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Regional Baseline 2024</span>
          </label>
          <input
            v-model="form.Baseline2024"
            type="text"
            class="input input-bordered"
            required
          />
        </div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="form-control">
          <label class="label">
            <span class="label-text">2024 Regional Target</span>
          </label>
          <input
            v-model="form.TargetYearOne2024"
            type="text"
            class="input input-bordered"
            required
          />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">2025 Regional Target</span>
          </label>
          <input
            v-model="form.TargetYearTwo2025"
            type="text"
            class="input input-bordered"
            required
          />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">2026 Regional Target</span>
          </label>
          <input
            v-model="form.TargetYearThree2026"
            type="text"
            class="input input-bordered"
            required
          />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">2027 Regional Target</span>
          </label>
          <input
            v-model="form.TargetYearFour2027"
            type="text"
            class="input input-bordered"
            required
          />
        </div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div class="form-control">
          <label class="label">
            <span class="label-text">2028 Regional Target</span>
          </label>
          <input
            v-model="form.TargetYearFive2028"
            type="text"
            class="input input-bordered"
            required
          />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">2029 Regional Target</span>
          </label>
          <input
            v-model="form.TargetYearSix2029"
            type="text"
            class="input input-bordered"
            required
          />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">2030 Regional Target</span>
          </label>
          <input
            v-model="form.TargetYearSeven2030"
            type="text"
            class="input input-bordered"
            required
          />
        </div>
      </div>
    </div>

    <!-- Additional Info -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="form-control">
        <label class="label">
          <span class="label-text">Regional Data Source</span>
        </label>
        <input
          v-model="form.SourceOfData"
          type="text"
          class="input input-bordered"
          required
        />
      </div>

      <div class="form-control">
        <label class="label">
          <span class="label-text">Regional Reporting Period</span>
        </label>
        <input
          v-model="form.ReportingPeriod"
          type="text"
          class="input input-bordered"
          required
        />
      </div>
    </div>

    <div class="form-control">
      <label class="label">
        <span class="label-text">Regional Remarks/Comments</span>
      </label>
      <textarea
        v-model="form.RemarksComments"
        class="textarea textarea-bordered"
        placeholder="Enter any additional regional remarks or comments"
      ></textarea>
    </div>

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
        Create Regional Indicator
      </button>
    </div>
  </form>
</template>