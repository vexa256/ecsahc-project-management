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
      <h3 class="font-bold text-lg">Settings</h3>
      <div class="py-4">
        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">Enable Notifications</span>
            <input type="checkbox" class="toggle" checked />
          </label>
        </div>

        <div class="form-control mt-4">
          <label class="label cursor-pointer">
            <span class="label-text">Dark Mode</span>
            <input type="checkbox" class="toggle" />
          </label>
        </div>

        <div class="form-control mt-4">
          <label class="label">
            <span class="label-text">Language</span>
          </label>
          <select class="select select-bordered w-full">
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
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