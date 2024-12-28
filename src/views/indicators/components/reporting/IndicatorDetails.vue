```vue
<script setup>
import IconFeather from '@/components/icons/IconFeather.vue'

defineProps({
  indicator: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="space-y-4">
    <!-- Basic Info -->
    <div class="bg-base-200 p-6 rounded-lg">
      <div class="flex items-start justify-between">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="font-mono text-sm">{{ indicator.IID }}</span>
            <span class="badge badge-primary">{{ indicator.ResponseType }}</span>
          </div>
          <h3 class="text-lg font-medium">{{ indicator.Indicator }}</h3>
          <p class="mt-2 text-base-content/70">{{ indicator.IndicatorDefinition }}</p>
        </div>
        <div class="badge badge-ghost">
          {{ indicator.IndicatorSecondaryCategory }}
        </div>
      </div>
    </div>

    <!-- Targets Timeline -->
    <div class="card bg-base-100">
      <div class="card-body">
        <h4 class="font-medium mb-4">Targets Timeline</h4>
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
    </div>

    <!-- Additional Info -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="card bg-base-100">
        <div class="card-body">
          <h4 class="font-medium mb-2">Reporting Details</h4>
          <div class="space-y-3">
            <div>
              <span class="text-sm text-base-content/70">Source of Data:</span>
              <p>{{ indicator.SourceOfData }}</p>
            </div>
            <div>
              <span class="text-sm text-base-content/70">Reporting Period:</span>
              <p>{{ indicator.ReportingPeriod }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="card bg-base-100">
        <div class="card-body">
          <h4 class="font-medium mb-2">Additional Information</h4>
          <div>
            <span class="text-sm text-base-content/70">Remarks/Comments:</span>
            <p>{{ indicator.RemarksComments || 'No additional comments' }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
```