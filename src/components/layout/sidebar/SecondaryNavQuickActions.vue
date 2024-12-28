<script setup>
import { ref } from 'vue'
import IconFeather from '@/components/icons/IconFeather.vue'

const props = defineProps({
  section: {
    type: Object,
    required: true
  }
})

const getActions = (section) => {
  const defaultActions = [
    { icon: 'list', label: 'View All', action: 'view' },
    { icon: 'plus-circle', label: 'Create New', action: 'create' }
  ]

  const sectionActions = {
    'Entities': [
      { icon: 'plus-circle', label: 'New Entity', action: 'create' },
      { icon: 'upload', label: 'Import', action: 'import' },
      { icon: 'download', label: 'Export', action: 'export' },
      { icon: 'filter', label: 'Filter', action: 'filter' }
    ],
    'Reports': [
      { icon: 'file-plus', label: 'New Report', action: 'create' },
      { icon: 'calendar', label: 'Schedule', action: 'schedule' },
      { icon: 'download', label: 'Export', action: 'export' },
      { icon: 'filter', label: 'Filter', action: 'filter' }
    ],
    'Analytics': [
      { icon: 'bar-chart-2', label: 'Overview', action: 'overview' },
      { icon: 'pie-chart', label: 'Reports', action: 'reports' },
      { icon: 'download', label: 'Export', action: 'export' },
      { icon: 'filter', label: 'Filter', action: 'filter' }
    ]
  }

  return sectionActions[section.name] || defaultActions
}

const actions = ref(getActions(props.section))
const hoveredAction = ref(null)
</script>

<template>
  <div class="quick-actions">
    <div class="actions-grid">
      <button
        v-for="action in actions"
        :key="action.action"
        class="action-button"
        @mouseenter="hoveredAction = action"
        @mouseleave="hoveredAction = null"
      >
        <!-- Background Effects -->
        <div 
          class="button-background"
          :class="{ 'hovered': hoveredAction === action }"
        />
        
        <!-- Content -->
        <div class="button-content">
          <div 
            class="icon-container"
            :class="{ 'hovered': hoveredAction === action }"
          >
            <div class="icon-glow" />
            <IconFeather 
              :name="action.icon"
              size="20"
              class="icon"
            />
          </div>
          
          <span class="label">{{ action.label }}</span>
        </div>

        <!-- Hover Effects -->
        <div class="hover-effects">
          <div class="hover-line" />
          <div class="hover-glow" />
        </div>
      </button>
    </div>
  </div>
</template>

<style scoped>
.quick-actions {
  @apply p-4;
}

.actions-grid {
  @apply grid grid-cols-2 gap-4;
}

.action-button {
  @apply relative flex flex-col items-center p-4 rounded-xl;
  @apply transition-all duration-300;
}

.button-background {
  @apply absolute inset-0 rounded-xl opacity-0 transition-all duration-300;
  background: linear-gradient(
    135deg,
    hsl(var(--primary)/0.1),
    hsl(var(--primary)/0.05)
  );
}

.button-background.hovered {
  @apply opacity-100;
}

.button-content {
  @apply relative z-10 flex flex-col items-center gap-2;
}

.icon-container {
  @apply relative w-12 h-12 rounded-xl flex items-center justify-center;
  @apply transition-all duration-300;
  background: linear-gradient(
    135deg,
    hsl(var(--primary)/0.1),
    hsl(var(--primary)/0.05)
  );
  border: 1px solid hsl(var(--primary)/0.1);
}

.icon-container.hovered {
  background: linear-gradient(
    135deg,
    hsl(var(--primary)/0.2),
    hsl(var(--primary)/0.1)
  );
  border-color: hsl(var(--primary)/0.2);
  transform: translateY(-2px);
}

.icon-glow {
  @apply absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300;
  background: radial-gradient(
    circle at center,
    hsl(var(--primary)/0.3),
    transparent 70%
  );
  filter: blur(8px);
}

.icon-container.hovered .icon-glow {
  @apply opacity-100;
}

.icon {
  @apply transition-all duration-300;
  color: hsl(var(--primary)/0.8);
}

.icon-container.hovered .icon {
  @apply scale-110 text-primary;
  filter: drop-shadow(0 0 8px hsl(var(--primary)/0.3));
}

.label {
  @apply text-sm font-medium transition-all duration-300;
  color: hsl(var(--primary)/0.8);
}

.action-button:hover .label {
  @apply text-primary;
}

.hover-effects {
  @apply absolute inset-0 rounded-xl overflow-hidden;
  pointer-events: none;
}

.hover-line {
  @apply absolute inset-0 opacity-0 transition-opacity duration-300;
  background: linear-gradient(
    135deg,
    transparent,
    hsl(var(--primary)/0.2),
    transparent
  );
}

.action-button:hover .hover-line {
  @apply opacity-100;
}

.hover-glow {
  @apply absolute inset-0 opacity-0 transition-opacity duration-300;
  background: radial-gradient(
    circle at var(--x, 50%) var(--y, 50%),
    hsl(var(--primary)/0.3),
    transparent 70%
  );
  filter: blur(8px);
}

.action-button:hover .hover-glow {
  @apply opacity-100;
}
</style>