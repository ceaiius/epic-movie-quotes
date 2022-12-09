<template>
  <div
    class="
      w-screen
      xs:w-96
      flex
      items-center
      rounded-md
      justify-around
      h-10
      bg-success
    "
  >
    <div class="flex flex-row gap-4 text-success_text">
      <img src="/images/valid-fill.svg" alt="valid icon" />
      <p class="text-base">{{ message }}</p>
      <img
        class="cursor-pointer"
        src="/images/exit-black.svg"
        alt="black exit icon"
        @click="$emit('exit')"
      />
    </div>
  </div>
</template>

<script setup>
defineEmits(["exit"]);
defineProps(["message"]);
</script>