<template>
  <div class="w-96 flex items-center rounded-md justify-around h-10 bg-success">
    <div class="flex flex-row gap-4 text-success_text">
      <img src="/images/valid-fill.svg" alt="" />
      <p class="text-base">Profile updated Sucessfully</p>
      <img
        class="cursor-pointer"
        src="/images/exit-black.svg"
        alt=""
        @click="$emit('exit')"
      />
    </div>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
const emit = defineEmits(["exit"]);
</script>