<script setup>
defineProps({
  open: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:open'])
</script>

<template>
  <dialog :class="['modal', { 'modal-open': open }]">
    <div class="modal-box">
      <h3 class="font-bold text-lg">User Profile</h3>
      <div class="py-4">
        <div class="flex items-center space-x-4">
          <div class="avatar">
            <div class="w-24 rounded-full">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" alt="User avatar" />
            </div>
          </div>
          <div>
            <h4 class="text-lg font-semibold">John Doe</h4>
            <p class="text-sm text-gray-600">john.doe@example.com</p>
          </div>
        </div>
        
        <div class="form-control mt-4">
          <label class="label">
            <span class="label-text">Display Name</span>
          </label>
          <input type="text" class="input input-bordered" value="John Doe" />
        </div>

        <div class="form-control mt-4">
          <label class="label">
            <span class="label-text">Email</span>
          </label>
          <input type="email" class="input input-bordered" value="john.doe@example.com" />
        </div>
      </div>
      <div class="modal-action">
        <button class="btn" @click="$emit('update:open', false)">Close</button>
        <button class="btn btn-primary">Save Changes</button>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop" @click="$emit('update:open', false)">
      <button>close</button>
    </form>
  </dialog>
</template>