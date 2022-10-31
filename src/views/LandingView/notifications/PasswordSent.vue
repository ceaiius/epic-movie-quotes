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
      <img src="/images/send-email.png" alt="" />
      <h1 class="text-2xl font-bold text-white">Check your email</h1>
      <h2 class="text-grey_text text-center">
        We have sent a password recover instructions to your email
      </h2>

      <button
        class="
          text-white
          bg-default_red
          w-96
          h-12
          font-medium
          rounded-md
          text-sm
        "
        @click="$emit('closePasswordSent')"
      >
        Go to my email
      </button>
      <div
        class="flex gap-6 justify-center items-center text-grey_text"
        @click="$emit('skip')"
      >
        <p class="cursor-pointer">Skip, I'll confirm later</p>
      </div>
    </div>
  </div>
</template>
    
    <script setup>
// eslint-disable-next-line no-unused-vars
const emit = defineEmits(["closePasswordSent", "skip"]);
</script>
    
     