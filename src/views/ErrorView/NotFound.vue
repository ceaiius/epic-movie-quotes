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
        <img src="/images/ghost.png" alt="image of a ghost" />
        <img
          class="relative top-6"
          src="/images/ghost-shadow.png"
          alt="image of ghost's shadow"
        />
      </div>
    </div>
    <div>
      <h1 class="text-2xl font-bold text-white lg:text-5xl">Whoops!</h1>
    </div>
    <div class="text-center">
      <h2 class="text-base lg:text-2xl font-bold text-white">
        We can't see the page you are looking for
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
          hover:bg-button_hover
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