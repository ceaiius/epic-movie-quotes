<template>
  <div class="flex flex-col bg-black_bg w-96 h-60 md:rounded-xl rounded-xl">
    <div
      class="flex flex-col w-full justify-center text-white items-center h-full"
    >
      <h1>Are you sure to make changes?</h1>
      <hr class="border-hr_color w-full mt-10" />
      <div class="flex w-full justify-between items-center pl-10 pr-10 mt-10">
        <h2 class="cursor-pointer" @click="$emit('exit')">Cancel</h2>
        <button
          class="
            text-white
            bg-default_red
            w-28
            h-10
            font-medium
            rounded-md
            text-sm
          "
          :disabled="credentials.loading"
          @click="$emit('save')"
        >
          <LoadingSpinner v-if="credentials.loading" custom="w-5 h-5" />
          <span v-else> {{ $t("Profile.confirm") }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCredentials } from "@/stores/index.js";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
const credentials = useCredentials();
// eslint-disable-next-line no-unused-vars
const emit = defineEmits(["exit", "save"]);
</script>