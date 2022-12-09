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
      bg-[#E97777]
    "
  >
    <div
      class="flex flex-row justify-around text-sm pr-1 gap-4 whitespace-nowrap"
    >
      <img src="/images/invalid.svg" alt="invalid icon" />
      <p class="">{{ message }}</p>
      <img
        class="cursor-pointer w-3"
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