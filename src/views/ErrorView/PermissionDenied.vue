<template>
  <div
    class="
      h-screen
      w-screen
      flex flex-col
      gap-10
      justify-center
      items-center
      bg-gradient-to-tr
      from-[#181725]
      to-[#0D0B14]
    "
  >
    <div class="relative">
      <div>
        <img src="/images/union.png" alt="image of a union" />
        <img
          class="absolute -bottom-12 w-[345px] h-[261px]"
          src="/images/gandolf.png"
          alt="image of gandolf"
        />
      </div>
    </div>
    <div>
      <h1 class="text-2xl font-bold text-white lg:text-5xl">
        You shall not pass!
      </h1>
    </div>
    <div class="text-center">
      <h2 class="text-base lg:text-2xl font-bold text-white">
        Sorry, but you don’t have permission to access this page
      </h2>
    </div>
    <div>
      <button
        type="button"
        class="
          focus:outline-none
          text-white
          bg-default_red
          w-32
          h-10
          font-medium
          rounded-md
          text-sm
        "
        @click="router.push({ name: 'landing' })"
      >
        Return home
      </button>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
</script>