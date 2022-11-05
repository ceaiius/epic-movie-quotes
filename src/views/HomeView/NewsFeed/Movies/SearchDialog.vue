<template>
  <div
    class="
      lg:hidden
      flex-col flex-1
      bg-form_bg
      w-screen
      h-screen
      relative
      md:rounded-xl
      rounded-none
    "
  >
    <div class="pt-10 pl-10 flex flex-col">
      <div class="flex items-center gap-4">
        <img
          class="cursor-pointer"
          src="/images/back-arrow.svg"
          alt=""
          @click="$emit('closeSearch')"
        />
        <input
          type="text"
          placeholder="Search"
          class="border-none outline-none text-white bg-transparent"
        />
      </div>
    </div>
  </div>
</template>
  
  <script setup>
// eslint-disable-next-line no-unused-vars
const emit = defineEmits(["closeSearch"]);
</script>
  
  