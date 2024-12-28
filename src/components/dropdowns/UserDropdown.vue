<script setup>
import IconFeather from '@/components/icons/IconFeather.vue'

defineEmits(['open-profile', 'open-settings'])

const user = {
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
}
</script>

<template>
  <div class="dropdown dropdown-end">
    <label tabindex="0" class="btn btn-ghost btn-circle avatar">
      <div class="w-10 rounded-full">
        <img :src="user.avatar" :alt="user.name" />
      </div>
    </label>
    <ul 
      tabindex="0" 
      class="dropdown-content z-[1] menu menu-sm p-2 shadow bg-base-100 rounded-box w-52"
    >
      <div class="px-3 py-2 border-b">
        <h4 class="font-medium">{{ user.name }}</h4>
        <p class="text-xs text-base-content/70">{{ user.email }}</p>
      </div>
      <li>
        <a @click="$emit('open-profile')">
          <IconFeather name="user" size="16" />
          Profile
        </a>
      </li>
      <li>
        <a @click="$emit('open-settings')">
          <IconFeather name="settings" size="16" />
          Settings
        </a>
      </li>
      <li>
        <router-link to="/logout">
          <IconFeather name="log-out" size="16" />
          Logout
        </router-link>
      </li>
    </ul>
  </div>
</template>