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
          alt="back arrow icon"
          @click="$emit('closeSearch')"
        />
        <input
          v-model="credentials.quote_search"
          type="text"
          placeholder="Search"
          class="border-none outline-none text-white bg-transparent"
        />
      </div>
      <div class="mt-10 ml-8 text-input_bg flex flex-col gap-2">
        <h2>{{ $t("news_feed.enter_movies") }}</h2>
        <h2>{{ $t("news_feed.enter_quotes") }}</h2>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCredentials } from "@/stores/index.js";
const credentials = useCredentials();
defineEmits(["closeSearch"]);
</script>

