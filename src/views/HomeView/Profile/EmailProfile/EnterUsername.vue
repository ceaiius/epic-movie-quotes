<template>
  <div
    class="
      flex flex-col
      bg-[#24222F]
      w-screen
      h-60
      lg:hidden
      md:rounded-xl
      rounded-none
    "
  >
    <div class="relative flex flex-col gap-6 justify-center items-center mt-10">
      <img
        class="cursor-pointer absolute top-0 right-6"
        src="/images/exit.svg"
        alt=""
        @click="$emit('exit')"
      />

      <label for="username" class="text-white">{{
        $t("Profile.enter_new_username")
      }}</label>
      <input
        id="email"
        v-model="username"
        class="w-96 text-sm h-10 p-2 border-2 rounded"
      />
      <button
        class="
          text-white
          bg-default_red
          w-32
          h-12
          font-medium
          rounded-md
          text-sm
        "
      >
        {{ $t("Profile.add") }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
// eslint-disable-next-line no-unused-vars
const emit = defineEmits(["exit"]);
const username = ref("");
</script>