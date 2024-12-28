<script setup>
import { computed } from 'vue'
import IconFeather from '@/components/icons/IconFeather.vue'

const props = defineProps({
  indicator: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])
</script>

<template>
  <div class="space-y-6">
    <!-- Header Info -->
    <div class="bg-base-200 p-4 rounded-lg">
      <div class="flex items-start gap-4">
        <div class="flex-1">
          <h4 class="font-medium text-lg">{{ indicator.Indicator }}</h4>
          <p class="text-sm text-base-content/70 mt-1">{{ indicator.IID }}</p>
        </div>
        <div class="badge badge-primary">{{ indicator.ResponseType }}</div>
      </div>
    </div>

    <!-- Categories -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h5 class="font-medium mb-2">Primary Category</h5>
        <p>{{ indicator.IndicatorPrimaryCategory }}</p>
      </div>
      <div>
        <h5 class="font-medium mb-2">Secondary Category</h5>
        <p>{{ indicator.IndicatorSecondaryCategory }}</p>
      </div>
    </div>

    <!-- Definition & Question -->
    <div class="space-y-4">
      <div>
        <h5 class="font-medium mb-2">Definition</h5>
        <p class="bg-base-200/50 p-3 rounded">{{ indicator.IndicatorDefinition }}</p>
      </div>
      <div>
        <h5 class="font-medium mb-2">Question</h5>
        <p class="bg-base-200/50 p-3 rounded">{{ indicator.IndicatorQuestion }}</p>
      </div>
    </div>

    <!-- Targets Timeline -->
    <div>
      <h5 class="font-medium mb-4">Targets Timeline</h5>
      <div class="overflow-x-auto">
        <table class="table table-sm">
          <thead>
            <tr>
              <th>Baseline PAD 2023</th>
              <th>Baseline 2024</th>
              <th>2024</th>
              <th>2025</th>
              <th>2026</th>
              <th>2027</th>
              <th>2028</th>
              <th>2029</th>
              <th>2030</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ indicator.BaselinePAD2023 }}</td>
              <td>{{ indicator.Baseline2024 }}</td>
              <td>{{ indicator.TargetYearOne2024 }}</td>
              <td>{{ indicator.TargetYearTwo2025 }}</td>
              <td>{{ indicator.TargetYearThree2026 }}</td>
              <td>{{ indicator.TargetYearFour2027 }}</td>
              <td>{{ indicator.TargetYearFive2028 }}</td>
              <td>{{ indicator.TargetYearSix2029 }}</td>
              <td>{{ indicator.TargetYearSeven2030 }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Additional Information -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h5 class="font-medium mb-2">Source of Data</h5>
        <p class="bg-base-200/50 p-3 rounded">{{ indicator.SourceOfData }}</p>
      </div>
      <div>
        <h5 class="font-medium mb-2">Remarks/Comments</h5>
        <p class="bg-base-200/50 p-3 rounded">{{ indicator.RemarksComments }}</p>
      </div>
    </div>
  </div>
</template>