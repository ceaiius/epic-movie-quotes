<template>
  <div
    class="
      flex flex-col
      bg-form_bg
      md:w-input_width md:h-fit
      pb-12
      w-screen
      h-screen
      md:rounded-xl
      rounded-none
    "
  >
    <div class="mt-20 flex flex-col justify-center items-center gap-6">
      <img src="/images/success.png" alt="" />
      <h1 class="text-2xl font-bold text-white">Success!</h1>
      <h2 class="text-grey_text text-center">
        Your Password changed successfully
      </h2>

      <button
        class="text-white bg-red w-96 h-12 font-medium rounded-md text-sm"
        @click="$emit('closeResetSuccessful')"
      >
        Go to my news feed
      </button>
    </div>
  </div>
</template>
      
      <script setup>
// eslint-disable-next-line no-unused-vars
const emit = defineEmits(["closeResetSuccessful"]);
</script>
      
       