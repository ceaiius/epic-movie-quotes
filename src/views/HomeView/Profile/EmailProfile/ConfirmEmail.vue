<template>
  <div class="flex flex-col bg-black_bg w-96 h-60 md:rounded-xl rounded-xl">
    <div
      class="flex flex-col w-full justify-center text-white items-center h-full"
    >
      <h1>{{ $t("profile.are_you_sure_to_make_changes") }}</h1>
      <hr class="border-hr_color w-full mt-10" />
      <div class="flex w-full justify-between items-center pl-10 pr-10 mt-10">
        <h2 class="cursor-pointer" @click="$emit('exit')">
          {{ $t("profile.cancel") }}
        </h2>
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
          <span v-else> {{ $t("profile.confirm") }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCredentials } from "@/stores/index.js";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
const credentials = useCredentials();
defineEmits(["exit", "save"]);
</script>