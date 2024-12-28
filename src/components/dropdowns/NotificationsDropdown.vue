<script setup>
import { ref } from 'vue'
import IconFeather from '@/components/icons/IconFeather.vue'

const notifications = ref([
  {
    id: 1,
    title: 'New order received',
    message: 'Order #1234 needs processing',
    time: '5 min ago',
    type: 'order'
  },
  {
    id: 2,
    title: 'Payment successful',
    message: 'Payment for order #1233 confirmed',
    time: '1 hour ago',
    type: 'payment'
  },
  {
    id: 3,
    title: 'New subscriber',
    message: 'John Doe subscribed to your newsletter',
    time: '2 hours ago',
    type: 'subscriber'
  }
])
</script>

<template>
  <div class="dropdown dropdown-end">
    <label tabindex="0" class="btn btn-ghost btn-circle">
      <div class="indicator">
        <IconFeather name="bell" />
        <span class="badge badge-sm badge-primary indicator-item">3</span>
      </div>
    </label>
    <div 
      tabindex="0" 
      class="dropdown-content z-[1] card card-compact w-80 p-2 shadow bg-base-100"
    >
      <div class="card-body">
        <h3 class="font-semibold text-lg">Notifications</h3>
        <div class="divide-y">
          <div
            v-for="notification in notifications"
            :key="notification.id"
            class="py-3 flex items-start gap-3"
          >
            <div 
              class="w-8 h-8 rounded-full bg-base-200 flex items-center justify-center"
            >
              <IconFeather 
                :name="notification.type === 'order' ? 'shopping-bag' : 
                       notification.type === 'payment' ? 'credit-card' : 'user'"
                size="16"
              />
            </div>
            <div class="flex-1">
              <h4 class="font-medium text-sm">{{ notification.title }}</h4>
              <p class="text-sm text-base-content/70">{{ notification.message }}</p>
              <span class="text-xs text-base-content/50">{{ notification.time }}</span>
            </div>
          </div>
        </div>
        <button class="btn btn-ghost btn-sm w-full mt-2">
          View all notifications
        </button>
      </div>
    </div>
  </div>
</template>